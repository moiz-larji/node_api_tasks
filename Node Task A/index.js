const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()
const app = express();


// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@mongapi.lw4qzcb.mongodb.net/?retryWrites=true&w=majority`)


mongoose.connection.on('error',err=>{
    console.log('Connection Failed.')
})

mongoose.connection.on('connected',connected=>{
    console.log('Connected to database successfully.')
})

//   User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 12,
    match: /^[a-zA-Z0-9]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      return res.json({ message: 'Login successful' });
    })
    .catch((err) => {
      console.error('Error occurred during login:', err);
      return res.status(500).json({ error: 'Username or password Invalid' });
    });
});


app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });

  newUser.save()
    .then(() => {
      return res.json({ message: 'User registered successfully' });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      return res.status(500).json({ error: 'Username should be 6-12 characters long and password must contain 6 characters.' });
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
