// Reprise de fichier dans le dossier td2\lecellier_laetitia\Ssn.js
var SSN = /** @class */ (function () 
{
    function SSN(security) 
    {
        this.secu_number = security;
    }

    SSN.prototype.getSSN = function () 
    {
        return this.secu_number;
    };

    //Methode permettant de valider si le ssn contient bien le bon nombre de caractere
    // et concernant la valeur de la cle de controle 
    SSN.prototype.isValid = function () 
    {
        return this.controlSsnValue() && this.controlSsnKey();
    };


    // Utilisation de regex provenant de la correction du td2 
    // Permet le contrôle des numéros ssn
    SSN.prototype.controlSsnValue = function () 
    {
        let regExpSsn = new RegExp("^" +
            "([1-37-8])" +
            "([0-9]{2})" +
            "(0[0-9]|[2-35-9][0-9]|[14][0-2])" +
            "((0[1-9]|[1-8][0-9]|9[0-69]|2[abAB])(00[1-9]|0[1-9][0-9]|[1-8][0-9]{2}|9[0-8][0-9]|990)|(9[78][0-9])(0[1-9]|[1-8][0-9]|90))" +
            "(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})" +
            "(0[1-9]|[1-8][0-9]|9[0-7])$");
        return regExpSsn.test(this.secu_number);
    };

    // calcul du dernier numero du ssn (clé de controle)
    SSN.prototype.controlSsnKey = function () 
    {
        // Extraction des numéros utiles au calcul
        let myValue = this.secu_number.substr(0, 13);
        let myNir = this.secu_number.substr(13);
        // Remplacement des numeros speciaux par des chiffres definis
        myValue.replace('2B', "18").replace("2A", "19");
        // Transformation en nombre 
        let myNumber = +myValue;
        // calcul de la cle de controle
        return (97 - (myNumber % 97) == +myNir);
    };

    // Permet d'obtenir les informations concernant la personne
    // notamment ca date de naissance, lieu et le numero de naissance
    SSN.prototype.getInfo = function () 
    {
        return {
            sexe: this.extractSexe(),
            DateNaissance: this.extractDateNaissance(),
            LieuNaissance: this.extractLieuNaissance(),
            NumeroNaissance: this.extractNumeroNaissance()
        };
    };

    // Définit sur la personne est un homme ou une femme
    SSN.prototype.extractSexe = function () 
    {
        let sexe = this.secu_number.substr(0, 1);
        return sexe == "1" || sexe == "3" || sexe == "8" ? "Homme" : "Femme";
    };

    // Définit la date de naissance
    SSN.prototype.extractDateNaissance = function () 
    {
        let mois = +this.secu_number.substr(3, 2);
        // cas speciaux !
        if (mois == 62 || mois == 63) { mois = 1;}
        let birth = new Date(+this.secu_number.substr(1, 2), mois);
        return birth;
    };

    // Definir le lieu de naissance
    SSN.prototype.extractLieuNaissance = function () 
    {
        let departement = +this.secu_number.substr(5, 2);
        if (departement == 97 || departement == 98) 
        {
            return {
                departement : this.secu_number.substr(5, 3),
                commune: this.secu_number.substr(8, 2),
            };
        }
        else if (departement == 99) 
        {
            return {
                departement: "Etranger",
                pays: this.secu_number.substr(7, 3)
            };
        }
        else 
        {
            return {
                departement: this.secu_number.substr(5, 2),
                commune: this.secu_number.substr(7, 3),
            };
        }
    };

  // Definit le numero (position) de naissance
    SSN.prototype.extractNumeroNaissance = function () 
    {
        return +this.secu_number.substr(10, 3);
    };

    return SSN;
}());

exports.SSN = SSN;
module.exports = SSN;