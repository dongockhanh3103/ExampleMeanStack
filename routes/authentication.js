const User = require('../models/user');
module.exports=(router)=>{
    router.post('/register',(req,res)=>{
    
        if(!req.body.email){
            res.send({success:false,message:"You must provide an email"});
        }else{
          if(!req.body.username){
            res.send({success:false,message:"You must provide an username"});
          }
          else{
              if(!req.body.password){
                res.send({success:false,message:"You must provide an password"});
              }else{
                  //console.log(req.body);
                  let user=new User({
                    email:req.body.email.toLowerCase(),
                    username:req.body.username.toLowerCase(),
                    password:req.body.password
                  });
                  user.save((err)=>{
                    //   console.log(err.errors);
                      if(err){
                    
                          if(err.code === 11000){
                             res.json({success:false,message:'Username or e-mail already exists'})
                       
                          }
                          else{
                            if(err.errors){
                                if(err.errors.username){
                                    res.json({success:false,message:err.errors.username.message});
                                 // res.json(err)
                                }
                                if(err.errors.email){
                                    res.json({success:false,message:err.errors.email.message});
                                }
                               
                                // if(err.errors.password){
                                //    // console.log(  );
                                //     res.json({success:false,message:err.errors.password.message});
                                //    //res.json(err);
                                // }
                            }
                            else{
                                res.json({success:false,message:'Could not save. Error',err});
                            }
                           
                          }
                      }
                      else{
                          res.json({success:true,message:'User saved'})
                      }
                  });
              }
          }
        }
    });
    
    router.get('/users',(req,res)=>{
        User.find((err, users) => {
            if (err) { return res.send(err) }
            res.json(users);
        });
    
       
    });

    
    return router;
}