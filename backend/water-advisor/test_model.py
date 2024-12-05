import joblib
import numpy as np

# Load the model, encoder, and scaler
model = joblib.load('crop_model.pkl')
encoder = joblib.load('encoder.pkl')
scaler = joblib.load('scaler.pkl')

# Example input data for testing (values need to be entered based on your case)
input_data = {
    "Rainfall_Requirement": 1200,  # mm/year
    "Temperature_Requirement": 30,  # °C
    "Soil_Type": "Loamy",  # Soil type (must match the encoder's training)
    "Irrigation_Type": "Drip",  # Irrigation type (must match the encoder's training)
    "Water_Scarcity": "Moderate",  # Water scarcity level (must match the encoder's training)
    "Yield": 6.5,  # Yield in tons/ha
    "Crop_Cycle_Duration": 120,  # Duration in days
    "Crop_Name": "Wheat"  # Crop name (must match the encoder's training)
}

# Check if input labels match with encoder's training labels
input_data["Soil_Type"] = encoder.transform([input_data["Soil_Type"]])[0] if input_data["Soil_Type"] in encoder.classes_ else -1
input_data["Irrigation_Type"] = encoder.transform([input_data["Irrigation_Type"]])[0] if input_data["Irrigation_Type"] in encoder.classes_ else -1
input_data["Water_Scarcity"] = encoder.transform([input_data["Water_Scarcity"]])[0] if input_data["Water_Scarcity"] in encoder.classes_ else -1
input_data["Crop_Name"] = encoder.transform([input_data["Crop_Name"]])[0] if input_data["Crop_Name"] in encoder.classes_ else -1

# Handle missing or unseen labels: -1 is used for unseen labels
if input_data["Soil_Type"] == -1 or input_data["Irrigation_Type"] == -1 or input_data["Water_Scarcity"] == -1 or input_data["Crop_Name"] == -1:
    print("Warning: One or more of the input labels were unseen during training. Predictions may not be accurate.")

# Prepare input for prediction (convert to numpy array)
features_array = np.array([[input_data["Rainfall_Requirement"], 
                            input_data["Temperature_Requirement"],
                            input_data["Soil_Type"], 
                            input_data["Irrigation_Type"], 
                            input_data["Water_Scarcity"], 
                            input_data["Yield"], 
                            input_data["Crop_Cycle_Duration"],
                            input_data["Crop_Name"]]])  # Added Crop Name as a feature

# Scale the input data
scaled_input = scaler.transform(features_array)

# Make predictions
predictions = model.predict(scaled_input)

# Output the prediction for water usage, temperature, and rainfall
predicted_water_usage = predictions[0][0]
predicted_temperature = predictions[0][1]
predicted_rainfall = predictions[0][2]

# Grading the feasibility based on predicted conditions
def grade_feasibility(temperature, rainfall, temp_req, rain_req):
    if abs(temperature - temp_req) <= 5 and abs(rainfall - rain_req) <= 200:
        return "Feasible"
    elif abs(temperature - temp_req) <= 10 and abs(rainfall - rain_req) <= 400:
        return "Moderately Feasible"
    else:
        return "Not Feasible"

feasibility_grade = grade_feasibility(predicted_temperature, predicted_rainfall, input_data["Temperature_Requirement"], input_data["Rainfall_Requirement"])

# Final output
output = {
    "Predicted Water Usage (m³/kg)": predicted_water_usage,
    "Predicted Temperature (°C)": predicted_temperature,
    "Predicted Rainfall (mm/year)": predicted_rainfall,
    "Feasibility Grade": feasibility_grade
}

print(output)
