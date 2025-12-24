export default function Loading() {
    return (
        <main className="min-h-screen overflow-y-auto px-4 py-12 pb-20 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-30 rounded-full animate-pulse"></div>
                        <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin relative z-10"></div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
                <p className="text-gray-400">Preparing your file converter</p>
            </div>
        </main>
    );
}
