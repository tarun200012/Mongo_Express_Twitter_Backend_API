import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema= new mongoose.Schema({
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
}
},{timestamps:true}); 

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 8, (err, hash)=>{
        if(err){
                return next(err);
        }
        this.password=hash;
        next(); 
    })
});

userSchema.methods.validatePassword = (password) => {
    const passHash = this.password;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(passHash,password, (err, res)=>{
            if(err){
                
                return reject(err);
            }
            return resolve(res);
        })
    });
};

export const User =mongoose.model('user', userSchema);