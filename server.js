var http = require('http');
var express = require('express');
const url = require('url');
var app = express();
var cors = require('cors');
app.use(cors());
var server = http.createServer(app);
// const {wssCursors, wssShareDB} =  require('./helpers/sockets'); 
const {wssShareDB} =  require('./helpers/sockets');
server.on('upgrade', (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;
  if (pathname === '/sharedb') {
      wssShareDB.handleUpgrade(request, socket, head,(ws) => {
        wssShareDB.emit('connection', ws);
      });
    }
    //  else if (pathname === '/cursors') {
    //   wssCursors.handleUpgrade(request, socket, head, (ws) => {
    //     wssCursors.emit('connection', ws);
    //   });
    // } 
     else {
      socket.destroy();
    }
});

let port = 8080;
server.listen(port);
console.log(`Listening on http://localhost: ${port}`);
