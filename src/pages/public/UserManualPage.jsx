import { useState } from 'react';
import { 
  Book, User, Store, Shield, ChevronDown, ChevronRight, 
  Image as ImageIcon, LogIn, ShoppingCart, Sparkles, 
  Heart, Bell, UserCircle, Package, BarChart3, Settings,
  CheckCircle, XCircle, Eye, Edit, Trash2, Plus
} from 'lucide-react';

const UserManualPage = () => {
  const [activeTab, setActiveTab] = useState('client');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Componente para placeholder de imagen
  const ImagePlaceholder = ({ title, description, examplePath }) => (
    <div className="my-6 border-2 border-dashed border-purple-300 rounded-lg p-8 bg-purple-50">
      <div className="flex items-center justify-center mb-4">
        <ImageIcon className="w-16 h-16 text-purple-400" />
      </div>
      <div className="text-center">
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        {examplePath && (
          <div className="mt-4 p-3 bg-white rounded border border-purple-200">
            <p className="text-xs text-gray-500 mb-1">Ruta de ejemplo para la imagen:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-purple-600">
              {examplePath}
            </code>
            <p className="text-xs text-gray-500 mt-2">
              💡 Reemplaza este componente con: <code className="bg-gray-100 px-1">&lt;img src="/manual/screenshots/{examplePath}" alt="{title}" /&gt;</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Componente para sección colapsable
  const Section = ({ id, title, icon: Icon, children, defaultExpanded = false }) => {
    const isExpanded = expandedSections[id] ?? defaultExpanded;
    
    return (
      <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </button>
        
        {isExpanded && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            {children}
          </div>
        )}
      </div>
    );
  };

  // Componente para paso numerado
  const Step = ({ number, title, children }) => (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
        <div className="text-gray-600 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Book className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manual de Usuario</h1>
              <p className="text-gray-600">Guía completa para usar Cloufit</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('client')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'client'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5" />
              Cliente
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'seller'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Store className="w-5 h-5" />
              Vendedor
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'admin'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="w-5 h-5" />
              Administrador
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ==================== MANUAL CLIENTE ==================== */}
        {activeTab === 'client' && (
          <div className="space-y-6">
            {/* Introducción */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Bienvenido a Cloufit</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cloufit es tu plataforma inteligente de moda que te ayuda a descubrir tu estilo perfecto 
                con ayuda de Inteligencia Artificial. Explora productos de múltiples tiendas, genera outfits 
                personalizados y reserva tus prendas favoritas.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">IA Personalizada</h3>
                  <p className="text-sm text-gray-600">Genera outfits según tu estilo y clima</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Reservas Fáciles</h3>
                  <p className="text-sm text-gray-600">Reserva productos y recógelos en tienda</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Heart className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Ropero Virtual</h3>
                  <p className="text-sm text-gray-600">Guarda tus outfits favoritos</p>
                </div>
              </div>
            </div>

            {/* Sección 1: Registro e Inicio de Sesión */}
            <Section id="client-auth" title="Registro e Inicio de Sesión" icon={LogIn} defaultExpanded={true}>
              <Step number={1} title="Crear una cuenta nueva">
                <p>Para comenzar a usar Cloufit, necesitas crear una cuenta:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en el botón <strong>"Registrarse"</strong> en la esquina superior derecha</li>
                  <li>Completa el formulario con tu nombre, email y contraseña</li>
                  <li>Selecciona el rol <strong>"Cliente"</strong></li>
                  <li>Haz clic en <strong>"Crear Cuenta"</strong></li>
                </ul>
                
                <ImagePlaceholder 
                  title="Captura: Página de Registro"
                  description="Muestra el formulario de registro con los campos nombre, email, contraseña y selector de rol"
                  examplePath="client-register.png"
                />
              </Step>

              <Step number={2} title="Iniciar sesión">
                <p>Si ya tienes una cuenta:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en <strong>"Iniciar Sesión"</strong></li>
                  <li>Ingresa tu email y contraseña</li>
                  <li>Haz clic en <strong>"Entrar"</strong></li>
                  <li>Serás redirigido al catálogo de productos</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Página de Login"
                  description="Muestra el formulario de inicio de sesión con campos email y contraseña"
                  examplePath="client-login.png"
                />
              </Step>
            </Section>

            {/* Sección 2: Explorar Catálogo */}
            <Section id="client-catalog" title="Explorar el Catálogo de Productos" icon={Eye}>
              <Step number={1} title="Navegar por el catálogo">
                <p>Desde la página principal puedes explorar todos los productos disponibles:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a la sección <strong>"Catálogo"</strong> en el menú superior</li>
                  <li>Verás una cuadrícula con todos los productos disponibles</li>
                  <li>Cada tarjeta muestra: imagen, nombre, precio, tienda y categoría</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Catálogo de Productos"
                  description="Muestra la vista de cuadrícula con múltiples productos, filtros laterales y barra de búsqueda"
                  examplePath="client-catalog.png"
                />
              </Step>

              <Step number={2} title="Usar filtros de búsqueda">
                <p>Refina tu búsqueda usando los filtros laterales:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Estilo:</strong> Casual, Formal, Deportivo, Elegante, Urbano</li>
                  <li><strong>Género:</strong> Masculino, Femenino, Unisex</li>
                  <li><strong>Clima:</strong> Cálido, Frío, Templado</li>
                  <li><strong>Rango de precio:</strong> Ajusta con los deslizadores</li>
                  <li>Haz clic en <strong>"Aplicar Filtros"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Panel de Filtros"
                  description="Muestra el panel lateral con todos los filtros disponibles (estilo, género, clima, precio)"
                  examplePath="client-filters.png"
                />
              </Step>

              <Step number={3} title="Ver detalles de un producto">
                <p>Para ver más información sobre un producto:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en cualquier tarjeta de producto</li>
                  <li>Verás: descripción completa, talla, color, material, disponibilidad</li>
                  <li>Información de la tienda vendedora</li>
                  <li>Botón para agregar a reserva</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Detalle de Producto"
                  description="Muestra la página de detalle con imagen grande, descripción, precio, y botón 'Agregar a Reserva'"
                  examplePath="client-product-detail.png"
                />
              </Step>
            </Section>

            {/* Sección 3: Asistente de IA */}
            <Section id="client-ai" title="Usar el Asistente de IA" icon={Sparkles}>
              <Step number={1} title="Abrir el chat de IA">
                <p>El asistente de IA te ayuda a generar outfits personalizados:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en el <strong>botón flotante morado</strong> con ícono de estrella (esquina inferior derecha)</li>
                  <li>Se abrirá el chat del asistente de IA</li>
                  <li>También puedes acceder desde el menú: <strong>"Asistente IA"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Botón Flotante de IA"
                  description="Muestra el botón flotante morado en la esquina inferior derecha de la pantalla"
                  examplePath="client-ai-button.png"
                />
              </Step>

              <Step number={2} title="Generar un outfit con IA">
                <p>Pide al asistente que te genere un outfit:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Escribe tu solicitud en lenguaje natural, por ejemplo:</li>
                  <li className="ml-4 italic text-purple-600">"Quiero algo casual para clima frío"</li>
                  <li className="ml-4 italic text-purple-600">"Necesito un outfit formal para una reunión"</li>
                  <li className="ml-4 italic text-purple-600">"Dame opciones deportivas para clima cálido"</li>
                  <li>Haz clic en <strong>"Enviar"</strong> o presiona Enter</li>
                  <li>La IA analizará tu solicitud y generará un outfit completo</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Chat con IA"
                  description="Muestra la interfaz del chat con un mensaje del usuario y la respuesta de la IA con un outfit generado"
                  examplePath="client-ai-chat.png"
                />
              </Step>

              <Step number={3} title="Ver y guardar el outfit generado">
                <p>Una vez generado el outfit:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verás una tarjeta con todos los productos del outfit</li>
                  <li>Descripción de por qué funciona la combinación</li>
                  <li>Imagen generada del outfit (si está habilitado)</li>
                  <li>Haz clic en <strong>"Guardar en Ropero"</strong> para guardarlo</li>
                  <li>Haz clic en <strong>"Reservar Outfit"</strong> para agregar todos los productos a tu cesta</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Outfit Generado"
                  description="Muestra la tarjeta del outfit con productos, descripción, y botones 'Guardar' y 'Reservar'"
                  examplePath="client-ai-outfit.png"
                />
              </Step>
            </Section>

            {/* Sección 4: Hacer Reservas */}
            <Section id="client-reservations" title="Hacer una Reserva" icon={ShoppingCart}>
              <Step number={1} title="Agregar productos a la cesta">
                <p>Para reservar productos:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>En la página de detalle del producto, haz clic en <strong>"Agregar a Reserva"</strong></li>
                  <li>Verás una confirmación en la esquina superior derecha</li>
                  <li>El ícono del carrito mostrará el número de productos agregados</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Agregar a Reserva"
                  description="Muestra el botón 'Agregar a Reserva' y la notificación de confirmación"
                  examplePath="client-add-to-cart.png"
                />
              </Step>

              <Step number={2} title="Revisar la cesta de reservas">
                <p>Para ver todos los productos que vas a reservar:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en el <strong>ícono del carrito</strong> en el header</li>
                  <li>Verás la lista de todos los productos agregados</li>
                  <li>Puedes eliminar productos haciendo clic en el ícono de basura</li>
                  <li>Verás el total de la reserva</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Cesta de Reservas"
                  description="Muestra la página de cesta con lista de productos, cantidades, precios y total"
                  examplePath="client-cart.png"
                />
              </Step>

              <Step number={3} title="Confirmar la reserva">
                <p>Para finalizar tu reserva:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Revisa que todos los productos sean correctos</li>
                  <li>Haz clic en <strong>"Confirmar Reserva"</strong></li>
                  <li>Tu reserva será enviada al vendedor con estado <strong>"SOLICITADA"</strong></li>
                  <li>Recibirás una notificación cuando el vendedor la apruebe o rechace</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Confirmar Reserva"
                  description="Muestra el botón 'Confirmar Reserva' y el mensaje de confirmación exitosa"
                  examplePath="client-confirm-reservation.png"
                />
              </Step>

              <Step number={4} title="Ver estado de mis reservas">
                <p>Para revisar tus reservas:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a <strong>"Mis Reservas"</strong> en el menú de usuario</li>
                  <li>Verás todas tus reservas con sus estados:</li>
                  <li className="ml-4">🟡 <strong>SOLICITADA:</strong> Esperando aprobación del vendedor</li>
                  <li className="ml-4">🟢 <strong>APROBADA:</strong> Lista para recoger en tienda</li>
                  <li className="ml-4">🔴 <strong>RECHAZADA:</strong> El vendedor no pudo aprobarla</li>
                  <li className="ml-4">✅ <strong>COMPLETADA:</strong> Ya recogiste los productos</li>
                  <li>Haz clic en una reserva para ver más detalles</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Mis Reservas"
                  description="Muestra la lista de reservas con diferentes estados (solicitada, aprobada, rechazada)"
                  examplePath="client-my-reservations.png"
                />
              </Step>
            </Section>

            {/* Sección 5: Ropero Virtual */}
            <Section id="client-closet" title="Gestionar mi Ropero Virtual" icon={Heart}>
              <Step number={1} title="Acceder a mi ropero">
                <p>El ropero virtual guarda todos tus outfits favoritos generados por la IA:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en <strong>"Mi Ropero"</strong> en el menú de usuario</li>
                  <li>Verás una cuadrícula con todos tus outfits guardados</li>
                  <li>Cada tarjeta muestra: imagen, descripción y productos del outfit</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Mi Ropero"
                  description="Muestra la cuadrícula de outfits guardados con sus imágenes y descripciones"
                  examplePath="client-closet.png"
                />
              </Step>

              <Step number={2} title="Ver detalles de un outfit">
                <p>Para ver más información de un outfit guardado:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en cualquier outfit</li>
                  <li>Se abrirá un modal con todos los detalles</li>
                  <li>Verás cada producto del outfit con su precio</li>
                  <li>Puedes reservar el outfit completo o productos individuales</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Detalle de Outfit"
                  description="Muestra el modal con los detalles completos del outfit y botones de acción"
                  examplePath="client-outfit-detail.png"
                />
              </Step>

              <Step number={3} title="Eliminar un outfit">
                <p>Si ya no quieres un outfit guardado:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en el ícono de <strong>basura</strong> en la tarjeta del outfit</li>
                  <li>Confirma la eliminación</li>
                  <li>El outfit será removido permanentemente de tu ropero</li>
                </ul>
              </Step>
            </Section>

            {/* Sección 6: Notificaciones */}
            <Section id="client-notifications" title="Gestionar Notificaciones" icon={Bell}>
              <Step number={1} title="Ver notificaciones nuevas">
                <p>Recibirás notificaciones sobre el estado de tus reservas:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>El ícono de campana en el header mostrará un <strong>badge rojo</strong> con el número de notificaciones no leídas</li>
                  <li>Haz clic en el ícono de campana para ver todas las notificaciones</li>
                  <li>Las notificaciones nuevas aparecen resaltadas</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Badge de Notificaciones"
                  description="Muestra el ícono de campana con el badge rojo indicando notificaciones nuevas"
                  examplePath="client-notifications-badge.png"
                />
              </Step>

              <Step number={2} title="Marcar como leídas">
                <p>Para marcar notificaciones como leídas:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en una notificación para abrirla</li>
                  <li>Automáticamente se marcará como leída</li>
                  <li>También puedes hacer clic en <strong>"Marcar todas como leídas"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Panel de Notificaciones"
                  description="Muestra el panel desplegable con lista de notificaciones (leídas y no leídas)"
                  examplePath="client-notifications-panel.png"
                />
              </Step>
            </Section>

            {/* Sección 7: Perfil */}
            <Section id="client-profile" title="Gestionar mi Perfil" icon={UserCircle}>
              <Step number={1} title="Editar información personal">
                <p>Para actualizar tus datos:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en tu <strong>nombre de usuario</strong> en el header</li>
                  <li>Selecciona <strong>"Mi Perfil"</strong></li>
                  <li>Edita tu nombre, email o teléfono</li>
                  <li>Haz clic en <strong>"Guardar Cambios"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Editar Perfil"
                  description="Muestra el formulario de edición de perfil con campos nombre, email, teléfono"
                  examplePath="client-profile.png"
                />
              </Step>

              <Step number={2} title="Cerrar sesión">
                <p>Para salir de tu cuenta:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en tu nombre de usuario</li>
                  <li>Selecciona <strong>"Cerrar Sesión"</strong></li>
                  <li>Serás redirigido a la página de inicio</li>
                </ul>
              </Step>
            </Section>
          </div>
        )}

        {/* ==================== MANUAL VENDEDOR ==================== */}
        {activeTab === 'seller' && (
          <div className="space-y-6">
            {/* Introducción */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Panel de Vendedor</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Como vendedor en Cloufit, puedes gestionar tu tienda, publicar productos y administrar 
                las reservas de tus clientes. Esta guía te ayudará a aprovechar al máximo todas las 
                funcionalidades disponibles.
              </p>
            </div>

            {/* Sección 1: Dashboard */}
            <Section id="seller-dashboard" title="Dashboard del Vendedor" icon={BarChart3} defaultExpanded={true}>
              <Step number={1} title="Acceder al dashboard">
                <p>Al iniciar sesión como vendedor, serás redirigido automáticamente a tu dashboard:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verás estadísticas de tu tienda: total de productos, reservas pendientes, ventas</li>
                  <li>Gráficos de rendimiento mensual</li>
                  <li>Lista de reservas recientes</li>
                  <li>Productos más vendidos</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Dashboard del Vendedor"
                  description="Muestra el panel principal con estadísticas, gráficos y resumen de actividad"
                  examplePath="seller-dashboard.png"
                />
              </Step>
            </Section>

            {/* Sección 2: Gestionar Tienda */}
            <Section id="seller-store" title="Gestionar mi Tienda" icon={Store}>
              <Step number={1} title="Editar información de la tienda">
                <p>Para actualizar los datos de tu tienda:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a <strong>"Mi Tienda"</strong> en el menú lateral</li>
                  <li>Haz clic en <strong>"Editar Tienda"</strong></li>
                  <li>Actualiza: nombre, descripción, dirección, teléfono</li>
                  <li>Sube un logo y banner (opcional)</li>
                  <li>Haz clic en <strong>"Guardar Cambios"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Editar Tienda"
                  description="Muestra el formulario de edición con campos de información de la tienda"
                  examplePath="seller-edit-store.png"
                />
              </Step>
            </Section>

            {/* Sección 3: Gestionar Productos */}
            <Section id="seller-products" title="Gestionar mis Productos" icon={Package}>
              <Step number={1} title="Ver mis productos">
                <p>Para ver todos tus productos publicados:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a <strong>"Mis Productos"</strong> en el menú lateral</li>
                  <li>Verás una tabla con todos tus productos</li>
                  <li>Información mostrada: nombre, precio, categoría, stock, estado</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Lista de Productos"
                  description="Muestra la tabla con todos los productos del vendedor"
                  examplePath="seller-products-list.png"
                />
              </Step>

              <Step number={2} title="Crear un nuevo producto">
                <p>Para publicar un producto nuevo:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en <strong>"Nuevo Producto"</strong></li>
                  <li>Completa el formulario:</li>
                  <li className="ml-4">- Nombre del producto</li>
                  <li className="ml-4">- Descripción detallada</li>
                  <li className="ml-4">- Precio</li>
                  <li className="ml-4">- Categoría (TOP, BOTTOM, FOOTWEAR, ACCESSORY)</li>
                  <li className="ml-4">- Estilo (Casual, Formal, Deportivo, etc.)</li>
                  <li className="ml-4">- Género (Masculino, Femenino, Unisex)</li>
                  <li className="ml-4">- Clima (Cálido, Frío, Templado)</li>
                  <li className="ml-4">- Talla, color, material</li>
                  <li className="ml-4">- Imagen del producto (URL)</li>
                  <li>Haz clic en <strong>"Publicar Producto"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Crear Producto"
                  description="Muestra el formulario completo de creación de producto con todos los campos"
                  examplePath="seller-create-product.png"
                />
              </Step>

              <Step number={3} title="Editar un producto existente">
                <p>Para modificar un producto:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>En la lista de productos, haz clic en el ícono de <strong>lápiz</strong></li>
                  <li>Modifica los campos que desees actualizar</li>
                  <li>Haz clic en <strong>"Guardar Cambios"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Editar Producto"
                  description="Muestra el formulario de edición con los datos del producto pre-cargados"
                  examplePath="seller-edit-product.png"
                />
              </Step>

              <Step number={4} title="Eliminar un producto">
                <p>Para eliminar un producto de tu catálogo:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>En la lista de productos, haz clic en el ícono de <strong>basura</strong></li>
                  <li>Confirma la eliminación</li>
                  <li>⚠️ <strong>Advertencia:</strong> Esta acción no se puede deshacer</li>
                </ul>
              </Step>
            </Section>

            {/* Sección 4: Gestionar Reservas */}
            <Section id="seller-reservations" title="Gestionar Reservas" icon={ShoppingCart}>
              <Step number={1} title="Ver reservas pendientes">
                <p>Para revisar las reservas que requieren tu atención:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a <strong>"Reservas"</strong> en el menú lateral</li>
                  <li>Verás todas las reservas con estado <strong>"SOLICITADA"</strong></li>
                  <li>Información mostrada: cliente, productos, total, fecha</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Reservas Pendientes"
                  description="Muestra la lista de reservas pendientes de aprobación"
                  examplePath="seller-reservations-pending.png"
                />
              </Step>

              <Step number={2} title="Aprobar una reserva">
                <p>Para aprobar una reserva de un cliente:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en la reserva para ver los detalles</li>
                  <li>Verifica que tienes disponibilidad de los productos</li>
                  <li>Haz clic en <strong>"Aprobar Reserva"</strong></li>
                  <li>El cliente recibirá una notificación automáticamente</li>
                  <li>La reserva cambiará a estado <strong>"APROBADA"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Aprobar Reserva"
                  description="Muestra el detalle de la reserva con el botón 'Aprobar Reserva' resaltado"
                  examplePath="seller-approve-reservation.png"
                />
              </Step>

              <Step number={3} title="Rechazar una reserva">
                <p>Si no puedes cumplir con una reserva:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en la reserva</li>
                  <li>Haz clic en <strong>"Rechazar Reserva"</strong></li>
                  <li>Opcionalmente, escribe un motivo del rechazo</li>
                  <li>El cliente recibirá una notificación</li>
                  <li>La reserva cambiará a estado <strong>"RECHAZADA"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Rechazar Reserva"
                  description="Muestra el modal de confirmación con campo de texto para el motivo del rechazo"
                  examplePath="seller-reject-reservation.png"
                />
              </Step>

              <Step number={4} title="Marcar reserva como completada">
                <p>Cuando el cliente recoja los productos:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a la reserva aprobada</li>
                  <li>Haz clic en <strong>"Marcar como Completada"</strong></li>
                  <li>La reserva cambiará a estado <strong>"COMPLETADA"</strong></li>
                  <li>Esto actualizará tus estadísticas de ventas</li>
                </ul>
              </Step>
            </Section>

            {/* Sección 5: Notificaciones */}
            <Section id="seller-notifications" title="Notificaciones" icon={Bell}>
              <Step number={1} title="Recibir notificaciones de nuevas reservas">
                <p>Cuando un cliente hace una reserva de tus productos:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Recibirás una notificación instantánea</li>
                  <li>El badge en el ícono de campana mostrará el número de notificaciones nuevas</li>
                  <li>Haz clic para ver los detalles</li>
                  <li>Puedes ir directamente a la reserva desde la notificación</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Notificación de Nueva Reserva"
                  description="Muestra el panel de notificaciones con una alerta de nueva reserva"
                  examplePath="seller-notification-new-reservation.png"
                />
              </Step>
            </Section>
          </div>
        )}

        {/* ==================== MANUAL ADMINISTRADOR ==================== */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            {/* Introducción */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Panel de Administrador</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Como administrador de Cloufit, tienes control total sobre la plataforma. Puedes gestionar 
                todas las tiendas, productos, usuarios y supervisar la actividad general del sistema.
              </p>
            </div>

            {/* Sección 1: Dashboard Admin */}
            <Section id="admin-dashboard" title="Dashboard de Administrador" icon={BarChart3} defaultExpanded={true}>
              <Step number={1} title="Vista general del sistema">
                <p>El dashboard de administrador te muestra:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Total de usuarios registrados (clientes, vendedores)</li>
                  <li>Total de tiendas activas</li>
                  <li>Total de productos publicados</li>
                  <li>Reservas totales (por estado)</li>
                  <li>Gráficos de crecimiento mensual</li>
                  <li>Actividad reciente del sistema</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Dashboard de Administrador"
                  description="Muestra el panel con estadísticas globales, gráficos y métricas del sistema"
                  examplePath="admin-dashboard.png"
                />
              </Step>
            </Section>

            {/* Sección 2: Gestionar Tiendas */}
            <Section id="admin-stores" title="Gestionar Todas las Tiendas" icon={Store}>
              <Step number={1} title="Ver todas las tiendas">
                <p>Para supervisar todas las tiendas de la plataforma:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a <strong>"Tiendas"</strong> en el menú lateral</li>
                  <li>Verás una tabla con todas las tiendas registradas</li>
                  <li>Información: nombre, vendedor, productos, estado, fecha de creación</li>
                  <li>Puedes buscar tiendas por nombre</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Lista de Todas las Tiendas"
                  description="Muestra la tabla con todas las tiendas del sistema"
                  examplePath="admin-stores-list.png"
                />
              </Step>

              <Step number={2} title="Editar una tienda">
                <p>Para modificar información de cualquier tienda:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en el ícono de <strong>lápiz</strong> en la tienda</li>
                  <li>Modifica los campos necesarios</li>
                  <li>Haz clic en <strong>"Guardar Cambios"</strong></li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Editar Tienda (Admin)"
                  description="Muestra el formulario de edición de tienda desde la vista de administrador"
                  examplePath="admin-edit-store.png"
                />
              </Step>

              <Step number={3} title="Eliminar una tienda">
                <p>Para eliminar una tienda del sistema:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en el ícono de <strong>basura</strong></li>
                  <li>Confirma la eliminación</li>
                  <li>⚠️ <strong>Advertencia:</strong> Esto eliminará también todos los productos de la tienda</li>
                </ul>
              </Step>
            </Section>

            {/* Sección 3: Gestionar Productos */}
            <Section id="admin-products" title="Gestionar Todos los Productos" icon={Package}>
              <Step number={1} title="Ver todos los productos">
                <p>Para supervisar todos los productos de la plataforma:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a <strong>"Productos"</strong> en el menú lateral</li>
                  <li>Verás una tabla con todos los productos de todas las tiendas</li>
                  <li>Puedes filtrar por tienda, categoría o estilo</li>
                  <li>Puedes buscar productos por nombre</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Lista de Todos los Productos"
                  description="Muestra la tabla con todos los productos del sistema con filtros"
                  examplePath="admin-products-list.png"
                />
              </Step>

              <Step number={2} title="Moderar productos">
                <p>Para revisar y moderar productos inapropiados:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en un producto para ver sus detalles</li>
                  <li>Revisa la descripción, imagen y categorización</li>
                  <li>Si es inapropiado, haz clic en <strong>"Eliminar Producto"</strong></li>
                  <li>Opcionalmente, puedes enviar una notificación al vendedor</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Moderar Producto"
                  description="Muestra el detalle del producto con opciones de moderación"
                  examplePath="admin-moderate-product.png"
                />
              </Step>
            </Section>

            {/* Sección 4: Gestionar Usuarios */}
            <Section id="admin-users" title="Gestionar Usuarios" icon={User}>
              <Step number={1} title="Ver todos los usuarios">
                <p>Para supervisar todos los usuarios registrados:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a <strong>"Usuarios"</strong> en el menú lateral</li>
                  <li>Verás una tabla con todos los usuarios</li>
                  <li>Información: nombre, email, rol, fecha de registro, estado</li>
                  <li>Puedes filtrar por rol (Cliente, Vendedor, Admin)</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Lista de Usuarios"
                  description="Muestra la tabla con todos los usuarios del sistema"
                  examplePath="admin-users-list.png"
                />
              </Step>

              <Step number={2} title="Cambiar rol de un usuario">
                <p>Para modificar el rol de un usuario:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en el usuario</li>
                  <li>Selecciona el nuevo rol en el dropdown</li>
                  <li>Haz clic en <strong>"Actualizar Rol"</strong></li>
                  <li>El usuario recibirá una notificación del cambio</li>
                </ul>
              </Step>

              <Step number={3} title="Desactivar/Activar un usuario">
                <p>Para suspender temporalmente una cuenta:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Haz clic en el toggle de <strong>"Estado"</strong></li>
                  <li>Confirma la acción</li>
                  <li>El usuario no podrá iniciar sesión mientras esté desactivado</li>
                </ul>
              </Step>
            </Section>

            {/* Sección 5: Reportes y Estadísticas */}
            <Section id="admin-reports" title="Reportes y Estadísticas" icon={BarChart3}>
              <Step number={1} title="Generar reportes">
                <p>Para obtener reportes del sistema:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ve a <strong>"Reportes"</strong> en el menú lateral</li>
                  <li>Selecciona el tipo de reporte:</li>
                  <li className="ml-4">- Ventas por período</li>
                  <li className="ml-4">- Productos más vendidos</li>
                  <li className="ml-4">- Tiendas más activas</li>
                  <li className="ml-4">- Usuarios nuevos por mes</li>
                  <li>Selecciona el rango de fechas</li>
                  <li>Haz clic en <strong>"Generar Reporte"</strong></li>
                  <li>Puedes exportar a PDF o Excel</li>
                </ul>

                <ImagePlaceholder 
                  title="Captura: Generar Reportes"
                  description="Muestra la interfaz de generación de reportes con filtros y opciones de exportación"
                  examplePath="admin-reports.png"
                />
              </Step>
            </Section>
          </div>
        )}

        {/* Footer del Manual */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">¿Necesitas más ayuda?</h3>
          <p className="mb-6">
            Si tienes alguna pregunta o problema que no está cubierto en este manual, 
            no dudes en contactarnos.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">📧 Email de Soporte</h4>
              <p className="text-sm">soporte@cloufit.com</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">📱 WhatsApp</h4>
              <p className="text-sm">+57 300 123 4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManualPage;
