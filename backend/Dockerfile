# Use Python 3.11 slim image
FROM python:3.11-bullseye

# Set working directory
WORKDIR /app

# Install system dependencies for file conversions
RUN apt-get update && apt-get install -y \
    poppler-utils \
    tesseract-ocr \
    wkhtmltopdf \
    libmagic1 \
    libgl1 \
    libglib2.0-0 \
    libwebp-dev \
    libjpeg-dev \
    libpng-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p uploads outputs

# Expose port 8000
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
