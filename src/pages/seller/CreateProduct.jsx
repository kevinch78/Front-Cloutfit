import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Package, Upload, Save, ArrowLeft } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { productService } from '../../services/productService';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Obtener storeId del usuario logueado
  const storeId = user?.storeId;
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    climate: 'Templado',
    gender: 'Unisex',
    occasion: 'Casual',
    material: '',
    subcategory: '',
    primaryColor: '',
    secondaryColors: '',
    image: null,
  });

  // Validar que el usuario tenga un storeId
  console.log('🚀 storeId:', storeId)
  if (!storeId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No tienes una tienda asignada
            </h2>
            <p className="text-gray-600 mb-6">
              Contacta al administrador para configurar tu tienda
            </p>
            <Button onClick={() => navigate(-1)}>
              Volver
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      // Crear el objeto productDto según lo que espera el backend
      const productDto = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        climate: formData.climate,
        gender: formData.gender,
        occasion: formData.occasion,
        material: formData.material,
        primaryColor: formData.primaryColor,
        secondaryColors: formData.secondaryColors,
        subcategory: formData.subcategory,
        storeId: storeId, // Del usuario logueado
      };

      console.log('📤 Creando producto:', productDto);

      // Crear FormData
      const data = new FormData();
      
      const productBlob = new Blob([JSON.stringify(productDto)], {
        type: 'application/json'
      });
      data.append('productDto', productBlob); // ✅ Correcto
      
      // Agregar la imagen si existe
      if (formData.image) {
        data.append('image', formData.image);
      }

      const result = await productService.createProduct(data);

      if (result.success) {
        alert('✅ Producto creado exitosamente');
        navigate('/seller/dashboard');
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      console.error('❌ Error al crear producto:', error);
      alert('❌ Error al crear producto: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Opciones para los selects
  const climates = ['Cálido', 'Frío', 'Templado'];
  const genders = ['Masculino', 'Femenino', 'Unisex'];
  const occasions = ['Casual', 'Formal', 'Deportivo', 'Fiesta', 'Trabajo','Elegante'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Crear Producto</h1>
                <p className="text-gray-600">Para tu tienda ID: {storeId}</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Información Básica */}
            <Card>
              <h2 className="text-xl font-bold mb-6">Información Básica</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Nombre del Producto *"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Camisa Casual Azul"
                    required
                  />
                </div>

                <Input
                  label="Precio (COP) *"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="50000"
                  required
                />

                <Input
                  label="Stock Disponible *"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="10"
                  required
                />

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Descripción *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe el producto..."
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Categorización */}
            <Card>
              <h2 className="text-xl font-bold mb-6">Categorización</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Clima *
                  </label>
                  <select
                    name="climate"
                    value={formData.climate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    {climates.map(climate => (
                      <option key={climate} value={climate}>{climate}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Género *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    {genders.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Ocasión *
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    {occasions.map(occasion => (
                      <option key={occasion} value={occasion}>{occasion}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Subcategoría"
                  name="subcategory"
                  type="text"
                  value={formData.subcategory}
                  onChange={handleChange}
                  placeholder="Ej: Camisas, Pantalones"
                />
              </div>
            </Card>

            {/* Detalles del Producto */}
            <Card>
              <h2 className="text-xl font-bold mb-6">Detalles del Producto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Material"
                  name="material"
                  type="text"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="Ej: Algodón, Poliéster"
                />

                <Input
                  label="Color Principal *"
                  name="primaryColor"
                  type="text"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  placeholder="Ej: Azul"
                  required
                />

                <Input
                  label="Colores Secundarios"
                  name="secondaryColors"
                  type="text"
                  value={formData.secondaryColors}
                  onChange={handleChange}
                  placeholder="Ej: Blanco, Negro"
                />

              </div>
            </Card>

            {/* Imagen del Producto */}
            <Card>
              <h2 className="text-xl font-bold mb-6">Imagen del Producto</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click para subir</span> o arrastra la imagen
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {imagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: null });
                    }}
                  >
                    Eliminar Imagen
                  </Button>
                )}
              </div>
            </Card>

            {/* Botones de Acción */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                icon={!loading && <Save className="w-5 h-5" />}
                className="flex-1"
              >
                Crear Producto
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;