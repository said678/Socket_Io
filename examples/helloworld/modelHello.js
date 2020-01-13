let modelHello = module.exports;

modelHello.hello = function(){
    console.log('hello world')
};

modelHello.helloevry = function(){
    return new Promise((resolve,error)=>{
        //resolve("super");
        error("failed")
    });
};