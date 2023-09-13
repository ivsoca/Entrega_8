//Este codigo hace que cuando hagamos click a una estrella esta se llene o viceversa
let allStars = document.querySelectorAll('.star');
        let starRating = document.getElementById("starRating");

        allStars.forEach((star, i) => {
            star.onclick = function () {
                let currentStarLevel = i + 1;

                allStars.forEach((star, j) => {
                    if (currentStarLevel >= j + 1) {
                        star.innerHTML = '&#9733'; // Estrella llena
                    } else {
                        star.innerHTML = '&#9734'; // Estrella vacía
                    }
                });
                starRating.textContent = currentStarLevel;
            }
        });

        //Logica para agregar los comentarios, las estrellas y fecha
        function agregarComentario() {
            // Obtener el texto del comentario ingresado por el usuario
            let comentario = document.getElementById("commentInput").value;
            let estrellas = document.getElementById("starRating").textContent;

            // Crear un elemento div para mostrar el comentario y las estrellas
            let comentarioConEstrellas = document.createElement("div");
            comentarioConEstrellas.classList.add("comentario-con-estrellas");
            
             //tomamos el mail de localStorage para que aparezca en el div junto a la fecha y el comentario
            let userEmail = localStorage.getItem("email") || "nombre@empresa.com";
            let userName = userEmail.split("@")[0];

            //Creo el elemento para que el nombre de usario se ponga en negrita
            let strongElement = document.createElement("strong");
            strongElement.textContent = userName + " - ";
            comentarioConEstrellas.appendChild(strongElement);

            // Obtener la fecha y hora actual
            let fechaHora = new Date();
            let fechaHoraTexto = fechaHora.toLocaleString(); // Convierte la fecha y hora a un formato de texto

            // Agregar la fecha y hora junto a las estrellas
            comentarioConEstrellas.appendChild(document.createTextNode(fechaHoraTexto + " - ")); // posible usar para usuario y fecha
   

            // Agregar estrellas como caracteres Unicode al div
            for (let i = 0; i < 5; i++) {
                if(i < estrellas){
                    let estrella = document.createElement("span");
                estrella.innerHTML = '&#9733'; // Estrella llena
                estrella.classList.add("star-comment");
                comentarioConEstrellas.appendChild(estrella);
                } else {
                    let scoreStarText = document.createElement("span");
                    scoreStarText.innerHTML = '&#9734';
                    scoreStarText.classList.add("star-comment");
                    comentarioConEstrellas.appendChild(scoreStarText);
                }
                
            }

            // Crear un elemento de párrafo para el comentario
            let parrafoComentario = document.createElement("p");
            parrafoComentario.textContent = comentario;
            comentarioConEstrellas.appendChild(parrafoComentario);

            let contenedorComentarios = document.getElementById("comentarios");
            contenedorComentarios.appendChild(comentarioConEstrellas);

            // Limpiar el área de texto y reiniciar las estrellas después de agregar el comentario
            document.getElementById("commentInput").value = "";
            starRating.textContent = "0";
            allStars.forEach((star) => {
                star.innerHTML = '&#9734'; // Estrella vacía
            });
        }

