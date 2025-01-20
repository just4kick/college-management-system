# College Management System

NOTE: This forked repository contains the implementation of Docker containers and Docker Compose.

Curious about Docker containers and Docker Compose? 

### Docker container
Think of Docker containers as magic boxes that package everything your application needs to run—code, libraries, and dependencies—into a neat, portable bundle. They’re lightweight, fast, and ensure your app works seamlessly across different environments, from your laptop to a production server.

### Docker Compose
Now, imagine you have multiple containers (like a frontend, backend, and database) that need to work together. That’s where Docker Compose comes in! With a simple docker-compose.yml file, you can define, configure, and orchestrate all these containers effortlessly. One command, and voilà—your entire application ecosystem springs to life!

To start the project, just run:

```
sudo docker compose up -d
```
And to stop it, use:

```
sudo docker compose down
```

How cool is that? With just one command, you can start and stop the entire stack—frontend, backend, and face-recognition services—all in a snap! It's that easy and efficient!

* The .env file in this repository does not contain any sensitive information for me, but it's not recommended to push it to the repository.

#


## Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://cms-frontend-nine-gamma.vercel.app/)   --- Click Here to see the live Demo of the Frontend

Welcome to the College Management System! This project is designed to manage various administrative and academic functions of a college. Below are the detailed instructions to set up and run the project.

## Features

### User Authentication
- Login Request
- OTP Verification
- Face Recognition Login
- Password Management

### User Management
- Self Register Student
- Update Personal Details
- View User Details
- Update Face Data

### Department Management
- Create Department
- View Departments
- Update Department
- Delete Department
- Assign/Revoke HOD

### Course Management
- Add Course
- Update Course
- Delete Course

### Notice Management
- Add Notice
- Remove Notice
- View Notices

### Gallery Management
- Add Images
- Remove Images
- View Global Images
- View Department Images

### Face Verification
- Generate Face Encoding
- Verify Face Encoding

### Registration Key Management (Admin only)
- Generate Registration Key
- View Registration Key
- Revoke Registration Key
- Grant Registration Key
- Add Registration Key
- Remove Registration Key

## Prerequisites

### For Windows
1. **Python**: Install Python 3.7 or above from [Python Official Site](https://www.python.org/downloads/).  
   - During installation, make sure to check the option **Add Python to PATH**.
   - To verify installation, open a terminal (Command Prompt or PowerShell) and run:
     ```bash
     python --version
     ```
     If Python is installed correctly, it will display the version.

2. **Visual Studio**:  
   - Install [Visual Studio Community Edition](https://visualstudio.microsoft.com/visual-studio/).
   - During installation, **select the Desktop development with C++ workload**.
   - This step is required for building dependencies like `dlib`.

3. **CMake**:  
   - Download [CMake](https://cmake.org/download/).
   - During installation, choose the option **Add CMake to PATH**.
   - To confirm installation, run:
     ```bash
     cmake --version
     ```
     If installed correctly, it will display the version.

### For Linux
1. Install Python and development tools using the following commands:
   ```bash
   sudo apt update
   sudo apt install -y python3 python3-venv python3-pip
   ```

2. Install required build tools:
   ```bash
   sudo apt-get install -y build-essential cmake libopenblas-dev liblapack-dev libx11-dev libgtk-3-dev
   ```
   - **If you encounter errors while installing `dlib`**, ensure that these tools are installed correctly.

## Setup Instructions

### Step 1: Clone the Repository
- Use Git to clone this repository:
  ```bash
  git clone <repository_url>
  cd <repository_name>
  ```

### Step 2: Install Dependencies
- Run `npm i` in both the 

frontend

 and 

backend

 folders:
  ```bash
  cd frontend
  npm i
  cd ../backend
  npm i
  ```

### Step 3: Create Necessary Folders
- Create a `public` folder in the 

backend

 folder, and then create a `temp` folder inside the `public` folder:
  ```bash
  mkdir -p backend/public/temp
  ```

### Step 4: Create .env Files
- Create a `.env` file in both the 

frontend

 and 

backend

 folders and copy the contents of `frontENV.txt` to the frontend `.env` and the contents of `backENV.txt` to the backend `.env`.

### Step 5: Run the Servers

#### Python Server
1. Navigate to the `python-model` directory:
   ```bash
   cd backend/src/python-model
   ```
2. Activate the virtual environment:
   ```bash
   source venv/Scripts/activate
   ```
3. Run the face verification script:
   ```bash
   python face_verification.py
   ```

#### Backend Server
1. Navigate to the 

backend

 directory:
   ```bash
   cd backend
   ```
2. Start the backend server:
   ```bash
   npm run dev
   ```

#### Frontend Server
1. Navigate to the 

frontend

 directory:
   ```bash
   cd frontend
   ```
2. Start the frontend server:
   ```bash
   npm run dev
   ```

## Docker Installation

If you prefer to use Docker for setting up the face recognition model, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t face_recognition_model -f backend/src/Dockerfile .
   ```

2. Run the Docker container:
   ```bash
   docker run -d -p 5000:5000 face_recognition_model
   ```

This will set up the face recognition model without worrying about dependencies.

## Access the Frontend

You can access the frontend of the project by visiting the following link:
[College Management System Frontend](https://cms-frontend-nine-gamma.vercel.app/)

## API Endpoints

### 1. **Generate Face Encoding**
- **Endpoint**: `/api/generate-encoding`
- **Method**: `POST`
- **Description**: Uploads an image and returns the face encoding.

#### Example Request:
```bash
curl -X POST -F "image=@/path/to/image.jpg" http://127.0.0.1:5000/api/generate-encoding
```

#### Example Response:
```json
{
  "faceEncoding": [0.12345, 0.67890, ...]
}
```

### 2. **Verify Face Encoding**
- **Endpoint**: `/api/verify-encoding`
- **Method**: `POST`
- **Description**: Compares the uploaded image with a reference encoding.

#### Example Request:
```bash
curl -X POST -F "image=@/path/to/image.jpg" -F "referenceEncoding=[0.12345, 0.67890, ...]" -F "threshold=0.6" http://127.0.0.1:5000/api/verify-encoding
```

#### Example Response:
```json
{
  "isMatch": true,
  "distance": 0.4567
}
```

## Common Issues and Solutions

1. **Error: Python not recognized**:
   - Ensure Python is installed and added to the system PATH.
   - Restart the terminal after installation.

2. **Error: Failed to build `dlib`**:
   - On Windows:
     - Verify that Visual Studio with the Desktop Development with C++ workload is installed.
   - On Linux:
     - Run the command to install build tools:
       ```bash
       sudo apt-get install -y build-essential cmake libopenblas-dev liblapack-dev libx11-dev libgtk-3-dev
       ```

3. **Error: Flask App Not Starting**:
   - Ensure all dependencies are installed.
   - Activate the virtual environment before running the app.

4. **Debugging Flask**:
   - To enable detailed error logs, run:
     ```bash
     python app.py --debug
     ```

## Contribution

Feel free to raise issues or submit pull requests for improvements or fixes.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

---

Enjoy using the College Management System! 🎓📚✨

---

This README file includes all the necessary instructions, features, and installation steps for your project. It also provides guidance on how to use the frontend and backend individually, as well as how to set up Docker.
