from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import os
import json
import uuid

# Initialize Flask App
app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/generate-encoding', methods=['POST'])
def generate_encoding():
    """
    Generate face encoding for the uploaded image.
    """
    if 'image' not in request.files:
        return jsonify({'error': 'Image not provided'}), 400

    image = request.files['image']
    image_path = os.path.join(UPLOAD_FOLDER, f'{uuid.uuid4()}_face_image.jpg')  # Unique file name
    image.save(image_path)

    try:
        # Load the image and generate the face encoding
        loaded_image = face_recognition.load_image_file(image_path)
        face_encodings = face_recognition.face_encodings(loaded_image)

        if len(face_encodings) == 0:
            raise ValueError("No face detected in the uploaded image.")

        return jsonify({'faceEncoding': face_encodings[0].tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Clean up the file
        if os.path.exists(image_path):
            os.remove(image_path)

@app.route('/health',methods=['POST'])
def health():
    return jsonify({'msg': 'All is Well'}), 200

@app.route('/api/verify-encoding', methods=['POST'])
def verify_encoding():
    """
    Verify the face encoding for the uploaded image against a reference encoding.
    """
    if 'image' not in request.files or 'referenceEncoding' not in request.form:
        return jsonify({'error': 'Image or reference encoding not provided'}), 400

    image = request.files['image']
    reference_encoding_str = request.form.get('referenceEncoding')  # JSON string
    match_threshold = float(request.form.get('threshold', 0.7))  # Default threshold is 0.7

    # Deserialize reference encoding safely
    try:
        reference_encoding = json.loads(reference_encoding_str)
        if not isinstance(reference_encoding, list) or not all(isinstance(v, (float, int)) for v in reference_encoding):
            raise ValueError("Reference encoding must be a list of numbers")
    except (json.JSONDecodeError, ValueError) as e:
        return jsonify({'error': f'Invalid reference encoding format: {str(e)}'}), 400

    # Save the uploaded image temporarily
    image_path = os.path.join(UPLOAD_FOLDER, f'{uuid.uuid4()}_verify_face_image.jpg')
    try:
        image.save(image_path)

        # Get face encodings from the uploaded image
        uploaded_image = face_recognition.load_image_file(image_path)
        uploaded_encodings = face_recognition.face_encodings(uploaded_image)

        if len(uploaded_encodings) == 0:
            return jsonify({'error': 'No face found in the uploaded image'}), 400

        uploaded_encoding = uploaded_encodings[0]

        # Calculate the face distance
        distance = face_recognition.face_distance([reference_encoding], uploaded_encoding)[0]
        is_match = distance <= match_threshold

        # Ensure response types are JSON-serializable
        response = {
            'isMatch': bool(is_match),  # Explicitly cast to bool
            'distance': float(distance),  # Explicitly cast to float
        }

        return jsonify(response)

    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error: {str(e)}\n{error_trace}")  # Log full traceback for debugging
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

    finally:
        # Clean up the temporary file
        if os.path.exists(image_path):
            os.remove(image_path)


# Main Entry Point
if __name__ == '__main__':
    print("Server running at http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000)

