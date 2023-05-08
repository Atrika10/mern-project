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
module.exports = router;
