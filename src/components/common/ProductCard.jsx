import { Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateItem } from '../../store/slices/reservationSlice';
import Card from './Card';
import Button from './Button';

const ProductCard = ({ product, showActions = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleCardClick = () => {
    navigate(`/product/${product.idProduct}`);
  };

  const handleAddToReservation = async (e) => {
    e.stopPropagation(); // Evita que se active el click del card
    
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para hacer una reserva');
      navigate('/login');
      return;
    }

    if (!user?.clientId) {
      alert('Solo los clientes pueden hacer reservas');
      return;
    }

    if (product.stock === 0) return;

    try {
      await dispatch(addOrUpdateItem({
        clientId: user.clientId,
        storeId: product.storeId,
        product: product,
        quantity: 1
      })).unwrap();
      
      alert('Producto añadido a tu cesta de reserva');
    } catch (error) {
      console.error('Error al añadir a reserva:', error);
      alert(error || 'Error al añadir a la reserva');
    }
  };

  return (
    <Card hover className="group">
      {/* Área clickeable para navegar al detalle */}
      <div onClick={handleCardClick} className="cursor-pointer">
        {/* Imagen del Producto */}
        <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Box className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Sin imagen</p>
              </div>
            </div>
          )}
          
          {/* Badge de stock bajo */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              ¡Solo {product.stock}!
            </div>
          )}
          
          {/* Badge de agotado */}
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Agotado
            </div>
          )}
        </div>

        {/* Información del Producto */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
          {product.name}
        </h3>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {product.style && (
            <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full">
              {product.style}
            </span>
          )}
          {product.climate && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              {product.climate}
            </span>
          )}
          {product.gender && (
            <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
              {product.gender}
            </span>
          )}
        </div>

        {/* Precio */}
        <p className="text-cyan-600 font-bold text-xl mb-3">
          ${product.price?.toLocaleString()}
        </p>
      </div>

      {/* Botones de Acción - Fuera del área clickeable */}
      {showActions && (
        <div className="mt-4">
          <Button
            variant="primary"
            fullWidth
            onClick={handleAddToReservation}
            disabled={product.stock === 0}
            icon={<Box className="w-4 h-4" />}
          >
            {product.stock === 0 ? 'Agotado' : 'Añadir a la Cesta'}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
