const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Inicia o App
const app = express();

// HTTP
const server = require('http').createServer(app);

// WEB SOCKET
const io = require('socket.io')(server);

// Liberar Api
app.use(cors());

// Config Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

// Usar Json
app.use(express.json());

// Salvar imagens na pasta uploads
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// Envia o App pra todos as rotas 
require('./App/routes/index')(app);

// Porta da Api
server.listen(process.env.PORT || 3333);
