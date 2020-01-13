//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema,
    crypto      = require('crypto');

//------------------------------------------- Resources Schema
let UserSchema = new Schema({
    id          : String,
    fullname    : String,
    desc        : String,
    username    : String,
    password    : String,
    token       : String
});

// ----
UserSchema.methods.generateToken = function(){
    return new Promise((resolve, reject) =>{
        // ---- algo
        this.token = Date.now();
        this.save().then(()=>{
            resolve({
                id : this.id,
                fullname : this.fullname,
                token : this.token
            })
        },(err)=>{
            reject(err)
        })
    })
};
mongoose.model('User', UserSchema);