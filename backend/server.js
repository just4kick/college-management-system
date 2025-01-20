import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { Admin } from "./src/models/admin.models.js";
import { checkAuth, verifyEmail } from "./src/controllers/common.controller.js";
import { viewAllNotice } from "./src/controllers/admin.controller.js";
import ip from "ip";
// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import adminRouter from "./src/routes/admin.routes.js";
import facultyRouter from "./src/routes/faculty.routes.js";
import studentRouter from "./src/routes/student.routes.js";
import galleryRouter from "./src/routes/gallery.routes.js";

// Routes declaration
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/gallery", galleryRouter);

// Health Check Route
app.get("/health", async (req, res) => {
  const response = await fetch("http://172.19.0.3:5000/health", {
    method: "POST",
    // Add any necessary headers here, e.g., for authentication
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  res.status(200).json({
    status: "success",
    msg: data,
    message: "Server is healthy!",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// API Endpoints
app.get("/api/v1/check-auth", checkAuth);
app.get("/verify-email", verifyEmail);
app.get("/global-notice", viewAllNotice);

// Function to create a default admin if none exists
const createDefaultAdmin = async () => {
  const fullName = "akash";
  const email = "akashyadav15032002@gmail.com";
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      await Admin.create({
        fullName,
        email,
        phoneNumber: "9113702866",
        password: "admin123",
        role: "admin",
        avatar: "N/A",
        cameraImage: "N/A",
      });
      console.log(`Default admin created: ${email} / admin123`);
    } else {
      console.log("Default admin already exists.");
    }
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
};

// Connect to MongoDB and start the server
connectDB()
  .then(async () => {
    await createDefaultAdmin();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running at ${ip.address()} Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });
