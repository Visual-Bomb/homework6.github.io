var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});

var messages = [];

console.log('websockets server started');

ws.on('connection', function (socket) {
    console.log('client connection established');

    messages.forEach(function (msg) {

        socket.send(msg);
      });

    socket.on('message', function (data) {
        console.log('message received: ' + data);

        if (data.includes('/topic')){
            var topicMessage = data.substring(7);
            t_message = "*** Topic is '" + topicMessage + "' ***";
            ws.clients.forEach(function (clientSocket) {
                clientSocket.send(t_message);
              });
        }
        else{

        messages.push(data);
        ws.clients.forEach(function (clientSocket) {
            clientSocket.send(data)
          });

        }

      });






  });