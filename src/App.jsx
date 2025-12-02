import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { restoreAuth } from './store/slices/authSlice';
import { fetchActiveReservation } from './store/slices/reservationSlice';
import { restoreSession } from './utils/authUtils';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

import AIFloatingButton from './components/common/AIFloatingButton';

// Componente interno que usa Redux
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restaurar sesión al cargar la aplicación
    const session = restoreSession();

    if (session.isValid) {
      dispatch(restoreAuth(session.data));

      // Restaurar también la reserva activa (carrito)
      console.log('🔍 DEBUG - Datos de sesión:', session.data);
      console.log('🔍 DEBUG - Usuario:', session.data.user);
      console.log('🔍 DEBUG - clientId:', session.data.user?.clientId);
      console.log('🔍 DEBUG - id:', session.data.user?.id);

      if (session.data.user?.clientId) {
        console.log('🛒 Restaurando cesta de reservas para clientId:', session.data.user.clientId);
        dispatch(fetchActiveReservation(session.data.user.clientId));
      } else if (session.data.user?.id) {
        console.log('🛒 Restaurando cesta de reservas para id:', session.data.user.id);
        dispatch(fetchActiveReservation(session.data.user.id));
      } else {
        console.warn('⚠️ No se encontró clientId ni id en el usuario');
      }

      console.log('✅ Sesión restaurada:', session.data.user);
    } else {
      console.log('ℹ️ No hay sesión activa');
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen relative">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
        {/* Botón Flotante de IA - Siempre visible */}
        <AIFloatingButton />
      </div>
    </BrowserRouter>
  );
};

// Componente principal con Provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;