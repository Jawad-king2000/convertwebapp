import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FileIcon, Zap, Shield, Sparkles } from 'lucide-react';
import ConverterFeature from '@/components/ConverterFeature';
import StructuredData from '@/components/StructuredData';

// Define valid conversion pairs for static generation
const conversionPairs = [
    { slug: 'pdf-to-docx', from: 'pdf', to: 'docx', title: 'PDF to Word' },
    { slug: 'docx-to-pdf', from: 'docx', to: 'pdf', title: 'Word to PDF' },
    { slug: 'jpg-to-pdf', from: 'jpg', to: 'pdf', title: 'JPG to PDF' },
    { slug: 'png-to-pdf', from: 'png', to: 'pdf', title: 'PNG to PDF' },
    { slug: 'pdf-to-png', from: 'pdf', to: 'png', title: 'PDF to PNG' },
    { slug: 'pdf-to-jpg', from: 'pdf', to: 'jpg', title: 'PDF to JPG' },
    { slug: 'docx-to-html', from: 'docx', to: 'html', title: 'Word to HTML' },
    { slug: 'pptx-to-pdf', from: 'pptx', to: 'pdf', title: 'PowerPoint to PDF' },
];

export async function generateStaticParams() {
    return conversionPairs.map((pair) => ({
        slug: pair.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const pair = conversionPairs.find((p) => p.slug === params.slug);

    if (!pair) {
        return {
            title: 'Tool Not Found',
        };
    }

    return {
        title: `Convert ${pair.title} - Free Online Converter`,
        description: `Convert ${pair.from.toUpperCase()} to ${pair.to.toUpperCase()} instantly. Free, fast, and secure online converter. No registration required.`,
        alternates: {
            canonical: `/tools/${pair.slug}`,
        },
        openGraph: {
            title: `Free ${pair.title} Converter`,
            description: `Best free tool to convert ${pair.from.toUpperCase()} to ${pair.to.toUpperCase()}. Fast and secure.`,
        }
    };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
    const pair = conversionPairs.find((p) => p.slug === params.slug);

    if (!pair) {
        notFound();
    }

    return (
        <main className="min-h-screen overflow-y-auto px-4 py-12 pb-20">
            <header className="max-w-6xl mx-auto text-center mb-16">
                <h1 className="text-5xl font-bold text-white mb-6">
                    Convert <span className="gradient-text">{pair.from.toUpperCase()}</span> to <span className="gradient-text">{pair.to.toUpperCase()}</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                    The best free online tool to convert your {pair.from.toUpperCase()} files to {pair.to.toUpperCase()} format.
                    Fast, secure, and no installation required.
                </p>
            </header>

            {/* Main Converter Section - Reusing components would happen here */}
            {/* For now, we show a simplified placeholder structure or would integrate the client components */}
            <section className="max-w-4xl mx-auto mb-20" aria-label="Conversion Tool">
                <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
                    <p className="text-white mb-8">Upload your {pair.from.toUpperCase()} file to start conversion.</p>
                    {/* We would need to refactor page.tsx to export the main logic as a reusable component 
                to use it here properly. For this step, we establish the routing. */}
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 hover:border-purple-400/50 transition-colors">
                        <FileIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                        <button className="btn-primary">Select {pair.from.toUpperCase()} File</button>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="glass p-6 rounded-xl">
                    <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                    <h3 className="text-xl text-white font-bold mb-2">Fast Conversion</h3>
                    <p className="text-gray-400">Convert {pair.from} to {pair.to} in seconds.</p>
                </div>
                <div className="glass p-6 rounded-xl">
                    <Shield className="w-8 h-8 text-green-400 mb-4" />
                    <h3 className="text-xl text-white font-bold mb-2">Secure</h3>
                    <p className="text-gray-400">Your files are deleted automatically after 1 hour.</p>
                </div>
                <div className="glass p-6 rounded-xl">
                    <Sparkles className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="text-xl text-white font-bold mb-2">High Quality</h3>
                    <p className="text-gray-400">Preserve the quality of your original file.</p>
                </div>
            </section>

            {/* breadcrumb schema would technically go here too */}
        </main>
    );
}
