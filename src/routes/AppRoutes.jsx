import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

// Public Pages
import Home from '../pages/public/Home';
import Catalog from '../pages/public/Catalog';
import ProductPage from '../pages/public/ProductPage';
import StorePage from '../pages/public/StorePage';
import StoresPage from '../pages/public/StoresPage';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import AboutPage from '../pages/public/AboutPage';
import FAQPage from '../pages/public/FAQPage';
import TermsPage from '../pages/public/TermsPage';
import PrivacyPage from '../pages/public/PrivacyPage';
import ContactPage from '../pages/public/ContactPage';

// Client Pages
import ReservationPage from '../pages/client/ReservationPage';
import MyReservationsPage from '../pages/client/MyReservationsPage';
import ReservationDetailPage from '../pages/client/ReservationDetailPage';
import AIAssistant from '../pages/client/AIAssistant';
import MyCloset from '../pages/client/MyCloset';
import Cart from '../pages/client/Cart';
import Profile from '../pages/client/Profile';

// Seller Pages
import VendorDashboard from '../pages/seller/VendorDashboard';
import CreateProduct from '../pages/seller/CreateProduct';
import MyProducts from '../pages/seller/MyProducts';
import MyStore from '../pages/seller/MyStore';

// Notifications
import NotificationsPage from '../pages/NotificationsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/store/:id" element={<StorePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Client Routes (Any authenticated user) */}
      <Route path="/ai-assistant" element={<AIAssistant />} />

      {/* Cesta de Reservas (Carrito Activo) */}
      <Route
        path="/reservation"
        element={
          <ProtectedRoute>
            <ReservationPage />
          </ProtectedRoute>
        }
      />

      {/* Historial de Reservas */}
      <Route
        path="/client/my-reservations"
        element={
          <ProtectedRoute>
            <MyReservationsPage />
          </ProtectedRoute>
        }
      />

      {/* Detalle de Reserva Específica */}
      <Route
        path="/client/reservation/:id"
        element={
          <ProtectedRoute>
            <ReservationDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Mi Ropero Virtual */}
      <Route
        path="/closet"
        element={
          <ProtectedRoute>
            <MyCloset />
          </ProtectedRoute>
        }
      />

      {/* Perfil de Usuario */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Seller Routes */}
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/MyProducts"
        element={
          <RoleRoute allowedRoles={['VENDOR']}>
            <MyProducts />
          </RoleRoute>
        }
      />
      <Route
        path="/seller/CreateProduct"
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <CreateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/store"
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <MyStore />
          </ProtectedRoute>
        }
      />

      {/* Notifications */}
      <Route path="/notifications" element={<NotificationsPage />} />

      {/* 404 - Debe ir al final */}
      <Route
        path="*"
        element={
          <div className="container-custom py-20 text-center">
            <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
