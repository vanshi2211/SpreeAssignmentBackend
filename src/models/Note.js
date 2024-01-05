const mongoose = require('mongoose');

const noteS = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true},
    title:{ type: String , required : true },
    content:{ type: String, required: true}
});

const Note = mongoose.model('Note',noteS);
module.exports=Note;