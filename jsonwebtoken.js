const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

// Ruta para el endpoint /login
app.post('/login', (req, res)=>{
    const { usuario, contraseña } = req.body;

    if(usuario === "" && contraseña === "") {
        //Autenticacion funciono!
        const token = jwt.sign({ usuario }, 'secreto-seguro', { expiresIn: '30s'});

        res.json({ token })
    }else {
        //Autenticacion fallo...
        res.status(401).json({ mensaje: 'Credenciales invalidas' });
    }
});

app.get("/api", (req, res)=>{
    res.json({
        mensaje: "Noded and JWT"
    });
});

    //Puerto donde se va a abrir el servidor
app.listen(3000, function(){
    console.log("nodejs app running...");
})