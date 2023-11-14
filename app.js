const express = require('express');
const fs = require('fs');
const port = 3000;
const cors = require('cors')


const app = express();

app.use(cors());

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