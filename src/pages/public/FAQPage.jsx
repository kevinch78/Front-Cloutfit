import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const faqs = [
        {
            category: "General",
            questions: [
                {
                    q: "¿Qué es Cloufit?",
                    a: "Cloufit es una plataforma que conecta a usuarios con tiendas de moda locales. Utilizamos inteligencia artificial para recomendarte outfits personalizados y te permitimos reservar prendas para probártelas en la tienda antes de comprar."
                },
                {
                    q: "¿Tiene algún costo usar Cloufit?",
                    a: "No, el uso de la plataforma para buscar y reservar prendas es totalmente gratuito para los usuarios."
                }
            ]
        },
        {
            category: "Reservas y Compras",
            questions: [
                {
                    q: "¿Cómo funcionan las reservas?",
                    a: "Puedes reservar hasta 3 prendas por tienda. La reserva dura 24 horas, tiempo durante el cual la tienda guardará las prendas para que vayas a probártelas."
                },
                {
                    q: "¿Tengo que pagar online?",
                    a: "No necesariamente. El modelo principal es 'Reserva y Prueba', donde pagas directamente en la tienda si decides llevarte la prenda. Sin embargo, algunas tiendas pueden ofrecer pago online."
                },
                {
                    q: "¿Qué pasa si no voy a la reserva?",
                    a: "Si no asistes en el plazo de 24 horas, la reserva se cancela automáticamente y las prendas vuelven a estar disponibles para otros usuarios. Si acumulas muchas inasistencias, tu cuenta podría tener restricciones."
                }
            ]
        },
        {
            category: "Inteligencia Artificial",
            questions: [
                {
                    q: "¿Cómo funciona el Asistente de Moda?",
                    a: "Nuestro asistente analiza tus preferencias, el clima de tu ciudad y la ocasión que le indiques para sugerirte combinaciones de ropa disponibles en tiendas cercanas."
                },
                {
                    q: "¿Mis datos están seguros?",
                    a: "Sí, utilizamos tus datos solo para mejorar las recomendaciones. No compartimos tu información personal con terceros sin tu consentimiento."
                }
            ]
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFaqs = faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
            q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header con gradiente */}
                <div className="text-center mb-12">
                    <div className="relative inline-block mb-6">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-xl opacity-40"></div>
                        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full shadow-2xl">
                            <HelpCircle className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-600 mb-4">
                        Preguntas Frecuentes
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Resolvemos tus dudas para que disfrutes al máximo de Cloufit.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto mb-12">
                    <input
                        type="text"
                        placeholder="Buscar una pregunta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-4 pl-14 bg-white border-2 border-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg transition-all"
                    />
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-cyan-500 w-6 h-6" />
                </div>

                {/* FAQ List */}
                <div className="space-y-8">
                    {filteredFaqs.map((category, catIndex) => {
                        const colors = [
                            { bg: 'from-cyan-500 to-cyan-600', border: 'border-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50' },
                            { bg: 'from-teal-500 to-teal-600', border: 'border-teal-500', text: 'text-teal-600', light: 'bg-teal-50' },
                            { bg: 'from-cyan-500 to-teal-500', border: 'border-cyan-500', text: 'text-cyan-600', light: 'bg-gradient-to-r from-cyan-50 to-teal-50' }
                        ];
                        const colorScheme = colors[catIndex % colors.length];
                        
                        return (
                            <div key={catIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 hover:shadow-xl transition-all">
                                <div className={`bg-gradient-to-r ${colorScheme.bg} px-6 py-4 border-b-2 ${colorScheme.border}`}>
                                    <h2 className="text-lg font-bold text-white">{category.category}</h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {category.questions.map((faq, index) => {
                                        const globalIndex = `${catIndex}-${index}`;
                                        const isOpen = openIndex === globalIndex;

                                        return (
                                            <div key={index} className="group">
                                                <button
                                                    onClick={() => toggleAccordion(globalIndex)}
                                                    className={`w-full px-6 py-5 text-left flex justify-between items-center transition-colors focus:outline-none ${isOpen ? colorScheme.light : 'hover:bg-gray-50'}`}
                                                >
                                                    <span className={`font-medium text-lg ${isOpen ? colorScheme.text : 'text-slate-800'}`}>
                                                        {faq.q}
                                                    </span>
                                                    {isOpen ? (
                                                        <ChevronUp className={`w-5 h-5 ${colorScheme.text}`} />
                                                    ) : (
                                                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                                                    )}
                                                </button>
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                        }`}
                                                >
                                                    <div className={`px-6 pb-6 ${colorScheme.light} text-slate-700 leading-relaxed`}>
                                                        {faq.a}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No encontramos resultados para tu búsqueda.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
