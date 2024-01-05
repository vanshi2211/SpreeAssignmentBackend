const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const Note = require('../models/Note');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);
// router.get('/', async(req, res) => {
//     // Here, req.user contains user information decoded from the JWT
//     // Provide access to notes or perform actions based on user authentication
//     // Fetch notes from the database and send them in the response
//     res.json({ message: 'Access to notes granted' });
//   });
  
  // GET /api/notes - Get all notes for the authenticated user
  router.get('/', async (req, res) => {
    try {
      const userId = req.user.id; // Assuming user ID is available in the request object after authentication
      const notes = await Note.find({ userId });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // GET /api/notes/:id - Get a specific note by ID for the authenticated user
  router.get('/:id', async (req, res) => {
    try {
      const userId = req.user.id;
      const note = await Note.findOne({ _id: req.params.id, userId });
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // POST /api/notes - Create a new note for the authenticated user
  router.post('/', async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
      const newNote = new Note({ title, content, userId });
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // PUT /api/notes/:id - Update an existing note by ID for the authenticated user
  router.put('/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
      const updatedNote = await Note.findOneAndUpdate(
        { _id: req.params.id, userId },
        { title, content },
        { new: true }
      );
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // DELETE /api/notes/:id - Delete a note by ID for the authenticated user
  router.delete('/:id', async (req, res) => {
    try {
      const userId = req.user.id;
      const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId });
      if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(deletedNote);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

  

  
module.exports = router;