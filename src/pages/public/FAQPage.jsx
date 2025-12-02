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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                        <HelpCircle className="w-8 h-8 text-primary-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Preguntas Frecuentes</h1>
                    <p className="text-xl text-gray-600">
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
                        className="w-full px-6 py-4 pl-14 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                    />
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                </div>

                {/* FAQ List */}
                <div className="space-y-8">
                    {filteredFaqs.map((category, catIndex) => (
                        <div key={catIndex} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-800">{category.category}</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {category.questions.map((faq, index) => {
                                    const globalIndex = `${catIndex}-${index}`;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div key={index} className="group">
                                            <button
                                                onClick={() => toggleAccordion(globalIndex)}
                                                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
                                            >
                                                <span className={`font-medium text-lg ${isOpen ? 'text-primary-600' : 'text-gray-900'}`}>
                                                    {faq.q}
                                                </span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-primary-600" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                                                )}
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                    }`}
                                            >
                                                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

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
