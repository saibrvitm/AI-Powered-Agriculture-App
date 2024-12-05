from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# Load the saved models and pre-processing utilities
model_crop = joblib.load('./crop-selector/crop_prediction_model.pkl')  # Crop prediction model
model_water = joblib.load('./water-advisor/crop_model.pkl')  # Water use, temperature, and rainfall requirement model
encoder = joblib.load('./water-advisor/encoder.pkl')  # LabelEncoder for categorical features
scaler = joblib.load('./water-advisor/scaler.pkl')  # StandardScaler for input features

# Initialize FastAPI app
app = FastAPI()

# Configure CORS to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to specific origins (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema for crop prediction
class CropInput(BaseModel):
    N: float  # Nitrogen level in soil
    P: float  # Phosphorus level in soil
    K: float  # Potassium level in soil
    temperature: float  # Temperature in °C
    ph: float  # pH level of soil
    rainfall: float  # Annual rainfall in mm

# Input schema for water use prediction
class WaterInput(BaseModel):
    Rainfall_Requirement: float  # Rainfall requirement in mm/year
    Temperature_Requirement: float  # Temperature requirement in °C
    Soil_Type: str  # Soil type (e.g., Sandy, Clay, Loam)
    Irrigation_Type: str  # Irrigation type (e.g., Drip, Sprinkler, Surface)
    Water_Scarcity: str  # Water scarcity level (e.g., Low, Moderate, High)
    Yield: float  # Crop yield in tons/ha
    Crop_Cycle_Duration: float  # Duration of crop cycle in days
    Crop_Name: str  # Name of the crop

# Helper function for safe label encoding
def safe_transform(encoder, value):
    try:
        return encoder.transform([value])[0]
    except ValueError:
        # Handle unseen labels by assigning a default encoding
        return -1

# API endpoint for crop prediction
@app.post("/api/crop")
def crop_predict(input_data: CropInput):
    # Convert input into a numpy array for prediction
    features = np.array([[input_data.N, input_data.P, input_data.K, 
                          input_data.temperature, input_data.ph, 
                          input_data.rainfall]])
    
    # Predict probabilities for each crop
    probabilities = model_crop.predict_proba(features)
    
    # Get the top 3 predicted crops
    top_n = 3
    top_crops_indices = np.argsort(probabilities[0])[::-1][:top_n]
    top_crops = [
        {
            "crop": model_crop.classes_[i],
            "probability": probabilities[0][i]
        }
        for i in top_crops_indices
    ]

    # Return the results
    return {
        "input_data": input_data.dict(),
        "predicted_crops": top_crops
    }

# API endpoint for water use, temperature, and rainfall requirement prediction
@app.post("/api/water_use")
def water_use_predict(input_data: WaterInput):
    # Encode categorical features
    soil_type_encoded = safe_transform(encoder, input_data.Soil_Type)
    irrigation_type_encoded = safe_transform(encoder, input_data.Irrigation_Type)
    water_scarcity_encoded = safe_transform(encoder, input_data.Water_Scarcity)
    crop_name_encoded = safe_transform(encoder, input_data.Crop_Name)

    # Create feature array
    features = np.array([[input_data.Rainfall_Requirement, input_data.Temperature_Requirement,
                          soil_type_encoded, irrigation_type_encoded, 
                          water_scarcity_encoded, input_data.Yield, 
                          input_data.Crop_Cycle_Duration, crop_name_encoded]])

    # Scale the features
    features_scaled = scaler.transform(features)

    # Predict water use, temperature, and rainfall requirements
    predictions = model_water.predict(features_scaled)[0]

    # Return the predictions
    return {
        "input_data": input_data.dict(),
        "predicted_water_use": f"{predictions[0]:.2f} m³/kg",
        "predicted_temperature_requirement": f"{predictions[1]:.2f} °C",
        "predicted_rainfall_requirement": f"{predictions[2]:.2f} mm/year"
    }
