import pandas as pd

# Load the datasets
rainfall_data = pd.read_csv('./datasets/crop_yield_by_rainfall.csv')
region_data = pd.read_csv('./datasets/crop_yield_by_region.csv')
soil_data = pd.read_csv('./datasets/crop_yield_by_soil.csv')

# Step 1: Standardize column names for merging
region_data.rename(columns={'Crop_Year': 'Year', 'Crop': 'label'}, inplace=True)
soil_data.rename(columns={
    'Crop_Type': 'label', 'Soil_Type': 'soil_type', 'Soil_pH': 'ph',
    'Temperature': 'temperature', 'Humidity': 'humidity'
}, inplace=True)

# Extract Year from soil data's 'Date'
soil_data['Year'] = pd.to_datetime(soil_data['Date']).dt.year
soil_data.drop(columns=['Date'], inplace=True)

# Align crop names
rainfall_data['label'] = rainfall_data['label'].str.strip().str.lower()
region_data['label'] = region_data['label'].str.strip().str.lower()
soil_data['label'] = soil_data['label'].str.strip().str.lower()

# Step 2: Select columns to retain
# Retain only necessary columns
rainfall_data = rainfall_data[['label', 'N', 'P', 'K', 'temperature', 'humidity', 'ph']]
region_data = region_data[['label', 'Year', 'Season', 'State', 'Area', 'Production', 'Yield']]
soil_data = soil_data[['label', 'Year', 'soil_type', 'ph']]

# Step 3: Merge datasets
# Merge rainfall data and region data on 'label' and 'Year'
merged_data = pd.merge(region_data, rainfall_data, on='label', how='left')

# Merge soil data to the existing merged dataset on 'label' and 'Year'
final_dataset = pd.merge(merged_data, soil_data, on=['label', 'Year'], how='left')

# Step 4: Handle missing data
final_dataset['ph'] = final_dataset['ph_x'].combine_first(final_dataset['ph_y'])
final_dataset.drop(columns=['ph_x', 'ph_y'], inplace=True)

# Step 5: Save and display the final dataset
final_dataset.to_csv('super_dataset_detailed.csv', index=False)
print("Final dataset saved as 'super_dataset_detailed.csv'.")
