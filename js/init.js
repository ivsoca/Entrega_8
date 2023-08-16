const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

// Login code
document.addEventListener("DOMContentLoaded", function () {
  let contenido = document.getElementById("contenido");
  let loginPopup = document.getElementById("loginPopup");
  let loginButton = document.getElementById("loginButton");
  let usuarioLogueado = false;

  //Cambiar usuarioLogueado segun estado de login
  if (localStorage.getItem("email") != null) {
    usuarioLogueado = true;
  } else {
    usuarioLogueado = false;
  }

  //Mostrar pop up si no está logueado
  if (usuarioLogueado) {
    loginPopup.style.display = "none";
    contenido.style.pointerEvents = "all";
  } else {
    loginPopup.style.display = "flex";
    contenido.style.pointerEvents = "none";
  }
  loginButton.addEventListener("click", function () {
    loginPopup.style.display = window.location.href = "login.html";
  });
});
