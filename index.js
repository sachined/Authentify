const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// IMPORT ROUTES
const authRoute = require('./routes/auth');
const postRoute= require('./routes/posts');

// Allows the use of environmental variables
dotenv.config();

// CONNECT TO DATABASE
mongoose.connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to MongoDB!')
);

// Middlewares
// Allows usage of json in auth route
app.use(express.json());

// ROUTES Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/rookreact/public/index.html')
});

// Listen to the server and indicate success
var server = app.listen(3000, () => console.log('Server Up and running'));
