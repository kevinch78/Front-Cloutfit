import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const StorePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Tienda #{id}</h2>
          <p className="text-gray-600 mb-6">Esta funcionalidad estará disponible pronto</p>
          <Button onClick={() => navigate('/stores')}>
            Ver Todas las Tiendas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StorePage;