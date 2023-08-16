document.addEventListener("DOMContentLoaded", function () {
  let login = document.getElementById("loginbutton");
  
  // función que guarda al localstorage tu mail
  login.addEventListener("click", function () {
    let email = document.getElementById("mailuser").value;
    let password = document.getElementById("passworduser").value;
    let emailHasAt = email.includes("@");
    let emailHasDot = email.includes(".");

    if (email && password && emailHasAt && emailHasDot && password.length >= 6) {
      localStorage.setItem("email", email);
      window.location.href = "index.html";
    } else {
      if (!emailHasAt) alert("El e-mail ingresado debe contener un arroba (@)");
      else if (!emailHasDot) alert("El e-mail ingresado debe contener un punt (.)");
      else alert("Por favor ingrese un correo y/o contraseña correcto(s)");
    }
  });
});
