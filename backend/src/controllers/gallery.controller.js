import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addImages = asyncHandler(async (req, res) => {
    try {
        const { imageFor } = req.body;

        if (!imageFor) {
            throw new ApiError(400, "The 'imageFor' field is required.");
        }


        if (!req.files || req.files.length === 0) {
            throw new ApiError(400, "No images uploaded.");
        }


        const images = [];
        for (const file of req.files) {
            const uploadedImage = await uploadOnCloudinary(file.path); 
            if (uploadedImage) {
                images.push({
                    imageFor,
                    imageURL: uploadedImage.url,
                });
            }
        }

        const savedImages = await Gallery.insertMany(images);

        return res
            .status(200)
            .json(new ApiResponse(200, savedImages, "Images added successfully."));
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to add images.");
    }
});


const removeImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
       
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid image ID.");
        }

        // Find and delete 
        const removedImage = await Gallery.findByIdAndDelete(id);

        if (!removedImage) {
            throw new ApiError(404, "Image not found.");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, removedImage, "Image removed successfully."));
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to remove image.");
    }
});

const viewGlobalImage = asyncHandler(async(req,res)=>{
    const viewGlobalImage = asyncHandler(async (req, res) => {
        try {
            const globalImages = await Gallery.find({ imageFor: "global" });
    
            if (!globalImages || globalImages.length === 0) {
                throw new ApiError(404, "No global images found.");
            }
    
            return res
                .status(200)
                .json(new ApiResponse(200, globalImages, "Global images retrieved successfully."));
        } catch (error) {
            throw new ApiError(500, error.message || "Failed to fetch global images.");
        }
    });
    
})

const viewDeptImage = asyncHandler(async(req,res)=>{
    const viewDeptImage = asyncHandler(async (req, res) => {
        const { deptId } = req.params;
    
        try {
            if (!deptId) {
                throw new ApiError(400, "Department ID is required.");
            }
    
            // Fetch images for the given department ID
            const deptImages = await Gallery.find({ imageFor: deptId });
    
            if (!deptImages || deptImages.length === 0) {
                throw new ApiError(404, "No images found for this department.");
            }
    
            return res
                .status(200)
                .json(new ApiResponse(200, deptImages, "Department images retrieved successfully."));
        } catch (error) {
            throw new ApiError(500, error.message || "Failed to fetch department images.");
        }
    });
    
})
export{
    addImages,
    removeImage,
    viewGlobalImage,
    viewDeptImage,
}