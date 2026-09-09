# Origen — Proyecto Final React JS

E-commerce de café de especialidad construido como proyecto final de referencia del curso de React JS.
Single Page Application con React 19, React Router, Firebase Firestore y Tailwind CSS 4.

## Requisitos cubiertos

| Requisito del proyecto final | Dónde está resuelto |
| --- | --- |
| Listado dinámico de productos | `src/containers/ItemListContainer.jsx` |
| Detalle de producto | `src/containers/ItemDetailContainer.jsx` |
| Contenedor vs. presentación | `containers/` renderiza, `components/` presenta |
| `ItemCount` con validaciones | `src/components/ItemCount.jsx` |
| `ItemCount` se oculta al agregar | `src/components/ItemDetail.jsx` |
| Navegación SPA | `src/App.jsx` (React Router) |
| `NavBar` con categorías dinámicas | `src/components/NavBar.jsx` |
| Estado global del carrito | `src/context/CartProvider.jsx` |
| `CartWidget` con contador | `src/components/CartWidget.jsx` |
| Vista de carrito con subtotales y total | `src/components/Cart.jsx` |
| Checkout con validación de formulario | `src/containers/CheckoutContainer.jsx` |
| Creación de orden en Firestore | `src/services/orders.service.js` |
| ID de orden visible al comprador | `src/pages/OrderPage.jsx` |
| Loaders y estados vacíos | `src/components/Loader.jsx`, `src/components/Message.jsx` |

## Estructura

```
src/
├── components/      Presentación pura (reciben props, no consultan datos)
├── containers/      Orquestan datos + estado y delegan el render
├── context/         Estado global (carrito)
├── hooks/           useCart, useAsync
├── pages/           Una vista por ruta
├── services/        Acceso a Firebase (única capa que conoce Firestore)
└── utils/           Formateo y validaciones
scripts/             Seed de la base de datos
```

La regla que sostiene todo: **un componente de `components/` nunca importa nada de `services/`**.
Si necesita datos, los recibe por props desde un container.

## Puesta en marcha

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear el proyecto en Firebase

1. Crear un proyecto en [console.firebase.google.com](https://console.firebase.google.com).
2. Crear una base de datos **Cloud Firestore**.
3. Registrar una app web y copiar el objeto de configuración.
4. Pegar las reglas de `firestore.rules` en la pestaña *Rules*.

### 3. Configurar las variables de entorno

```bash
cp env.example .env
```

Completar `.env` con las credenciales de la app web:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

`.env` está en `.gitignore`: nunca se commitea.

### 4. Cargar datos de prueba

```bash
npm run seed
```

Crea las colecciones `categories` (4 documentos) y `products` (18 documentos).
Cada documento usa su `slug` como id, así que el seed es idempotente: correrlo dos veces no duplica nada.

Las imágenes son fotos de [Unsplash](https://unsplash.com) referenciadas por URL, elegidas una por
producto. No se guardan en el repositorio: `scripts/data/products.mjs` arma la URL con el id de la foto
y los parámetros de recorte, así que el proyecto pesa poco y las imágenes llegan optimizadas por su CDN.

Para borrar todo y volver a cargar desde cero, incluidas las órdenes generadas durante las pruebas:

```bash
npm run seed:reset
```

### 5. Levantar la app

```bash
npm run dev
```

## Casos de prueba incluidos en el seed

El dataset está armado para poder mostrar todos los estados de la UI:

- **Sin stock**: `Sumatra Mandheling` y `Prensa francesa 600 ml` (stock 0) → `ItemCount` muestra "Producto sin stock".
- **Stock crítico**: `Geisha Boquete` (stock 2) y `Suscripción Oficina` (stock 1) → sirven para probar el tope del contador y el error de stock insuficiente al comprar dos veces seguidas.
- **Categoría vacía**: navegar a `/category/inexistente` para ver el estado vacío.
- **Producto inexistente**: navegar a `/item/no-existe` para ver el estado de error del detalle.
- **Rango de precios amplio**: de $10.800 a $89.000 para verificar el formateo de moneda.

## Notas sobre las reglas de Firestore

Las reglas de `firestore.rules` son permisivas a propósito: el seed y el descuento de stock
se ejecutan desde el cliente porque el curso no cubre backend. En una aplicación real,
la escritura de productos y el descuento de stock viven en un servidor o en una Cloud Function,
y el cliente sólo tiene permiso de lectura.

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción |
| `npm run lint` | ESLint sobre todo el proyecto |
| `npm run seed` | Carga categorías y productos |
| `npm run seed:reset` | Borra y vuelve a cargar todo |
