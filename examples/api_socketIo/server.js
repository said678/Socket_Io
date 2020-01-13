// --- INIT DEPENDENCIES
let express = require('express'),
    app = express(),
    path = require('path');

// --
let http = require('http').Server(app);
let io = require('socket.io')(http);

//app.use('/js/',express.static(config.root + '/public'));
// ------------------------
// ROUTE
// ------------------------
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
});

// ------------------------
//
// ------------------------
io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', function(message){
        console.log(message);
        io.emit('cool', message);
    });

    socket.broadcast.emit('hi');

});

// ------------------------
// START SERVER
// ------------------------
http.listen(3010,function(){
    console.info('HTTP server started on port 3010');
});