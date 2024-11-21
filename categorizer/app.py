from flask import Flask, request, jsonify
from transformers import pipeline
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Define categories
categories = ["Electronics", "Clothing", "Home", "Health", "Groceries", "Sports", "Bills", "Investments"]

# Load your dataset
def load_dataset(filepath="product_data.csv"):
    try:
        df = pd.read_csv(filepath)
        return df
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return pd.DataFrame(columns=["product_name", "category"])

# Load dataset for reference (e.g., a labeled dataset of product names)
dataset = load_dataset()

# Initialize zero-shot classification pipeline
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Prediction function using zero-shot classification with dataset reference
def predict_category(product_name):
    # Find similar items in dataset for better context (optional step)
    similar_items = dataset[dataset["product_name"].str.contains(product_name.split()[0], case=False, na=False)]
    
    # Use zero-shot classifier for primary prediction
    result = classifier(product_name, candidate_labels=categories)
    
    # Display similar items (for optional inspection)
    print("Similar items in dataset:", similar_items)
    
    return result["labels"][0]  # Best-matching category

# API endpoint to categorize product
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    product_name = data.get('product_name')
    if not product_name:
        return jsonify({"error": "No product name provided"}), 400

    category = predict_category(product_name)
    return jsonify({"category": category})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
