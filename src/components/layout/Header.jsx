import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Sparkles,
  LogOut,
  Settings,
  Package,
  Store as StoreIcon,
} from "lucide-react";
import { logout } from "../../store/slices/authSlice";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ ESTADO DE REDUX (NO SIMULADO)
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const cartItemsCount = items.length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${searchQuery}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/catalog" },
    { name: "Almacenes", path: "/stores" },
    { name: "Sobre nosotros", path: "/about" },
  ];

  return (
    <header className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white shadow-lg sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3">
            <div className="container-custom">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link
                  to="/"
                  className="flex items-center space-x-2 md:space-x-3"
                >
                  {/* SOLO EL LOGO */}
                  <img
                    src="/src/assets/logo.png"
                    alt="Cloufit logo"
                    className="w-20 h-20 md:w-12 md:h-12 object-contain"
                  />

                  {/* Texto Cloufit */}
                  <span className="font-bold text-xl md:text-2xl hidden sm:block">
                    Cloufit
                  </span>
                </Link>
              </div>
            </div>
          </Link>

          {/* Mobile Search - Mobile */}

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos, tiendas y más..."
                className="w-full px-4 py-2 pl-10 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-primary-200 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* AI Button */}
            <Link
              to="/ai-assistant"
              className="hidden md:flex items-center space-x-2 bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all hover:scale-105 font-medium"
            >
              <Sparkles className="w-5 h-5" />
              <span className="hidden xl:inline">IA Moda</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-primary-600 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 hover:bg-primary-600 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="hidden md:block text-sm font-medium max-w-[120px] truncate">
                    {user?.email?.split("@")[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <p className="text-sm text-gray-500">Hola,</p>
                    <p className="font-medium text-gray-900 truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs text-primary-600 font-semibold mt-1">
                      {role === "ADMIN" && "👑 Administrador"}
                      {role === "VENDOR" && "🏪 Vendedor"}
                      {role === "CLIENT" && "👤 Cliente"}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {/* Para TODOS los usuarios */}
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Mi Perfil
                    </Link>

                    {/* Solo para CLIENT */}
                    {role === "CLIENT" && (
                      <>
                        <Link
                          to="/closet"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Package className="w-4 h-4 mr-3" />
                          Mi Ropero
                        </Link>
                        <Link
                          to="/ai-assistant"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Sparkles className="w-4 h-4 mr-3" />
                          Asistente IA
                        </Link>
                      </>
                    )}

                    {/* Solo para VENDOR */}
                    {role === "VENDOR" && (
                      <>
                        <Link
                          to="/seller/dashboard"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Package className="w-4 h-4 mr-3" />
                          Mi Dashboard
                        </Link>
                        <Link
                          to="/seller/store"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <StoreIcon className="w-4 h-4 mr-3" />
                          Mi Tienda
                        </Link>
                        <Link
                          to="/seller/products"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Package className="w-4 h-4 mr-3" />
                          Mis Productos
                        </Link>
                      </>
                    )}

                    {/* Solo para ADMIN */}
                    {role === "ADMIN" && (
                      <>
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Panel Admin
                        </Link>
                        <Link
                          to="/admin/stores"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <StoreIcon className="w-4 h-4 mr-3" />
                          Todas las Tiendas
                        </Link>
                        <Link
                          to="/admin/products"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Package className="w-4 h-4 mr-3" />
                          Todos los Productos
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Logout Button */}
                  <div className="border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all font-medium"
              >
                Iniciar Sesión
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-primary-600 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 pl-10 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary-800 border-t border-primary-600 animate-slide-up">
          <nav className="container-custom py-4 space-y-2">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 hover:bg-primary-700 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* AI Button Mobile */}
            <Link
              to="/ai-assistant"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-4 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
            >
              <Sparkles className="w-5 h-5" />
              <span>IA Asistente de Moda</span>
            </Link>

            {/* User Menu Mobile */}
            {isAuthenticated ? (
              <div className="space-y-2 pt-4 border-t border-primary-700">
                <div className="px-4 py-2">
                  <p className="text-sm text-primary-200">Hola,</p>
                  <p className="font-semibold">{user?.email}</p>
                  <p className="text-xs text-primary-300 mt-1">
                    {role === "ADMIN" && "👑 Administrador"}
                    {role === "VENDOR" && "🏪 Vendedor"}
                    {role === "CLIENT" && "👤 Cliente"}
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Mi Perfil
                </Link>

                {role === "CLIENT" && (
                  <>
                    <Link
                      to="/closet"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Mi Ropero
                    </Link>
                  </>
                )}

                {role === "VENDOR" && (
                  <>
                    <Link
                      to="/seller/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Mi Dashboard
                    </Link>
                    <Link
                      to="/seller/store"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                      <StoreIcon className="w-5 h-5 mr-3" />
                      Mi Tienda
                    </Link>
                    <Link
                      to="/seller/products"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Mis Productos
                    </Link>
                  </>
                )}

                {role === "ADMIN" && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      Panel Admin
                    </Link>
                    <Link
                      to="/admin/stores"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                      <StoreIcon className="w-5 h-5 mr-3" />
                      Todas las Tiendas
                    </Link>
                    <Link
                      to="/admin/products"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Todos los Productos
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-3 text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 bg-white text-primary-600 rounded-lg text-center hover:bg-primary-50 transition-colors font-medium"
              >
                Iniciar Sesión
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
