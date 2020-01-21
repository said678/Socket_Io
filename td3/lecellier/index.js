let express = require('express');
let app = express();
app.set('port', process.env.PORT || 3000);
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require("path");
let Model = require('./REST/model.js');
let ssn = require('./REST/SSN.js');

// Chargement du fichier index.html affiché au client
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Chargement de socket.io sur le port 3000
io.on('connection', function(socket){
    let person = {"nom": null, "prenom": null, "SSN" :null};
    let compteur = 0;
    console.log('une personne est connectée');
    socket.on('disconnect', function(){
        console.log('la personne est déconnecté');
    });
    socket.emit('out', 'Quel est votre nom?');
    socket.on('in', function(reponse){
        socket.emit('out', reponse);
        if(compteur == 0){
            person.nom = reponse;
            socket.emit('out', 'Quel est votre prénom?');
            compteur = compteur + 1;
        }
        else if (compteur == 1){
            person.prenom = reponse;
            socket.emit('out', 'Quel est votre numéro SSN?');
            compteur = compteur + 1;
        }
        else if (compteur == 2){
            let ssn_rep = new ssn(reponse);
            if(!ssn_rep.isValid()){
                socket.emit('out', 'Ce ssn n est pas correct!');
            }
            else{
                person.SSN = reponse
                socket.emit('out', person.nom + ' ' + person.prenom + ', a pour ssn : ' + person.SSN);
                socket.emit('out', 'Voici les informations de votre ssn : Vous êtes un(e) ' + ssn_rep.extractSexe() +
                ', vous êtes né le : ' + ssn_rep.extractDateNaissance() + ' plus exactement dans le: ' + ssn_rep.extractLieuNaissance() 
                + ' et vous êtes le(la) : ' + ssn_rep.extractNumeroNaissance() + 'e enfant a être né ce jour là !');
                Model.find({ssn_complet : person.SSN}).then(function(result_ssn){ // Vérification de la présence du numéro ssn dans la base de données 
                    if(result_ssn.length == 0){ // Si ce numéro n'est pas présent, l'application propose de le sauvegarder
                        socket.emit('out', 'Ce ssn n est pas présent dans la base, Sauvegarder les données dans la base ? (oui/non)');
                        compteur = compteur + 1;
                    }
                    else{ // Sinon l'application affiche la personne présente dans la base liée à ce numéro
                        socket.emit('out','vous êtes : ' + result_ssn);
                        compteur = 4;
                    }
                }); 
            }
        }
        else if (compteur == 3){
            if(reponse.toLowerCase() === 'oui'){
                // utilisation de l'API REST
                Model.createPersonne(person).then(function(model){
                    new Model(model).save().then(function(reponse){
                        socket.emit('out', 'Vous avez été enregistré!');
                        //socket.emit('out', 'ajout possible...');
                        compteur = compteur + 1;
                }, function(err){
                        socket.emit('out', 'Enregistrement échoué! ' + err);
                    });
                })
            }
            else if (reponse.toLowerCase() === 'non'){
                //socket.emit('out', 'ajout possible...');
                compteur = 4;
            }
            else{
                    socket.emit('out', 'oui ou non!!');
                    
            }
        }
        /*
        // Possibilité de voir l'ensemble de la base de données : historique
        else if (compteur == 5){
            if(reponse.toLowerCase() === 'oui'){
                // utilisation de l'API REST
                Model.find({}).then(function(result_ssn_bdd){ // Trouver toutes les données présentes sur la base de données
                        socket.emit('out','La BDD contient les élèments suivants : ' + result_ssn_bdd);
                    });
                
            }
            else if (reponse.toLowerCase() === 'non'){
                //socket.emit('out', 'ajout possible...');
                // fin
            }
            else{
                    socket.emit('out', 'oui ou non!!');
            }
        }*/
    });
});

let server = http.listen(3000, function () {
    console.log("listening on *:3000");
});