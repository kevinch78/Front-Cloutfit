import React from 'react';
import { Sparkles, ShoppingBag, Users, Globe, Heart, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-primary-900/90 mix-blend-multiply" />
                    <img
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
                        alt="Fashion Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <div className="relative container-custom py-24 md:py-32 text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20 animate-fade-in">
                        <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-sm font-medium tracking-wide">Revolucionando la Moda Local</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-slide-up">
                        El Futuro del <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Shopping Local</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up animation-delay-200">
                        Conectamos tu estilo con las mejores tiendas de tu ciudad a través de inteligencia artificial y una experiencia de reserva única.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
                        <Link to="/catalog" className="btn-primary text-lg px-8 py-4">
                            Explorar Catálogo
                        </Link>
                        <Link to="/register" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg font-bold hover:bg-white/20 transition-all text-lg">
                            Únete a Cloufit
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-primary-600 hover:transform hover:scale-105 transition-all duration-300">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                    <Globe className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Nuestra Misión</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Democratizar la tecnología para el comercio local, permitiendo que las tiendas de barrio compitan en la era digital y ofreciendo a los usuarios una forma inteligente y sostenible de descubrir moda.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-purple-600 hover:transform hover:scale-105 transition-all duration-300">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Nuestra Visión</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Ser la plataforma líder en Latinoamérica que fusiona la experiencia física y digital (phygital), donde la IA personaliza cada interacción y la moda local florece.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl opacity-20 blur-xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                                alt="Vision"
                                className="relative rounded-2xl shadow-2xl w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué Cloufit?</h2>
                        <p className="text-lg text-gray-600">
                            No somos solo un marketplace. Somos tu asistente de estilo personal y el mejor aliado para el comercio local.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Sparkles className="w-8 h-8 text-purple-500" />,
                                title: "IA Personal Stylist",
                                desc: "Nuestro algoritmo aprende de tus gustos y te sugiere outfits completos basados en tu estilo, clima y ocasión."
                            },
                            {
                                icon: <ShoppingBag className="w-8 h-8 text-primary-500" />,
                                title: "Reserva y Prueba",
                                desc: "Olvídate de las devoluciones. Reserva tus prendas favoritas online y pruébatelas en la tienda antes de comprar."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-pink-500" />,
                                title: "Comunidad Local",
                                desc: "Apoya a los emprendedores de tu ciudad. Descubre marcas únicas que no encontrarás en los grandes centros comerciales."
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
                                title: "Compra Segura",
                                desc: "Garantizamos la seguridad de tus transacciones y la calidad de los comercios afiliados a nuestra red."
                            },
                            {
                                icon: <Heart className="w-8 h-8 text-red-500" />,
                                title: "Wishlist Inteligente",
                                desc: "Guarda lo que te gusta y recibe alertas cuando baje de precio o cuando haya poco stock."
                            },
                            {
                                icon: <Globe className="w-8 h-8 text-blue-500" />,
                                title: "Moda Sostenible",
                                desc: "Fomentamos el consumo consciente y local, reduciendo la huella de carbono de los envíos masivos."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="container-custom relative text-center z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">¿Listo para transformar tu estilo?</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Únete a miles de usuarios que ya están descubriendo la mejor moda de su ciudad con Cloufit.
                    </p>
                    <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-900 bg-white rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                        Comenzar Ahora
                        <Sparkles className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
