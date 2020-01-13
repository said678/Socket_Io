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
        if(compteur == 0)
        {
            person.nom = reponse;
            socket.emit('out', 'Quel est votre prénom?');
            compteur = compteur + 1;
        }
        else if (compteur == 1)
        {
            person.prenom = reponse;
            socket.emit('out', 'Quel est votre numéro SSN?');
            compteur = compteur + 1;
        }
        else if (compteur == 2)
        {
            let ssn_rep = new ssn(reponse);
            if(!ssn_rep.isValid())
            {
                socket.emit('out', 'ce ssn n est pas correct!');
            }
            else
            {
                person.SSN = reponse
                socket.emit('out', person.nom + ' ' + person.prenom + ', a pour ssn : ' + person.SSN);
                socket.emit('out', 'Voici les informations de votre ssn : Vous êtes un(e) ' + ssn_rep.extractSexe() +
                ', vous êtes né le : ' + ssn_rep.extractDateNaissance() + 'plus exactement dans le: ' + ssn_rep.extractLieuNaissance() 
                + ' et vous êtes le(la) : ' + ssn_rep.extractNumeroNaissance() + 'e enfant a être né ce jour là !');
            }
        }
    });
});

let server = http.listen(3000, function () {
    console.log("listening on *:3000");
});