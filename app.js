require('dotenv').config();
const sequelize = require('./src/services/sequelize');
const cors = require('cors');

// Models
const User = require('./src/models/user');

// Lancement
const express = require('express');
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
const userRoutes = require('./src/routes/user');
const scooterRoutes = require('./src/routes/scooter');

app.use('/users', userRoutes);
app.use('/scooters', scooterRoutes);

// Lancement
app.listen(port, () => {
    console.log(`Serveur lancé sur: http://localhost:${port}`)
});