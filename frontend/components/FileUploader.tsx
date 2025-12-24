'use client';

import { useCallback, useState } from 'react';
import { Upload, FileIcon } from 'lucide-react';

interface FileUploaderProps {
    onFileUpload: (file: File) => void;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onFileUpload(files[0]);
        }
    }, [onFileUpload]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onFileUpload(files[0]);
        }
    }, [onFileUpload]);

    return (
        <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${isDragging
                ? 'border-purple-400 bg-purple-500/10 scale-105'
                : 'border-white/20 hover:border-purple-400/50 hover:bg-white/5'
                }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            role="region"
            aria-label="File upload area"
        >
            <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={handleFileInput}
                accept=".pdf,.docx,.pptx,.txt,.png,.jpg,.jpeg,.webp"
                aria-label="Choose file to upload"
            />

            <label htmlFor="file-input" className="cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-110 animate-pulse-glow' : ''
                        }`}>
                        <Upload className="w-10 h-10 text-white" aria-hidden="true" />
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {isDragging ? 'Drop your file here!' : 'Upload Your File'}
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Drag and drop or click to browse
                        </p>
                        <p className="text-sm text-gray-400">
                            Supports: PDF, DOCX, PPTX, TXT, PNG, JPG, WEBP
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn-primary mt-4"
                        aria-label="Open file browser to choose a file"
                    >
                        Choose File
                    </button>
                </div>
            </label>
        </div>
    );
}
