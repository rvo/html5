var io = require('socket.io')(8080);

io.on('connection', function (socket) {
  	socket.on("enviaComanda",function(comanda){
  		socket.broadcast.emit("muestraComanda",comanda);
  	});
});