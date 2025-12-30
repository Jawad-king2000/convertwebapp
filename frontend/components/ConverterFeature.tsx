'use client';

import { useState } from 'react';
import { FileIcon } from 'lucide-react';
import FileUploader from './FileUploader';
import FormatSelector from './FormatSelector';
import ConversionProgress from './ConversionProgress';

interface ConverterFeatureProps {
    initialInputFormat?: string;
    initialOutputFormat?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ConverterFeature({
    initialInputFormat = '',
    initialOutputFormat = ''
}: ConverterFeatureProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [inputFormat, setInputFormat] = useState<string>(initialInputFormat);
    const [validFormats, setValidFormats] = useState<string[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<string>(initialOutputFormat);
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string>('');

    const handleFileUpload = async (file: File) => {
        setUploadedFile(file);
        setError('');
        // If we don't have a fixed output format, reset it. 
        // If we do (e.g. tools page), keep it.
        if (!initialOutputFormat) setSelectedFormat('');

        console.log('Using API URL:', API_URL); // Debugging log

        try {
            // Detect file format
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_URL}/api/detect-format`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('File format detection failed:', response.status, errorText);
                throw new Error(`Failed to detect format: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setInputFormat(data.input_format);
            setValidFormats(data.valid_output_formats);

            // Auto-select output format if it matches the valid formats (for tool pages)
            if (initialOutputFormat && data.valid_output_formats.includes(initialOutputFormat)) {
                setSelectedFormat(initialOutputFormat);
            }

        } catch (err) {
            console.error('Full upload error:', err);
            setError('Error detecting file format. Please check console for details.');
        }
    };

    const handleConvert = async () => {
        if (!uploadedFile || !selectedFormat) return;

        setIsConverting(true);
        setProgress(0);
        setError('');

        let progressInterval: NodeJS.Timeout | null = null;

        try {
            progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) {
                        if (progressInterval) clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const formData = new FormData();
            formData.append('file', uploadedFile);
            formData.append('output_format', selectedFormat);

            const response = await fetch(`${API_URL}/api/convert`, {
                method: 'POST',
                body: formData,
            });

            if (progressInterval) clearInterval(progressInterval);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Conversion failed with status: ${response.status}. Details: ${errorText}`);
            }

            const blob = await response.blob();

            if (blob.size === 0) {
                throw new Error('Conversion returned an empty file.');
            }

            setProgress(100);

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `converted.${selectedFormat}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setTimeout(() => {
                setIsConverting(false);
                setProgress(0);
                setUploadedFile(null);
                if (!initialInputFormat) setInputFormat('');
                setValidFormats([]);
                if (!initialOutputFormat) setSelectedFormat('');
            }, 1500);

        } catch (err) {
            if (progressInterval) clearInterval(progressInterval);
            setError('Conversion failed. Please try again.');
            setIsConverting(false);
            setProgress(0);
            console.error(err);
        }
    };

    return (
        <div className="glass-card rounded-3xl p-8 md:p-12">
            {error && (
                <div role="alert" className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                    {error}
                </div>
            )}

            {!uploadedFile && (
                <FileUploader onFileUpload={handleFileUpload} />
            )}

            {uploadedFile && !isConverting && (
                <div className="space-y-6">
                    <div className="glass p-6 rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-600/30 rounded-lg flex items-center justify-center">
                                <FileIcon className="w-6 h-6 text-purple-400" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">{uploadedFile.name}</h3>
                                <p className="text-gray-400 text-sm">
                                    {inputFormat.toUpperCase()} • {(uploadedFile.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setUploadedFile(null);
                                    if (!initialInputFormat) setInputFormat('');
                                    setValidFormats([]);
                                    if (!initialOutputFormat) setSelectedFormat('');
                                }}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Remove uploaded file"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <FormatSelector
                        validFormats={validFormats}
                        selectedFormat={selectedFormat}
                        onSelectFormat={setSelectedFormat}
                    />

                    <button
                        onClick={handleConvert}
                        disabled={!selectedFormat}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        aria-label={selectedFormat ? `Convert file to ${selectedFormat.toUpperCase()} format` : 'Select a format to convert'}
                    >
                        Convert to {selectedFormat.toUpperCase()}
                    </button>
                </div>
            )}

            {isConverting && (
                <ConversionProgress progress={progress} />
            )}
        </div>
    );
}
