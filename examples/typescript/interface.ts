interface IPerson {
    firstName : string,
    lastName : string,
    age : number,
    ssn?:number
}

class Person {
    constructor(public config : IPerson){

    }
}

var aPerson : IPerson = {
    firstName : "Laurent",
    lastName : "Breda",
    age : 35
}

var p = new Person(aPerson);
console.log("Nom : "+p.config.lastName);


// --- CASE ERROR
// var anPerson : IPerson = {
//     firstName : "Laurent",
//     lastName : "Breda",
//     age : 35,
//     department : "informatique"
// }
