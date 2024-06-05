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

def generate_synthetic_data(course_structure, questions, num_samples=1000, accuracy_threshold=0.6):
    """
    Generate synthetic student performance data.
    
    Args:
    course_structure (dict): Course structure data.
    questions (dict): Questions data.
    num_samples (int): Number of student samples to generate. Default is 1000.
    accuracy_threshold (float): Threshold for accuracy to label a part as a weakness. Default is 0.6.
    
    Returns:
    DataFrame: Synthetic student performance data.
    """
    # Generate basic student details
    names = [f'Student_{i}' for i in range(num_samples)]
    ages = np.random.randint(5, 18, size=num_samples)
    grades = np.random.randint(1, 12, size=num_samples)
    disabilities = ['None', 'Autism', 'ADHD', 'Dyslexia', 'Hearing Impairment', 'Visual Impairment']
    student_disabilities = [random.choice(disabilities) for _ in range(num_samples)]

    performance_data = []
    
    # Generate performance data for each student
    for name, age, grade, disability in zip(names, ages, grades, student_disabilities):
        student_data = {
            'name': name,
            'age': age,
            'grade': grade,
            'disability': disability,
        }
        
        # Simulate performance data for each part of the course
        for topic in course_structure['topics']:
            for part in topic['parts']:
                accuracy = np.random.rand()  # Random accuracy between 0 and 1
                time = np.random.uniform(1, 5)  # Random time between 1 and 5 minutes
                attempts = np.random.randint(1, 10)  # Random number of attempts between 1 and 10
                part_key = f"{part['part_id']}"
                student_data[f"{part_key}_accuracy"] = accuracy
                student_data[f"{part_key}_time"] = time
                student_data[f"{part_key}_attempts"] = attempts
                student_data[f"{part_key}_weakness"] = int(accuracy < accuracy_threshold)  # Label weakness
        
        # Simulate performance data for each question in each set
        for set in questions['sets']:
            for question in set['questions']:
                mean_time = question['mean_time']
                actual_time = np.random.normal(mean_time, mean_time * 0.1)  # Random time based on mean_time
                accuracy = np.random.rand()  # Random accuracy between 0 and 1
                question_key = f"{set['set_id']}_{question['word']}"
                student_data[f"{question_key}_accuracy"] = accuracy
                student_data[f"{question_key}_time"] = actual_time
        
        performance_data.append(student_data)
    
    # Convert the performance data into a pandas DataFrame
    df = pd.DataFrame(performance_data)
    return df

def save_data(df, file_name='synthetic_student_performance.csv'):
    """
    Save the synthetic student performance data to a CSV file.
    
    Args:
    df (DataFrame): DataFrame containing the synthetic data.
    file_name (str): Name of the CSV file to save the data. Default is 'synthetic_student_performance.csv'.
    """
    df.to_csv(file_name, index=False)

if __name__ == "__main__":
    # Load course structure and questions data
    course_structure = load_json('course_structure.json')
    questions = load_json('questions.json')
    
    # Generate synthetic data
    synthetic_data = generate_synthetic_data(course_structure, questions)
    
    # Save the synthetic data to a CSV file
    save_data(synthetic_data)
