const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "API de Cátalogo y Contenidos está funcionando correctamente.", ambiente: process.env.NODE_ENV || "development" });
});

require("./app/routes/routes.js")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}. [ambiente: ${process.env.NODE_ENV || "development"}]`);
});