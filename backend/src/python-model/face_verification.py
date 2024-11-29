from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import os

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
    image_path = os.path.join(UPLOAD_FOLDER, 'face_image.jpg')
    image.save(image_path)

    try:
        # Load the image and generate the face encoding
        loaded_image = face_recognition.load_image_file(image_path)
        face_encodings = face_recognition.face_encodings(loaded_image)

        # Check if a face was detected
        if len(face_encodings) == 0:
            raise ValueError("No face detected in the uploaded image.")

        # Return the first face encoding
        return jsonify({'faceEncoding': face_encodings[0].tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Clean up the file
        if os.path.exists(image_path):
            os.remove(image_path)


@app.route('/api/verify-encoding', methods=['POST'])
def verify_encoding():
    """
    Verify the face encoding for the uploaded image against a reference encoding.
    """
    if 'image' not in request.files or 'referenceEncoding' not in request.form:
        return jsonify({'error': 'Image or reference encoding not provided'}), 400

    image = request.files['image']
    reference_encoding = request.form.get('referenceEncoding')  # Should be a JSON string
    match_threshold = float(request.form.get('threshold', 0.7))  # Default threshold is 0.7

    image_path = os.path.join(UPLOAD_FOLDER, 'verify_face_image.jpg')
    image.save(image_path)

    try:
        # Get face encodings from the uploaded image
        uploaded_image = face_recognition.load_image_file(image_path)
        uploaded_encodings = face_recognition.face_encodings(uploaded_image)

        if len(uploaded_encodings) == 0:
            return jsonify({'error': 'No face found in the uploaded image'}), 400

        uploaded_encoding = uploaded_encodings[0]

        # Convert reference encoding from JSON string to list
        reference_encoding = eval(reference_encoding)

        # Calculate the face distance
        distance = face_recognition.face_distance([reference_encoding], uploaded_encoding)[0]
        is_match = distance <= match_threshold

        # Wrap the boolean and float in a JSON-serializable structure
        return jsonify({'isMatch': bool(is_match), 'distance': float(distance)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Clean up the file
        if os.path.exists(image_path):
            os.remove(image_path)



# Main Entry Point
if __name__ == '__main__':
    print("Server running at http://127.0.0.1:5000")
    app.run(debug=True)
