// const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const fs = require("fs");
const _ = require("lodash");
const {v4:uuidv4} = require("uuid");

const {
    readFromFile, readAndAppend, writeToFile
} = require("../helpers/fsUtils")


// Renders the HTML index page.
router.get('/', (req, res) => {
    let data = fs.readFileSync("./db/notes.json");
    let notes = JSON.parse(data);
 
    res.render('notes', {notes})
})

router.post('/', (req, res) => {
   const {title, note} = req.body;

   if (req.body) {
       const newNote = {title, note, id:uuidv4()}
    readAndAppend(newNote, "./db/notes.json")
    res.redirect("notes")
    } else {
        res.err("error in add")
    }    
})


router.get('/:id', (req, res) => {
    fs.readFile("./db/notes.json", "utf8", function(err, data) {
     let notes = JSON.parse(data); 
           
           let note = _.find(notes, function(o){
            return o.id === req.params.id});
            console.log(note);
            res.render('note', {note});
        })  
    })

router.delete('/delete/:id', (req, res) => {
    let data = fs.readFileSync("./db/notes.json");
    let notes = JSON.parse(data);
    let index = _.findIndex(notes, function(d) {
        return d.id === req.params.id
    })
    if (index > -1) {
        notes.splice(index, 1)
    }
    writeToFile("./db/notes.json", notes)

   res.render("notes", {notes}) 
})


module.exports=router


