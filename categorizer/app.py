# app.py
from flask import Flask, request, jsonify
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch

# Initialize Flask app
app = Flask(__name__)

# Load model and tokenizer
categories = ["Electronics", "Clothing", "Home", "Health", "Groceries", "Sports", "Bills", "Investments"]
tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=len(categories))

# Prediction function
def predict_category(product_name):
    inputs = tokenizer(product_name, return_tensors="pt", truncation=True, padding=True, max_length=64)
    outputs = model(**inputs)
    predicted_category = torch.argmax(outputs.logits, dim=1).item()
    return categories[predicted_category]

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
