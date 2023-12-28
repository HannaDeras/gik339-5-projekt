// variabler som sparar ner express, sqlite3 och databas 
const express = require("express");
const server = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./gik339-project.db");

//allmänna settings för databasen 
server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        
        next();
});

//öppnar en port och skriver ut i konsolen om servern körs 
server.listen(3000, () => {
    console.log('Server running');
});

//get-funktion som hämtar all data ur cars-databasen, eller skickar felmeddelande om något blir fel 
server.get('/cars', (req, res) => {
    const sql = 'SELECT * FROM cars'; 
    
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err); 
        } else {
            res.send(rows);
        }
    });
});

//post-funktion som låter klienten skapa nya bilar i databasen 
server.post("/cars", (req, res) => {
    const car = req.body;
    const sql = "INSERT INTO cars(brand, model, year, color) VALUES (?,?,?,?)";

    db.run(sql, Object.values(car), (err) => {
        if (err) {
            console.log(err);
            res.status(501).send(err);
        } else {
            res.send("Bilen sparades");
        }
    });
});

//put-funktion som låter klienten uppdatera befintliga bilar i databasen 
server.put('/cars', (req, res) => {
    const bodyData = req.body; 
    const id = bodyData.id; 
    const car = {
        brand: bodyData.brand, 
        model: bodyData.model, 
        year: bodyData.year,
        color: bodyData.color
    }; 

    //fånga upp värdena i en array, loopa igenom arrayens egenskaper och ändra strängen 
    let updateString = ''; 
    const columnsArray = Object.keys(car); 
    columnsArray.forEach((column, i) => {
        updateString += `${column}="${car[column]}"`; 
        if (i !== columnsArray.length - 1) updateString += ', '; 
    });
    const sql = `UPDATE cars SET ${updateString} WHERE id=${id}`; 
   
    db.run(sql, (err) => {
        if (err) {
            console.log(err);
            res.status(502).send(err);
        } else {
            res.send("Bilen updaterades");
        }
    });
}); 

//delete-funktion som låter klienten radera en bil via dess id 
server.delete("/cars/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM cars WHERE id = ${id}`;
    
    db.run(sql, (err) => {
        if (err) {
            console.log(err);
            res.status(503).send(err);
        } else {
            res.send("Bilen borttagen");
        }
    });
});