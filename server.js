const express = require('express')
const mongoose = require('mongoose')

var app = express()
var Data = require('./noteSchema')
mongoose.connect('mongodb://localhost/newDB')

mongoose.connection.once("open", () => {
    console.log("Connected to DB")
}).on("error", (error) => {
    console.log("Failed to connect" + error)
})
//CREATE A NOTE
//post request
app.post("/create",(req, res) => {
    var note = new Data({
        note: req.get("note"),
        title:req.get("title"),
        date:req.get("date")

    })
    note.save().then(()=> {
        if(note.isNew == false){
            console.log("Saved Data!")
            res.send("Saved Data!")
        }else{
            console.log("Failed to save data")
        }
    })
})
//DELETE A NOTE
//post
app.post('/delete',(req,res) =>{
    Data.findOneAndRemove({
        id:req.get("id")
    },(err) => {
        console.log("FAILED"+ error)
    
    })
    res.send("Deleted!")

})
//UPDATE A NOTE
//post

app.post('/update', (req,res) => {
    Data.findOneAndUpdate({
        _id: req.get("id")
    },{
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date")

    }, (err) => {
         console.log("Failed to update " +err)
    })
    res.send("Updated!")
})
//FETCH ALL NOTES
//get
app.get('/fetch', (req, res) => {

    Data.find({}).then((DBitems) => {
       res.send(DBitems)
    })
})



//http://192.168.1.4:8081/create
var server = app.listen(8081, "192.168.1.4", () => {
    console.log("Server is running!")
})
