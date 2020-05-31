const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('../squishy_client'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/../squishy_client/index.html');
});

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
       console.log('A user disconnected');
    });
    socket.on('chat message', function(msg){
       console.log(msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log("Listening on port 3000");
})
