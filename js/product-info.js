//Se genera un EventListenner para que al seleccionar la card haga varias funciones.
const cargarInfoProducto = (product, productCategoryName) => {
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
};

const cargarComentariosProducto = async (product) => {
  if (!product.id) return console.error("the product doesn't have an id");
  const baseCommentUrl = `https://raw.githubusercontent.com/JaPCeibal/emercado-api/main/products_comments/${product.id}.json`;
  const response = await fetch(baseCommentUrl);
  if (!response.ok)
    return console.error("Something went wrong when retrieving the comments");
  const comments = await response.json();
  comments.forEach((comment) => {
    const divComment = document.createElement("div");
    divComment.classList.add("wrapper-comentario");
    const comentarioHeader = document.createElement("p");
    comentarioHeader.classList.add("headerComentario");
    divComment.appendChild(comentarioHeader);
    const user = document.createElement("span");
    const dateTime = document.createElement("span");
    const description = document.createElement("span");

    const userText = document.createTextNode(comment.user);
    const dateTimeText = document.createTextNode(comment.dateTime);
    const descriptionText = document.createTextNode(comment.description);
    const scoreStar = document.createElement("span");

    for (let i = 0; i < 5; i++) {
      if (i < comment.score) {
        const scoreStarText = document.createElement("span");
        scoreStarText.innerHTML = '&#9733';
        scoreStarText.classList.add("star-comment");
        scoreStar.appendChild(scoreStarText);
      } else {
        const scoreStarText = document.createElement("span");
        scoreStarText.innerHTML = '&#9734';
        scoreStarText.classList.add("star-comment");
        scoreStar.appendChild(scoreStarText);
      }
    }

    user.appendChild(userText);
    dateTime.appendChild(dateTimeText);
    description.appendChild(descriptionText);

    comentarioHeader.appendChild(user);
    comentarioHeader.appendChild(dateTime);
    comentarioHeader.appendChild(scoreStar);
    divComment.appendChild(descriptionText);

    document.getElementById("comentarios").appendChild(divComment);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  //Se crean const que traen info del localStorage(producto que se clickeo y su nombre de categoria)
  const product = JSON.parse(localStorage.getItem("productoClickeado"));
  const productCategoryName = localStorage.getItem("catName");
  cargarInfoProducto(product, productCategoryName);
  await cargarComentariosProducto(product);
});
