document.addEventListener("DOMContentLoaded", async () => {
  let radioEnvio = document.getElementById("formEnvio");
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
    agregarAlCarritoButton.addEventListener("click", fillSidebarCart());
  }
  getJSONData(cart_pre_hecho).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let productos =
        JSON.parse(localStorage.getItem("productosCarrito")) || [];
      resultObj.data.articles.forEach((element) => {
        if (!productos.includes(element.id)) {
          productos.push(element.id);
        }
      });
      //productos = { ...productos, [productoId]: resultObj.data.articles[0] };
      localStorage.setItem("productosCarrito", JSON.stringify(productos));

      // cart_productos = resultObj.data.articles;
      // subtotal_precio = cart_productos[0].unitCost;
      showCart().then(actualizarTotal());
    }
  });
  fillSidebarCart("lista-producto");
  loadProductIds();

  setTimeout(() => actualizarTotal(), 500);

  radioEnvio.addEventListener("click", () => {
    console.log("click");
    actualizarTotal();
  });
});

const cart_URL_base = "https://japceibal.github.io/emercado-api/user_cart/";
const cart_pre_hecho = cart_URL_base + "25801" + EXT_TYPE;
// const imagen_producto = document.getElementById("imagen-cart");
// const nombre_producto = document.getElementById("name-cart");
// const precio_producto = document.getElementById("cost-cart");
// const cantidad = document.getElementById("cantidad");
// const subtotal = document.getElementById("subtotal");
// const total_compra = document.getElementById("total");
// let cart_productos = [];
// let subtotal_precio = 0;

// document.addEventListener("DOMContentLoaded", function (e) {
//   cantidad?.addEventListener("change", actualizarSubtotal());
// });

async function showCart() {
  const productosCarrito =
    JSON.parse(localStorage.getItem("productosCarrito")) || [];
  const listaProductosCompra = document.getElementById(
    "lista-productos-compra"
  );
  productosCarrito.forEach(async (elementid) => {
    let productoURL = `https://japceibal.github.io/emercado-api/products/${elementid}.json`;
    let productoFetch = await getJSONData(productoURL);
    let producto = productoFetch.data;

    const tableRow = document.createElement("tr");
    const tableDataImage = document.createElement("td");
    const imgProduct = document.createElement("img");
    imgProduct.src = producto.images[0];
    imgProduct.id = "img-cart";
    tableDataImage.appendChild(imgProduct);

    const tableDataNombre = document.createElement("td");
    const tableDataNombreText = document.createTextNode(producto.name);
    tableDataNombre.appendChild(tableDataNombreText);

    const tableDataCosto = document.createElement("td");
    const productoCosto = producto.cost || producto.unitCost;
    const tableDataCostoText = document.createTextNode(
      producto.currency + " " + productoCosto
    );
    tableDataCosto.appendChild(tableDataCostoText);
    tableDataCosto.id = `${producto.id}-costo`;

    const tableDataCantidad = document.createElement("td");
    const tableDataCantidadInput = document.createElement("input");
    tableDataCantidadInput.setAttribute("min", "1");
    tableDataCantidadInput.setAttribute("type", "number");
    tableDataCantidadInput.setAttribute("value", 1);
    tableDataCantidadInput.id = `${producto.id}-cantidad`;
    tableDataCantidadInput.classList.add("form-control");
    tableDataCantidadInput.classList.add("cantidad");
    tableDataCantidad.appendChild(tableDataCantidadInput);

    const tableDataSubtotal = document.createElement("td");
    tableDataSubtotal.id = `${producto.id}-subtotal`;
    const tableDataSubtotalText = document.createTextNode(
      producto.currency +
        " " +
        parseInt(productoCosto) * parseInt(tableDataCantidadInput.value)
    );

    tableDataSubtotal.appendChild(tableDataSubtotalText);

    //Agregando el bote de basura
    const tableDataBasura = document.createElement("td");
    const boteBasuraIcon = document.createElement("i");
    boteBasuraIcon.classList.add("fa-trash");
    boteBasuraIcon.classList.add("fa");
    boteBasuraIcon.id = `${producto.id}-boteBasuraIcon`;

    tableDataBasura.appendChild(boteBasuraIcon);

    //Se appendea los datos para que aparezcan en el html
    tableRow.appendChild(tableDataImage);
    tableRow.appendChild(tableDataNombre);
    tableRow.appendChild(tableDataCosto);
    tableRow.appendChild(tableDataCantidad);
    tableRow.appendChild(tableDataSubtotal);
    tableRow.appendChild(tableDataBasura);

    listaProductosCompra.appendChild(tableRow);

    //Funcionalidad del boton de bote de basura
    let boteBasura = document.getElementById(`${producto.id}-boteBasuraIcon`);

    boteBasura.addEventListener("click", async () => {
      let productosCarrito = await JSON.parse(
        localStorage.getItem("productosCarrito")
      );

      let index = productosCarrito.indexOf(producto.id);
      if (index !== -1) {
        productosCarrito.splice(index, 1);

        localStorage.setItem(
          "productosCarrito",
          JSON.stringify(productosCarrito)
        );

        tableRow.remove();
      } else {
        // Handle the case where producto.id is not found in productosCarrito
        console.log(`${producto.id} not found in productosCarrito`);
      }
    });
  });

  // let { name, unitCost, currency, image } = cart_productos[0];
  // if (imagen_producto) {
  //   imagen_producto.innerHTML = `<img id=img-cart src="${image}" >`;
  // }
  // if (nombre_producto) {
  //   nombre_producto.innerHTML = `${name}`;
  // }
  // if (precio_producto) {
  //   precio_producto.innerHTML = `${currency} ${unitCost}`;
  // }
  // if (subtotal) {
  //   subtotal.innerHTML =
  //     currency + " " + parseInt(unitCost) * parseInt(cantidad.value);
  // }
}

const productIds = [];
function loadProductIds() {
  const productosCarrito =
    JSON.parse(localStorage.getItem("productosCarrito")) || {};

  productosCarrito.forEach((elementId) => {
    productIds.push(`${elementId}-cantidad`);
    console.log(productIds);
  });
}
document.addEventListener("click", function (e) {
  if (e.target && productIds.includes(e.target.id)) {
    actualizarSubtotal(e.target.id.slice(0, e.target.id.indexOf("-")));
    console.log(e.target.id);
    actualizarTotal();
  }
});

function actualizarSubtotal(id) {
  const subtotal = document.getElementById(`${id}-subtotal`);
  const cantidad = document.getElementById(`${id}-cantidad`);
  const costo = document.getElementById(`${id}-costo`);
  const costoValue = costo.innerHTML.slice(costo.innerHTML.indexOf(" "));
  const currency = subtotal.innerHTML.slice(0, subtotal.innerHTML.indexOf(" "));
  const textoSubtotal = document.createTextNode(
    currency + " " + cantidad.value * costoValue
  );
  if (subtotal) {
    subtotal.innerHTML = "";
    subtotal.appendChild(textoSubtotal);
  }
}

async function fillSidebarCart(idListElement) {
  const productosCarrito =
    JSON.parse(localStorage.getItem("productosCarrito")) || [];
  const sidebarUl = document.getElementById(idListElement);
  const subtotalSidebar = document.getElementById("subtotal-sidebar");
  sidebarUl.innerHTML = "";
  let subTotalSidebarAmount = 0;
  productosCarrito.forEach(async (elementid) => {
    let productoURL = `https://japceibal.github.io/emercado-api/products/${elementid}.json`;
    let productoFetch = await getJSONData(productoURL);
    let producto = productoFetch.data;
    const liElement = document.createElement("li");
    const imgProduct = document.createElement("img");
    imgProduct.src = producto.images[0];
    const productoCosto = producto.cost || producto.unitCost;
    const productCost = document.createTextNode(
      `${producto.currency} ${productoCosto}`
    );
    liElement.appendChild(imgProduct);

    liElement.appendChild(productCost);
    liElement.classList.add("calculos-carrito");
    sidebarUl.appendChild(liElement);
    subTotalSidebarAmount += productoCosto;
  });
  const subtotalText = document.createTextNode(await subTotalSidebarAmount);
  subtotalSidebar.appendChild(subtotalText);
}

function actualizarGranSubtotal() {
  const spanSubtotal = document.getElementById("spanGranSubtotal");
  //productosCarrito debería estar en DOMContentLoaded pero si lo saco de acá se rompe otra funcion :p
  const productosCarrito =
    JSON.parse(localStorage.getItem("productosCarrito")) || [];
  let total = 0;

  productosCarrito.forEach((id) => {
    const subtotal = document.getElementById(`${id}-subtotal`);
    const subtotalString = subtotal.textContent;
    let subtotalNumero = parseFloat(subtotalString.split(" ")[1]);

    if (subtotalString.split(" ")[0] == "UYU") {
      subtotalNumero /= 40;
      subtotalNumero = Math.round(subtotalNumero);
      console.log(subtotalNumero);
    }

    total += subtotalNumero;
    spanSubtotal.textContent = "USD " + total;
  });
  return total;
}

async function actualizarImpuesto() {
  let granSubtotal = await actualizarGranSubtotal();
  console.log(granSubtotal);
  let spanEnvio = document.getElementById("spanCostoDeEnvio");
  let tipoEnvio = document.getElementsByName("envio");

  let porcentaje;
  for (let i = 0; i < tipoEnvio.length; i++) {
    if (tipoEnvio[i].checked) {
      checkedNumber = parseFloat(tipoEnvio[i].value);
      porcentaje = checkedNumber / 100;
    }
  }
  totalEnvio = Math.round(granSubtotal * porcentaje);

  spanEnvio.textContent = "USD " + totalEnvio;

  return totalEnvio;
}

async function actualizarTotal() {
  let subtotal = await actualizarGranSubtotal();
  let impuesto = await actualizarImpuesto();

  let spanTotal = document.getElementById("spanTotal");

  let total = subtotal + impuesto;

  spanTotal.textContent = "USD " + total;
}

//Validación del contenido del formulario de envío
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".needs-validation");

  // Hace un bucle del contenido del form
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        //Si el formulario no esta validado se detiene el envío de la información
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          sessionStorage.setItem("formSubmitted", "true");
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  // Verifica si el formulario fue enviado previamente
  const formSubmitted = sessionStorage.getItem("formSubmitted");
  if (formSubmitted) {
    // Si el formulario fue enviado, muestra la alerta
    let alertaSuccess = document.createElement("div");
    alertaSuccess.classList.add("alert", "alert-success", "mt-3");
    alertaSuccess.textContent = "¡Has comprado con éxito!";
    document.body.appendChild(alertaSuccess);

    // Cierra la alerta después de 3 segundos
    setTimeout(function () {
      alertaSuccess.remove();
    }, 3000);

    // Limpia el indicador de formulario enviado
    sessionStorage.removeItem("formSubmitted");
  }
});
