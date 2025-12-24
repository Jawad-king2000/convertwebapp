'use client';

import { Loader2, CheckCircle } from 'lucide-react';

interface ConversionProgressProps {
    progress: number;
}

export default function ConversionProgress({ progress }: ConversionProgressProps) {
    const isComplete = progress === 100;

    return (
        <div className="text-center py-12">
            <div className="flex justify-center mb-6">
                {isComplete ? (
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle className="w-12 h-12 text-white" aria-label="Conversion complete" role="img" />
                    </div>
                ) : (
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center animate-pulse-glow">
                        <Loader2 className="w-12 h-12 text-white animate-spin" aria-label="Converting" role="img" />
                    </div>
                )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
                {isComplete ? 'Conversion Complete!' : 'Converting Your File...'}
            </h3>

            <div className="max-w-md mx-auto mb-6">
                <div
                    className="h-3 bg-white/10 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="File conversion progress"
                >
                    <div
                        className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-gray-300 mt-2 font-semibold" aria-live="polite">{progress}%</p>
            </div>

            {isComplete && (
                <p className="text-green-400 font-medium" role="status" aria-live="polite">
                    Download started! Check your downloads folder.
                </p>
            )}
        </div>
    );
}
