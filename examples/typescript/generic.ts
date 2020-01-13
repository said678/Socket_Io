class Person {
    name : string;
}

class Employee extends Person{
    department : string;
}

class Animal{
    breed : string
}

var workers: Array<Person> = [];

workers[0] = new Person();
workers[1] = new Employee();
workers[2] = new Animal();

//console.log(workers);
