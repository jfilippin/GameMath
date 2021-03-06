const express = require("express");
const app = express();
const cors = require("cors");

//PARA UTILIZAÇÃO NO SERVIDOR, CONSERTAR HOST="127.0.0.1" NO .ENV E MYSQL | CONSERTAR PORTAS AMAZON (BANCO LOCAL)

const authentication = require("./auth");

const loginRouter = require('./routes/login');
const playRouter = require('./routes/play');
const rankingRouter = require('./routes/ranking');

const knex = require("./database");
const e = require("express");

require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use('/login', loginRouter);
app.use('/play', authentication, playRouter);
app.use('/ranking', authentication, rankingRouter);


const listener = app.listen(process.env.PORTA, () => {
    console.log("Server listening. PORT = " + listener.address().port);
});