const express = require('express');
const app = express();
const router=express.Router(); 
const path =require('path');
const config = require('./config/database'); // Mongoose Config
const mongoose = require('mongoose'); // Node Tool for MongoDB
const authentication= require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');


  //use cors
app.use(cors({
    origin:'http://localhost:4200'
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//database connection

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
      console.log('Could NOT connect to database: ', err);
    } else {
      console.log('Connected to database: ' + config.db);
    }
  });``
app.get('/',(req,res)=>{
    res.send("hello")
})
app.listen(3000,()=>{
    console.log("App listen on port 3000");
});
app.use(express.static(__dirname+'/Client/src/'));
app.use('/authentication',authentication);
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/Client/src/index.html'));
});