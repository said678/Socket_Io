// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// --- Base de donnees
let mongoose = require('mongoose');

let database  = mongoose.connect("mongodb://localhost/demo",{
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
});
// -- Load model needed for the project
require('./app/models/User');

// -- Ajout HELPERS
let authUtils = require('./app/helpers/authUtils');

// ------------------------
// LIST ROUTE
// ------------------------

// --- METHOD AUTH
app.post('/auth',(req,res)=>{
    mongoose.model('User').findOne({username : req.body.username, password : req.body.password}).then(user => {
        if(user){
            // --- Generate token
            user.generateToken().then((userWebFormat)=>{
                // --- Envoi de mon utilisateur
                res.status(200).json(userWebFormat)
            },(err)=>{
                res.status(400).json(err)
            })
        }else{
            res.status(404).json({"message" : "not found"})
        }
    },(err)=>{
        res.status(400).json(err)
    })
});

// -- LIRE UN REPERTOIRE
app.get('/', authUtils.checkAuth, (req, res) =>{
    console.log(req.currentUser);
    res.status(200).json(req.currentUser)
});

// ------------------------
// START SERVER
// ------------------------
app.listen(3011,function(){
    console.info('HTTP server started on port 3011');
});