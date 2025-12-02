import React from 'react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-gray-100 px-8 py-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Términos y Condiciones</h1>
                    <p className="text-gray-500">
                        Por favor lee detenidamente estos términos antes de usar nuestros servicios.
                    </p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-8">

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    Al acceder o utilizar Cloufit, aceptas estar sujeto a estos términos. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al servicio.
                                </p>
                            </div>
                        </div>
                    </div>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                            Uso del Servicio
                        </h2>
                        <p className="text-gray-600 leading-relaxed pl-11">
                            Cloufit proporciona una plataforma para descubrir y reservar productos de moda en tiendas locales. Te comprometes a utilizar el servicio solo para fines legales y de acuerdo con estos Términos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                            Cuentas de Usuario
                        </h2>
                        <div className="text-gray-600 leading-relaxed pl-11 space-y-2">
                            <p>
                                Para acceder a ciertas funciones, debes crear una cuenta. Eres responsable de:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Mantener la confidencialidad de tu contraseña.</li>
                                <li>Proporcionar información precisa y actualizada.</li>
                                <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                            Reservas y Cancelaciones
                        </h2>
                        <div className="text-gray-600 leading-relaxed pl-11 space-y-2">
                            <p>
                                Las reservas realizadas a través de Cloufit están sujetas a la disponibilidad de la tienda.
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Tienes un plazo de 24 horas para acudir a la tienda tras la confirmación.</li>
                                <li>Debes cancelar tu reserva si no puedes asistir para liberar el stock.</li>
                                <li>El incumplimiento reiterado de las reservas puede resultar en la suspensión de tu cuenta.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                            Propiedad Intelectual
                        </h2>
                        <p className="text-gray-600 leading-relaxed pl-11">
                            El servicio y su contenido original (excluyendo el contenido proporcionado por los usuarios y tiendas), características y funcionalidad son y seguirán siendo propiedad exclusiva de Cloufit y sus licenciantes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                            Cambios en los Términos
                        </h2>
                        <p className="text-gray-600 leading-relaxed pl-11">
                            Nos reservamos el derecho de modificar o reemplazar estos términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes de que entren en vigor los nuevos términos.
                        </p>
                    </section>

                    <div className="border-t border-gray-100 pt-8 mt-8">
                        <p className="text-gray-500 text-sm text-center">
                            Si tienes alguna duda sobre estos términos, contáctanos en <a href="mailto:legal@cloufit.com" className="text-primary-600 hover:underline">legal@cloufit.com</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TermsPage;
