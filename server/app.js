const express = require('express'); 
const app =express();
const Port =5000;

 
 

app.use(express.json());

app.use(require('./routers/meter'));

 app.get('/',(req,res)=>{
   res.send("Well come to metering csv file data reading.......");
 })


app.listen(Port,()=>{
    console.log("server is running on ",Port);
})

