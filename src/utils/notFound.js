import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Volver
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            icon={<Home className="w-5 h-5" />}
          >
            Ir al Inicio
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda? Contacta con soporte
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;