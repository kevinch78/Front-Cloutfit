import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Store, MapPin, Phone, Upload, Save } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { storeService } from '../../services/storeService';

const MyStore = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
    contact: '',
    owner: '',
    activeAdvertising: false,
    image: null,
  });

  useEffect(() => {
    if (user?.storeId) {
      loadMyStore();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadMyStore = async () => {
    try {
      const result = await storeService.getStoreById(user.storeId);
      if (result.success) {
        setFormData({
          name: result.data.name || '',
          description: result.data.description || '',
          city: result.data.city || '',
          address: result.data.address || '',
          contact: result.data.contact || '',
          owner: result.data.owner || '',
          activeAdvertising: result.data.activeAdvertising || false,
          image: null,
        });
        if (result.data.imageUrl) {
          setImagePreview(result.data.imageUrl);
        }
      }
    } catch (error) {
      console.error('Error al cargar tienda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          data.append(key, formData[key]);
        }
      });

      const result = await storeService.updateStore(user.storeId, data);

      if (result.success) {
        alert('✅ Tienda actualizada exitosamente');
        setEditing(false);
        loadMyStore();
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      alert('❌ Error al actualizar la tienda');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!user?.storeId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom max-w-4xl">
          <Card className="text-center py-16">
            <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No tienes una tienda asignada
            </h2>
            <p className="text-gray-600">
              Contacta al administrador para que te asigne una tienda.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mi Tienda</h1>
                <p className="text-gray-600">Gestiona la información de tu tienda</p>
              </div>
            </div>

            {!editing && (
              <Button
                variant="primary"
                onClick={() => setEditing(true)}
                icon={<Save className="w-5 h-5" />}
              >
                Editar
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Logo/Imagen de la Tienda */}
          <Card className="mb-6">
            <h2 className="text-xl font-bold mb-6">Logo de la Tienda</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Store className="w-12 h-12" />
                  </div>
                )}
              </div>

              {editing && (
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click para cambiar logo</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={!editing}
                    />
                  </label>
                </div>
              )}
            </div>
          </Card>

          {/* Información Básica */}
          <Card className="mb-6">
            <h2 className="text-xl font-bold mb-6">Información Básica</h2>
            <div className="space-y-4">
              <Input
                label="Nombre de la Tienda"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                icon={<Store className="w-5 h-5" />}
                disabled={!editing}
                required
              />

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="Describe tu tienda..."
                  disabled={!editing}
                />
              </div>

              <Input
                label="Propietario"
                name="owner"
                type="text"
                value={formData.owner}
                onChange={handleChange}
                disabled={!editing}
                required
              />
            </div>
          </Card>

          {/* Ubicación y Contacto */}
          <Card className="mb-6">
            <h2 className="text-xl font-bold mb-6">Ubicación y Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Ciudad"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                icon={<MapPin className="w-5 h-5" />}
                disabled={!editing}
                required
              />

              <Input
                label="Dirección"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                icon={<MapPin className="w-5 h-5" />}
                disabled={!editing}
                required
              />

              <Input
                label="Teléfono de Contacto"
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                icon={<Phone className="w-5 h-5" />}
                disabled={!editing}
                required
              />
            </div>
          </Card>

          {/* Publicidad */}
          <Card className="mb-6">
            <h2 className="text-xl font-bold mb-6">Publicidad</h2>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="activeAdvertising"
                checked={formData.activeAdvertising}
                onChange={handleChange}
                disabled={!editing}
                className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 disabled:opacity-50"
              />
              <div>
                <p className="font-medium text-gray-900">Publicidad Activa</p>
                <p className="text-sm text-gray-600">
                  Tu tienda aparecerá destacada en la página principal
                </p>
              </div>
            </div>
          </Card>

          {/* Botones de Acción */}
          {editing && (
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  loadMyStore();
                }}
                className="flex-1"
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={saving}
                icon={!saving && <Save className="w-5 h-5" />}
                className="flex-1"
              >
                Guardar Cambios
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyStore;