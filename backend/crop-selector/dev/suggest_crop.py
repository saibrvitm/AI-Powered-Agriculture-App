import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib  # For saving and loading the model

# Step 1: Load and prepare the data
data = pd.read_csv("./datasets/crop_yield_by_rainfall.csv")

# Features and target
X = data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = data['crop']

# Step 2: Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 3: Train the model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Step 4: Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")

# Step 5: Save the model
joblib.dump(model, 'crop_prediction_model.pkl')

print("Model saved as 'crop_prediction_model.pkl'")

# Step 6: Load and use the model
loaded_model = joblib.load('crop_prediction_model.pkl')

# Example prediction
new_data = pd.DataFrame({
    'N': [85],
    'P': [55],
    'K': [40],
    'temperature': [25.00],
    'humidity': [80.00],
    'ph': [6.8],
    'rainfall': [250.0]
})
predicted_crop = loaded_model.predict(new_data)
print(f"Predicted crop: {predicted_crop[0]}")
