import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-gray-300 border-t border-teal-700/50">
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
                <img
                  src="/src/assets/logoKevin2.png"
                  alt="Cloufit logo"
                  className="h-24 w-auto md:h-32 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-cyan-400 transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-cyan-400 transition-colors">
                  Almacenes
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-cyan-400 transition-colors">
                  IA Asistente
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-semibold text-white mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="hover:text-cyan-400 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-cyan-400 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-cyan-400 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Pasto, Nariño, Colombia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>+57 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>contacto@cloufit.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-teal-700/50 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Cloufit. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;