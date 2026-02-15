# Import necessary modules from Flask
from flask import Flask, request, jsonify
from flask_cors import CORS  # Allows the frontend (another URL) to access this backend

# Create the Flask application
app = Flask(__name__)

# Enable CORS so frontend hosted elsewhere can make requests
CORS(app)

# Define a route (endpoint) that listens to POST requests at /convert
@app.route('/convert', methods=['POST'])
def convert():
    # Get the JSON data sent by the frontend
    data = request.json
    try:
        # Convert the "number" field from JSON to an integer
        decimal_number = int(data['number'])
        # Convert the integer to a hexadecimal string
        hex_number = hex(decimal_number)
        # Send back a JSON response with the hex value
        return jsonify({'hex': hex_number})
    except (ValueError, KeyError):
        # Handle invalid input (non-integer or missing "number")
        # Return a JSON error message and HTTP status code 400
        return jsonify({'error': 'Invalid input'}), 400

# Run the Flask server if this file is executed directly
if __name__ == '__main__':
    # host='0.0.0.0' makes it accessible from Codespaces forwarded port
    # port=5000 is the port the frontend will call
    app.run(host='0.0.0.0', port=5000)