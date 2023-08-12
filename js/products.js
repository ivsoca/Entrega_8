// products.js
document.addEventListener("DOMContentLoaded", function () {
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
    const productList = document.querySelector("#product-list");
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al hacer la solicitud.");
        }
        return response.json();
      })
      .then(data => {
        const products = data.products;
  
         products.forEach(product => {
          const productItem = document.createElement("div");
          productItem.classList.add("product-item");
  
          productItem.innerHTML = 
           `<img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Precio: ${product.cost} ${product.currency}</p>
            <p>Vendidos: ${product.soldCount}</p>`
          ;
  
          productList.appendChild(productItem);
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  });