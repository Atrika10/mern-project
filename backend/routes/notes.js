const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

// ROUTE : 1 Get all notes using : GET "api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server Error");
  }
});

// ROUTE : 2 Add a new note using : POST "api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request & the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await notes.save();
      res.json(savedNote);
    }  catch (error) {
        console.log(error.message);
        res.status(500).send("internal server Error");
      }
  }
);

// ROUTE : 3 update notes using : put "api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at 5 characters").isLength({
      min: 5,
    }),
  ], async(req, res)=>{
    try {
        const { title, description, tag } = req.body;
  
        //create a newNote object
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag};

        // if note not exist
        let note = await Notes.findById(req.params.id);
        if(!note){
           return res.status(404).send("NOt Found")
        }

        // note.user.toString() will give me the id of this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("NOt Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new : true});
        res.json({note});
        
      }  catch (error) {
          console.log(error.message);
          res.status(500).send("internal server Error");
        }
})

// ROUTE : 4 delete notes using : put "api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async(req, res)=>{
    try {

        // if note not exist
        let note = await Notes.findById(req.params.id);
        if(!note){
           return res.status(404).send("NOt Found")
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("NOt Allowed")
        }

        // allow deletion only user own this note 
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "note has been deleted"});
        
      }  catch (error) {
          console.log(error.message);
          res.status(500).send("internal server Error");
        }
})
module.exports = router;
