const express = require("express")
const bodyparse = require("body-parser")
const mongoose = require("mongoose");
 const app = express();
 var getdata=[];
 var final="";
app.set('view engine','ejs');
app.use(bodyparse.urlencoded({extended:true}));
app.use(express.static("public"));


//mongoose server

mongoose.connect("mongodb+srv://admin-ayush:ayushayush@cluster0.ham0d.mongodb.net/todonew",{useNewUrlParser: true});

const schema = new mongoose.Schema({
    name : String
})

const Item = new mongoose.model("Item",schema);

const data1 = new Item({
   name : "Press + to add more list data"
})

const data2 = new Item({
   name : "Hello, welcome to my web"
})

const data3 = new Item({
   name : "Press -- to delte data"
})




app.get("/", (req,res)=>{
 
 var today = new Date();

 const options ={
     weekday : "long",
     day:"numeric",
     month:"long"
 }
 var currentday = today.toLocaleDateString("en-US",options);

Item.find({},function(err,founditems){
    if(founditems.length == 0){
        Item.insertMany([data2, data1, data3]);
    res.redirect("/");}
    else{
    res.render("list",{kindday : currentday, userinput : founditems});
}
})


})

app.post("/",(req,res)=>{
    newdata = req.body.input1;
    const data = new Item({
        name : newdata
    });
    data.save();

res.redirect("/");
});

app.post("/delete",(req,res)=>{
    const checked=req.body.checkbox;
    Item.findByIdAndRemove(checked, function(err){
        if(!err)
        {console.log("deleted");}
    });
    res.redirect("/");

})

app.listen(process.env.PORT,()=>{
    console.log("start")
})
