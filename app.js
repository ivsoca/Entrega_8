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






app.listen(port, ()=>{
    console.log('andando')
})