function testAsyncOk(){
    return new Promise((resolve)=>{
      setTimeout(()=>{
          resolve("Hello World")
      },2000)
    })
}

async function testAsyncKo(){
    throw new Error("Failed")
}

async function asyncCall() {
    console.log('calling');
    let result = await testAsyncOk();
    console.log(result);
    // expected output: 'resolved'
}

asyncCall();
testAsyncKo().catch(e=>{console.log(e.message)});


/**
 * async function getNombreAsynchrone1() {// traitement asynchrone (e.g. appel d’une API HTTP) }
 async function getNombreAsynchrone2() {/* traitement asynchrone (e.g. appel d’une API HTTP) }

 async function getAdditionAsynchrone() {
    const nombre1 = await getNombreAsynchrone1();
    const nombre2 = await getNombreAsynchrone2();
    return nombre1 + nombre2;
}

 async function getAdditionAsynchroneParallele() {
 const [nombre1, nombre2] = await Promise.all([
   getNombreAsynchrone1(),
   getNombreAsynchrone2(),
 ]);

 return nombre1 + nombre2;
}
 **/
