import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const AIFloatingButton = () => {
    return (
        <Link
            to="/ai-assistant"
            className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 ease-out"
            title="Asistente de Moda IA"
        >
            {/* Efecto de pulso sutil para llamar la atención */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-20 animate-ping group-hover:opacity-0"></span>

            <Sparkles className="w-7 h-7 animate-pulse" />

            {/* Tooltip flotante al hacer hover */}
            <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                ✨ ¡Crea tu Outfit!
            </span>
        </Link>
    );
};

export default AIFloatingButton;
