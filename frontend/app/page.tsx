'use client';

import { FileIcon, Zap, Shield, Sparkles } from 'lucide-react';
import ConverterFeature from '@/components/ConverterFeature';

export default function Home() {
  return (
    <main className="min-h-screen overflow-y-auto px-4 py-12 pb-20">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto text-center mb-16">
        <div className="inline-block mb-6 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-30 rounded-full" aria-hidden="true"></div>
            <FileIcon className="w-20 h-20 text-purple-400 relative z-10" aria-label="File converter icon" role="img" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
          Universal File <span className="gradient-text">Converter</span>
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Convert your files instantly between multiple formats.
          Simple, fast, and secure - no account needed!
        </p>

        {/* Feature Pills */}
        <section aria-label="Key features" className="flex flex-wrap gap-4 justify-center mb-12">
          <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" aria-hidden="true" />
            <span className="text-white font-medium">Lightning Fast</span>
          </div>
          <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" aria-hidden="true" />
            <span className="text-white font-medium">Secure & Private</span>
          </div>
          <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" aria-hidden="true" />
            <span className="text-white font-medium">7+ Formats</span>
          </div>
        </section>
      </header>

      {/* Main Converter Card */}
      <section className="max-w-4xl mx-auto" aria-label="File conversion tool">
        <ConverterFeature />
      </section>

      {/* Supported Formats Section */}
      <section className="max-w-6xl mx-auto mt-20" aria-labelledby="supported-formats-heading">
        <h2 id="supported-formats-heading" className="text-3xl font-bold text-white text-center mb-12">
          Supported Formats
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Formats */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-purple-400 mb-6">Input Formats</h3>
            <div className="grid grid-cols-2 gap-4">
              {['PDF', 'DOCX', 'PPTX', 'TXT', 'PNG', 'JPG', 'WEBP'].map((format) => (
                <div key={format} className="glass px-4 py-3 rounded-lg text-white text-center font-medium">
                  {format}
                </div>
              ))}
            </div>
          </div>

          {/* Output Formats */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-blue-400 mb-6">Output Formats</h3>
            <div className="grid grid-cols-2 gap-4">
              {['PDF', 'DOCX', 'PNG', 'JPG', 'WEBP', 'TXT', 'HTML'].map((format) => (
                <div key={format} className="glass px-4 py-3 rounded-lg text-white text-center font-medium">
                  {format}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-20 mb-8 text-center">
        <p className="text-gray-400 text-sm">
          Built with Next.js, FastAPI, and ❤️ | All files are automatically deleted after 1 hour
        </p>
      </footer>
    </main>
  );
}
