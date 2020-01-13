// --- Dependencies
// ---> LIEN UTILE : https://nodejs.org/api/fs.html
// ---> socketIO
let fs      = require('fs'),
    path    = require('path'),
    async = require('async');

let moduleToCreate = undefined;

const pathToGenerate = path.join(__dirname,'result');

// --- Gestion des params ==> recuperation des parametres
process.argv.forEach(function(val, index, array) {
    // -- Load
    if(index===2){
        moduleToCreate = val;
    }
});
// --- TEST ID EXIST
if(moduleToCreate && !fs.existsSync(pathToGenerate+'/'+moduleToCreate)){
    console.log(moduleToCreate,pathToGenerate);
    let basePath = pathToGenerate+'/'+moduleToCreate
    fs.mkdir(basePath, ()=>{
        async.parallel({
            model : (callback)=>{
                console.log('Create Model');
                // 1--- Create dir
                fs.mkdir(basePath+'/models', ()=>{
                    callback()
                })
            },
            routes : (callback)=> {
                console.log('Create Route');
                fs.mkdir(basePath + '/routes', () => {
                    async.each(['createOne','deleteOne','findAll','getOne','updateOne'], (file,callbackfile)=>{
                        fs.appendFile(basePath + '/routes'+'/'+file+'.js',"toto",(err)=>{
                            callbackfile(err)
                        })
                    },(err)=>{
                        if(err){
                            console.log(err)
                        }
                        callback()
                    })
                })
            }
        },()=>{
            console.log('End Treatment')
        })
    })
    console.log('toto')
}else{
    process.exit(1);
}




// test de pull request 
// haha


