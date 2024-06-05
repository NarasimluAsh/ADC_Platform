import json
import pandas as pd
import numpy as np
import random

def load_json(file_path):
    """
    Load JSON data from a file.
    
    Args:
    file_path (str): Path to the JSON file.
    
    Returns:
    dict: Parsed JSON data.
    """
    with open(file_path, 'r') as file:
        return json.load(file)

def generate_synthetic_data(num_samples=50):
    """
    Generate synthetic student profile data.
    
    Args:
    num_samples (int): Number of student samples to generate. Default is 1000.
    
    Returns:
    DataFrame: Synthetic student profile data.
    """
    # Generate basic student details
    names = [f'Student_{i}' for i in range(num_samples)]
    ages = np.random.randint(5, 18, size=num_samples)
    grades = np.random.randint(1, 6, size=num_samples)
    disabilities = ['None', 'Autism', 'ADHD', 'Dyslexia', 'Hearing Impairment', 'Visual Impairment']
    student_disabilities = [random.choice(disabilities) for _ in range(num_samples)]

    # Generate weaknesses
    weaknesses = []
    possible_weaknesses = ['s', 'a', 't', 'n', 'i', 'p', 'c', 'k', 'c/k', 'e', 'h', 'r', 'm', 'd', 'g', 'o', 'u', 'l', 'f', 'b']
    for _ in range(num_samples):
        num_weaknesses = random.randint(1, 15)
        weakness_sample = random.sample(possible_weaknesses, num_weaknesses)
        weaknesses.append(weakness_sample)

    # Create DataFrame for student profile data
    student_data = {
        'name': names,
        'age': ages,
        'grade': grades,
        'disability': student_disabilities,
        'weaknesses': weaknesses
    }
    
    df = pd.DataFrame(student_data)
    return df

def save_data(df, file_name='student_profile.csv'):
    """
    Save the synthetic student profile data to a CSV file.
    
    Args:
    df (DataFrame): DataFrame containing the synthetic data.
    file_name (str): Name of the CSV file to save the data. Default is 'student_profile.csv'.
    """
    df.to_csv(file_name, index=False)

if __name__ == "__main__":
    # Generate synthetic data
    synthetic_data = generate_synthetic_data()
    
    # Save the synthetic data to a CSV file
    save_data(synthetic_data)
