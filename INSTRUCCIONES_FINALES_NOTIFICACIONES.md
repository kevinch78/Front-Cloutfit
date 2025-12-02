# 🔔 INSTRUCCIONES FINALES - NOTIFICACIONES

## ✅ PASO 1: Agregar NotificationBadge al Header

**Archivo:** `src/components/layout/Header.jsx`

### 1.1 Agregar import (línea 16, después de `import { logout }...`)

```javascript
import NotificationBadge from '../NotificationBadge';
```

### 1.2 Agregar el componente (después de la línea 122, después del `</Link>` del carrito)

Busca este código:
```javascript
            </Link>



            {/* User Menu */}
```

Y agrégale esto ENTRE los `</Link>` y `{/* User Menu */}`:

```javascript
            {/* Notification Bell */}
            {isAuthenticated && <NotificationBadge />}
```

Debería quedar así:
```javascript
            </Link>

            {/* Notification Bell */}
            {isAuthenticated && <NotificationBadge />}

            {/* User Menu */}
```

---

## ✅ PASO 2: Agregar ruta de notificaciones

**Archivo:** `src/routes/AppRoutes.jsx` (o similar)

### 2.1 Agregar import al principio:

```javascript
import NotificationsPage from '../pages/NotificationsPage';
```

### 2.2 Agregar la ruta:

Busca donde están las otras rutas y agrega:

```javascript
<Route path="/notifications" element={<NotificationsPage />} />
```

---

## ✅ ¡LISTO!

Con esos 2 cambios simples, el sistema de notificaciones estará COMPLETO y funcionando con:
- ✅ Polling automático cada 30 segundos
- ✅ Badge en el header con contador
- ✅ Dropdown con últimas 5 notificaciones
- ✅ Página completa de notificaciones
- ✅ Marcar como leídas
- ✅ Eliminar notificaciones

**Total de líneas a agregar:** 3 líneas (2 imports + 1 componente + 1 ruta)
