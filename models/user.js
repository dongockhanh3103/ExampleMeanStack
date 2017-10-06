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


//,{validator:emailFormatChecker,message:'E-mail must correct format like example@gmail.com'}
const emailValidators=[{
  validator: emailLengthChecker,message:'E-mail must be at least 5 characters but no more than 30'
}];

const usernameValidator=[{
  validator: usernameLenghtChecker, message:'User name must be at least 9 characters but no more than 20 '
},{validator:usernameFormatChecker,message:"User name is not correct format"}];



var UserSchema = new Schema(
  {email:{type:String,required:true,unique:true,lowercase:true,validate:emailValidators},
  username:{type:String,required:true,unique:true,lowercase:true, validate:usernameValidator},
  password:{type:String,required:true,validate:
}

});

UserSchema.pre('save',function(next){
  if(!this.isModified('password')){
    return next();
  }
  bcrypt.hash(this.password,null,null,(err,hash)=>{
    if(err){
      return next(err);
    }
    this.password=hash;
    next();
  });
});

UserSchema.methods.comparePassword=(password)=>{
  return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User', UserSchema);