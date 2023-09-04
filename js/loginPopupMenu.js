document.addEventListener("DOMContentLoaded", () => {
  const navElement = document.getElementById("navlist");

  let userEmail = localStorage.getItem("email") || "nombre@empresa.com";
  let userName = userEmail.split("@");

  // Cargar foto usuario
  let fotoUsuario = localStorage.getItem(`${userEmail}-icon`) || "../img/iconos_perfil/foto-login-perfil.png";

  // Crear elemento nav
  const loginNavElement = document.createElement("li");
  loginNavElement.innerHTML = `
  <div id="login-nav-element" class="nav-item">
    <p id="login-nav-user-name">Nombre</p>
    <img id="login-nav-user-foto" src="../img/iconos_perfil/foto-login-perfil.png">
  </div>
  `;

  // Crear menu opciones
  const loginMenu = document.createElement("div");
  loginMenu.innerHTML = `
  <div id="login-menu-container">
    <img id="login-foto-perfil-usuario" src=${fotoUsuario}>
    <button id="login-cambiar-icono-btn"><i class="fa fa-pencil-alt"></i></button>
    <h2 id="login-nombre-usuario">${userName}</h2>
    <h3 id="login-email-usuario">${userEmail}</h3>
    <button id="login-edit-perfil-btn">Editar Perfil</button>
    <button id="login-logout-btn">Log Out</button>
  </div>
  `;

  // Crear menu cambio foto perfil
  const fotoPerfilMenu = document.createElement("div");
  fotoPerfilMenu.innerHTML = `
  <div id="menu-cambiar-icono-container">
    <h2 id="menu-cambiar-icono-titulo">Elije un nuevo icono</h2>
    <div class="menu-cambiar-icono-opciones">
      <button class="opcion-icono" data-icon="./img/iconos_perfil/hombre_(1).png">
        <img src="../img/iconos_perfil/hombre_(1).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/hombre_(2).png">
        <img src="../img/iconos_perfil/hombre_(2).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/hombre_(3).png">
        <img src="../img/iconos_perfil/hombre_(3).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/hombre.png">
        <img src="../img/iconos_perfil/hombre.png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/usuario.png">
        <img src="../img/iconos_perfil/usuario.png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/mujer_(1).png">
        <img src="../img/iconos_perfil/mujer_(1).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/mujer_(2).png">
        <img src="../img/iconos_perfil/mujer_(2).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/mujer_(3).png">
        <img src="../img/iconos_perfil/mujer_(3).png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/mujer.png">
        <img src="../img/iconos_perfil/mujer.png" />
      </button>
      <button class="opcion-icono" data-icon="./img/iconos_perfil/jugador.png">
        <img src="../img/iconos_perfil/jugador.png" />
      </button>
    </div>
  </div>
  `;
});
