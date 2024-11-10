# E-commerce de Alquiler de Autos

## Descripción
Este proyecto es un e-commerce para el alquiler de autos, permitiendo a los usuarios seleccionar vehículos, agregarlos al carrito, gestionar el alquiler y realizar el pago de manera eficiente y segura. La plataforma está diseñada para ser fácil de usar y cuenta con funcionalidades dinámicas como filtros de búsqueda, carrito de compras persistente, y validación de pago.

![Vista del logo](img/Logo.png)

## Características
- *Listado de autos*: Muestra los vehículos disponibles para alquilar con fotos, descripciones, precios y otros detalles importantes.
- *Filtros dinámicos*: Filtra autos por características como tipo de vehículo, precio, o año de fabricación.
- *Carrito de compras*: Los usuarios pueden agregar autos al carrito, ajustar cantidades y eliminar productos fácilmente.
- *Formulario de pago seguro*: Con validación de tarjeta de crédito y simulación de transacciones.
- *Persistencia de datos*: Usa localStorage para almacenar los autos seleccionados y mantener la información del carrito durante la sesión.


## Tecnologías utilizadas
- *HTML5*: Estructura de la aplicación y uso de elementos semánticos.
- *CSS3*: Estilos con Flexbox y Grid para una interfaz moderna y responsiva.
- *JavaScript (ES6)*: Gestión dinámica de productos, carrito de compras y validación de formularios.
- *localStorage*: Almacenamiento local para los datos del carrito y persistencia de la compra.

## Estructura del Proyecto
- index.html: Página principal donde se listan los vehículos disponibles.
- carrito.html: Página que muestra el resumen de los autos seleccionados en el carrito de alquiler y el formulario de pago.
- styles.css: Archivo de estilos para toda la aplicación.
- app.js: Archivo JavaScript con la lógica de la aplicación: productos, filtros, carrito, y proceso de pago.
- data.js: Datos de los vehículos disponibles para alquilar.

## Funcionalidades principales

### 1. Vista de Productos
- *Carga inicial*: Muestra los primeros 15 autos con opción de scroll infinito para cargar más.
- *Filtros*: Permite a los usuarios buscar autos según dos criterios como categoría y precio.
- *Detalles de producto*: Cada vehículo tiene una sección con información detallada y la opción de agregarlo al carrito.

![Vista de Productos](images/vista-productos.png)

### 2. Carrito de Compras
- *Tabla interactiva*: Muestra los autos seleccionados, cantidades y precios totales por producto.
- *Gestión de productos*: Permite eliminar autos del carrito antes de proceder al pago.
- *Resumen de compra*: Calcula el total de la compra y añade un cargo por entrega de $15.000.

### 3. Proceso de Pago
- *Formulario de tarjeta de crédito*: Incluye campos para el número de tarjeta, fecha de expiración, código de seguridad y nombre del titular.
- *Validación dinámica*: Asegura que los datos ingresados sean correctos y muestra errores si hay información faltante o inválida.
- *Simulación de pago*: Usa Promesas en JavaScript para imitar el procesamiento del pago, incluyendo tiempos de espera y mensajes de éxito o error.