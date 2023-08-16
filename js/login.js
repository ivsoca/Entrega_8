document.addEventListener("DOMContentLoaded", function () {
  let login = document.getElementById("loginbutton");
  
  // función que guarda al localstorage tu mail
  login.addEventListener("click", function () {
    let email = document.getElementById("mailuser").value;
    let password = document.getElementById("passworduser").value;
    let emailHasAt = email.includes("@");
    let emailHasDot = email.includes(".");
    let passwordIsLong = password.length > 6;

    if (email && password && emailHasAt && emailHasDot && password.length >= 6) {
      localStorage.setItem("email", email);
      window.location.href = "index.html";
    } else {

      switch (false) {
        case emailHasAt:
          alert("El e-mail ingresado debe contener un arroba (@)");
          break;
        case emailHasDot:
          alert("El e-mail ingresado debe contener un punto (.)");
          break;
        case passwordIsLong:
          alert("La contraseña debe tener más de seis caracteres");
          break;
        default:
          break;       
      }
    }
  });
});

window.onload = function() {
  let contenidoRecordado1 = localStorage.getItem('contenidoRecordado1');
  if (contenidoRecordado1) {
    document.getElementById('mailuser').value = contenidoRecordado1;
  }

  var contenidoRecordado2 = localStorage.getItem('contenidoRecordado2');
  if (contenidoRecordado2) {
    document.getElementById('passworduser').value = contenidoRecordado2;
  }
};

document.getElementById('recordarme').addEventListener('click', function() {
  var contenidoInput1 = document.getElementById('mailuser').value;
  var contenidoInput2 = document.getElementById('passworduser').value;

  localStorage.setItem('contenidoRecordado1', contenidoInput1);
  localStorage.setItem('contenidoRecordado2', contenidoInput2);
});