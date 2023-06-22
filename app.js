require('dotenv').config();
const sequelize = require('./src/services/sequelize');

// Models
const User = require('./src/models/user');

// Lancement
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
const userRoutes = require('./src/routes/user');
app.use('/users', userRoutes);



// Lancement
app.listen(port, () => {
    console.log(`Serveur lancé sur: http://localhost:${port}`)
});