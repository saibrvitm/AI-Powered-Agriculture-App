# Dataset Sources

### 1. **crop_yield_by_soil.csv**  
- **Source:** [Crop Yield and Environmental Factors (2014-2023)](https://www.kaggle.com/datasets/madhankumar789/crop-yield-and-environmental-factors-2014-2023)

### 2. **crop_yield_by_region.csv**  
- **Source:** [Crop Yield by Indian State](https://www.kaggle.com/datasets/akshatgupta7/crop-yield-in-indian-states-dataset)

### 3. **crop_yield_by_rainfall.csv**  
- **Source:** [Smart Agricultural Production Optimizing Engine](https://www.kaggle.com/datasets/chitrakumari25/smart-agricultural-production-optimizing-engine)

---

# Modifications

The datasets have been modified to retain the following columns:

| **Column Name**  | **Source**       | **Description**                                |
|-------------------|------------------|-----------------------------------------------|
| `N`              | Dataset 1, 3     | Nitrogen content of soil                      |
| `P`              | Dataset 1, 3     | Phosphorus content of soil                    |
| `K`              | Dataset 1, 3     | Potassium content of soil                     |
| `Temperature`    | Dataset 1, 3     | Temperature of the environment                |
| `Humidity`       | Dataset 1, 3     | Humidity level in the region                  |
| `Rainfall`       | Dataset 1        | Rainfall data                                 |
| `Soil_Type`      | Dataset 3        | Soil type classification                      |
| `Soil_pH`        | Dataset 3        | pH value of the soil                          |
| `Soil_Quality`   | Dataset 3        | Indicator of soil quality                     |
| `Crop_Type`      | Dataset 3        | Type of crop grown                            |
| `Crop_Yield`     | Dataset 3        | Yield of the crop                             |
| `Area`           | Dataset 2        | Region or area information                    |
| `Year`           | Dataset 2        | Year of the recorded data                     |
| `Date`           | Dataset 2, 3     | Specific date for the recorded data           |

---

### **Next Steps**
- **Data Merging:** Combine datasets on compatible columns like `Date`, `Area`, or other common identifiers.
- **Standardization:** Ensure consistency in units (e.g., temperature, pH) across datasets.
- **Data Cleaning:** Handle missing or incomplete values using imputation or exclusion methods.

