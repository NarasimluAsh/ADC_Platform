# Imports
import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd

# Initialize the Firebase Admin SDK
cred = credentials.Certificate("C:\Users\ashle\Desktop\University\Dissertation\Project\language-learning-databa-ad724-firebase-adminsdk-3alch-96dc16a2a8.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

def fetch_data():
    ieps_ref = db.collection('IEPs')
    docs = ieps_ref.stream()
    
    data = []
    for doc in docs:
        data.append(doc.to_dict())
    
    return data

def save_data(data, file_name='ieps_data.csv'):
    df = pd.DataFrame(data)
    df.to_csv(file_name, index=False)

if __name__ == "__main__":
    data = fetch_data()
    save_data(data)
