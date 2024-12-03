import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { ApiError } from "../utils/ApiError.js";


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
    if (!fs.existsSync(imagePath)) {
        throw new ApiError(400, "Image file not found");
    }

    try {
        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));

        const response = await axios.post(FACE_ENCODING_URL, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        if (!response.data || !response.data.faceEncoding) {
            throw new ApiError(500, "No face encoding received from API");
        }

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

    if (!fs.existsSync(imagePath)) {
        throw new ApiError(400, "Image file not found");
    }

    if (!Array.isArray(referenceEncoding)) {
        throw new ApiError(400, "Invalid reference encoding format");
    }

    // Filter out non-serializable values
    const cleanedReferenceEncoding = referenceEncoding.filter(
        value => typeof value === "number" && !Number.isNaN(value)
    );

    try {
        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));
        formData.append("referenceEncoding", JSON.stringify(cleanedReferenceEncoding));
        formData.append("threshold", threshold);

        const response = await axios.post(FACE_VERIFY_URL, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        // Ensure expected response structure
        if (!response.data || typeof response.data.isMatch !== "boolean" || typeof response.data.distance !== "number") {
            throw new ApiError(500, "Unexpected API response format");
        }

        return {
            isMatch: response.data.isMatch,
            distance: response.data.distance,
        };
    } catch (error) {
        // Log the error details for debugging
        console.error("Error during face verification:", {
            message: error.message,
            responseData: error.response?.data,
            stack: error.stack,
        });

        // Include API-specific error or fallback to general message
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
        // console.log(isMatch)
        return isMatch;
    } catch (error) {
        console.error(`Error during face verification: ${error.message}`);
        return false; // Return false in case of errors
    }
};

export {
    generateFaceEncoding,
    verifyFaceEncoding,
    verifyAndRespond,
};
