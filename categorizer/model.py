from transformers import Trainer, TrainingArguments, DistilBertForSequenceClassification, DistilBertTokenizer
import pandas as pd
from sklearn.model_selection import train_test_split
from datasets import Dataset

# Load dataset
data = pd.read_csv("product_data.csv")
data['label'] = data['category'].astype('category').cat.codes  # Convert categories to numerical labels

# Split data into train and test sets
train_df, test_df = train_test_split(data, test_size=0.2, random_state=42)

# Load into Hugging Face Dataset format
train_dataset = Dataset.from_pandas(train_df)
test_dataset = Dataset.from_pandas(test_df)

# Initialize model and tokenizer
model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=len(data['label'].unique()))
tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")

def tokenize(batch):
    return tokenizer(batch['product_name'], padding=True, truncation=True)

train_dataset = train_dataset.map(tokenize, batched=True)
test_dataset = test_dataset.map(tokenize, batched=True)

train_dataset.set_format("torch", columns=["input_ids", "attention_mask", "label"])
test_dataset.set_format("torch", columns=["input_ids", "attention_mask", "label"])

# Training arguments
training_args = TrainingArguments(
    output_dir='./results',
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
)

# Train model
trainer.train()

# Save model
model.save_pretrained("fine_tuned_product_classifier")
tokenizer.save_pretrained("fine_tuned_product_classifier")
