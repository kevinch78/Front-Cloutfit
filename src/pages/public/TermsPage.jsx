import React from 'react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200">
                {/* Header con gradiente */}
                <div className="bg-gradient-to-r from-slate-800 via-teal-900 to-slate-800 px-8 py-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-teal-600/20"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Términos y Condiciones</h1>
                        <p className="text-gray-200 max-w-2xl mx-auto">
                            Por favor lee detenidamente estos términos antes de usar nuestros servicios.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-8">

                    <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border-l-4 border-cyan-600 p-5 rounded-r-lg shadow-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-6 w-6 text-cyan-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                                    Al acceder o utilizar Cloufit, aceptas estar sujeto a estos términos. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al servicio.
                                </p>
                            </div>
                        </div>
                    </div>

                    <section className="bg-gradient-to-r from-slate-50 to-cyan-50/30 p-6 rounded-xl border-2 border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md">1</span>
                            Uso del Servicio
                        </h2>
                        <p className="text-slate-700 leading-relaxed pl-11">
                            Cloufit proporciona una plataforma para descubrir y reservar productos de moda en tiendas locales. Te comprometes a utilizar el servicio solo para fines legales y de acuerdo con estos Términos.
                        </p>
                    </section>

                    <section className="bg-gradient-to-r from-teal-50/30 to-cyan-50 p-6 rounded-xl border-2 border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md">2</span>
                            Cuentas de Usuario
                        </h2>
                        <div className="text-slate-700 leading-relaxed pl-11 space-y-2">
                            <p>
                                Para acceder a ciertas funciones, debes crear una cuenta. Eres responsable de:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li className="flex items-start"><span className="text-cyan-600 font-bold mr-2">•</span> Mantener la confidencialidad de tu contraseña.</li>
                                <li className="flex items-start"><span className="text-cyan-600 font-bold mr-2">•</span> Proporcionar información precisa y actualizada.</li>
                                <li className="flex items-start"><span className="text-cyan-600 font-bold mr-2">•</span> Notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="bg-gradient-to-r from-cyan-50/30 to-slate-50 p-6 rounded-xl border-2 border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md">3</span>
                            Reservas y Cancelaciones
                        </h2>
                        <div className="text-slate-700 leading-relaxed pl-11 space-y-2">
                            <p>
                                Las reservas realizadas a través de Cloufit están sujetas a la disponibilidad de la tienda.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li className="flex items-start"><span className="text-teal-600 font-bold mr-2">•</span> Tienes un plazo de 24 horas para acudir a la tienda tras la confirmación.</li>
                                <li className="flex items-start"><span className="text-teal-600 font-bold mr-2">•</span> Debes cancelar tu reserva si no puedes asistir para liberar el stock.</li>
                                <li className="flex items-start"><span className="text-teal-600 font-bold mr-2">•</span> El incumplimiento reiterado de las reservas puede resultar en la suspensión de tu cuenta.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="bg-gradient-to-r from-slate-50 to-teal-50/30 p-6 rounded-xl border-2 border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md">4</span>
                            Propiedad Intelectual
                        </h2>
                        <p className="text-slate-700 leading-relaxed pl-11">
                            El servicio y su contenido original (excluyendo el contenido proporcionado por los usuarios y tiendas), características y funcionalidad son y seguirán siendo propiedad exclusiva de Cloufit y sus licenciantes.
                        </p>
                    </section>

                    <section className="bg-gradient-to-r from-cyan-50/30 to-teal-50/30 p-6 rounded-xl border-2 border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md">5</span>
                            Cambios en los Términos
                        </h2>
                        <p className="text-slate-700 leading-relaxed pl-11">
                            Nos reservamos el derecho de modificar o reemplazar estos términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes de que entren en vigor los nuevos términos.
                        </p>
                    </section>

                    <div className="border-t-2 border-gray-200 pt-8 mt-8 bg-gradient-to-r from-cyan-50 to-teal-50 p-6 rounded-xl">
                        <p className="text-slate-600 text-sm text-center">
                            Si tienes alguna duda sobre estos términos, contáctanos en <a href="mailto:legal@cloufit.com" className="text-cyan-600 font-semibold hover:text-cyan-700 hover:underline">legal@cloufit.com</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TermsPage;
