export default function Splash() {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-chocolate to-chocolate-dark flex items-center justify-center z-50">
            <div className="text-center animate-pulse">
                <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl text-4xl">
                    🎁
                </div>
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                    Belles Offres
                </h1>
                <p className="text-white/80 text-sm font-medium">
                    Vendez plus vite
                </p>
            </div>
        </div>
    );
}
