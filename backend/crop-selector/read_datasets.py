import pandas as pd

# Load datasets
rainfall_data = pd.read_csv('./datasets/crop_yield_by_rainfall.csv')
region_data = pd.read_csv('./datasets/crop_yield_by_region.csv')
soil_data = pd.read_csv('./datasets/crop_yield_by_soil.csv')

# Display column names and a preview of each dataset
print("Rainfall Data Columns:")
print(rainfall_data.columns)
print(rainfall_data.head(), "\n")

print("Region Data Columns:")
print(region_data.columns)
print(region_data.head(), "\n")

print("Soil Data Columns:")
print(soil_data.columns)
print(soil_data.head(), "\n")

# Check for overlapping or compatible columns
common_columns = set(rainfall_data.columns) & set(region_data.columns) & set(soil_data.columns)
print("Common Columns Across All Datasets:")
print(common_columns)
