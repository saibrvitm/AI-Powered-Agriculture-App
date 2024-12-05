from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# Load the saved models
model_crop = joblib.load('./crop-selector/crop_prediction_model.pkl')  # Crop prediction model
model_water = joblib.load('./water-advisor/crop_model.pkl')  # Water use, temperature, and rainfall requirement model
encoder = joblib.load('./water-advisor/encoder.pkl')  # LabelEncoder for categorical features
scaler = joblib.load('./water-advisor/scaler.pkl')  # StandardScaler for input features

# Define the FastAPI app
app = FastAPI()

# Add CORSMiddleware to handle CORS requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; you can restrict to specific origins here like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Define the input schema for crop prediction
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    ph: float
    rainfall: float

# Define the input schema for water use prediction
class WaterInput(BaseModel):
    Rainfall_Requirement: float  # mm/year
    Temperature_Requirement: float  # °C
    Soil_Type: str  # e.g., Loamy, Clayey, Sandy
    Irrigation_Type: str  # e.g., Drip, Flood, None
    Water_Scarcity: str  # e.g., Severe, Moderate, Low
    Yield: float  # tons/ha
    Crop_Cycle_Duration: float  # days
    Crop_Name: str  # Crop name to be included as a feature (new field)

# Function to handle unseen labels during prediction
def safe_transform(encoder, value):
    try:
        return encoder.transform([value])[0]
    except ValueError:
        # If the label is unseen, assign it a default encoding (-1 or another value)
        return -1

# API endpoint for crop prediction
@app.post("/api/crop")
def crop_predict(input_data: CropInput):
    # Convert input to numpy array for prediction
    features = np.array([[input_data.N, input_data.P, input_data.K, 
                          input_data.temperature, 
                          input_data.ph, input_data.rainfall]])
    
    # Predict probabilities for each crop
    probabilities = model_crop.predict_proba(features)
    
    # Get the top 3 predicted crops
    top_n = 3
    top_crops_indices = np.argsort(probabilities[0])[::-1][:top_n]
    
    # Fetch top crops and probabilities
    top_crops = [(model_crop.classes_[i], probabilities[0][i]) for i in top_crops_indices]
    crop_name = "  |  ".join([f"{crop[0]} ({crop[1]*100:.2f}% GS)" for crop in top_crops])

    # Return the result as JSON
    return {"input_data": input_data.dict(), "predicted_crop": crop_name}

# API endpoint for water use, temperature, and rainfall prediction
@app.post("/api/water_use")
def water_use_predict(input_data: WaterInput):
    # Encode categorical variables
    soil_type_encoded = safe_transform(encoder, input_data.Soil_Type)
    irrigation_type_encoded = safe_transform(encoder, input_data.Irrigation_Type)
    water_scarcity_encoded = safe_transform(encoder, input_data.Water_Scarcity)
    crop_name_encoded = safe_transform(encoder, input_data.Crop_Name)  # Encode crop name as well
    
    # Create feature array for prediction (including the crop name)
    features = np.array([[input_data.Rainfall_Requirement, input_data.Temperature_Requirement,
                          soil_type_encoded, irrigation_type_encoded, water_scarcity_encoded,
                          input_data.Yield, input_data.Crop_Cycle_Duration, crop_name_encoded]])  # Added crop name
    
    # Scale the input features using the same scaler used during training
    features_scaled = scaler.transform(features)
    
    # Predict water use, temperature, and rainfall requirement
    predictions = model_water.predict(features_scaled)[0]
    
    # Return the result as JSON
    return {
        "input_data": input_data.dict(),
        "predicted_water_use": f"{predictions[0]:.2f} m³ per kg",
        "predicted_temperature_requirement": f"{predictions[1]:.2f} °C",
        "predicted_rainfall_requirement": f"{predictions[2]:.2f} mm/year"
    }
