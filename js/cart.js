document.addEventListener("DOMContentLoaded", () => {
  // Crear elemento nav que contiene todo el HTML de la caja del carrito de compras
  const cartNavElement = document.createElement("li");
  cartNavElement.innerHTML = `
    <div class="container">
        <div class="btn-menu">
            <label for="btn-menu" class=""nav-item"><i class="fa-solid fa-cart-shopping" style="color: #ffd6ff;"></i></label>    
        </div>   
        <input type="checkbox" id="btn-menu">
        <div class="container-menu">
        <div class="cont-menu">
                <h5 class="letras-carrito">Mi compra</h5>
                    <nav id="backtomenu" class="menu">
                        <ul id="shopContent" class="shoppContent" >
                            <li><a href="cart.html">Ir al carrito</a></li>
                            <li class="calculos-carrito">Subtotal</li>
                            <li class="calculos-carrito">Descuentos</li>
                            <li class="calculos-carrito">Total</li>
                        </ul>
                    </nav>
                <button id="ir-a-checkout" class="boton-producto box-botonpr">
                <div id="contenido-btn-comprar">Comprar</div>
                </button>
            <label for="btn-menu" class="icon-equis"><i class="fa-solid fa-x"></i></label>
        </div>    
        </div>
    </div>
`;
  cartNavElement.classList.add("nav-item");
  cartNavElement.id = "login-nav-li";

  //* Agregar elemento nav a navbar
  const navbar = document.getElementById("navlist");
  navbar.appendChild(cartNavElement);
});

// Definir una variable para almacenar los productos en el carrito
const carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
  const indice = carrito.findIndex((producto) => producto.id === idProducto);
  if (indice !== -1) {
    carrito.splice(indice, 1);
  }
}

// Función para calcular el total del carrito
function calcularTotalCarrito() {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio;
  });
  return total;
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
  // Actualizar la lista de productos en el carrito
  const listaProductosCarrito = document.getElementById("lista-productos");
  listaProductosCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const itemCarrito = document.createElement("li");
    itemCarrito.textContent = `${producto.nombre} - $${producto.precio.toFixed(
      2
    )}`;
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar-producto");
    botonEliminar.setAttribute("data-id", producto.id);
    itemCarrito.appendChild(botonEliminar);
    listaProductosCarrito.appendChild(itemCarrito);
  });

  // Actualizar el total del carrito
  const totalCarrito = document.getElementById("total-carrito");
  totalCarrito.textContent = `$${calcularTotalCarrito().toFixed(2)}`;
}

// Eventos para botones y acciones del carrito
document
  .getElementById("lista-productos-disponibles")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("boton-producto")) {
      const idProducto = event.target.getAttribute("data-id");
      // Aquí debes obtener el producto correspondiente desde tu base de datos o fuente de datos
      const producto = obtenerProductoPorId(idProducto);
      if (producto) {
        agregarAlCarrito(producto);
        actualizarCarrito();
      }
    }
  });

document
  .getElementById("lista-productos")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar-producto")) {
      const idProducto = event.target.getAttribute("data-id");
      eliminarDelCarrito(idProducto);
      actualizarCarrito();
    }
  });

document
  .getElementById("vaciar-carrito")
  .addEventListener("click", function () {
    // Vaciar el carrito
    carrito.length = 0;
    actualizarCarrito();
  });

document
  .getElementById("realizar-pedido")
  .addEventListener("click", function () {
    // Lógica para realizar un pedido (puede implicar enviar la información del carrito al servidor)
    // Aquí puedes implementar la funcionalidad adicional que necesites para procesar el pedido
  });
