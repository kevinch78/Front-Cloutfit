import { X, ShoppingCart, Store } from 'lucide-react';

const OutfitDetailModal = ({ outfit, isOpen, onClose }) => {
  if (!isOpen || !outfit) return null;

  const totalPrice = outfit.products?.reduce((sum, p) => sum + (p.productPrice || p.price || 0), 0) || 0;

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

                            {/* Botón de adorno (no hace nada) */}
                            <button
                              className="flex items-center gap-2 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                              disabled
                              title="Próximamente"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Agregar
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
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
              disabled
              title="Próximamente"
            >
              <ShoppingCart className="w-5 h-5" />
              Agregar Outfit Completo (Próximamente)
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutfitDetailModal;