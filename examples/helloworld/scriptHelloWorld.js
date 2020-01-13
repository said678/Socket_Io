let helloService = require('./modelHello');
let async = require('async');

let elements = [1,2,4];


helloService.hello();

helloService.helloevry().then((resolve)=>{
    console.log(resolve)
},(error)=>{
    console.log("Failed Treatement");

    async.forEach(elements, (element,callback)=>{
    	console.log(element);
    	callback()
    },(err)=>{
    	console.log('Finish');
    })

});