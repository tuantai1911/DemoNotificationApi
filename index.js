import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/notification.js";
import admin from 'firebase-admin';
import fs from 'fs';
let serviceAccount

const app = express();
const PORT = 5000;

app.use(bodyParser.json())

app.use("/notification", usersRoutes);
app.get("/", (req, res) => res.send("Welcome to the Push Notification API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));
app.get("/", (req, res) => res.send("Welcome to the Users API!"));

app.listen(PORT, function () {
    console.log(`Server running on port: http://localhost:${PORT}`)
    init()

});

// setup firebase for node js
function init() {
    fs.readFile('./key/demonotification-d673f-firebase-adminsdk-y2ibg-8a314fabe5.json', (err,data) =>{
        if (err) throw err
        serviceAccount = JSON.parse(data)
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    });
}