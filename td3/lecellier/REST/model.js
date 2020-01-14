// Reprise de fichier dans le dossier td2\lecellier_laetitia\server.js
// Prise des élèments dépendants de l'api rest
let express = require('express'), app = express();
// "permet de caster les variables"
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

let request = require('request');
// Fichier permettant de connaitre le nom du pays 

let NomPays = require('../_supports/pays');
// Permettra la connexion à une base de données MongoDB
let mongoose = require('mongoose');
//Fichier permettant de savoir si le numéro SSN est bon!
let ssnVerif = require('./SSN');
// Definition et connexion à la base de données
let database = mongoose.connect('mongodb://localhost:27017/test', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, function(err){if(err){throw err;}});
/*database.connection.readyState == 0; // not connected
database.connection.readyState == 1; // connected
database.connection. */
// Permet de connaître le nom des communes et départements
let url = 'https://geo.api.gouv.fr';

// Mise en place de schéma 
let Schema = mongoose.Schema;
let personneSchema = new Schema({
    id : String,
    nom : String,
    prenom : String,
    ssn_complet : String,
    SSN: {
        departement: String,
        pays: String,
        commune: String
    },
})


personneSchema.statics.createPersonne = function (data) 
{
    return new Promise((resolve, reject) => {
        let ssn = new ssnVerif(data['SSN']);
        if (ssn.isValid()) 
        {
            let ssnInfo = ssn.getInfo();
            if (ssnInfo['LieuNaissance']['departement'] !== 'Etranger') 
            {
                request(url + '/communes/' + ssnInfo['LieuNaissance']['departement'], (error, response, body) => 
                {
                    if (!error) 
                    {
                        resolve([JSON.parse(body), ssnInfo, data]);
                    } 
                    else 
                    {
                        reject(error);
                    }
                });
            }
            resolve([ssnInfo, data]);
        } 
        else 
        {
            console.log('reject');
            reject({SSN: 'Invalid'})
        }
    }).then((res) => {
        return new Promise(((resolve, reject) => {
            if (res[0]['LieuNaissance']['departement'] !== 'Etranger') 
            {
                request(url + '/communes/' + res[1]['LieuNaissance']['departement'] + res[1]['LieuNaissance']['commune'], (error, response, body) => {
                    if (!error) 
                    {
                        res.push(JSON.parse(body));
                        console.log(res);
                        resolve(res);
                    } 
                    else 
                    {
                        reject(error);
                    }
                });
            }
            resolve(res);
        }));
    }).then((res) => {
        let dept, ssnInfo, data, commune;
        if (res.length > 2) 
        {
            dept = res[0];
            ssnInfo = res[1];
            data = res[2];
            commune = res[3];
        }
        else 
        {
            ssnInfo = res[0];
            data = res[1];
        }
        return {
            nom: data['nom'],
            prenom: data['prenom'],
            ssn_complet : data['SSN'],
            SSN: 
            {
                departement: ssnInfo['LieuNaissance']['departement'] !== 'Etranger' ? dept['nom'] : null,
                pays: ssnInfo['LieuNaissance']['departement'] !== 'Etranger' ? 'France' : NomPays[ssnInfo['LieuNaissance']['pays']],
                commune: ssnInfo['LieuNaissance']['departement'] !== 'Etranger' ? commune['nom'] : null
            }
        };
    });
};
module.exports = mongoose.model('Person', personneSchema);