import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-bold text-xl text-white">Cloufit</span>
            </div>
            <p className="text-sm mb-4">
              Tu plataforma de moda inteligente. Encuentra el outfit perfecto con ayuda de nuestra IA.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-primary-400 transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-primary-400 transition-colors">
                  Almacenes
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-primary-400 transition-colors">
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
                <Link to="/faq" className="hover:text-primary-400 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary-400 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
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
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Pasto, Nariño, Colombia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+57 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>contacto@cloufit.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Cloufit. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;