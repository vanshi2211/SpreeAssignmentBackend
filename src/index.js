const express = require('express');
const app = express();
const authenticate = require('./middlewares/authenticate');
const notesRoutes = require('./routes/notesRoutes');
require('dotenv').config();
const mongoose = require('mongoose');   
const connectDB = require('./db/connect');
const notesController = require('./controllers/notesController');

app.use(express.json());
app.use(express.static('./public'));


app.use('/api/auth',notesRoutes);
app.use('/api/notes',notesController);

mongoose.connect('mongodb://127.0.0.1:27017/vanshika').then( () => { console.log('mongoDB connected!') } );


//starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('server is listening on port 3000');
})