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
    humidity: float
    ph: float
    rainfall: float

# API endpoint for crop prediction
@app.post("/api/crop")
def crop_predict(input_data: CropInput):
    # Convert input to numpy array for prediction
    features = np.array([[input_data.N, input_data.P, input_data.K, 
                          input_data.temperature, input_data.humidity, 
                          input_data.ph, input_data.rainfall]])
    
    # Predict crop
    prediction = model.predict(features)
    crop_name = prediction[0]  # Assuming model outputs the crop name directly

    # Return the result as JSON
    return {"input_data": input_data.dict(), "predicted_crop": crop_name}

