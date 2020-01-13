let express = require('express'),
    app = express();

// Gestion Files System
let fs = require('fs'),
    path = require('path');

// --- Gestion MiddleWare
let consolidate = require('consolidate'),
    helpers 	= require('view-helpers');

app.engine('html', consolidate['mustache']);
app.set('view engine', 'html');
// Set views path, template engine and default layout
app.set('views', __dirname + '/templates');


// --- Default route
app.get('/',(req,res)=>{
    res.render('helloWorld',{message : req.query.message})
});

// ------------------------
// START SERVER
// ------------------------
app.listen(3011,function(){
    console.info('HTTP server started on port 3011');
});