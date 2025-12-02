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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header con gradiente */}
                <div className="text-center mb-16">
                    <div className="relative inline-block mb-6">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-xl opacity-40"></div>
                        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full shadow-2xl">
                            <MessageSquare className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-600 mb-4">
                        Contáctanos
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-cyan-300 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                                <Mail className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Email</h3>
                            <p className="text-slate-600 mb-4">Para consultas generales y soporte.</p>
                            <a href="mailto:contacto@cloufit.com" className="text-cyan-600 font-semibold hover:text-cyan-700 hover:underline">
                                contacto@cloufit.com
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-teal-300 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                                <Phone className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Teléfono</h3>
                            <p className="text-slate-600 mb-4">Lunes a Viernes, 9am - 6pm.</p>
                            <a href="tel:+571234567890" className="text-teal-600 font-semibold hover:text-teal-700 hover:underline">
                                +57 123 456 7890
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-cyan-300 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                                <MapPin className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Ubicación</h3>
                            <p className="text-slate-600">
                                Pasto, Nariño<br />
                                Colombia
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200">
                            <div className="bg-gradient-to-r from-slate-800 via-teal-900 to-slate-800 px-8 py-6 border-b-2 border-teal-700/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                                        <MessageSquare className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Envíanos un mensaje</h2>
                                </div>
                            </div>
                            <div className="p-8 md:p-12 bg-gradient-to-br from-white to-slate-50/30">

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Nombre completo</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-white shadow-sm"
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-white shadow-sm"
                                                placeholder="tu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Asunto</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-white shadow-sm"
                                            placeholder="¿En qué podemos ayudarte?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Mensaje</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="6"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-white shadow-sm resize-none"
                                            placeholder="Escribe tu mensaje aquí..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
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
