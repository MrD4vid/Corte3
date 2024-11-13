const REQUERIMIENTOS = "datosCompra";

function guardarDatos(key, data) {
    const dataString = JSON.stringify(data);
    localStorage.setItem(key, dataString);
}

function iniciarCompra() {
    const nombre = document.getElementById('nombre').value;
    const presupuesto = parseFloat(document.getElementById('presupuesto').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const direccion = document.getElementById('direccion').value;
    const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked');

    if (nombre === "" || nombre.length > 20) {
        alert("Por favor, ingrese un nombre válido (máximo 20 caracteres).");
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        alert("El nombre solo puede contener letras y espacios.");
        return;
    }

    if (isNaN(presupuesto) || presupuesto <= 0) {
        alert("Por favor, ingrese un presupuesto válido en COP (mayor a 0).");
        return;
    }

    if (isNaN(cantidad) || cantidad < 1 || cantidad > 20) {
        alert("Por favor, ingrese una cantidad válida de artículos (entre 1 y 20).");
        return;
    }

    if (direccion === "") {
        alert("Por favor, ingrese una dirección válida.");
        return;
    }

    if (!tipoEntrega) {
        alert("Por favor, seleccione un tipo de entrega.");
        return;
    }

    const datosCompra = {
        nombre,
        presupuesto,
        cantidad,
        direccion,
        tipoEntrega: tipoEntrega.value
    };

    guardarDatos(REQUERIMIENTOS, datosCompra);
    window.location.href = "producto.html";
}

const cantidadPorCarga = 15;
let desplazamiento = 0;
let cargando = false;
let productosVisibles = [];

function guardarDatos(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerDatos(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

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

function aplicarFiltros() {
    const categoria = document.getElementById("filtroCategoria").value;
    const precioMin = parseFloat(document.getElementById("filtroPrecioMin").value) || 0;
    const precioMax = parseFloat(document.getElementById("filtroPrecioMax").value) || Infinity;

    productosVisibles = productos.filter(producto => {
        const cumpleCategoria = categoria === "" || producto.categoria === categoria;
        const cumplePrecio = producto.precio >= precioMin && producto.precio <= precioMax;
        return cumpleCategoria && cumplePrecio;
    });

    desplazamiento = 0;
    document.getElementById("lista-productos").innerHTML = "";
    obtenerProductosConRetardo();
}

function limpiarFiltros() {
    document.getElementById("filtroCategoria").value = "";
    document.getElementById("filtroPrecioMin").value = "";
    document.getElementById("filtroPrecioMax").value = "";
    productosVisibles = productos;
    desplazamiento = 0;
    cargando = false;
    document.getElementById("lista-productos").innerHTML = "";
    obtenerProductosConRetardo();
    window.addEventListener("scroll", manejarScroll);
}

function manejarScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && !cargando) {
        cargando = true;
        obtenerProductosConRetardo().then(() => {
            cargando = false;
        });
    }
}

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

function irCarrito() {
    window.location.href = "carrito.html";
}

function cancelarCompra() {
    window.location.href = "index.html";
}

function inicializarVista() {
    productosVisibles = obtenerDatos("productos") || productos;
    obtenerProductosConRetardo();
    window.addEventListener("scroll", manejarScroll);
}

document.addEventListener("DOMContentLoaded", inicializarVista);

function cargarResumenCompra() {
    const carrito = obtenerDatos("productosSeleccionados") || [];
    const datosCompra = obtenerDatos("datosCompra") || {};
    const tablaProductos = document.getElementById("tabla-productos").querySelector("tbody");
    let total = 0;

    document.getElementById("nombre-comprador").textContent = `Nombre: ${datosCompra.nombre || ''}`;
    document.getElementById("presupuesto-max").textContent = `Presupuesto Máximo: COP ${datosCompra.presupuesto ? datosCompra.presupuesto.toLocaleString() : ''}`;
    document.getElementById("cantidad-max").textContent = `Cantidad Máxima de Artículos: ${datosCompra.cantidad || ''}`;
    document.getElementById("direccion-envio").textContent = `Dirección: ${datosCompra.direccion || ''}`;

    tablaProductos.innerHTML = "";

    carrito.forEach(item => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px;"></td>
            <td>${item.nombre}</td>
            <td>COP ${item.precio.toLocaleString()}</td>
            <td>${item.cantidad}</td>
            <td>COP ${(item.precio * item.cantidad).toLocaleString()}</td>
            <td><button onclick="eliminarDelCarrito(${item.id})">Eliminar</button></td>
        `;
        tablaProductos.appendChild(fila);
        total += item.precio * item.cantidad;
    });

    document.getElementById("total-compra").textContent = `Total de Compra: COP ${total.toLocaleString()}`;
}

function eliminarDelCarrito(idProducto) {
    let carrito = obtenerDatos("productosSeleccionados") || [];
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarDatos("productosSeleccionados", carrito);
    cargarResumenCompra();
}

function validarNumeroTarjeta(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, "");
}

function validarNombreTitular(event) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
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

function confirmarCompra(event) {
    event.preventDefault();

    const carrito = obtenerDatos("productosSeleccionados") || [];
    const datosCompra = obtenerDatos("datosCompra") || {};
    const botonConfirmar = document.querySelector("#form-pago button[type='submit']");

    if (carrito.length === 0) {
        alert("No hay ningún producto para comprar.");
        return;
    }

    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCosto = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    if (totalProductos > 20) {
        alert("No es posible completar la compra. Se ha excedido el límite de 20 productos.");
        return;
    }

    if (datosCompra.presupuesto < totalCosto) {
        alert("No es posible completar la compra, el presupuesto es insuficiente para cubrir el total de la compra.");
        return;
    }

    botonConfirmar.disabled = true;
    alert("Procesando la compra, por favor espera...");

    new Promise((resolve, reject) => {
        const tiempoEspera = Math.random() * (3000 - 2000) + 2000;
        setTimeout(() => {
            const numeroTarjeta = document.getElementById("tarjeta").value;
            const codigoSeguridad = document.getElementById("codigo_seguridad").value;

            if (numeroTarjeta.length !== 16 || isNaN(numeroTarjeta)) {
                reject("El número de tarjeta ingresado es inválido.");
            } else if (codigoSeguridad.length !== 3 || isNaN(codigoSeguridad)) {
                reject("El código de seguridad ingresado es inválido, deben ser numeros.");
            } else {
                resolve("Compra confirmada exitosamente.");
            }
        }, tiempoEspera);
    })
    .then((mensaje) => {
        alert(mensaje);
        localStorage.clear();
        window.location.href = "index.html";
    })
    .catch((error) => {
        alert(error);
        botonConfirmar.disabled = false;
    });
}

function cancelarCompra() {
    window.location.href = "index.html";
}

function seguirComprando() {
    window.location.href = "producto.html";
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("tabla-productos")) {
        cargarResumenCompra();
    }

    if (document.getElementById("tarjeta")) {
        document.getElementById("tarjeta").addEventListener("input", validarNumeroTarjeta);
        document.getElementById("nombre-titular").addEventListener("input", validarNombreTitular);
        document.getElementById("form-pago").addEventListener("submit", confirmarCompra);
    }
});

