'use client';

import { FileType } from 'lucide-react';

interface FormatSelectorProps {
    validFormats: string[];
    selectedFormat: string;
    onSelectFormat: (format: string) => void;
}

const formatIcons: { [key: string]: string } = {
    pdf: '📄',
    docx: '📝',
    pptx: '📊',
    txt: '📃',
    png: '🖼️',
    jpg: '🖼️',
    webp: '🖼️',
    html: '🌐',
};

export default function FormatSelector({
    validFormats,
    selectedFormat,
    onSelectFormat
}: FormatSelectorProps) {
    if (validFormats.length === 0) {
        return null;
    }

    return (
        <div role="group" aria-labelledby="format-selector-heading">
            <h3 id="format-selector-heading" className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FileType className="w-5 h-5" aria-hidden="true" />
                Convert to:
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3" role="radiogroup" aria-label="Select output format">
                {validFormats.map((format) => (
                    <button
                        key={format}
                        onClick={() => onSelectFormat(format)}
                        role="radio"
                        aria-checked={selectedFormat === format}
                        aria-label={`Convert to ${format.toUpperCase()} format`}
                        className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${selectedFormat === format
                            ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                            : 'glass text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        <div className="text-3xl mb-2" aria-hidden="true">{formatIcons[format] || '📄'}</div>
                        <div className="text-sm font-semibold uppercase">{format}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}
