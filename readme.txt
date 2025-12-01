 Cloufit - Plataforma de Moda Inteligente con IA
📖 Descripción del Proyecto
Cloufit es una plataforma e-commerce de moda innovadora que utiliza Inteligencia Artificial para ayudar a los usuarios a descubrir su estilo perfecto. Similar a Mercado Libre, permite a múltiples tiendas publicar sus productos, mientras que los usuarios pueden explorar, reservar y crear outfits personalizados con ayuda de nuestra IA.
🌟 Características Principales

🤖 Asistente IA de Moda: Genera outfits personalizados basados en preferencias, clima y ocasión
🛍️ Multi-Tienda: Múltiples vendedores pueden gestionar sus productos
👔 Ropero Virtual: Guarda tus outfits favoritos generados por la IA
🔍 Búsqueda Avanzada: Filtros inteligentes por estilo, género, clima y precio
📱 100% Responsive: Diseño adaptado para móvil, tablet y desktop
🔐 Sistema de Roles: Cliente, Vendedor y Administrador


🏗️ Arquitectura del Proyecto
Stack Tecnológico
Frontend

⚛️ React 18 - Framework principal
⚡ Vite - Build tool ultrarrápido
🎨 Tailwind CSS - Diseño y estilos
🗄️ Redux Toolkit - Gestión de estado global
🛣️ React Router v6 - Navegación y rutas
🌐 Axios - Peticiones HTTP
🎭 Lucide React - Iconos modernos

Backend (Spring Boot)

☕ Java + Spring Boot
🔐 Spring Security + JWT
🤖 IA con Gemini (generación de outfits)
🗃️ PostgreSQL/MySQL (Base de datos)


📂 Estructura del Proyecto Frontend
cloufit-frontend/
├── public/                           # Archivos estáticos
│   └── logo-cloufit.svg             # Logo de la aplicación
│
├── src/
│   ├── api/                         # 🔌 Configuración de API
│   │   ├── axiosConfig.js          # Instancia de Axios + Interceptores
│   │   └── endpoints.js            # URLs organizadas por módulo
│   │
│   ├── services/                    # 🛠️ Lógica de negocio
│   │   ├── authService.js          # ✅ Login, Register, Logout
│   │   ├── productService.js       # ✅ CRUD productos
│   │   ├── storeService.js         # ⏳ CRUD tiendas (pendiente)
│   │   └── aiService.js            # ⏳ Chat IA (pendiente)
│   │
│   ├── store/                       # 🗄️ Redux Store
│   │   ├── index.js                # ✅ Store principal
│   │   └── slices/
│   │       ├── authSlice.js        # ✅ Autenticación (usuario, token, rol)
│   │       ├── productSlice.js     # ✅ Productos y filtros
│   │       ├── cartSlice.js        # ✅ Carrito de compras
│   │       └── closetSlice.js      # ✅ Ropero de outfits
│   │
│   ├── components/                  # 🧩 Componentes reutilizables
│   │   ├── common/
│   │   │   ├── Button.jsx          # ✅ Botón con variantes
│   │   │   ├── Input.jsx           # ✅ Input con validación
│   │   │   ├── Card.jsx            # ✅ Tarjeta genérica
│   │   │   ├── Modal.jsx           # ✅ Modal responsive
│   │   │   └── Loader.jsx          # ✅ Indicador de carga
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.jsx          # ✅ Navbar responsive con menú móvil
│   │   │   └── Footer.jsx          # ✅ Footer con links y contacto
│   │   │
│   │   ├── products/               # ⏳ Componentes de productos (pendiente)
│   │   │   ├── ProductCard.jsx    
│   │   │   ├── ProductGrid.jsx    
│   │   │   └── ProductFilters.jsx 
│   │   │
│   │   ├── ai/                     # ⏳ Componentes de IA (pendiente)
│   │   │   ├── ChatBot.jsx        
│   │   │   ├── OutfitCard.jsx     
│   │   │   └── OutfitModal.jsx    
│   │   │
│   │   └── store/                  # ⏳ Componentes de tienda (pendiente)
│   │       ├── StoreCard.jsx      
│   │       └── StoreForm.jsx      
│   │
│   ├── pages/                       # 📄 Páginas completas
│   │   ├── public/                 # Sin autenticación requerida
│   │   │   ├── Home.jsx            # ✅ Landing page con hero y productos
│   │   │   ├── Catalog.jsx         # ✅ Catálogo con filtros laterales
│   │   │   ├── ProductPage.jsx     # ✅ Detalle de producto
│   │   │   ├── StoresPage.jsx      # ✅ Lista de tiendas
│   │   │   ├── StorePage.jsx       # ✅ Detalle de tienda
│   │   │   ├── Login.jsx           # ✅ Inicio de sesión
│   │   │   └── Register.jsx        # ✅ Registro de usuario
│   │   │
│   │   ├── client/                 # Para usuarios autenticados (CLIENT)
│   │   │   ├── AIAssistant.jsx     # ✅ Chat con IA para outfits
│   │   │   ├── MyCloset.jsx        # ✅ Ropero virtual (outfits guardados)
│   │   │   ├── Cart.jsx            # ✅ Carrito de compras
│   │   │   └── Profile.jsx         # ✅ Perfil de usuario
│   │   │
│   │   ├── seller/                 # Para vendedores (SELLER)
│   │   │   ├── Dashboard.jsx       # ⏳ Panel principal del vendedor
│   │   │   ├── MyStore.jsx         # ⏳ Gestión de MI tienda
│   │   │   └── MyProducts.jsx      # ⏳ CRUD de MIS productos
│   │   │
│   │   └── admin/                  # Para administradores (ADMIN)
│   │       ├── Dashboard.jsx       # ⏳ Panel de administración
│   │       ├── AllStores.jsx       # ⏳ Gestión de TODAS las tiendas
│   │       └── AllProducts.jsx     # ⏳ Gestión de TODOS los productos
│   │
│   ├── routes/                      # 🛣️ Sistema de rutas
│   │   ├── AppRoutes.jsx           # ✅ Configuración de todas las rutas
│   │   ├── ProtectedRoute.jsx      # ✅ HOC para rutas privadas
│   │   └── RoleRoute.jsx           # ✅ HOC para rutas por rol
│   │
│   ├── hooks/                       # 🪝 Custom Hooks
│   │   ├── useAuth.js              # ⏳ Hook de autenticación
│   │   └── useProducts.js          # ⏳ Hook de productos
│   │
│   ├── utils/                       # 🔧 Utilidades
│   │   ├── validators.js           # ⏳ Validaciones
│   │   ├── formatters.js           # ⏳ Formateo de datos
│   │   └── constants.js            # ⏳ Constantes globales
│   │
│   ├── styles/
│   │   └── index.css               # ✅ Estilos globales + Tailwind
│   │
│   ├── App.jsx                      # ✅ Componente raíz
│   └── main.jsx                     # ✅ Entry point
│
├── .env                             # ✅ Variables de entorno
├── tailwind.config.js               # ✅ Configuración de Tailwind
├── postcss.config.js                # ✅ Configuración de PostCSS
├── vite.config.js                   # ✅ Configuración de Vite
├── package.json                     # ✅ Dependencias
└── README.md                        # 📖 Este archivo
Leyenda:

✅ = Completado y funcional
⏳ = Pendiente por implementar
🔄 = En desarrollo


🔗 Conexión Frontend ↔️ Backend
Configuración de API
El frontend se comunica con el backend a través de Axios configurado en src/api/axiosConfig.js:
javascript// URL base del backend (configurable en .env)
const API_BASE_URL = 'http://localhost:8080/api';

// Axios añade automáticamente el token JWT en cada petición
headers: {
  'Authorization': 'Bearer {token}'
}
Endpoints Utilizados
Los endpoints están organizados en src/api/endpoints.js y mapeados a servicios:
🔐 Autenticación (authService.js)
MétodoEndpointDescripciónServicioPOST/auth/registerRegistrar nuevo usuarioauthService.register()POST/auth/loginIniciar sesión (retorna JWT como texto plano)authService.login()
Ejemplo de uso:
javascript// En Login.jsx
import { authService } from '../../services/authService';

const result = await authService.login({ email, password });
// result.token → JWT string
// result.user → { email, role }

👕 Productos (productService.js)
MétodoEndpointDescripciónPúblicoServicioGET/productsListar todos los productos✅ SíproductService.getAllProducts()GET/products/{id}Obtener producto por ID✅ SíproductService.getProductById(id)POST/productsCrear producto❌ ADMINproductService.createProduct(data)DELETE/products/{id}Eliminar producto❌ ADMINproductService.deleteProduct(id)GET/products/style/{style}Filtrar por estilo✅ SíproductService.getProductsByStyle(style)GET/products/store/{storeId}Productos de una tienda✅ Sí-
Ejemplo de uso:
javascript// En Catalog.jsx
import { productService } from '../../services/productService';

const result = await productService.getAllProducts();
if (result.success) {
  setProducts(result.data);
}

🏪 Tiendas (storeService.js - ⏳ Pendiente)
MétodoEndpointDescripciónRol RequeridoPOST/storesCrear tiendaADMINGET/storesListar todas las tiendasADMINGET/stores/{id}Obtener tienda por IDADMINDELETE/stores/{id}Eliminar tiendaADMINGET/stores/name/{name}Buscar por nombreADMIN
Implementación pendiente:
javascript// src/services/storeService.js (por crear)
export const storeService = {
  getAllStores: async () => { /* ... */ },
  getStoreById: async (id) => { /* ... */ },
  createStore: async (data) => { /* ... */ },
  // etc...
};

🤖 IA - Generación de Outfits (aiService.js - ⏳ Pendiente)
MétodoEndpointDescripciónRol RequeridoGET/products/outfitGenerar outfit con filtrosCLIENTPOST/products/chatChat conversacional para outfitsADMIN
Parámetros de /products/outfit:

gender: Masculino, Femenino, Unisex
climate: Cálido, Frío, Templado
style: Casual, Formal, Deportivo, etc.
generateImage: true/false (generar imagen fotorealista)

Implementación pendiente:
javascript// src/services/aiService.js (por crear)
export const aiService = {
  generateOutfit: async (filters) => {
    // GET /products/outfit?gender=Masculino&climate=Frío...
  },
  chatWithAI: async (message) => {
    // POST /products/chat
  },
};
Uso esperado en AIAssistant.jsx:
javascriptimport { aiService } from '../../services/aiService';

const response = await aiService.chatWithAI({
  message: "Algo casual para clima frío",
  gender: "Masculino"
});
```

---

#### 👤 **Usuarios** (Por implementar)

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| `GET` | `/users` | Obtener perfil del usuario autenticado | CLIENT |

---

## 🔐 Sistema de Autenticación

### **Flujo de Autenticación**

1. **Registro** (`/register`):
```
   Usuario → Register.jsx → authService.register() → Backend
   Backend responde con UserDto (sin token)
   Usuario redirigido a /login
```

2. **Login** (`/login`):
```
   Usuario → Login.jsx → authService.login() → Backend
   Backend responde con JWT (texto plano)
   Frontend guarda token en localStorage
   Frontend decodifica JWT para obtener email y rol
   Redux actualiza estado de autenticación
   Usuario redirigido según su rol:
     - CLIENT → /
     - SELLER → /seller/dashboard
     - ADMIN → /admin/dashboard
```

3. **Peticiones autenticadas**:
```
   Axios interceptor añade automáticamente:
   headers: { 'Authorization': 'Bearer {token}' }
   
   Si respuesta es 401:
     → Limpiar localStorage
     → Redirigir a /login
Estructura del Token JWT
El backend envía un JWT con esta estructura:
json{
  "sub": "usuario@email.com",      // Email del usuario
  "role": "ROLE_CLIENT",            // Rol con prefijo ROLE_
  "exp": 1716780331                 // Expiración (10 días)
}
El frontend lo decodifica en authService.js:
javascriptfunction parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(/* ... */);
  return JSON.parse(jsonPayload);
}

🗄️ Redux Store - Estado Global
Slices y su Propósito
1. authSlice - Autenticación
javascript{
  isAuthenticated: false,
  user: null,              // { email, role }
  token: null,             // JWT string
  role: null,              // "CLIENT", "SELLER", "ADMIN"
  loading: false,
  error: null
}
Acciones:

loginStart() - Inicia proceso de login
loginSuccess({ token, user }) - Login exitoso
loginFailure(error) - Error en login
logout() - Cierra sesión y limpia localStorage
setUser(user) - Actualiza datos del usuario


2. productSlice - Productos
javascript{
  products: [],            // Todos los productos
  featuredProducts: [],    // Productos destacados
  currentProduct: null,    // Producto actual (detalle)
  filters: {
    style: '',
    climate: '',
    gender: '',
    minPrice: 0,
    maxPrice: 1000000
  },
  loading: false,
  error: null
}
Acciones:

setProducts(products) - Actualiza lista de productos
setFeaturedProducts(products) - Productos destacados
setCurrentProduct(product) - Producto seleccionado
setFilters(filters) - Actualiza filtros de búsqueda
clearFilters() - Limpia todos los filtros


3. cartSlice - Carrito de Compras
javascript{
  items: [],    // [{ ...producto, quantity: 2 }]
  total: 0      // Suma total del carrito
}
Acciones:

addToCart(product) - Añade producto al carrito
removeFromCart(productId) - Elimina producto
updateQuantity({ productId, quantity }) - Actualiza cantidad
clearCart() - Vacía el carrito


4. closetSlice - Ropero Virtual
javascript{
  outfits: [],          // Outfits guardados
  currentOutfit: null   // Outfit seleccionado
}
Acciones:

addOutfit(outfit) - Guarda outfit generado por IA
removeOutfit(outfitId) - Elimina outfit
setCurrentOutfit(outfit) - Selecciona outfit
clearCloset() - Limpia el ropero


🛣️ Sistema de Rutas y Protección
Tipos de Rutas

Rutas Públicas (sin autenticación):

/ - Home
/catalog - Catálogo
/product/:id - Detalle producto
/stores - Lista de tiendas
/store/:id - Detalle tienda
/login - Iniciar sesión
/register - Registro


Rutas Protegidas (requieren login):

jsx   <ProtectedRoute>
     <AIAssistant />
   </ProtectedRoute>

/ai-assistant - Chat con IA
/closet - Ropero virtual
/cart - Carrito
/profile - Perfil


Rutas por Rol (requieren rol específico):

jsx   <RoleRoute allowedRoles={['SELLER']}>
     <SellerDashboard />
   </RoleRoute>

SELLER:

/seller/dashboard - Panel vendedor
/seller/store - Mi tienda
/seller/products - Mis productos


ADMIN:

/admin/dashboard - Panel admin
/admin/stores - Todas las tiendas
/admin/products - Todos los productos




🎨 Sistema de Diseño
Paleta de Colores (Tailwind)
cssprimary-50:  #faf5ff   /* Muy claro */
primary-100: #f3e8ff
primary-200: #e9d5ff
primary-300: #d8b4fe
primary-400: #c084fc
primary-500: #a855f7   /* Color principal */
primary-600: #9333ea   /* Botones principales */
primary-700: #7e22ce
primary-800: #6b21a8
primary-900: #581c87   /* Muy oscuro */
Componentes Reutilizables
Button
jsx<Button 
  variant="primary"      // primary, secondary, outline, ghost, danger
  size="md"              // sm, md, lg
  loading={false}        // Muestra spinner
  icon={<Icon />}        // Icono opcional
  fullWidth={false}      // 100% de ancho
>
  Texto del Botón
</Button>
Input
jsx<Input
  label="Nombre"
  type="text"
  placeholder="Tu nombre"
  icon={<User />}
  error="Campo requerido"
/>
Card
jsx<Card 
  hover={true}        // Efecto hover
  padding={true}      // Padding interno
  onClick={handler}   // Click handler
>
  Contenido
</Card>
Modal
jsx<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Título del Modal"
  size="md"           // sm, md, lg, xl, full
>
  Contenido del modal
</Modal>

🚀 Instalación y Configuración
1. Prerrequisitos
bashNode.js >= 18.x
npm >= 9.x
Backend corriendo en http://localhost:8080
2. Clonar e Instalar
bash# Clonar el repositorio
git clone https://github.com/tu-usuario/cloufit-frontend.git
cd cloufit-frontend

# Instalar dependencias
npm install
3. Configurar Variables de Entorno
Crear archivo .env en la raíz:
envVITE_API_URL=http://localhost:8080/api
4. Ejecutar en Desarrollo
bashnpm run dev

# La aplicación estará disponible en:
# http://localhost:5173
5. Compilar para Producción
bashnpm run build

# Los archivos compilados estarán en /dist

📊 Estado del Proyecto
✅ COMPLETADO (60%)
Infraestructura

✅ Proyecto configurado con Vite
✅ Tailwind CSS implementado
✅ Redux Store configurado
✅ Axios con interceptores
✅ Sistema de rutas protegidas

Componentes y Layout

✅ Header responsive con menú móvil
✅ Footer completo
✅ Componentes comunes (Button, Input, Card, Modal, Loader)

Funcionalidades

✅ Sistema de autenticación completo
✅ Registro e inicio de sesión
✅ Catálogo de productos con filtros
✅ Detalle de productos
✅ Carrito de compras funcional
✅ Perfil de usuario
✅ Chat con IA (UI lista, falta conectar backend)
✅ Ropero virtual


⏳ PENDIENTE (40%)
Servicios

⏳ storeService.js - CRUD de tiendas
⏳ aiService.js - Conectar con endpoints de IA del backend

Páginas Críticas

⏳ Dashboard de Vendedor (SELLER)

Panel principal con métricas
Gestión de mi tienda
CRUD de mis productos


⏳ Dashboard de Administrador (ADMIN)

Panel con estadísticas globales
Gestión de todas las tiendas
Gestión de todos los productos



Componentes Especializados

⏳ ProductCard.jsx - Card reutilizable de producto
⏳ ProductGrid.jsx - Grid con paginación
⏳ OutfitCard.jsx - Card de outfit generado
⏳ StoreCard.jsx - Card de tienda
⏳ StoreForm.jsx - Formulario de tienda

Funcionalidades

⏳ Sistema de notificaciones (toasts)
⏳ Paginación en catálogo
⏳ Integración real con IA del backend
⏳ Guardado de outfits en ropero con backend
⏳ Sistema de favoritos

Utilidades

⏳ Validaciones de formularios
⏳ Formateo de fechas y precios
⏳ Custom hooks (useAuth, useProducts)
⏳ Manejo de errores global


🔧 Troubleshooting
Problema: CORS Error
bash# Verificar en SecurityConfig.java:
configuration.setAllowedOriginPatterns(List.of("http://localhost:5173"));
Problema: Token no se envía
javascript// Verificar en localStorage:
localStorage.getItem('token')

// Revisar en axiosConfig.js que el interceptor esté activo
Problema: Rutas protegidas no funcionan
javascript// Verificar en Redux DevTools que isAuthenticated sea true
// Verificar que el rol del usuario sea correcto

📞 Contacto y Soporte

Proyecto: Cloufit - Plataforma de Moda con IA
Ubicación: Pasto, Nariño, Colombia
Backend: Spring Boot + JWT + Gemini AI
Frontend: React + Vite + Redux + Tailwind CSS


📝 Notas Importantes

Login devuelve texto plano: El endpoint /auth/login retorna el JWT como string, no como JSON. Esto está manejado en authService.js.
Roles con prefijo: El backend envía roles como ROLE_CLIENT, pero el frontend los maneja como CLIENT internamente.
Token expira en 10 días: Después de ese tiempo, el usuario debe volver a iniciar sesión.
IA requiere autenticación: Los endpoints de generación de outfits requieren token JWT.
Sin localStorage en artifacts: Las páginas de ejemplo NO usan localStorage, pero el código real SÍ lo usa para guardar el token.


🎯 Próximos Pasos

✅ Completar Dashboards (Seller y Admin)
✅ Conectar servicios de IA con el backend
✅ Implementar storeService para gestión de tiendas
⏳ Añadir sistema de notificaciones
⏳ Optimizar rendimiento con React.memo
⏳ Añadir tests unitarios
⏳ Preparar para deploy en producción