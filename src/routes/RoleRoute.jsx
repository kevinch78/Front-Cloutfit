import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const location = useLocation();

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si no tiene el rol permitido, redirigir a home
  if (!allowedRoles.includes(role)) {
    console.warn(`Acceso denegado. Rol requerido: ${allowedRoles.join(', ')}, Rol actual: ${role}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;