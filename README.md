# Universal File Converter

A modern, full-stack web application that converts files between multiple formats instantly. Built with Next.js and FastAPI.

![Universal File Converter](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688)
![Python](https://img.shields.io/badge/Python-3.11-blue)

## ✨ Features

- 🚀 **Lightning Fast** - Convert files in seconds
- 🔒 **Secure & Private** - Files auto-delete after 1 hour
- 🎨 **Modern UI** - Beautiful glassmorphism design with smooth animations
- 📁 **7+ Formats** - Support for PDF, DOCX, PPTX, TXT, PNG, JPG, WEBP, HTML
- 🖱️ **Drag & Drop** - Easy file uploading
- 📱 **Responsive** - Works on all devices
- 🐳 **Docker Ready** - One-command deployment


## 🚀 One-Click Deployment

Deploy your own copy of Universal File Converter to Railway with just one click. This will automatically set up the backend and frontend services.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/Jawad-king2000/convertwebapp&envs=BACKEND_CORS_ORIGINS&envs=NEXT_PUBLIC_API_URL)

## 📋 Supported Conversions

### Input Formats
- **PDF** → PNG, JPG, WEBP, TXT, HTML, DOCX
- **DOCX** → PDF, TXT, HTML, PNG, JPG
- **PPTX** → PDF, PNG, JPG
- **TXT** → PDF, DOCX, HTML
- **PNG** → TXT (OCR), PDF, JPG, WEBP
- **JPG** → TXT (OCR), PDF, PNG, WEBP
- **WEBP** → PNG, JPG, TXT (OCR), PDF

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

### Backend
- **FastAPI** - High-performance Python API
- **Python 3.11** - Modern Python
- **Pillow** - Image processing
- **pdf2image** - PDF to image conversion
- **pdfplumber** - PDF text extraction
- **pdf2docx** - PDF to DOCX conversion
- **python-docx** - DOCX manipulation
- **pytesseract** - OCR (Optical Character Recognition)
- **pdfkit** - HTML to PDF conversion

## 🚀 Quick Start (Local Development)

### Prerequisites
You need to have these installed on your computer:
- **Node.js** (version 18 or higher) - [Download](https://nodejs.org/)
- **Python** (version 3.11 or higher) - [Download](https://www.python.org/)
- **Tesseract OCR** (for image-to-text conversion) - [Installation Guide](#installing-tesseract)

### Installing Tesseract

**On Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr
```

**On macOS:**
```bash
brew install tesseract
```

**On Windows:**
Download installer from [GitHub](https://github.com/UB-Mannheim/tesseract/wiki) and add to PATH.

### Step 1: Clone the Repository
```bash
cd /home/jawad/Documents/convertwebapp
```

### Step 2: Set Up Backend

```bash
# Go to backend folder
cd backend

# Create a virtual environment (this keeps dependencies isolated)
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install all required Python packages
pip install -r requirements.txt
```

### Step 3: Set Up Frontend

Open a **NEW terminal window** and run:

```bash
# Go to frontend folder
cd /home/jawad/Documents/convertwebapp/frontend

# Install all required Node.js packages
npm install
```

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd /home/jawad/Documents/convertwebapp/backend
source venv/bin/activate  # Activate virtual environment
uvicorn main:app --reload
```

You should see: `Uvicorn running on http://127.0.0.1:8000`

**Terminal 2 - Start Frontend:**
```bash
cd /home/jawad/Documents/convertwebapp/frontend
npm run dev
```

You should see: `Local: http://localhost:3000`

### Step 5: Use the Application

1. Open your web browser
2. Go to: `http://localhost:3000`
3. You should see the Universal File Converter!
4. Drag and drop a file or click to upload
5. Select the output format you want
6. Click "Convert" and download your file!

## 🐳 Docker Deployment (Easiest Way)

If you have **Docker** and **Docker Compose** installed, you can run everything with one command!

### Install Docker

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

**macOS/Windows:**
Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)

### Run with Docker

```bash
# Go to project folder
cd /home/jawad/Documents/convertwebapp

# Build and start everything
docker-compose up --build
```

Wait for the build to complete, then:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

To stop:
```bash
docker-compose down
```

## 📁 Project Structure

```
convertwebapp/
├── backend/                 # Python FastAPI backend
│   ├── main.py             # Main API application
│   ├── converters.py       # File conversion logic
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend Docker configuration
│   ├── uploads/            # Temporary upload folder (auto-created)
│   └── outputs/            # Temporary output folder (auto-created)
│
├── frontend/               # Next.js frontend
│   ├── app/               # Next.js App Router
│   │   ├── page.tsx       # Main page component
│   │   ├── layout.tsx     # Root layout
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── FileUploader.tsx        # Drag & drop uploader
│   │   ├── FormatSelector.tsx      # Format selection UI
│   │   └── ConversionProgress.tsx  # Progress indicator
│   ├── package.json       # Node.js dependencies
│   └── Dockerfile         # Frontend Docker configuration
│
├── docker-compose.yml     # Docker Compose configuration
└── README.md             # This file!
```

## 🌐 Deploying Online

### Option 1: Deploy to Railway.app (Recommended for Beginners)

**Railway** is a platform that makes deployment super easy!

1. Create account at [railway.app](https://railway.app)
2. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```
3. Login:
   ```bash
   railway login
   ```
4. Deploy:
   ```bash
   cd /home/jawad/Documents/convertwebapp
   railway up
   ```

### Option 2: Deploy to Vercel (Frontend) + Render (Backend)

**Frontend on Vercel:**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `frontend` folder
5. Click "Deploy"

**Backend on Render:**
1. Go to [render.com](https://render.com)
2. Click "New Web Service"
3. Connect your GitHub repository
4. Select the `backend` folder
5. Set build command: `pip install -r requirements.txt`
6. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Click "Create Web Service"

### Option 3: Deploy to Your Own Server

If you have a Linux server (VPS):

```bash
# 1. SSH into your server
ssh username@your-server-ip

# 2. Install Docker
sudo apt-get update
sudo apt-get install docker.io docker-compose

# 3. Clone your project
git clone YOUR_REPOSITORY_URL
cd convertwebapp

# 4. Start with Docker
docker-compose up -d

# 5. Set up Nginx (web server) for domain
sudo apt-get install nginx
```

## 🔧 API Documentation

Once the backend is running, visit: `http://localhost:8000/docs`

You'll see interactive API documentation where you can test all endpoints!

### Main Endpoints

- `GET /` - Health check
- `POST /api/detect-format` - Detect file format
- `POST /api/convert` - Convert file
- `GET /api/supported-formats` - Get all supported formats

## 🎨 Customization

### Change Colors

Edit `frontend/app/globals.css` to customize the color scheme:

```css
/* Example: Change purple to blue */
.bg-purple-600 {
  background-color: #2563eb; /* blue-600 */
}
```

### Add More Formats

1. Add conversion function in `backend/converters.py`
2. Update `get_valid_output_formats()` function
3. Add format to frontend format list

## 🐛 Troubleshooting

### Backend won't start
- Make sure Python 3.11+ is installed: `python3 --version`
- Activate virtual environment: `source venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`

### Frontend won't start
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Conversion fails
- Check if Tesseract is installed: `tesseract --version`
- Check backend logs for errors
- Make sure file format is supported

### Docker issues
- Make sure Docker is running: `docker ps`
- Rebuild containers: `docker-compose up --build --force-recreate`
- Check logs: `docker-compose logs`

## 📝 How It Works

1. **User uploads file** → Frontend sends to backend
2. **Backend detects format** → Uses magic library to identify file type
3. **Backend validates** → Checks if conversion is possible
4. **Backend converts** → Uses appropriate converter (Pillow, pdf2image, etc.)
5. **User downloads** → Converted file sent to browser
6. **Auto cleanup** → Files deleted automatically after 1 hour

## 🔒 Privacy & Security

- Files are processed locally on your server
- All files automatically deleted after 1 hour
- No data is stored permanently
- No user accounts or tracking
- CORS enabled for frontend-backend communication

## 📄 License

This project is free to use for personal and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 💡 Tips for Beginners

- **Virtual Environment**: This is like a separate room for your Python packages. It keeps everything organized.
- **npm install**: This downloads all the code libraries your frontend needs.
- **uvicorn**: This is the web server that runs your Python backend.
- **localhost**: This means "your own computer". Port numbers (3000, 8000) are like different doors.
- **Docker**: Think of it as a box that contains everything your app needs to run anywhere.

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Check backend logs: Look at the terminal running the backend
3. Check frontend logs: Open browser Developer Tools (F12) → Console
4. Make sure all prerequisites are installed

## 🎉 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pillow](https://python-pillow.org/)
- And many other amazing open-source libraries!

---

**Made with ❤️ for easy file conversions**

Enjoy your Universal File Converter! 🚀
