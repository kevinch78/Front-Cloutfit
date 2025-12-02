import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles } from 'lucide-react';
import { authService } from '../../services/authService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CLIENT', // Por defecto CLIENT
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    const result = await authService.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });

    if (result.success) {
      // Registro exitoso, redirigir a login
      navigate('/login', {
        state: { message: 'Registro exitoso. Por favor inicia sesión.' }
      });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decoraciones */}
      <div className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 bg-cyan-400 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 md:w-64 md:h-64 bg-teal-300 rounded-full opacity-20 blur-3xl animate-pulse-slow animation-delay-1000"></div>

      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative z-10 animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-2xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Únete a Cloufit
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Crea tu cuenta y descubre tu estilo con IA
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nombre Completo"
              name="name"
              type="text"
              placeholder="Juan Pérez"
              value={formData.name}
              onChange={handleChange}
              icon={<User className="w-5 h-5" />}
              required
            />

            <Input
              label="Correo Electrónico"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              icon={<Lock className="w-5 h-5" />}
              required
            />

            <Input
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={<Lock className="w-5 h-5" />}
              required
            />

            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">
                Tipo de Cuenta
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 bg-white text-sm md:text-base"
              >
                <option value="CLIENT">Usuario (Comprador)</option>
                <option value="VENDOR">Vendedor (Tengo una tienda)</option>
              </select>
              <p className="mt-2 text-xs text-gray-500">
                {formData.role === 'CLIENT' 
                  ? '✨ Podrás usar la IA para crear outfits increíbles'
                  : '🏪 Podrás gestionar tu tienda y productos'
                }
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              icon={!loading && <Sparkles className="w-5 h-5" />}
            >
              Crear Cuenta
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">o</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm md:text-base">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-cyan-600 hover:text-cyan-700 font-semibold">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;