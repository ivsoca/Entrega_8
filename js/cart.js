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
                            <ul id="lista-producto"> </ul>
                            <li id="subtotal-sidebar"class="calculos-carrito">Subtotal: </li>
                            <li id="descuentos-sidebar" class="calculos-carrito">Descuentos</li>
                            <li id="total-sidebar" class="calculos-carrito">Total</li>
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
  cartNavElement.id = "cart-nav-li";
  //* Agregar elemento nav a navbar
  const navbar = document.getElementById("navlist");
  navbar.appendChild(cartNavElement);
  const agregarAlCarritoButton = document.getElementById(
    "agregarAlCarritoButton"
  );
  if (agregarAlCarritoButton) {
    agregarAlCarritoButton.addEventListener("click", fillSidebarCart);
  }
  fillSidebarCart("lista-producto");
});

const cart_URL_base = "https://japceibal.github.io/emercado-api/user_cart/";
const cart_pre_hecho = cart_URL_base + "25801" + EXT_TYPE;
const imagen_producto = document.getElementById("imagen-cart");
const nombre_producto = document.getElementById("name-cart");
const precio_producto = document.getElementById("cost-cart");
const cantidad = document.getElementById("cantidad");
const subtotal = document.getElementById("subtotal");
const total_compra = document.getElementById("total");
let cart_productos = [];
let subtotal_precio = 0;

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(cart_pre_hecho).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cart_productos = resultObj.data.articles;
      subtotal_precio = cart_productos[0].unitCost;
      showCart();
    }
  });
  cantidad?.addEventListener("change", showCart);
});

function showCart() {
  const productosCarrito =
    JSON.parse(localStorage.getItem("productosCarrito")) || {};
  const listaProductosCompra = document.getElementById(
    "lista-productos-compra"
  );
  Object.values(productosCarrito).forEach((producto) => {
    const tableRow = document.createElement("tr");
    const tableDataImage = document.createElement("td");
    const imgProduct = document.createElement("img");
    imgProduct.src = producto.image;
    tableDataImage.appendChild(imgProduct);

    const tableDataNombre = document.createElement("td");
    const tableDataNombreText = document.createTextNode(producto.name);
    tableDataNombre.appendChild(tableDataNombreText);

    const tableDataCosto = document.createElement("td");
    const tableDataCostoText = document.createTextNode(producto.cost);
    tableDataCosto.appendChild(tableDataCostoText);
    tableDataCosto.id = `${producto.id}-costo`;

    const tableDataCantidad = document.createElement("td");
    const tableDataCantidadInput = document.createElement("input");
    tableDataCantidadInput.setAttribute("min", "1");
    tableDataCantidadInput.setAttribute("type", "number");
    tableDataCantidadInput.setAttribute("value", 1);
    tableDataCantidadInput.id = `${producto.id}-cantidad`;
    tableDataCantidadInput.addEventListener(
      "input",
      actualizarSubtotal(producto.id)
    );
    console.log(window.getEventListeners(tableDataCantidadInput));
    tableDataCantidad.appendChild(tableDataCantidadInput);

    const tableDataSubtotal = document.createElement("td");
    tableDataSubtotal.id = `${producto.id}-subtotal`;
    const tableDataSubtotalText = document.createTextNode(
      producto.currency +
        " " +
        parseInt(producto.cost) * parseInt(tableDataCantidadInput.value)
    );
    console.log(parseInt(producto.cost), tableDataCantidadInput);
    tableDataSubtotal.appendChild(tableDataSubtotalText);

    tableRow.appendChild(tableDataImage);
    tableRow.appendChild(tableDataNombre);
    tableRow.appendChild(tableDataCosto);
    tableRow.appendChild(tableDataCantidad);
    tableRow.appendChild(tableDataSubtotal);

    listaProductosCompra.appendChild(tableRow);
    //
  });
  let { name, unitCost, currency, image } = cart_productos[0];
  if (imagen_producto) {
    imagen_producto.innerHTML = `<img id=img-cart src="${image}" >`;
  }
  if (nombre_producto) {
    nombre_producto.innerHTML = `${name}`;
  }
  if (precio_producto) {
    precio_producto.innerHTML = `${currency} ${unitCost}`;
  }
  console.log({
    unitCost,
    cantidad,
    typeC: typeof cantidad,
    typeu: typeof unitCost,
  });
  if (subtotal) {
    subtotal.innerHTML =
      currency + " " + parseInt(unitCost) * parseInt(cantidad.value);
  }
}

function actualizarSubtotal(id) {
  const subtotal = document.getElementById(`${id}-subtotal`);
  const cantidad = document.getElementById(`${id}-cantidad`);
  const costo = document.getElementById(`${id}-costo`);
  const textoSubtotal = document.createTextNode(cantidad * costo);
  console.log("acutalizando", id);
  if (subtotal) {
    subtotal.innerHTML = "";
    subtotal.appendChild(textoSubtotal);
  }
}

function fillSidebarCart(idListElement) {
  const productosCarrito =
    JSON.parse(localStorage.getItem("productosCarrito")) || {};
  const sidebarUl = document.getElementById(idListElement);
  const subtotalSidebar = document.getElementById("subtotal-sidebar");
  sidebarUl.innerHTML = "";
  let subTotalSidebarAmount = 0;
  Object.values(productosCarrito).forEach((producto) => {
    const liElement = document.createElement("li");
    const imgProduct = document.createElement("img");
    imgProduct.src = producto.image;
    const productCost = document.createTextNode(
      `${producto.currency} ${producto.cost}`
    );
    liElement.appendChild(imgProduct);

    liElement.appendChild(productCost);
    liElement.classList.add("calculos-carrito");
    sidebarUl.appendChild(liElement);
    subTotalSidebarAmount += producto.cost;
  });
  const subtotalText = document.createTextNode(subTotalSidebarAmount);
  subtotalSidebar.appendChild(subtotalText);
  console.log(subtotalSidebar);
}
