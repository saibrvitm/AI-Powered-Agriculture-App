from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# Load the saved model
model = joblib.load('./dev/crop_prediction_model.pkl')

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

# Define the input schema
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    ph: float
    rainfall: float

# API endpoint for crop prediction
@app.post("/api/crop")
def crop_predict(input_data: CropInput):
    # Convert input to numpy array for prediction
    features = np.array([[input_data.N, input_data.P, input_data.K, 
                          input_data.temperature, 
                          input_data.ph, input_data.rainfall]])
    
    # Predict probabilities for each crop
    probabilities = model.predict_proba(features)
    
    # Get the top 3 predicted crops
    top_n = 3
    top_crops_indices = np.argsort(probabilities[0])[::-1][:top_n]
    
    # Fetch top crops and probabilities
    top_crops = [(model.classes_[i], probabilities[0][i]) for i in top_crops_indices]
    crop_name = "  |  ".join([f"{crop[0]} ({crop[1]*100:.2f}% GS)" for crop in top_crops])

    # Return the result as JSON
    return {"input_data": input_data.dict(), "predicted_crop": crop_name}