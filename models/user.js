const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt-nodejs');

let emailLengthChecker = (email)=>{
  if(!email){
    return false;
  }
  else{
    if(email.length<5 || email.length >30){
      return false;
    }
    else{
       return true;
    }
  }
};

let validEmailChecker =  (email)=>{
  const regExp= new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
  return regExp.test(email);
};


let usernameLenghtChecker= (username)=>{
    if(!username){
      return false;
    }
    else{
      if(username.length<9 || username.length > 20){
        return false;
      }
    
      else{
        return true;
      }
    }
};
let usernameFormatChecker=(username)=>{
  if(!(/^[a-zA-Z0-9]+$/.test(username))){
    return false;
  }
  return true;
};

let passwordLenghtChecker=(password)=>{
  if(!password){
    return false;
  }
  else{
    if(password.length < 8 || password.length >  35){
      return false;
    }
    return true;
  }
}
let validPassword=(password)=>{
  if(!password){
    return false;
  }
  else{
    const regExp=new RegExp (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,35}$/);
    return regExp.test(password);
  }
};

// const passwordValidator=[
//   {validator:passwordLenghtChecker,message:"Password must be at least 8 but not more than 35 characters"},
//   {validator:validPassword,message:"Must have at least one upcase, lowercase, special character and number"}];


//,{validator:emailFormatChecker,message:'E-mail must correct format like example@gmail.com'}
const emailValidators=[
{validator: emailLengthChecker,message:'E-mail must be at least 5 characters but no more than 30'},
{validator: validEmailChecker,message:'Must be valid email'}];

const usernameValidator=[{
  validator: usernameLenghtChecker, message:'User name must be at least 9 characters but no more than 20 '
},{validator:usernameFormatChecker,message:"User name is not correct format"}];




var UserSchema = new Schema(
  {email:{type:String,required:true,unique:true,lowercase:true,validate:emailValidators},
  username:{type:String,required:true,unique:true,lowercase:true, validate:usernameValidator},
  password:{type:String,required:true}

});

// UserSchema.pre('save',function(next){
//   if(!this.isModified('password')){
//     return next();
//   }
//   bcrypt.hash(this.password,null,null,(err,hash)=>{
//     if(err){
//       return next(err);
//     }
//     this.password=hash;
//     next();
//   });
// });

// UserSchema.methods.comparePassword=(password)=>{
//   return bcrypt.compareSync(password,this.password);
// };

module.exports = mongoose.model('User', UserSchema);