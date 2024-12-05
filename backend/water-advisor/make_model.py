import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

# Load the dataset
data = pd.read_csv("./datasets/agricultural_water_footprint.csv")

# Clean the data (rename columns as needed)
data.rename(columns={
    'Water Use (m³/kg)': 'Water_Use',
    'Rainfall Requirement (mm/year)': 'Rainfall_Requirement',
    'Temperature Requirement (°C)': 'Temperature_Requirement',
    'Soil Type': 'Soil_Type',
    'Irrigation Type': 'Irrigation_Type',
    'Water Scarcity': 'Water_Scarcity',
    'Yield (tons/ha)': 'Yield',
    'Crop Cycle Duration (days)': 'Crop_Cycle_Duration',
    'Crop': 'Crop_Name'  # Assuming the crop name column is present
}, inplace=True)

# Select relevant features and target
features = [
    'Rainfall_Requirement', 
    'Temperature_Requirement', 
    'Soil_Type', 
    'Irrigation_Type', 
    'Water_Scarcity', 
    'Yield', 
    'Crop_Cycle_Duration',
    'Crop_Name'  # Include crop name as a feature
]
target = ['Water_Use', 'Temperature_Requirement', 'Rainfall_Requirement']

# Encode categorical variables using LabelEncoder
encoder = LabelEncoder()

# Fit the encoder on the entire dataset to handle all categorical columns consistently
categorical_cols = ['Soil_Type', 'Irrigation_Type', 'Water_Scarcity', 'Crop_Name']

for col in categorical_cols:
    data[col] = encoder.fit_transform(data[col])

# Prepare the features and target variables
X = data[features]
y = data[target]

# Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.1, random_state=10)

# Create and train the model
model = RandomForestRegressor(random_state=10)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")

# Save the model, encoder, and scaler
joblib.dump(model, 'crop_model.pkl')
joblib.dump(encoder, 'encoder.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("Model, encoder, and scaler saved!")
