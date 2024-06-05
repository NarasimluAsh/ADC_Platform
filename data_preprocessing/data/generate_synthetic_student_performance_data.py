import json
import pandas as pd
import numpy as np
import random

def load_json(file_path):
    # Load JSON data from a file.
    with open(file_path, 'r') as file:
        return json.load(file)

def generate_student_performance_data(student_profile_file, questions_file, num_iterations=10, num_questions=10):
    """
    Generate synthetic student performance data.
    
    Args:
    - student_profile_file (str): Path to the CSV file containing student profiles.
    - questions_file (str): Path to the JSON file containing questions.
    - num_iterations (int): Number of iterations to generate data for.
    - num_questions (int): Number of questions to select for each student.
    
    Returns:
    DataFrame: Synthetic student performance data.
    """
    # Load student profile data
    student_df = pd.read_csv(student_profile_file)
    
    # Load questions data
    questions_data = load_json(questions_file)['questions']
    
    # Create performance data dictionary
    performance_data = {
        'data_id': [],
        'student_ref': [],
        'student_weakness': []
    }

    for i in range(1, num_questions + 1):
        performance_data[f'ques{i}_ref'] = []
        performance_data[f'ques{i}_time_taken'] = []
        performance_data[f'ques{i}_correctness'] = []
        performance_data[f'ques{i}_previous_weaknesses'] = []
        performance_data[f'ques{i}_possible_weaknesses'] = []

    # Generate performance data for each student across multiple iterations
    for iteration in range(num_iterations):
        # Randomly select questions for each iteration
        selected_questions = random.sample(questions_data, num_questions)
        
        for index, student_row in student_df.iterrows():
            student_name = student_row['name']
            student_weaknesses = eval(student_row['weaknesses'])
            
            # Generate data_id
            data_id = f"{student_name}_{iteration}"
            
            performance_data['data_id'].append(data_id)
            performance_data['student_ref'].append(student_name)

            # Initialize previous weaknesses and combined weaknesses for the student
            previous_weaknesses = []
            combined_weaknesses = []
            
            # Generate performance data for each selected question
            for ques_num, question in enumerate(selected_questions, start=1):
                ques_id = question['ques_id']
                ques_tags = question['tags']
                ques_word = question['word']
                
                # Simulate time taken (between 4000ms and 120000ms)
                time_taken = random.randint(4000, 120000)
                
                # Check correctness based on weaknesses
                correct = all(weakness not in ques_word for weakness in student_weaknesses)
                
                # Identify possible weaknesses
                if correct:
                    possible_weaknesses = []
                else:
                    possible_weaknesses = [tag for tag in ques_tags if tag not in student_weaknesses]
                    combined_weaknesses.extend(possible_weaknesses)

                # Update previous weaknesses based on correctness of previous question
                if ques_num > 1:
                    if performance_data[f'ques{ques_num - 1}_possible_weaknesses'][-1]:
                        # Loop through the weakness list and add to previous_weaknesses if not already present
                        for weakness in performance_data[f'ques{ques_num - 1}_possible_weaknesses'][-1]:
                            if weakness not in previous_weaknesses:
                                previous_weaknesses.append(weakness)
                
                performance_data[f'ques{ques_num}_ref'].append(ques_id)
                performance_data[f'ques{ques_num}_time_taken'].append(time_taken)
                performance_data[f'ques{ques_num}_correctness'].append(correct)
                performance_data[f'ques{ques_num}_previous_weaknesses'].append(previous_weaknesses.copy())
                performance_data[f'ques{ques_num}_possible_weaknesses'].append(possible_weaknesses)

            # All the weaknesses identified
            performance_data['student_weakness'].append(list(set(combined_weaknesses)))
    
    # Convert performance data dictionary to DataFrame
    performance_df = pd.DataFrame(performance_data)
    
    return performance_df

def save_data(df, file_name='synthetic_student_performance_data.csv'):
    """
    Save the synthetic student performance data to a CSV file.
    
    Args:
    df (DataFrame): DataFrame containing the synthetic data.
    file_name (str): Name of the CSV file to save the data. Default is 'synthetic_student_performance_data.csv'.
    """
    df.to_csv(file_name, index=False)

if __name__ == "__main__":
    student_profile_file = 'student_profile.csv'
    questions_file = 'questions.json'
    
    # Generate synthetic student performance data
    synthetic_performance_data = generate_student_performance_data(student_profile_file, questions_file)
    
    # Save the synthetic data to a CSV file
    save_data(synthetic_performance_data)