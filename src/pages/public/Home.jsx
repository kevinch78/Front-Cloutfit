import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Store, Zap } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { productService } from '../../services/productService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    const result = await productService.getAllProducts();
    if (result.success) {
      // Tomar solo los primeros 8 productos
      setFeaturedProducts(result.data.slice(0, 8));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-32 translate-y-32"></div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="text-center lg:text-left animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                ¿Sin Ideas? ✨
                <br />
                <span className="text-primary-200">¡La IA Crea tu Outfit Perfecto!</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-100 mb-8">
                Encuentra combinaciones únicas para cualquier ocasión con nuestra inteligencia artificial. 🎨👔
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/ai-assistant">
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<Sparkles className="w-6 h-6" />}
                    className="bg-white text-primary-600 hover:bg-primary-50"
                  >
                    Probar IA Gratis
                  </Button>
                </Link>
                <Link to="/catalog">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Ver Catálogo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Modal Preview IA */}
            <div className="hidden lg:block animate-fade-in animation-delay-400">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-6 h-6 text-primary-200" />
                  <h3 className="text-xl font-bold">¡Crea tu Outfit Ideal!</h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked readOnly className="rounded" />
                    <span className="text-sm">Hombre</span>
                    <input type="checkbox" className="rounded ml-4" />
                    <span className="text-sm">Mujer</span>
                  </div>
                  
                  <textarea
                    placeholder="Dime cómo quieres tu outfit (ej: 'Algo formal para clima frío') 🔥"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white/90 placeholder-gray-500 resize-none"
                    rows="3"
                    readOnly
                  />
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Generar Outfit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ¿Por qué Cloufit?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">IA Inteligente</h3>
                <p className="text-gray-600">
                  Nuestra IA analiza tu estilo y crea outfits personalizados para ti
                </p>
              </div>
            </Card>

            <Card hover>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Múltiples Tiendas</h3>
                <p className="text-gray-600">
                  Accede a productos de diferentes almacenes en un solo lugar
                </p>
              </div>
            </Card>

            <Card hover>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Súper Rápido</h3>
                <p className="text-gray-600">
                  Encuentra lo que buscas en segundos con nuestros filtros inteligentes
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Nuestros Productos</h2>
            <Link to="/catalog">
              <Button variant="outline">Ver Todos</Button>
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No hay productos destacados disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.idProduct} hover>
                  <Link to={`/product/${product.idProduct}`}>
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Sin imagen
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                      {product.style}
                    </p>
                    <p className="text-primary-600 font-bold text-xl">
                      ${product.price?.toLocaleString()}
                    </p>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-16 md:py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Descubrir tu Estilo?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Únete a Cloufit y deja que nuestra IA te ayude a verte increíble todos los días
          </p>
          <Link to="/register">
            <Button
              variant="secondary"
              size="lg"
              icon={<Sparkles className="w-6 h-6" />}
              className="bg-white text-primary-600 hover:bg-primary-50"
            >
              Comenzar Gratis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;