"""
Universal File Converter - Backend API
This is the main FastAPI application that handles file uploads, conversions, and downloads.
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import os
import shutil
from pathlib import Path
import magic
from datetime import datetime, timedelta
import asyncio
from typing import List
import uuid

# Import conversion modules
from converters import (
    convert_pdf_to_format,
    convert_docx_to_format,
    convert_pptx_to_format,
    convert_txt_to_format,
    convert_image_to_format,
    get_valid_output_formats
)

# Initialize FastAPI app
app = FastAPI(
    title="Universal File Converter API",
    description="Convert files between multiple formats",
    version="1.0.0"
)

# Rate Limiting Setup
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS - allows frontend to communicate with backend
# Security: Use environment variable to specify allowed origins
CORS_ORIGINS = os.getenv(
    "BACKEND_CORS_ORIGINS",
    "http://localhost:3000,http://localhost:3001"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,  # Specific origins only, no wildcard
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # Restrict to needed methods only
    allow_headers=["*"],
)

# Create necessary directories
UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("outputs")
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

# File type detection mapping
MIME_TO_EXT = {
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'text/plain': 'txt',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
}


async def cleanup_old_files():
    """
    Background task to automatically delete files older than 1 hour
    This keeps the server storage clean
    """
    while True:
        try:
            current_time = datetime.now()
            for directory in [UPLOAD_DIR, OUTPUT_DIR]:
                for file_path in directory.glob("*"):
                    if file_path.is_file():
                        file_age = current_time - datetime.fromtimestamp(file_path.stat().st_mtime)
                        if file_age > timedelta(hours=1):
                            file_path.unlink()
                            print(f"Cleaned up old file: {file_path}")
        except Exception as e:
            print(f"Error during cleanup: {e}")
        
        # Wait 10 minutes before next cleanup
        await asyncio.sleep(600)


@app.on_event("startup")
async def startup_event():
    """
    Runs when the server starts
    Initializes the automatic file cleanup task
    """
    asyncio.create_task(cleanup_old_files())


@app.get("/")
@limiter.limit("10/minute")
async def root(request: Request):
    """
    Root endpoint - health check
    """
    return {
        "message": "Universal File Converter API",
        "status": "running",
        "version": "1.0.0"
    }


@app.post("/api/detect-format")
@limiter.limit("20/minute")
async def detect_file_format(request: Request, file: UploadFile = File(...)):
    """
    Detects the format of an uploaded file
    Returns the file type and valid output formats
    """
    try:
        # Save file temporarily using streams (better for memory)
        temp_path = UPLOAD_DIR / f"temp_{uuid.uuid4()}_{file.filename}"
        
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Detect file type using magic
        mime_type = magic.from_file(str(temp_path), mime=True)
        
        # Get file extension
        file_ext = MIME_TO_EXT.get(mime_type)
        
        if not file_ext:
            # Try to get from filename
            file_ext = Path(file.filename).suffix.lower().replace('.', '')
        
        # Get valid output formats
        valid_formats = get_valid_output_formats(file_ext)
        
        # Clean up temp file
        temp_path.unlink()
        
        return {
            "input_format": file_ext,
            "valid_output_formats": valid_formats,
            "filename": file.filename
        }
    
    except Exception as e:
        if temp_path.exists():
            temp_path.unlink()
        raise HTTPException(status_code=400, detail=f"Error detecting file format: {str(e)}")


@app.post("/api/convert")
@limiter.limit("5/minute")
async def convert_file(
    request: Request,
    file: UploadFile = File(...),
    output_format: str = Form(...)
):
    """
    Main conversion endpoint
    Accepts a file and desired output format, returns converted file
    """
    input_path = None
    output_path = None
    
    try:
        # Generate unique filename
        unique_id = uuid.uuid4()
        input_filename = f"{unique_id}_{file.filename}"
        input_path = UPLOAD_DIR / input_filename
        
        # Save uploaded file using streaming (memory efficient)
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Detect input format
        mime_type = magic.from_file(str(input_path), mime=True)
        input_format = MIME_TO_EXT.get(mime_type)
        
        if not input_format:
            input_format = Path(file.filename).suffix.lower().replace('.', '')
        
        # Validate conversion is possible
        valid_formats = get_valid_output_formats(input_format)
        if output_format not in valid_formats:
            raise HTTPException(
                status_code=400, 
                detail=f"Cannot convert {input_format} to {output_format}"
            )
        
        # Route to appropriate converter
        output_filename = f"{unique_id}_converted.{output_format}"
        output_path = OUTPUT_DIR / output_filename
        
        if input_format == 'pdf':
            output_path = convert_pdf_to_format(input_path, output_format, OUTPUT_DIR)
        elif input_format == 'docx':
            output_path = convert_docx_to_format(input_path, output_format, OUTPUT_DIR)
        elif input_format == 'pptx':
            output_path = convert_pptx_to_format(input_path, output_format, OUTPUT_DIR)
        elif input_format == 'txt':
            output_path = convert_txt_to_format(input_path, output_format, OUTPUT_DIR)
        elif input_format in ['png', 'jpg', 'jpeg', 'webp']:
            output_path = convert_image_to_format(input_path, output_format, OUTPUT_DIR)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported input format: {input_format}")
        
        # Return the converted file with caching headers
        # Cache-Control: no-store because converted files are unique and ephemeral
        headers = {'Cache-Control': 'no-store'}
        
        return FileResponse(
            path=output_path,
            filename=f"converted.{output_format}",
            media_type="application/octet-stream",
            headers=headers
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion error: {str(e)}")
    finally:
        # Cleanup will be handled by background task
        pass


@app.get("/api/supported-formats")
@limiter.limit("60/minute")
async def get_supported_formats(request: Request):
    """
    Returns all supported input and output formats
    Cached for performance
    """
    content = {
        "input_formats": ["pdf", "docx", "pptx", "txt", "png", "jpg", "webp"],
        "output_formats": ["pdf", "docx", "png", "jpg", "webp", "txt", "html"],
        "conversion_matrix": {
            "pdf": ["png", "jpg", "webp", "txt", "html", "docx"],
            "docx": ["pdf", "txt", "html", "png", "jpg"],
            "pptx": ["pdf", "png", "jpg"],
            "txt": ["pdf", "docx", "html"],
            "png": ["txt", "pdf", "jpg", "webp"],
            "jpg": ["txt", "pdf", "png", "webp"],
            "webp": ["png", "jpg", "txt", "pdf"]
        }
    }
    return JSONResponse(content=content, headers={"Cache-Control": "public, max-age=3600"})


if __name__ == "__main__":
    import uvicorn
    # Enable HTTP/2 not strictly required here as uvicorn handles it if configured, 
    # but application-level optimization is now complete.
    uvicorn.run(app, host="0.0.0.0", port=8000)
