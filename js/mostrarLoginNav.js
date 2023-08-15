document.addEventListener("DOMContentLoaded", function() {

    let navbar = document.getElementById("navlist")
    let logoutNav = document.createElement("li")
    let loginNav = document.createElement("li")

    logoutNav.classList.add("nav-item")
    logoutNav.innerHTML =
    `<a class="nav-link">LogOut</a>`

    loginNav.classList.add("nav-item")
    loginNav.innerHTML =
    `<a class="nav-link" href="login.html">LogIn</a>`

    if (localStorage.getItem("email")) {
        navbar.appendChild(logoutNav)
    }else{
        navbar.appendChild(loginNav)
    }

    logoutNav.addEventListener("click", function() {

        localStorage.removeItem("email")
        //esto hay que cambiarlo
        location.reload();

    })

})