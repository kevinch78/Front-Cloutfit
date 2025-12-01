import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Heart } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import OutfitDetailModal from '../client/OutfitDetailModal';
import { fetchOutfits, removeOutfitThunk } from '../../store/slices/closetSlice';

const MyCloset = () => {
  const dispatch = useDispatch();
  const { items: outfits, status, error } = useSelector((state) => state.closet);
  
  // Estado para el modal
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOutfits());
    }
  }, [status, dispatch]);

  const handleDelete = (outfitId, e) => {
    e.stopPropagation();
    
    if (confirm('¿Estás seguro de eliminar este outfit?')) {
      dispatch(removeOutfitThunk(outfitId));
    }
  };

  const handleOutfitClick = (outfit) => {
    setSelectedOutfit(outfit);
    setModalOpen(true);
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium">Error: {error}</p>
          <Button 
            onClick={() => dispatch(fetchOutfits())}
            className="mt-4"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 py-8">
      <div className="container-custom max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">👔</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Mi Ropero Virtual
          </h1>
          <p className="text-gray-600 text-lg">
            Tus outfits guardados y listos para usar
          </p>
        </div>

        {/* Empty State */}
        {outfits.length === 0 ? (
          <Card className="text-center py-16 max-w-2xl mx-auto">
            <div className="text-6xl mb-4 animate-bounce">👔</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Tu ropero está vacío
            </h3>
            <p className="text-gray-600 mb-6">
              Usa la IA para crear outfits increíbles y guárdalos aquí
            </p>
            <Button 
              onClick={() => window.location.href = '/ai-assistant'}
              size="lg"
            >
              Crear Outfit con IA ✨
            </Button>
          </Card>
        ) : (
          <>
            {/* Grid de Outfits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outfits.map((outfit) => (
                <div
                  key={outfit.outfitId}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
                  onClick={() => handleOutfitClick(outfit)}
                >
                  {/* Imagen del outfit */}
                  <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {outfit.imageUrl ? (
                      <>
                        <img
                          src={outfit.imageUrl}
                          alt={outfit.outfitName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full flex-col items-center justify-center text-gray-400">
                          <div className="text-4xl mb-2">✨</div>
                          <p className="text-sm">Outfit guardado</p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <div className="text-6xl mb-2">👕</div>
                        <p className="text-sm font-medium">Outfit guardado</p>
                      </div>
                    )}
                    
                    {/* Overlay en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium">
                          Click para ver detalles →
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Info del outfit */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                      {outfit.outfitName || 'Mi Outfit'}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {outfit.description || 'Outfit creado con IA'}
                    </p>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {outfit.gender && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                          {outfit.gender}
                        </span>
                      )}
                      {outfit.climate && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                          {outfit.climate}
                        </span>
                      )}
                      {outfit.style && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                          {outfit.style}
                        </span>
                      )}
                    </div>
                    
                    {/* Footer con info adicional */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                      <span className="flex items-center">
                        👕 {outfit.products?.length || 0} prendas
                      </span>
                      <span>
                        {new Date(outfit.createdAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Heart className="w-4 h-4" />}
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('💙 Favorito (próximamente)');
                        }}
                      >
                        Favorito
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash2 className="w-4 h-4" />}
                        onClick={(e) => handleDelete(outfit.outfitId, e)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Estadísticas del ropero */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {outfits.length}
                </div>
                <p className="text-sm text-gray-600">Outfits guardados</p>
              </Card>
              <Card className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {outfits.reduce((sum, o) => sum + (o.products?.length || 0), 0)}
                </div>
                <p className="text-sm text-gray-600">Prendas totales</p>
              </Card>
              <Card className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1">
                  {outfits.filter(o => o.imageUrl).length}
                </div>
                <p className="text-sm text-gray-600">Con visualización IA</p>
              </Card>
            </div>
          </>
        )}
        
        {/* Modal de Detalle */}
        <OutfitDetailModal
          outfit={selectedOutfit}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedOutfit(null);
          }}
        />
      </div>
    </div>
  );
};

export default MyCloset;