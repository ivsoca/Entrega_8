const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const port = 3000;
const cors = require('cors');
const path = require('path');

const SECRET_KEY = "CLAVE_ULTRA_SECRETA"; 

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('¡La aplicación está funcionando!');
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.use("/auth", (req, res, next) => {
    const token = req.headers["access-token"];

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado", error: "No se proporcionó un token" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        next();
    } catch (err) {
        console.error('Error al verificar el token:', err.message);
        res.status(401).json({ message: "Usuario no autorizado", error: err.message });
    }
});

app.post('/login', (req, res) => {
    const nameLogin = req.body.name; // Cambiado de 'correo' a 'name'
    const passwordLogin = req.body.password;

    if (nameLogin && passwordLogin) {
        const token = jwt.sign({ nameLogin }, SECRET_KEY, { expiresIn: '1h' });
        console.log('Token generado:', token);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});



app.get('/categories', (req, res)=>{
    fs.readFile("./emercado-api-main/cats/cat.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        res.send(JSON.parse(jsonString))
        });
    
})

app.get('/cats/:id', (req, res)=>{
    fs.readFile(`./emercado-api-main/cats_products/${req.params.id}.json`, "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        res.send(JSON.parse(jsonString))
        });
})

app.get('/products/:id', (req, res)=>{
    fs.readFile(`./emercado-api-main/products/${req.params.id}.json`, "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        res.send(JSON.parse(jsonString))
        });
})

app.get('/user_cart/:id', (req, res)=>{
    fs.readFile(`./emercado-api-main/user_cart/${req.params.id}.json`, "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        res.send(JSON.parse(jsonString))
        });
    
})



app.listen(port, ()=>{
    console.log('andando')
})