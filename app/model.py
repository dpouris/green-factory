import argparse
import json
import os
import pickle
import numpy as np
from sklearn.linear_model import LinearRegression

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
# Define argument parser
parser = argparse.ArgumentParser(
    description="Linear Regression model training, dumping, and prediction"
)
parser.add_argument(
    "operation", type=str, help="Operation to be performed: train, or repl"
)
parser.add_argument(
    "--file",
    type=str,
    help="Name of the JSON file containing training data, use with train",
)
parser.add_argument(
    "--load",
    type=str,
    nargs="?",
    default=None,
    const="model_0.sav",
    help="Load pre-trained model (default: model_0.sav)",
)

# Parse arguments
args = parser.parse_args()

# Check operation validity
if args.operation not in ["train", "repl"]:
    print("Invalid operation")
    exit()

# Set default model file name
model_filename = "model_0.sav"

if args.operation == "train":
    if args.load:
        # Load default model if no model is loaded
        model_path = os.path.join(os.getcwd(), args.load)
        try:
            model = pickle.load(open(model_path, "rb"))
            print("Model loaded from", model_path)
        except:
            print("Model not found")

    if not args.file:
        print("Missing JSON file name")
        exit()

    # Load JSON data
    try:
        with open(args.file) as f:
            data = json.load(f)
    except:
        print("Invalid JSON file")
        exit()

    # Check if model_path already exists or if model is loaded
    try:
        model
    except NameError:
        model_path = os.path.join(FILE_DIR, model_filename)
        if os.path.exists(model_path):
            # Load existing model
            model: LinearRegression = pickle.load(open(model_path, "rb"))
        else:
            # Create linear regression model
            model = LinearRegression()

    for io in data:
        X = np.array(io["input"])
        y = np.array(io["output"])
        # Train model
        model.fit(X, y)

    print("Model training complete")

    # Save the trained model to the same directory as the input file
    model_path = os.path.join(FILE_DIR, model_filename)
    pickle.dump(model, open(model_path, "wb"))
    print("Model saved to", model_path)

# Repl operation
elif args.operation == "repl":
    # Check if loaded model exists
    if args.load:
        # Load default model if no model is loaded
        model_path = os.path.join(os.getcwd(), args.load)
    else:
        # Load default model if no model is loaded
        model_path = os.path.join(FILE_DIR, model_filename)

    try:
        loaded_model = pickle.load(open(model_path, "rb"))
        print("Model loaded from", model_path)
    except:
        print("Model not found")

    while True:
        command = input("Enter command (predict, load, dump, exit): ")
        command = command.lower().strip()
        if command == "predict":
            try:
                loaded_model
            except:
                print("Model not found")
                continue
            while True:
                input_str = input(
                    'Enter input value(s) for prediction (separated by spaces) [type "q" to go back]: '
                )
                if input_str == "q":
                    break

                input_list = input_str.split()
                try:
                    # Convert input to float array
                    input_arr = np.array([float(x) for x in input_list]).reshape(1, -1)
                    # Use loaded model to predict output
                    output = loaded_model.predict(input_arr)
                    print("Predicted output:", output)
                except:
                    print("Invalid input")
        elif command == "load":
            model_path = input("Enter model file name: ")
            try:
                loaded_model = pickle.load(open(model_path, "rb"))
                print("Model loaded from", model_path)
            except:
                print("Invalid model file")
        elif command == "dump":
            # Save the loaded model to the same directory as the input file
            model_path = os.path.join(FILE_DIR, model_filename)
            try:
                pickle.dump(loaded_model, open(model_path, "wb"))
            except:
                print("Unable to save model to file")
                exit()

            print("Model dumped to", model_path)
        elif command == "exit":
            print("Exiting...")
            break
        else:
            print("Invalid command")
