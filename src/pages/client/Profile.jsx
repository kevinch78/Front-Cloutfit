import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Lock, Save } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar actualización de perfil
    alert('Funcionalidad de actualización de perfil próximamente');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Mi Perfil
        </h1>

        <div className="space-y-6">
          {/* Información Personal */}
          <Card>
            <h2 className="text-xl font-bold mb-6">Información Personal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nombre Completo"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                icon={<User className="w-5 h-5" />}
              />

              <Input
                label="Correo Electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail className="w-5 h-5" />}
                disabled
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  icon={<Save className="w-5 h-5" />}
                >
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </Card>

          {/* Cambiar Contraseña */}
          <Card>
            <h2 className="text-xl font-bold mb-6">Cambiar Contraseña</h2>
            <form className="space-y-4">
              <Input
                label="Contraseña Actual"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                icon={<Lock className="w-5 h-5" />}
              />

              <Input
                label="Nueva Contraseña"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                icon={<Lock className="w-5 h-5" />}
              />

              <Input
                label="Confirmar Nueva Contraseña"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={<Lock className="w-5 h-5" />}
              />

              <Button
                type="submit"
                variant="outline"
                icon={<Lock className="w-5 h-5" />}
              >
                Actualizar Contraseña
              </Button>
            </form>
          </Card>

          {/* Estadísticas */}
          <Card>
            <h2 className="text-xl font-bold mb-6">Mis Estadísticas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <p className="text-3xl font-bold text-primary-600 mb-1">0</p>
                <p className="text-sm text-gray-600">Outfits Creados</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600 mb-1">0</p>
                <p className="text-sm text-gray-600">Productos Favoritos</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600 mb-1">0</p>
                <p className="text-sm text-gray-600">Pedidos</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;