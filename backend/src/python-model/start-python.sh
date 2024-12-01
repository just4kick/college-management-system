#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Updating package lists..."
sudo apt update

echo "Installing Python..."
sudo apt install -y python3 python3-venv python3-pip

echo "Setting up Python virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Virtual environment created in python-model directory."
else
    echo "Virtual environment already exists."
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing required build tools and dependencies inside the virtual environment..."
# Ensure pip is updated
pip install --upgrade pip

# System-wide dependencies needed for some Python packages (like dlib)
sudo apt-get install -y build-essential cmake libopenblas-dev liblapack-dev libx11-dev libgtk-3-dev

# Activate the virtual environment
source venv/bin/activate

# Install Python dependencies
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    echo "Python dependencies installed."
else
    echo "requirements.txt not found. Skipping Python dependency installation."
fi

echo "Environment setup completed. The virtual environment is active."
echo "To activate the virtual environment later, run: source venv/bin/activate"

