import { X, Package, Store } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateItem } from '../../store/slices/reservationSlice';
import { useState } from 'react';

const OutfitDetailModal = ({ outfit, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [addingProduct, setAddingProduct] = useState(null);
  const [addingAll, setAddingAll] = useState(false);

  if (!isOpen || !outfit) return null;

  const totalPrice = outfit.products?.reduce((sum, p) => sum + (p.productPrice || p.price || 0), 0) || 0;

  // Función para agregar un producto individual a la cesta
  const handleAddToReservation = async (product) => {
    console.log('🔍 Producto completo recibido:', product);
    
    if (!user?.clientId) {
      alert('Por favor inicia sesión para agregar productos a tu cesta');
      return;
    }

    // Mapear los campos correctamente del producto del outfit
    const productId = product.productId || product.idProduct || product.id;
    const storeId = product.storeId || product.idStore;

    console.log('🔍 IDs mapeados:', { productId, storeId });

    if (!productId) {
      console.error('❌ No se pudo encontrar el productId en:', product);
      alert('❌ Error: Este producto no tiene un ID válido');
      return;
    }

    if (!storeId) {
      console.error('❌ No se pudo encontrar el storeId en:', product);
      alert('❌ Error: Este producto no tiene una tienda asociada');
      return;
    }

    setAddingProduct(productId);
    
    try {
      await dispatch(addOrUpdateItem({
        clientId: user.clientId,
        storeId: storeId,
        product: {
          idProduct: productId,
          storeId: storeId,
          name: product.productName || product.name,
          price: product.productPrice || product.price,
          imageUrl: product.productImageUrl || product.imageUrl,
        },
        quantity: 1
      })).unwrap();
      
      alert(`✅ "${product.productName || product.name}" agregado a tu cesta de reserva`);
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('❌ Error al agregar el producto. Inténtalo de nuevo.');
    } finally {
      setAddingProduct(null);
    }
  };

  // Función para agregar todos los productos del outfit
  const handleAddAllToReservation = async () => {
    if (!user?.clientId) {
      alert('Por favor inicia sesión para agregar productos a tu cesta');
      return;
    }

    if (!outfit.products || outfit.products.length === 0) {
      alert('Este outfit no tiene productos');
      return;
    }

    setAddingAll(true);

    try {
      let successCount = 0;
      // Agregar cada producto secuencialmente
      for (const product of outfit.products) {
        const productId = product.productId || product.idProduct || product.id;
        const storeId = product.storeId || product.idStore;

        if (!productId || !storeId) {
          console.warn('⚠️ Producto sin ID válido, saltando:', product);
          continue;
        }

        await dispatch(addOrUpdateItem({
          clientId: user.clientId,
          storeId: storeId,
          product: {
            idProduct: productId,
            storeId: storeId,
            name: product.productName || product.name,
            price: product.productPrice || product.price,
            imageUrl: product.productImageUrl || product.imageUrl,
          },
          quantity: 1
        })).unwrap();
        
        successCount++;
      }
      
      if (successCount > 0) {
        alert(`✅ Outfit: ${successCount} de ${outfit.products.length} prendas agregadas a tu cesta de reserva`);
        onClose(); // Cerrar el modal después de agregar todo
      } else {
        alert('❌ No se pudo agregar ningún producto del outfit');
      }
    } catch (error) {
      console.error('Error al agregar outfit completo:', error);
      alert('❌ Error al agregar algunos productos. Inténtalo de nuevo.');
    } finally {
      setAddingAll(false);
    }
  };

  return (
    <>
      {/* Overlay oscuro */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-2">{outfit.outfitName || 'Mi Outfit'}</h2>
            <p className="text-purple-100 text-sm">
              {outfit.gender} • {outfit.climate || 'Clima variado'} • {outfit.style || 'Estilo casual'}
            </p>
          </div>

          {/* Body - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* COLUMNA IZQUIERDA: Imagen + Descripción */}
              <div className="space-y-4">
                {/* Imagen del outfit */}
                {outfit.imageUrl && (
                  <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                    <img 
                      src={outfit.imageUrl} 
                      alt={outfit.outfitName}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="hidden w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center text-gray-400"
                    >
                      <span>Imagen no disponible</span>
                    </div>
                  </div>
                )}

                {/* Descripción del outfit */}
                {outfit.description && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="text-xl mr-2">💡</span>
                      Por qué funciona este outfit
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {outfit.description}
                    </p>
                  </div>
                )}

                {/* Accesorio sugerido */}
                {outfit.accessory && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="text-xl mr-2">💼</span>
                      Accesorio recomendado
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {outfit.accessory}
                    </p>
                  </div>
                )}
              </div>

              {/* COLUMNA DERECHA: Productos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Productos ({outfit.products?.length || 0})
                  </h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-primary-600">
                      ${totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Lista de productos */}
                <div className="space-y-3">
                  {outfit.products?.map((product, index) => (
                    <div 
                      key={index}
                      className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        {/* Imagen del producto */}
                        <div className="flex-shrink-0">
                          {product.productImageUrl || product.imageUrl ? (
                            <img 
                              src={product.productImageUrl || product.imageUrl}
                              alt={product.productName || product.name}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                              Sin imagen
                            </div>
                          )}
                        </div>

                        {/* Info del producto */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1 truncate">
                            {product.productName || product.name}
                          </h4>
                          
                          <div className="flex flex-wrap gap-2 mb-2">
                            {product.storeName && (
                              <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                <Store className="w-3 h-3 mr-1" />
                                {product.storeName}
                              </span>
                            )}
                            {product.garmentType && (
                              <span className="inline-flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                👔 {product.garmentType}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <p className="text-lg font-bold text-primary-600">
                              ${(product.productPrice || product.price || 0).toLocaleString()}
                            </p>

                            {/* Botón para agregar a cesta */}
                            <button
                              onClick={() => handleAddToReservation(product)}
                              disabled={addingProduct === (product.productId || product.idProduct)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                addingProduct === (product.productId || product.idProduct)
                                  ? 'bg-gray-300 text-gray-500 cursor-wait'
                                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105'
                              }`}
                            >
                              <Package className="w-4 h-4" />
                              {addingProduct === (product.productId || product.idProduct) ? 'Agregando...' : 'A Cesta'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Botones de acción */}
          <div className="bg-gray-50 border-t px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Cerrar
            </button>
            
            <button
              onClick={handleAddAllToReservation}
              disabled={addingAll || !outfit.products || outfit.products.length === 0}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                addingAll
                  ? 'bg-gray-300 text-gray-500 cursor-wait'
                  : outfit.products && outfit.products.length > 0
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700 hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Package className="w-5 h-5" />
              {addingAll ? 'Agregando Outfit...' : `Agregar Outfit Completo (${outfit.products?.length || 0})`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutfitDetailModal;