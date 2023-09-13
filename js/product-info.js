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

  // Función para cambiar la imagen actual del carrusel
  let intervalo = false

  function cambiarImagenCarrusel() {
    let imagenActual = 1; // Inicialmente, muestra la primera imagen

    return function () {
      // Elimina todas las imágenes actuales del carrusel
      carruselProduct.innerHTML = '';

      // Crea una nueva imagen y la agrega al carrusel
      const nuevaImagen = document.createElement("img");
      nuevaImagen.classList.add("image-producto");
      nuevaImagen.classList.add("card-img-top");
      nuevaImagen.src = `/img/prod${product.id}_${imagenActual}.jpg`;
      carruselProduct.appendChild(nuevaImagen);

      // Incrementa las imagenes y al llegar a la última regresa a la 1ra
      imagenActual++;
      if (imagenActual > 4) {
        imagenActual = 1;
      }
    };
  }

  // Crea una función para cambiar la imagen

  const cambiarImagen = cambiarImagenCarrusel();


  // Intervalo para cambiar automáticamente la imagen cada 3.5 segundos
  if (!intervalo) {
    cambiarImagen();
    intervalo = true
  }

  setInterval(() => {
    cambiarImagen()
  }, 3500)
});