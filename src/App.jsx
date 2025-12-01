import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { restoreAuth } from './store/slices/authSlice';
import { restoreSession } from './utils/authUtils';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

// Componente interno que usa Redux
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restaurar sesión al cargar la aplicación
    const session = restoreSession();
    
    if (session.isValid) {
      dispatch(restoreAuth(session.data));
      console.log('✅ Sesión restaurada:', session.data.user);
    } else {
      console.log('ℹ️ No hay sesión activa');
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
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