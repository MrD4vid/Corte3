const REQUERIMIENTOS = "datosCompra";

// Función para guardar datos en localStorage
function guardarDatos(key, data) {
    const dataString = JSON.stringify(data);
    localStorage.setItem(key, dataString);
}

// funcion de mi boton, para obtener datos y dirigirme a iniciar la compra.
function iniciarCompra() {
    const nombre = document.getElementById('nombre').value;
    const presupuesto = parseFloat(document.getElementById('presupuesto').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const direccion = document.getElementById('direccion').value;
    const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked'); // para seleccionar el radio buton

    // Validación del campo nombre
    if (nombre === "" || nombre.length > 20) {
        alert("Por favor, ingrese un nombre válido (máximo 20 caracteres).");
        return;
    }

    // Validación del campo presupuesto (debe ser mayor a 0)
    if (isNaN(presupuesto) || presupuesto <= 0) {
        alert("Por favor, ingrese un presupuesto válido en COP (mayor a 0).");
        return;
    }

    // Validación del campo cantidad (debe estar entre 1 y 20)
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 20) {
        alert("Por favor, ingrese una cantidad válida de artículos (entre 1 y 20).");
        return;
    }

    // Validación del campo dirección
    if (direccion === "") {
        alert("Por favor, ingrese una dirección válida.");
        return;
    }

    // Validación del campo tipo de entrega (asegura que se seleccione uno)
    if (!tipoEntrega) {
        alert("Por favor, seleccione un tipo de entrega.");
        return;
    }

    // Datos guardados en un objeto.
    const datosCompra = {
        nombre,
        presupuesto,
        cantidad,
        direccion,
        tipoEntrega: tipoEntrega.value // Obtiene el valor del tipo de entrega directamente
    };

    // Guardamos el objeto en localStorage
    guardarDatos(REQUERIMIENTOS, datosCompra);

    // Redirige a la vista de productos
    window.location.href = "producto.html";
}

// Configuración para scroll infinito
const cantidadPorCarga = 15;
let desplazamiento = 0;
let cargando = false;
let productosVisibles = [];

// Funciones para guardar y obtener datos en localStorage
function guardarDatos(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerDatos(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

// Función para mostrar productos en la lista
function mostrarProductos(productos) {
    const listaProductos = document.getElementById("lista-productos");
    productos.forEach(producto => {
        const productoCard = document.createElement("div");
        productoCard.classList.add("producto-card");

        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `COP ${producto.precio.toLocaleString()}`;

        const stock = document.createElement("p");
        stock.textContent = "Disponible: " + producto.stock;

        const botonDetalles = document.createElement("button");
        botonDetalles.textContent = "Ver Detalles";
        botonDetalles.onclick = () => verDetalles(producto);

        productoCard.appendChild(img);
        productoCard.appendChild(nombre);
        productoCard.appendChild(precio);
        productoCard.appendChild(stock);
        productoCard.appendChild(botonDetalles);

        listaProductos.appendChild(productoCard);
    });
}

// Función para cargar productos con retardo usando Promesas
function obtenerProductosConRetardo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const productosPorCargar = productosVisibles.slice(desplazamiento, desplazamiento + cantidadPorCarga);
            if (productosPorCargar.length === 0 && desplazamiento >= productosVisibles.length) {
                alert("No hay más productos que mostrar.");
                window.removeEventListener("scroll", manejarScroll);
            } else {
                mostrarProductos(productosPorCargar);
                desplazamiento += cantidadPorCarga;
            }
            resolve();
        }, 1000);
    });
}

// Función para aplicar los filtros
function aplicarFiltros() {
    const categoria = document.getElementById("filtroCategoria").value;
    const precioMin = parseFloat(document.getElementById("filtroPrecioMin").value) || 0;
    const precioMax = parseFloat(document.getElementById("filtroPrecioMax").value) || Infinity;

    productosVisibles = productos.filter(producto =>
        (categoria === "" || producto.categoria === categoria) &&
        producto.precio >= precioMin &&
        producto.precio <= precioMax
    );

    desplazamiento = 0;
    document.getElementById("lista-productos").innerHTML = "";
    obtenerProductosConRetardo();
}

// Función para limpiar los filtros
function limpiarFiltros() {
    document.getElementById("filtroCategoria").value = "";
    document.getElementById("filtroPrecioMin").value = "";
    document.getElementById("filtroPrecioMax").value = "";

    productosVisibles = productos;
    desplazamiento = 0;
    document.getElementById("lista-productos").innerHTML = "";
    obtenerProductosConRetardo();
}

// Función para manejar el evento de scroll
function manejarScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && !cargando) {
        cargando = true;
        obtenerProductosConRetardo().then(() => {
            cargando = false;
        });
    }
}

// Función para ver detalles de un producto seleccionado
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
    detalleProducto.dataset.productId = producto.id;
}

// Función para agregar el producto seleccionado al carrito
function agregarAlCarrito() {
    const productoId = document.getElementById("producto-detalle").dataset.productId;
    const producto = productos.find(prod => prod.id === parseInt(productoId));
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (producto && cantidad > 0) {
        if (cantidad <= producto.stock) {
            const carrito = obtenerDatos("productosSeleccionados") || [];
            carrito.push({ ...producto, cantidad });
            guardarDatos("productosSeleccionados", carrito);
            alert("Producto agregado al carrito.");
        } else {
            alert(`Solo tenemos ${producto.stock} unidades disponibles.`);
        }
    }
}

// Funciones de navegación
function irCarrito() {
    window.location.href = "carrito.html";
}

function cancelarCompra() {
    window.location.href = "index.html";
}

// Inicializar la vista y cargar productos
function inicializarVista() {
    productosVisibles = obtenerDatos("productos") || productos;
    obtenerProductosConRetardo();
    window.addEventListener("scroll", manejarScroll);
}

document.addEventListener("DOMContentLoaded", inicializarVista);

// Función para guardar y obtener datos en localStorage
function guardarDatos(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerDatos(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

// Función para guardar y obtener datos en localStorage
function guardarDatos(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerDatos(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

// Cargar el resumen de compra en el carrito
function cargarResumenCompra() {
    const carrito = obtenerDatos("productosSeleccionados") || [];
    const datosCompra = obtenerDatos("datosCompra") || {};
    const tablaProductos = document.getElementById("tabla-productos").querySelector("tbody");
    let total = 0;

    // Mostrar datos generales de la compra
    document.getElementById("nombre-comprador").textContent = `Nombre: ${datosCompra.nombre || ''}`;
    document.getElementById("presupuesto-max").textContent = `Presupuesto Máximo: COP ${datosCompra.presupuesto ? datosCompra.presupuesto.toLocaleString() : ''}`;
    document.getElementById("cantidad-max").textContent = `Cantidad Máxima de Artículos: ${datosCompra.cantidadMax || ''}`;
    document.getElementById("direccion-envio").textContent = `Dirección: ${datosCompra.direccion || ''}`;

    // Limpiar tabla antes de cargar productos
    tablaProductos.innerHTML = "";

    carrito.forEach(item => {
        const fila = document.createElement("tr");

        const tdImagen = document.createElement("td");
        const img = document.createElement("img");
        img.src = item.imagen;
        img.alt = item.nombre;
        img.style.width = "50px";
        img.style.height = "50px";
        tdImagen.appendChild(img);

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

        fila.appendChild(tdImagen);
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

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
    let carrito = obtenerDatos("productosSeleccionados") || [];
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarDatos("productosSeleccionados", carrito);
    cargarResumenCompra();
}

// Validaciones para el formulario de pago
function validarNumeroTarjeta(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, "");
}

function validarNombreTitular(event) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, ""); // Solo letras y espacios
}

function verContra() {
    const inputCodigo = document.getElementById("codigo_seguridad");
    const boton = document.getElementById("ver_contraseña");
    
    if (inputCodigo.type === "password") {
        inputCodigo.type = "text";
        boton.textContent = "Ocultar";
    } else {
        inputCodigo.type = "password";
        boton.textContent = "Mostrar";
    }
}


// Confirmar compra y limpiar datos
function confirmarCompra(event) {
    event.preventDefault(); // Previene el envío del formulario
    alert("Compra confirmada exitosamente.");
    
    // Limpia solo la información del carrito y datos de compra
    localStorage.removeItem("productosSeleccionados");
    localStorage.removeItem("datosCompra");
    
    // Redirige a la vista 1
    window.location.href = "index.html";
}


// Funciones de navegación
function cancelarCompra() {
    window.location.href = "index.html";
}

function seguirComprando() {
    window.location.href = "producto.html";
}

// Inicializar eventos y carga de datos solo si los elementos están presentes
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("tabla-productos")) {
        cargarResumenCompra();
    }

    if (document.getElementById("tarjeta")) {
        document.getElementById("tarjeta").addEventListener("input", validarNumeroTarjeta);
        document.getElementById("nombre-titular").addEventListener("input", validarNombreTitular);
        document.getElementById("boton-toggle-codigo").addEventListener("click", toggleCodigoSeguridad);
        document.getElementById("form-pago").addEventListener("submit", confirmarCompra);
    }
});

