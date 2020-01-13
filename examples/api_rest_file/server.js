// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();

let fs      = require('fs'),
    path    = require('path'),
    async   = require('async');

// --- Config Express
// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser'),
    busboy     = require('connect-busboy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(busboy());

// ------------------------
// LIST ROUTE
// ------------------------
// -- LIRE UN REPERTOIRE
app.get('/', function (req, res) {
    let myDir = [];
    fs.readdir(path.join(__dirname),(err, result)=>{
        async.each(result,(file, callback) => {
            // --
            fs.stat(path.join(__dirname,file), (err, stat) => {
                if(stat.isFile()){
                    myDir.push('http://0.0.0.0:3011/files/'+file+'');
                }
                callback()
            })
        },(err)=>{
            res.status(200).json({repo : myDir})
        })
    })
});
// -- Read File
app.get('/files/:path', function (req, res) {
    res.sendFile(path.join(__dirname,req.params.path))
});
// -- Upload File
app.post('/files/', function (req, res) {
    // ---
    console.info("Upload a file");

    // --- Catch dans busboy le stream de mes images
    req.pipe(req.busboy);

    try{
        req.busboy.on('file', function (fieldname, file, filename) {

            console.info("Uploading: " + filename);

            // --- Create a path to the image
            let fstream = fs.createWriteStream(path.join(__dirname, filename.replace(' ', '-')));

            file.pipe(fstream);

            fstream.on('close', function (error) {
                if(error){
                    res.status(400).json(error);
                }else{
                    // --- Update the object to get the link
                    res.status(204).json({});
                }
            });
        });
    }catch(error){
        res.status(400).json(error);
    }
});

// ------------------------
// START SERVER
// ------------------------
app.listen(3011,function(){
    console.info('HTTP server started on port 3011');
});