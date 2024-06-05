import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder

def load_data(file_name='ieps_data.csv'):
    return pd.read_csv(file_name)

def preprocess_data(df):
    # Handle missing values
    df.fillna(method='ffill', inplace=True)

    # Encode categorical variables
    label_encoders = {}
    for column in df.select_dtypes(include=['object']).columns:
        label_encoders[column] = LabelEncoder()
        df[column] = label_encoders[column].fit_transform(df[column])

    # Normalize numerical features
    scaler = StandardScaler()
    numerical_columns = df.select_dtypes(include=['float64', 'int64']).columns
    df[numerical_columns] = scaler.fit_transform(df[numerical_columns])
    
    return df, label_encoders, scaler

def save_preprocessed_data(df, file_name='preprocessed_ieps_data.csv'):
    df.to_csv(file_name, index=False)

if __name__ == "__main__":
    df = load_data()
    df, label_encoders, scaler = preprocess_data(df)
    save_preprocessed_data(df)
