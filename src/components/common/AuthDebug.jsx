import { useSelector } from 'react-redux';
import { authService } from '../../services/authService';

const AuthDebug = () => {
  const auth = useSelector((state) => state.auth);
  
  // Solo mostrar en desarrollo
  if (import.meta.env.MODE !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50 shadow-2xl">
      <div className="font-bold mb-2">🔐 Auth Debug</div>
      <div className="space-y-1">
        <div>
          <span className="text-gray-400">Autenticado:</span>{' '}
          <span className={auth.isAuthenticated ? 'text-green-400' : 'text-red-400'}>
            {auth.isAuthenticated ? '✅ Sí' : '❌ No'}
          </span>
        </div>
        <div>
          <span className="text-gray-400">Email:</span>{' '}
          <span className="text-blue-400">{auth.user?.email || 'N/A'}</span>
        </div>
        <div>
          <span className="text-gray-400">Rol:</span>{' '}
          <span className="text-purple-400">{auth.role || 'N/A'}</span>
        </div>
        <div>
          <span className="text-gray-400">Token:</span>{' '}
          <span className="text-yellow-400">
            {authService.getToken() ? '✅ Presente' : '❌ No hay'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;