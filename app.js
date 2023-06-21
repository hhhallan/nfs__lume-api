require('dotenv').config();
const sequelize = require('./src/services/sequelize');

// Models
const User = require('./src/models/User');

// Lancement
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Routes



// Lancement
app.listen(port, () => {
    console.log(`Serveur lancé sur: http://localhost:${port}`)
})