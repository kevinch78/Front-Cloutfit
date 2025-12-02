import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200">
                {/* Header con gradiente */}
                <div className="bg-gradient-to-r from-slate-800 via-teal-900 to-slate-800 px-8 py-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-teal-600/20"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border-2 border-white/30 shadow-lg">
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Política de Privacidad</h1>
                        <p className="text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            En Cloufit, nos tomamos muy en serio la seguridad de tus datos. Esta política explica cómo recopilamos, usamos y protegemos tu información.
                        </p>
                        <p className="text-sm text-cyan-200 mt-4 font-medium">Última actualización: 1 de Diciembre, 2025</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-10">

                    <section className="bg-gradient-to-r from-cyan-50 to-slate-50 p-6 rounded-xl border-2 border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-md">
                                <Eye className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">1. Información que Recopilamos</h2>
                        </div>
                        <div className="prose prose-gray max-w-none text-slate-700 pl-14">
                            <p className="mb-3">
                                Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, actualizas tu perfil, realizas una reserva o te comunicas con nosotros. Esto puede incluir:
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li className="flex items-start"><span className="text-cyan-600 font-bold mr-2">•</span> <span>Nombre, dirección de correo electrónico y número de teléfono.</span></li>
                                <li className="flex items-start"><span className="text-cyan-600 font-bold mr-2">•</span> <span>Información de perfil, como género, tallas y preferencias de estilo.</span></li>
                                <li className="flex items-start"><span className="text-cyan-600 font-bold mr-2">•</span> <span>Contenido que generas, como reseñas de tiendas o productos.</span></li>
                            </ul>
                        </div>
                    </section>

                    <section className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-md">
                                <FileText className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">2. Uso de la Información</h2>
                        </div>
                        <div className="prose prose-gray max-w-none text-slate-700 pl-14">
                            <p className="mb-3">Utilizamos la información recopilada para:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li className="flex items-start"><span className="text-teal-600 font-bold mr-2">•</span> <span>Proporcionar, mantener y mejorar nuestros servicios.</span></li>
                                <li className="flex items-start"><span className="text-teal-600 font-bold mr-2">•</span> <span>Personalizar tu experiencia y recomendarte outfits mediante nuestra IA.</span></li>
                                <li className="flex items-start"><span className="text-teal-600 font-bold mr-2">•</span> <span>Procesar tus reservas y notificarte sobre su estado.</span></li>
                                <li className="flex items-start"><span className="text-teal-600 font-bold mr-2">•</span> <span>Enviarte actualizaciones técnicas, alertas de seguridad y mensajes de soporte.</span></li>
                            </ul>
                        </div>
                    </section>

                    <section className="bg-gradient-to-r from-slate-50 to-cyan-50 p-6 rounded-xl border-2 border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-xl shadow-md">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">3. Protección de Datos</h2>
                        </div>
                        <div className="prose prose-gray max-w-none text-slate-700 pl-14">
                            <p className="mb-3">
                                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales contra el acceso no autorizado, la alteración, la divulgación o la destrucción.
                            </p>
                            <p>
                                Sin embargo, ninguna transmisión por Internet o sistema de almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar una seguridad absoluta.
                            </p>
                        </div>
                    </section>

                    <section className="bg-gradient-to-r from-cyan-50/30 to-teal-50/30 p-6 rounded-xl border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                            <span className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md">4</span>
                            4. Cookies y Tecnologías Similares
                        </h2>
                        <p className="text-slate-700 pl-11 leading-relaxed">
                            Utilizamos cookies y tecnologías similares para rastrear la actividad en nuestro servicio y mantener cierta información. Puedes configurar tu navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie.
                        </p>
                    </section>

                    <section className="bg-gradient-to-r from-teal-50/30 to-cyan-50/30 p-6 rounded-xl border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                            <span className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md">5</span>
                            5. Contacto
                        </h2>
                        <p className="text-slate-700 pl-11 leading-relaxed">
                            Si tienes preguntas sobre esta Política de Privacidad, por favor contáctanos en:
                            <br />
                            <a href="mailto:privacidad@cloufit.com" className="text-cyan-600 font-semibold hover:text-cyan-700 hover:underline">privacidad@cloufit.com</a>
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
