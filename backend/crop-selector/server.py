from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np
import joblib

# Load the saved model
model = joblib.load('./dev/crop_prediction_model.pkl')

# Define the FastAPI app
app = FastAPI()

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
@app.post("/api/crop_predict")
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
