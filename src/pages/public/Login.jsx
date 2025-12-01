import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Si ya está autenticado, redirigir
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    dispatch(loginStart());

    const result = await authService.login({ email, password });

    if (result.success) {
      console.log('✅ Login exitoso:', result.user);
      
      // Actualizar Redux
      dispatch(loginSuccess({ token: result.token, user: result.user }));
      
      // Redirigir según rol
      const route = getDefaultRoute(result.user);
      const from = location.state?.from?.pathname || route;
      
      console.log(`🚀 Redirigiendo a: ${from}`);
      navigate(from, { replace: true });
    } else {
      console.error('❌ Login fallido:', result.error);
      setError(result.error);
      dispatch(loginFailure(result.error));
    }

    setLoading(false);
  };

  // Función para determinar ruta por defecto según rol
  const getDefaultRoute = (user) => {
    const { role, storeId, clientId } = user;

    switch (role) {
      case 'ADMIN':
        return '/admin/dashboard';
      
      case 'VENDOR':
        // Si tiene storeId, ir a su dashboard de tienda
        if (storeId) {
          return `/store/${storeId}/dashboard`;
        }
        return '/seller/dashboard'; // Fallback
      
      case 'CLIENT':
        // Si tiene clientId, ir a su perfil
        if (clientId) {
          return '/client/dashboard';
        }
        return '/'; // Fallback
      
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decoraciones de fondo */}
      <div className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 bg-primary-400 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 md:w-64 md:h-64 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse-slow animation-delay-1000"></div>

      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative z-10 animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Bienvenido a Cloufit
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Inicia sesión para descubrir tu estilo perfecto
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
              label="Correo Electrónico"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-5 h-5" />}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 rounded" />
                <span className="text-gray-600">Recordarme</span>
              </label>
              <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              icon={!loading && <Sparkles className="w-5 h-5" />}
            >
              Iniciar Sesión
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">o</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-600 text-sm md:text-base">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              Regístrate gratis
            </Link>
          </p>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              💡 <strong>Prueba la IA:</strong> Regístrate y descubre outfits únicos creados especialmente para ti
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;