const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const ApiError = require("../utils/ApiError");

// API URLs
const FACE_ENCODING_URL = "http://127.0.0.1:5000/api/generate-encoding";
const FACE_VERIFY_URL = "http://127.0.0.1:5000/api/verify-encoding";

/**
 * Generates a face encoding from an image.
 * @param {string} imagePath - The local file path to the image.
 * @returns {Promise<Object>} - Returns the face encoding object.
 * @throws {ApiError} - Throws an error if encoding fails.
 */
const generateFaceEncoding = async (imagePath) => {
    try {
        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));

        const response = await axios.post(FACE_ENCODING_URL, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        return response.data.faceEncoding; // Return the face encoding
    } catch (error) {
        throw new ApiError(500, `Face encoding failed: ${error.response?.data?.error || error.message}`);
    }
};

/**
 * Verifies a face using an image and a reference encoding.
 * @param {string} imagePath - The local file path to the image for verification.
 * @param {Object} referenceEncoding - The face encoding to compare against.
 * @param {number} threshold - The threshold for face matching.
 * @returns {Promise<Object>} - Returns an object containing `isMatch` and `distance`.
 * @throws {ApiError} - Throws an error if verification fails.
 */
const verifyFaceEncoding = async (imagePath, referenceEncoding, threshold = 0.7) => {
    try {
        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));
        formData.append("referenceEncoding", JSON.stringify(referenceEncoding));
        formData.append("threshold", threshold);

        const response = await axios.post(FACE_VERIFY_URL, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        return {
            isMatch: response.data.isMatch,
            distance: response.data.distance,
        }; // Return the match result and distance
    } catch (error) {
        throw new ApiError(500, `Face verification failed: ${error.response?.data?.error || error.message}`);
    }
};

/**
 * Verifies a face and returns a boolean result.
 * @param {string} imagePath - The image to verify.
 * @param {Object} referenceEncoding - The face encoding to compare against.
 * @param {number} threshold - The threshold for matching.
 * @returns {Promise<boolean>} - Returns true if faces match, false otherwise.
 */
const verifyAndRespond = async (imagePath, referenceEncoding, threshold = 0.7) => {
    try {
        const { isMatch } = await verifyFaceEncoding(imagePath, referenceEncoding, threshold);
        return isMatch; // Return true if match, false otherwise
    } catch (error) {
        console.error(`Error during face verification: ${error.message}`);
        return false; // Return false in case of errors
    }
};

module.exports = {
    generateFaceEncoding,
    verifyFaceEncoding,
    verifyAndRespond, 
};
