const express = require('express');
const routes = require('./src/routes');
var cors = require('cors')

const app = express();

//Setando o cors (Parte muito importante pois setar o cors evita erros de segurança na requisição)
app.use(cors());
app.use('/api', routes);

//Setando porta do servidor local
const PORT = 3000;
app.listen(PORT, () => console.log('Servidor Iniciado'));