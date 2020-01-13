/**
 * Explicit way
 */
class Person1{
    public firstName   : string;
    public lastName    : string;
    public age         : number;
    private _ssn        : number;

    constructor(firstName : string, lastName : string,age : number,ssn : number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age    = age;
        this._ssn   = ssn;
    }

}

var p1 = new Person1("Laurent","Breda",35,182019913150393);
console.log("Nom "+p1.lastName+' SSN '+p1._ssn);

/**
 * Easy way
 */
class Person2{
    constructor(public firstName : string, public lastName : string, public age : number, private _ssn : number){
    }
}

var p2 = new Person2("Laurent","Breda",35,182019913150393);
console.log("Nom "+p2.lastName+' SSN '+p2._ssn);



/**
 * Method
 */
class Person3{
    constructor(public firstName : string, public lastName : string, public age : number, private _ssn? : number){

    }

    get ssn() : number{
        return this._ssn;
    }

    set ssn(value: number){
        this._ssn = value;
    }

    getFullname() : string{
        return this.firstName+" "+this.lastName
    }
}

var p3 = new Person3("Laurent","Breda",35);
p3.ssn = 182019913150393;
console.log("Nom "+p3.lastName+' SSN '+p3.ssn);

/**
 * Heritage
 */
class Employee extends Person3{
    department : string;

    constructor(firstName : string, lastName : string,age : number,_ssn : number,department : string){
        super(firstName,lastName,age,_ssn);
        this.department = department;
    }

    getFullName() : String{
        return super.getFullname() + " / service : "+this.department;
    }
}
var employee = new Employee("Laurent","Breda",35,182019913150393,"Informatique");
console.log(employee.getFullName());
