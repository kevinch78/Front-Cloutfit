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

// Client Pages
import AIAssistant from '../pages/client/AIAssistant';
import MyCloset from '../pages/client/MyCloset';
import Cart from '../pages/client/Cart';
import Profile from '../pages/client/Profile';

// Seller Pages
// import SellerDashboard from '../pages/seller/Dashboard';
// import MyStore from '../pages/seller/MyStore';
// import MyProducts from '../pages/seller/MyProducts';
import VendorDashboard from '../pages/seller/VendorDashboard';
import CreateProduct from '../pages/seller/CreateProduct';
import MyProducts from '../pages/seller/MyProducts';
// import MyProducts from '../pages/seller/MyProducts';
// import MyStore from '../pages/seller/MyStore';


// Admin Pages
// import AdminDashboard from '../pages/admin/Dashboard';
// import AllStores from '../pages/admin/AllStores';
// import AllProducts from '../pages/admin/AllProducts';

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

      {/* Client Routes (Any authenticated user) */}
      <Route
        path="/ai-assistant"
        element={<AIAssistant />}
      />
      <Route
        path="/closet"
        element={
            <MyCloset />
        }
      />
      <Route
        path="/cart"
        element={
            <Cart />
        }        
      />
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

      {/* Admin Routes */}
      {/* <Route
        path="/admin/dashboard"
        element={
          <RoleRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </RoleRoute>
        }
      /> */}
      {/* <Route
        path="/admin/stores"
        element={
          <RoleRoute allowedRoles={['ADMIN']}>
            <AllStores />
          </RoleRoute>
        }
      /> */}
      {/* <Route
        path="/admin/products"
        element={
          <RoleRoute allowedRoles={['ADMIN']}>
            <AllProducts />
          </RoleRoute>
        }
      /> */}

      {/* 404 */}
      <Route path="*" element={<div className="container-custom py-20 text-center"><h1 className="text-4xl font-bold">404 - Página no encontrada</h1></div>} />
    </Routes>
  );
};

export default AppRoutes;