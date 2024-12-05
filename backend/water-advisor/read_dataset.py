import pandas as pd

# Load datasets
water_data = pd.read_csv('./datasets/agricultural_water_footprint.csv')

# Display column names and a preview of each dataset
print("Water Data Columns:")
print(water_data.columns)
print(water_data.head(), "\n")

"""
['Crop', 'Water Use (m³/kg)', 'Irrigation Type', 'Climate',
       'Yield (tons/ha)', 'Water-Saving Practices',
       'Water Pollution (Grey Water) (m³/kg)', 'Soil Type', 'Water Scarcity',
       'Post-Harvest Processing (Liters/kg)', 'Fertilizer Use (kg/ha)',
       'Pesticide Use (kg/ha)', 'Organic Practices', 'Green Water Use (m³/kg)',
       'Blue Water Use (m³/kg)', 'Crop Cycle Duration (days)',
       'Harvest Season', 'Temperature Requirement (°C)',
       'Rainfall Requirement (mm/year)', 'CO2 Emission (kg/ha)',
       'Land Use (ha/kg)', 'Crop Rotation Practices', 'Average Farm Size (ha)',
       'Processing Water Recycling', 'Local Market', 'Export Market',
       'Genetically Modified', 'Irrigation Efficiency (%)', 'Seed Use (kg/ha)',
       'Labor Intensity']
"""