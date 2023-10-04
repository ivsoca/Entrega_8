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

const cart_URL_base = "https://japceibal.github.io/emercado-api/user_cart/";
const cart_pre_hecho = cart_URL_base + "25801" + EXT_TYPE;
const imagen_producto = document.getElementById("imagen");
const nombre_producto = document.getElementById("name");
const precio_producto = document.getElementById("cost");
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
  cantidad.addEventListener("change", showCart);
});

function showCart() {
  let { name, unitCost, currency, image } = cart_productos[0];

  imagen_producto.innerHTML = `<img src="${image}" >`;
  nombre_producto.innerHTML = `${name}`;
  precio_producto.innerHTML = `${currency} ${unitCost}`;
  console.log({
    unitCost,
    cantidad,
    typeC: typeof cantidad,
    typeu: typeof unitCost,
  });
  subtotal.innerHTML =
    currency + " " + parseInt(unitCost) * parseInt(cantidad.value);
}
