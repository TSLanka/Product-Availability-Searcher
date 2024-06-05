import pandas as pd

# Load the data
df = pd.read_csv('Croma Store List.csv')

# Select only the necessary columns
df = df[['State', 'City', 'Pincode', 'Store Name']]

# Save the new data
df.to_csv('New Croma Store List.csv', index=False)