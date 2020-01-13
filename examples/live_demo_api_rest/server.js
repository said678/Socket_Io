// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();

// ------------------------
// middleware
// ------------------------
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

// ---- Creation du schema
//--- Module dependencies
const Schema	= mongoose.Schema;

//-- Resources Schema
let jaysonSchema = new Schema({
    id          : String,
    fullname    : String
});

mongoose.model('Jayson', jaysonSchema);

// ------------------------
// LIST ROUTE
// ------------------------
app.get("/jaysons/",(req,res)=>{

    mongoose.model('Jayson').find({}).then((result)=>{
        res.status(200).json(result)
    },(err)=>{
        res.status(400).json(err)
    })
});

app.post("/jaysons/",(req,res)=>{

    const myModel = mongoose.model('Jayson');
    let newJayson = new  myModel(req.body);

    newJayson.save().then((result)=>{
        res.status(200).json({result : result, jayson : newJayson})
    },(err)=>{
        res.status(400).json(err)
    })
});

app.get("/jaysons/:id",(req,res)=>{

    mongoose.model('Jayson').findOne({_id : req.params.id}).then((result)=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json()
        }
    },(err)=>{
        res.status(400).json(err)
    })
});

app.put("/jaysons/:id",(req,res)=>{
    mongoose.model('Jayson').findOne({_id : req.params.id}).then((result)=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json()
        }
    },(err)=>{
        res.status(400).json(err)
    })
});


// ------------------------
// START SERVER
// ------------------------
app.listen(3011,function(){
    console.info('HTTP server started on port 3011');
});