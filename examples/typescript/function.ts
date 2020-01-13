/**
 * Functions
 */

function calcTax(state:string, income:number,dependents:number):number{
    if(state=='NY'){
        return income*0.06-dependents*500
    }else if(state=='NJ'){
        return income*0.05-dependents*300
    }
}

// ---- Failed  Argument of type '"two"' is not assignable to parameter of type 'number'
var tax:number = calcTax('NJ',5000,2);

// ---- Failed  
//var tax:string = calcTax('NJ',5000,2);


/**
 * Function with default parameter
 */
function calcTax2(income:number,dependents:number,state:string = 'NY'):number{
    if(state=='NY'){
        return income*0.06-dependents*500
    }else if(state=='NJ'){
        return income*0.05-dependents*300
    }
}

var tax:number = calcTax2(5000,2);
console.log("My tax with calcTax2 : ",tax);

/**
 * Function with default parameter && optionals
 */
function calcTax3(income:number,state:string = 'NY',dependents?:number,):number{

    var deduction : number;

    if(dependents){
        deduction = dependents*500;
    }else{
        deduction = 0;
    }

    if(state=='NY'){
        return income*0.06-deduction
    }else if(state=='NJ'){
        return income*0.05-deduction
    }
}

var tax2:number = calcTax3(5000);
var tax3:number = calcTax3(5000,'NJ',3);
console.log("My tax with calcTax3(5000) : ",tax2);
console.log("My tax with calcTax3(5000,'NJ',400) : ",tax3);

/**
 * ShortCut
 */

