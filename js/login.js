document.addEventListener("DOMContentLoaded", function () {
  const login = document.getElementById("loginbutton");

  login.addEventListener("click", function () {
    const emailElement = document.getElementById("mailuser");
    const passwordElement = document.getElementById("passworduser");
    const emailHasAt = emailElement.value.includes("@");
    const emailHasDot = emailElement.value.includes(".");
    const passwordIsShort = passwordElement.value.length < 6;

    //* Guardar e-mail al localStorage si está todo correcto
    if (emailElement.value && passwordElement.value && emailHasAt && emailHasDot && !passwordIsShort) {
      localStorage.setItem("email", emailElement);
      window.location.href = "index.html";
    } else {
      // Dar errores especificos
      switch (true) {
        case !emailHasAt:
          alert("El e-mail ingresado debe contener un arroba (@)");
          break;
        case !emailHasDot:
          alert("El e-mail ingresado debe contener un punto (.)");
          break;
        case passwordIsShort:
          alert("La contraseña debe contener al menos seis caracteres");
          break;
        default:
          break;       
      }
    }
  });

  //* Recordar al usuario cuando se checkea "Recuerdame"
  const recordarmeCheck = document.getElementById("recordarme");
  const mailInputElement = document.getElementById("mailuser");
  const logInButton = document.getElementById("loginbutton");
  let contenidoRecordado = localStorage.getItem('contenidoRecordado');

  // Si contenido recordado es truthy (!= null)
  if (contenidoRecordado) {
    // Guardar el valor en la var
    mailInputElement.value = contenidoRecordado;
  }

  // Cuando se apreta el botón de log in, si está chekeado el recordarme, guarda el valor del mail;
  logInButton.addEventListener('click', function() {
    if (recordarmeCheck.checked) {
      localStorage.setItem('contenidoRecordado', mailInputElement.value);
    }
  });
});

