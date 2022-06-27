const app = require('./app') 
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { Server } = require("socket.io");


const server = http.createServer(app)

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})