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

2. **ML Models Setup:**
   - Go to the `backend` folder, and choose any folder inside it. Here reside the ML Models and their datasets
   - Run the `make_model.py` script for any of the models to create it.

3. **Install FastAPI and run the backend server:**
   - Inside the `backend` folder, install the necessary dependencies:
     ```bash
     pip install -r requirements.txt
     pip install "fastapi[standard]"
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

---

## Technologies Used ⚙️

- **Backend:** Python, FastAPI, Machine Learning
- **Frontend:** React, JavaScript, CSS
- **AI/ML:** Scikit-learn
- **Other Libraries:** Axios (for API requests)

## Sources

Dataset sources can be found under `docs.md` file under each folder of `backend`.

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