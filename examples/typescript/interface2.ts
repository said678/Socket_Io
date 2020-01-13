/**
 *
 **/
interface IPayable {
    increasePay(percent:number) : boolean
}

class Person{
    constructor(){

    };
}

class Employee extends Person implements IPayable{
    increasePay(percent:number) : boolean{
        console.log("Augmentation du salaire de "+percent);
        return true;
    }
}

class Contractor implements IPayable{
    increaseCap:number = 20;

    increasePay(percent:number) : boolean{
        if(percent < this.increaseCap){
            console.log("Augmentation du taux horaire de "+percent);
            return true;
        }else{
            console.log("Attention augmentation seulement possible de  "+this.increaseCap);
            return false;
        }
    }
}

var workers: Array<IPayable> = [];

workers[0] = new Employee();
workers[1] = new Contractor();

workers.forEach(worker => worker.increasePay(30));
