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
  let contenidoRecordado = localStorage.getItem('contenidoRecordado');
  if (contenidoRecordado) {
    document.getElementById('mailuser').value = contenidoRecordado;
  }
};

document.getElementById('recordarme').addEventListener('click', function() {
  var contenidoInput = document.getElementById('mailuser').value;

  localStorage.setItem('contenidoRecordado', contenidoInput);
});