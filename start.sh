#!/bin/bash

# Universal File Converter - Quick Start Script
# This script helps you run the application easily

echo "🚀 Universal File Converter - Quick Start"
echo "=========================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Python and Node.js are installed!"
echo ""

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -q -r requirements.txt

# Create necessary directories
mkdir -p uploads outputs

echo "✅ Backend setup complete!"
echo ""

# Frontend setup
echo "📦 Setting up frontend..."
cd ../frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
fi

echo "✅ Frontend setup complete!"
echo ""

# Start both services
echo "🎉 Starting the application..."
echo ""
echo "Backend will run on: http://localhost:8000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Start backend in background
cd ../backend
source venv/bin/activate
uvicorn main:app --reload &
BACKEND_PID=$!

# Start frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait for user to stop
wait

# Cleanup on exit
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
