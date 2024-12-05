import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

# Load the dataset
data = pd.read_csv("./datasets/agricultural_water_footprint.csv")

# Rename columns for consistency
data.rename(columns={
    'Water Use (m³/kg)': 'Water_Use',
    'Rainfall Requirement (mm/year)': 'Rainfall_Requirement',
    'Temperature Requirement (°C)': 'Temperature_Requirement',
    'Soil Type': 'Soil_Type',
    'Irrigation Type': 'Irrigation_Type',
    'Water Scarcity': 'Water_Scarcity',
    'Yield (tons/ha)': 'Yield',
    'Crop Cycle Duration (days)': 'Crop_Cycle_Duration',
    'Crop': 'Crop_Name'
}, inplace=True)

# Select relevant features and target variables
features = [
    'Rainfall_Requirement', 
    'Temperature_Requirement', 
    'Soil_Type', 
    'Irrigation_Type', 
    'Water_Scarcity', 
    'Yield', 
    'Crop_Cycle_Duration',
    'Crop_Name'
]
target = ['Water_Use', 'Temperature_Requirement', 'Rainfall_Requirement']

# Handle missing values
data.dropna(subset=features + target, inplace=True)

# Convert yield to kilograms (if in tons)
data['Yield'] *= 1000  # Convert from tons/ha to kg/ha

# Encode categorical variables
encoder = LabelEncoder()
categorical_cols = ['Soil_Type', 'Irrigation_Type', 'Water_Scarcity', 'Crop_Name']
for col in categorical_cols:
    data[col] = encoder.fit_transform(data[col])

# Prepare features and target variables
X = data[features]
y = data[target]

# Scale numerical features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.1, random_state=42)

# Train the Random Forest model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")

# Save the model, encoder, and scaler
joblib.dump(model, './water-advisor/crop_model.pkl')
joblib.dump(encoder, './water-advisor/encoder.pkl')
joblib.dump(scaler, './water-advisor/scaler.pkl')

print("Model, encoder, and scaler saved successfully!")
