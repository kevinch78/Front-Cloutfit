import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
                        <Lock className="w-8 h-8 text-primary-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Política de Privacidad</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        En Cloufit, nos tomamos muy en serio la seguridad de tus datos. Esta política explica cómo recopilamos, usamos y protegemos tu información.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">Última actualización: 1 de Diciembre, 2025</p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-10">

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Eye className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">1. Información que Recopilamos</h2>
                        </div>
                        <div className="prose prose-gray max-w-none text-gray-600">
                            <p>
                                Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, actualizas tu perfil, realizas una reserva o te comunicas con nosotros. Esto puede incluir:
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Nombre, dirección de correo electrónico y número de teléfono.</li>
                                <li>Información de perfil, como género, tallas y preferencias de estilo.</li>
                                <li>Contenido que generas, como reseñas de tiendas o productos.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <FileText className="w-6 h-6 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">2. Uso de la Información</h2>
                        </div>
                        <div className="prose prose-gray max-w-none text-gray-600">
                            <p>Utilizamos la información recopilada para:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Proporcionar, mantener y mejorar nuestros servicios.</li>
                                <li>Personalizar tu experiencia y recomendarte outfits mediante nuestra IA.</li>
                                <li>Procesar tus reservas y notificarte sobre su estado.</li>
                                <li>Enviarte actualizaciones técnicas, alertas de seguridad y mensajes de soporte.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <Shield className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">3. Protección de Datos</h2>
                        </div>
                        <div className="prose prose-gray max-w-none text-gray-600">
                            <p>
                                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales contra el acceso no autorizado, la alteración, la divulgación o la destrucción.
                            </p>
                            <p className="mt-2">
                                Sin embargo, ninguna transmisión por Internet o sistema de almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar una seguridad absoluta.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies y Tecnologías Similares</h2>
                        <p className="text-gray-600">
                            Utilizamos cookies y tecnologías similares para rastrear la actividad en nuestro servicio y mantener cierta información. Puedes configurar tu navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contacto</h2>
                        <p className="text-gray-600">
                            Si tienes preguntas sobre esta Política de Privacidad, por favor contáctanos en:
                            <br />
                            <a href="mailto:privacidad@cloufit.com" className="text-primary-600 font-medium hover:underline">privacidad@cloufit.com</a>
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
