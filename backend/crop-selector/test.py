# import joblib

# try:
#     loaded_model = joblib.load('./dev/crop_prediction_model.pkl')
#     print(f"Loaded model type: {type(loaded_model)}")
# except Exception as e:
#     print(f"Error loading model: {e}")

import joblib
import numpy as np

model = joblib.load('./dev/crop_prediction_model.pkl')
test_input = np.array([[85, 55, 40, 25.0, 80.0, 6.8, 250.0]])
prediction = model.predict(test_input)
print(f"Predicted crop: {prediction[0]}")