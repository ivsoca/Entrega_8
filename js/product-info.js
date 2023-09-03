//Se genera un EventListenner para que al seleccionar la card haga varias funciones.
document.addEventListener("DOMContentLoaded", () => {
  //Se crean const que traen info del localStorage(producto que se clickeo y su nombre de categoria)
  const product = JSON.parse(localStorage.getItem("productoClickeado"));
  const productCategoryName = localStorage.getItem("catName");
  //Se crean constantes para traer los elementos por su id del html
  const nombreProduct = document.getElementById("nombreProduct");
  const precioProduct = document.getElementById("precioProducto");
  const descripcionProducto = document.getElementById("descripcionProducto");
  const categoriaProducto = document.getElementById("categoriaProducto");
  const cantidadProducto = document.getElementById("cantidadProducto");
  const carruselProduct = document.getElementById("carruselProducto");
  //Pone la info del producto en el lugar correcto del html para verlos
  document.create;
  const nombreProductText = document.createTextNode(product.name);
  const precioProductText = document.createTextNode(
    product.cost + " " + product.currency
  );
  const descripcionProductoText = document.createTextNode(product.description);
  const categoriaProductoText = document.createTextNode(productCategoryName);
  const cantidadProductoText = document.createTextNode(product.soldCount);
  nombreProduct.appendChild(nombreProductText);
  precioProduct.appendChild(precioProductText);
  descripcionProducto.appendChild(descripcionProductoText);
  categoriaProducto.appendChild(categoriaProductoText);
  cantidadProducto.appendChild(cantidadProductoText);
  //Muestra las imagenes relacionadas con el producto (son 4 imagenes por producto por eso i=1; i<5)
  for (let i = 1; i < 5; i++) {
    const listImageProduct = document.createElement("img");
    listImageProduct.classList.add("image-producto");
    listImageProduct.src = `/img/prod${product.id}_${i}.jpg`;
    carruselProduct.appendChild(listImageProduct);
  }
});
