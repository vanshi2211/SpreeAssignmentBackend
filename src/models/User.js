const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true,maxlength: [10,'name cannot be more than 10 characters']},
    password: {type: String, required: true,minlength: [8,'name cannot be less than 8 characters']},
    

});

const User = mongoose.model('User', userSchema);

module.exports = User;

            