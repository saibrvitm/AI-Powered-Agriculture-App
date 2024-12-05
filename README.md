# AI-Powered Agriculture App 🌾🤖

This repository hosts the code for an **AI-Powered Agriculture Application** that utilizes artificial intelligence and machine learning to help farmers optimize crop productivity, monitor soil health, and make informed decisions about agricultural practices.

## Features ✨
- **Crop Selection Tool**: Recommends the best crops based on soil type, weather conditions, and location, helping farmers make informed planting decisions.
- **Farmer Calendar Tool**: Provides a personalized planting and harvesting calendar, optimizing crop schedules based on climate patterns and local conditions.
- **Water Usage Analyzer**: Analyzes water usage patterns for crops, offering insights and recommendations on efficient irrigation practices to conserve water.
- **Climate Advisor**: Delivers tailored climate insights and forecasts to help farmers plan and adapt to weather conditions, ensuring better crop yield and resource management.

---

## Table of Contents 📖
1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [Contributing](#contributing)
5. [License](#license)

---

## Installation 🔧

To set up the project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saibrvitm/AI-Powered-Agriculture-App.git
   cd AI-Powered-Agriculture-App
   ```

2. **Backend Setup:**
   - Go to the `dev` folder inside the `crop-selector` directory.
   - Run the `suggest_crop.py` script.
   - Ensure that the output .pkl file is stored in the `crop-selector` directory

3. **Install FastAPI and run the backend server:**
   - Inside the `dev` folder, install the necessary dependencies:
     ```bash
     pip install fastapi
     ```
   - Start the FastAPI server by running the following:
     ```bash
     fastapi dev server.py
     ```
   - This will start the backend server that handles crop suggestions.

4. **Frontend Setup:**
   - Navigate to the `frontend/frontend` folder:
     ```bash
     cd frontend/frontend
     ```
   - Install the required frontend dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```
   - The application will be available on `http://localhost:3000`.

---

## Usage 📈

Once the backend and frontend servers are running:

1. Open your browser and visit `http://localhost:3000` to access the user interface.
2. Input your crop-related data (such as soil information, weather conditions, etc.) to receive personalized crop recommendations.
3. You can also analyze plant health, get fertilizer suggestions, and access weather insights tailored to agricultural needs.

---

## Technologies Used ⚙️

- **Backend:** Python, FastAPI, Machine Learning
- **Frontend:** React, JavaScript, CSS
- **AI/ML:** TensorFlow, OpenCV, Scikit-learn
- **Other Libraries:** Axios (for API requests)

## Sources

Dataset sources can be found under `backend/crop-selector/dev/docs.md`

---

## Contributing 🤝

We welcome contributions to improve the AI-Powered Agriculture App. If you have an idea or fix, feel free to open an issue or create a pull request. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request with a description of the changes.

---

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---