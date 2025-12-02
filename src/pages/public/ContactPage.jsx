import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de envío
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contáctanos</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600 mb-4">Para consultas generales y soporte.</p>
                            <a href="mailto:contacto@cloufit.com" className="text-primary-600 font-medium hover:underline">
                                contacto@cloufit.com
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                <Phone className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Teléfono</h3>
                            <p className="text-gray-600 mb-4">Lunes a Viernes, 9am - 6pm.</p>
                            <a href="tel:+571234567890" className="text-primary-600 font-medium hover:underline">
                                +57 123 456 7890
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                                <MapPin className="w-6 h-6 text-pink-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Ubicación</h3>
                            <p className="text-gray-600">
                                Pasto, Nariño<br />
                                Colombia
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <MessageSquare className="w-6 h-6 text-primary-600" />
                                    <h2 className="text-2xl font-bold text-gray-900">Envíanos un mensaje</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                                placeholder="tu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                            placeholder="¿En qué podemos ayudarte?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="6"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                                            placeholder="Escribe tu mensaje aquí..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Enviar Mensaje
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
