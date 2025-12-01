import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ idProduct: productId, quantity: newQuantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    alert('Funcionalidad de pago próximamente disponible');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Carrito de Compras
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-gray-600 mb-6">
              Explora nuestro catálogo y encuentra productos increíbles
            </p>
            <Button onClick={() => navigate('/catalog')}>
              Ir al Catálogo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.idProduct} padding={false}>
                  <div className="p-4 flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📦
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.style}</p>
                      <p className="text-primary-600 font-bold text-xl">
                        ${item.price?.toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(item.idProduct, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.idProduct, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.idProduct)}
                          className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Subtotal:</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-primary-600">${total.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  icon={<ShoppingBag className="w-5 h-5" />}
                  onClick={handleCheckout}
                >
                  Proceder al Pago
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Compra segura y protegida
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;