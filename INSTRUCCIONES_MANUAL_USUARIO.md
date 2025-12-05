# 📖 Manual de Usuario - Instrucciones de Implementación

## ✅ **LO QUE YA ESTÁ HECHO**

1. ✅ **Página del Manual creada**: `src/pages/public/UserManualPage.jsx`
2. ✅ **Ruta configurada**: `/user-manual` en `AppRoutes.jsx`
3. ✅ **Diseño profesional** con:
   - Navegación por pestañas (Cliente / Vendedor / Administrador)
   - Secciones colapsables
   - Pasos numerados
   - Placeholders para capturas de pantalla
   - Diseño responsive con Tailwind CSS

---

## 🚀 **CÓMO ACCEDER AL MANUAL**

Puedes acceder al manual de dos formas:

### **Opción 1: URL Directa**
Navega a: `http://localhost:5173/user-manual`

### **Opción 2: Agregar enlace al Footer (Opcional)**

Edita el archivo `src/components/layout/Footer.jsx` y agrega este enlace en la sección de "Ayuda":

```jsx
<li>
  <Link to="/user-manual" className="hover:text-cyan-400 transition-colors">
    📖 Manual de Usuario
  </Link>
</li>
```

**Ubicación exacta**: Después de la línea 65 (después del enlace de FAQ)

---

## 📸 **CÓMO AGREGAR CAPTURAS DE PANTALLA**

### **Paso 1: Crear carpeta para screenshots**
```bash
mkdir public/manual
mkdir public/manual/screenshots
```

### **Paso 2: Tomar capturas de pantalla**

Toma capturas de las siguientes pantallas de tu aplicación:

#### **Cliente:**
- `client-register.png` - Página de registro
- `client-login.png` - Página de login
- `client-catalog.png` - Catálogo de productos
- `client-filters.png` - Panel de filtros
- `client-product-detail.png` - Detalle de producto
- `client-ai-button.png` - Botón flotante de IA
- `client-ai-chat.png` - Chat con IA
- `client-ai-outfit.png` - Outfit generado
- `client-add-to-cart.png` - Agregar a reserva
- `client-cart.png` - Cesta de reservas
- `client-confirm-reservation.png` - Confirmar reserva
- `client-my-reservations.png` - Mis reservas
- `client-closet.png` - Mi ropero
- `client-outfit-detail.png` - Detalle de outfit
- `client-notifications-badge.png` - Badge de notificaciones
- `client-notifications-panel.png` - Panel de notificaciones
- `client-profile.png` - Editar perfil

#### **Vendedor:**
- `seller-dashboard.png` - Dashboard del vendedor
- `seller-edit-store.png` - Editar tienda
- `seller-products-list.png` - Lista de productos
- `seller-create-product.png` - Crear producto
- `seller-edit-product.png` - Editar producto
- `seller-reservations-pending.png` - Reservas pendientes
- `seller-approve-reservation.png` - Aprobar reserva
- `seller-reject-reservation.png` - Rechazar reserva
- `seller-notification-new-reservation.png` - Notificación de nueva reserva

#### **Administrador:**
- `admin-dashboard.png` - Dashboard de administrador
- `admin-stores-list.png` - Lista de tiendas
- `admin-edit-store.png` - Editar tienda (admin)
- `admin-products-list.png` - Lista de productos
- `admin-moderate-product.png` - Moderar producto
- `admin-users-list.png` - Lista de usuarios
- `admin-reports.png` - Generar reportes

### **Paso 3: Guardar las imágenes**
Guarda todas las capturas en: `public/manual/screenshots/`

### **Paso 4: Reemplazar placeholders**

En `UserManualPage.jsx`, busca los componentes `<ImagePlaceholder />` y reemplázalos con:

```jsx
<img 
  src="/manual/screenshots/client-register.png" 
  alt="Captura: Página de Registro"
  className="w-full rounded-lg border-2 border-purple-200 shadow-lg"
/>
```

**Ejemplo completo:**

**ANTES:**
```jsx
<ImagePlaceholder 
  title="Captura: Página de Registro"
  description="Muestra el formulario de registro..."
  examplePath="client-register.png"
/>
```

**DESPUÉS:**
```jsx
<img 
  src="/manual/screenshots/client-register.png" 
  alt="Captura: Página de Registro"
  className="w-full rounded-lg border-2 border-purple-200 shadow-lg my-6"
/>
```

---

## 🎨 **TIPS PARA MEJORES CAPTURAS**

1. **Usa resolución 1920x1080** para capturas de escritorio
2. **Usa 375x812** para capturas móviles
3. **Agrega flechas rojas** señalando botones importantes (usa herramientas como Snagit, Greenshot, o Photoshop)
4. **Resalta elementos clave** con círculos o recuadros
5. **Usa datos de ejemplo** realistas (no "test test test")
6. **Captura en modo claro** (no dark mode) para mejor legibilidad

---

## 🛠️ **HERRAMIENTAS RECOMENDADAS PARA CAPTURAS**

### **Windows:**
- **Snipping Tool** (incluido en Windows)
- **Greenshot** (gratuito) - https://getgreenshot.org/
- **ShareX** (gratuito) - https://getsharex.com/

### **Mac:**
- **Cmd + Shift + 4** (nativo)
- **CleanShot X** (pago)
- **Skitch** (gratuito)

### **Edición de imágenes:**
- **Paint.NET** (Windows, gratuito)
- **GIMP** (multiplataforma, gratuito)
- **Photopea** (web, gratuito) - https://www.photopea.com/

---

## 📄 **EXPORTAR A PDF (Para la sustentación)**

Si necesitas entregar el manual en PDF:

### **Opción 1: Imprimir desde el navegador**
1. Abre `http://localhost:5173/user-manual`
2. Presiona `Ctrl + P` (Windows) o `Cmd + P` (Mac)
3. Selecciona "Guardar como PDF"
4. Ajusta márgenes y orientación
5. Guarda como `Manual_Usuario_Cloufit.pdf`

### **Opción 2: Usar herramienta de captura de página completa**
- **GoFullPage** (extensión de Chrome)
- **Awesome Screenshot** (extensión de Chrome)

---

## 🎯 **CHECKLIST PARA LA SUSTENTACIÓN**

- [ ] Todas las capturas de pantalla están tomadas
- [ ] Las capturas tienen flechas/círculos señalando elementos importantes
- [ ] Los placeholders están reemplazados con imágenes reales
- [ ] El manual se ve correctamente en móvil y desktop
- [ ] El enlace en el footer funciona
- [ ] El manual está exportado a PDF
- [ ] Tienes una copia de respaldo del PDF

---

## 📞 **ESTRUCTURA DEL MANUAL**

El manual incluye:

### **Pestaña Cliente:**
1. Introducción a Cloufit
2. Registro e Inicio de Sesión
3. Explorar el Catálogo
4. Usar el Asistente de IA
5. Hacer Reservas
6. Gestionar Ropero Virtual
7. Notificaciones
8. Perfil de Usuario

### **Pestaña Vendedor:**
1. Dashboard del Vendedor
2. Gestionar Mi Tienda
3. Gestionar Mis Productos
4. Gestionar Reservas
5. Notificaciones

### **Pestaña Administrador:**
1. Dashboard de Administrador
2. Gestionar Todas las Tiendas
3. Gestionar Todos los Productos
4. Gestionar Usuarios
5. Reportes y Estadísticas

---

## 💡 **NOTAS IMPORTANTES**

1. **Los placeholders son temporales**: Están diseñados para mostrarte exactamente qué captura necesitas en cada sección
2. **Cada placeholder tiene**:
   - Título descriptivo
   - Descripción de qué debe mostrar la captura
   - Nombre de archivo sugerido
   - Código de ejemplo para reemplazarlo
3. **El diseño es responsive**: Funciona en móvil, tablet y desktop
4. **Las secciones son colapsables**: Los usuarios pueden expandir/contraer cada sección
5. **Navegación por pestañas**: Fácil cambio entre Cliente, Vendedor y Administrador

---

## 🚀 **SIGUIENTE PASO**

1. Navega a `http://localhost:5173/user-manual`
2. Revisa el manual completo
3. Toma las capturas de pantalla necesarias
4. Reemplaza los placeholders con las imágenes reales
5. Exporta a PDF para la sustentación

---

## ✨ **CARACTERÍSTICAS DEL MANUAL**

- ✅ Diseño moderno y profesional
- ✅ Navegación intuitiva por pestañas
- ✅ Secciones colapsables para fácil navegación
- ✅ Pasos numerados claros
- ✅ Placeholders con instrucciones precisas
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Fácil de exportar a PDF
- ✅ Información de contacto incluida
- ✅ Diseño consistente con Cloufit

---

**¡El manual está listo para usar! Solo necesitas agregar las capturas de pantalla.** 🎉
