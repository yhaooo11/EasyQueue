const app = require('./app') 
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { Server } = require("socket.io");


const server = http.createServer(app)

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('join-queue', queue => {
    if (socket.rooms[1]) {
      socket.leave(socket.rooms[1])
    }
    console.log(queue)
    socket.join(queue)
    console.log(socket.rooms)
    // socket.rooms[1] will always be queue
  })
  socket.on('update-queue', (queue, id) => {
    socket.to(id).emit('send-queue', queue)
  })
});

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})