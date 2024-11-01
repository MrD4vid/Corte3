// index.js

const KEY_LOCAL_STORAGE = "datosCompra";

// Función para guardar datos en localStorage
function guardarDatos(key, data) {
    const dataString = JSON.stringify(data);
    localStorage.setItem(key, dataString);
}

// Función que captura y guarda los datos al iniciar la compra
function iniciarCompra() {
    const nombre = document.getElementById('nombre').value;
    const presupuesto = parseFloat(document.getElementById('presupuesto').value);
    const cantidadMax = parseInt(document.getElementById('cantidad').value);
    const direccion = document.getElementById('direccion').value;
    const entrega = document.getElementById('entrega').value;

    // Validación básica
    if (!nombre || !presupuesto || !cantidadMax || !direccion) {
        alert("Por favor, completa todos los campos.");
        return false; // Evita el envío del formulario
    }

    // Guardamos en un objeto para luego almacenar en localStorage
    const datosCompra = {
        nombre,
        presupuesto,
        cantidadMax,
        direccion,
        entrega
    };

    // Guardamos el objeto en localStorage
    guardarDatos(KEY_LOCAL_STORAGE, datosCompra);

    // Redirige a la vista de productos
    window.location.href = "producto.html";
    return false; // Evita el envío del formulario y mantiene el uso de JavaScript
}


// productos 
// Función para mostrar los productos en la lista
function mostrarProductos(productos) {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = ""; // Limpia la lista

    productos.forEach(producto => {
        // Crear el contenedor de la tarjeta del producto
        const productoCard = document.createElement("div");
        productoCard.classList.add("producto-card");

        // Imagen del producto
        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;

        // Nombre del producto
        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        // Precio del producto
        const precio = document.createElement("p");
        precio.textContent = `COP ${producto.precio.toLocaleString()}`;

        // Botón de detalles
        const botonDetalles = document.createElement("button");
        botonDetalles.textContent = "Ver Detalles";
        botonDetalles.onclick = () => verDetalles(producto);

        // Agrega elementos al contenedor de la tarjeta
        productoCard.appendChild(img);
        productoCard.appendChild(nombre);
        productoCard.appendChild(precio);
        productoCard.appendChild(botonDetalles);
        listaProductos.appendChild(productoCard);
    });
}

// Función para mostrar los detalles de un producto seleccionado
function verDetalles(producto) {
    const detalleProducto = document.getElementById("producto-detalle");
    detalleProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p><strong>Precio:</strong> COP ${producto.precio.toLocaleString()}</p>
        <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        <p><strong>Material:</strong> ${producto.material}</p>
        <p><strong>Stock disponible:</strong> ${producto.stock}</p>
    `;

    // Asigna un ID al producto en el detalle para agregarlo al carrito
    detalleProducto.dataset.productId = producto.id;
}

// Función para agregar el producto seleccionado al carrito
function agregarAlCarrito() {
    const productoId = document.getElementById("producto-detalle").dataset.productId;
    const producto = productos.find(prod => prod.id === parseInt(productoId));
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (producto && cantidad > 0) {
        const carrito = obtenerDatos("productosSeleccionados") || [];
        carrito.push({ ...producto, cantidad });
        guardarDatos("productosSeleccionados", carrito);
        alert("Producto agregado al carrito.");
    }
}

// Función para aplicar los filtros
function aplicarFiltros() {
    const categoria = document.getElementById("filtroCategoria").value;
    const precioMin = parseFloat(document.getElementById("filtroPrecioMin").value) || 0;
    const precioMax = parseFloat(document.getElementById("filtroPrecioMax").value) || Infinity;

    const productosFiltrados = productos.filter(producto =>
        (categoria === "" || producto.categoria === categoria) &&
        producto.precio >= precioMin &&
        producto.precio <= precioMax
    );

    mostrarProductos(productosFiltrados);
}

// Función para limpiar los filtros
function limpiarFiltros() {
    document.getElementById("filtroCategoria").value = "";
    document.getElementById("filtroPrecioMin").value = "";
    document.getElementById("filtroPrecioMax").value = "";
    mostrarProductos(productos);
}

// Carga los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);
});

// Carrito de compras 
// Función para cargar el resumen de compra en el carrito
function cargarResumenCompra() {
    const carrito = obtenerDatos("productosSeleccionados") || [];
    const tablaProductos = document.getElementById("tabla-productos").querySelector("tbody");
    let total = 0;

    tablaProductos.innerHTML = ""; // Limpia la tabla

    carrito.forEach(item => {
        const fila = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = item.nombre;

        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = `COP ${item.precio.toLocaleString()}`;

        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = item.cantidad;

        const tdTotal = document.createElement("td");
        const totalProducto = item.precio * item.cantidad;
        tdTotal.textContent = `COP ${totalProducto.toLocaleString()}`;

        const tdAccion = document.createElement("td");
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarDelCarrito(item.id);
        tdAccion.appendChild(botonEliminar);

        fila.appendChild(tdNombre);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdCantidad);
        fila.appendChild(tdTotal);
        fila.appendChild(tdAccion);

        tablaProductos.appendChild(fila);

        total += totalProducto;
    });

    document.getElementById("total-compra").textContent = `Total de Compra: COP ${total.toLocaleString()}`;
}

// Función para confirmar la compra
function confirmarCompra() {
    // Aquí se pueden realizar validaciones de tarjeta, seguridad, etc.
    alert("Compra confirmada exitosamente.");
    localStorage.clear(); // Limpia el carrito
    window.location.href = "index.html"; // Redirige al inicio
    return false;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
    let carrito = obtenerDatos("productosSeleccionados") || [];
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarDatos("productosSeleccionados", carrito);
    cargarResumenCompra(); // Recarga el resumen
}

// Cargar el resumen de compra al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarResumenCompra();
});
