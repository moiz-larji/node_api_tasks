const express = require('express');
const sequelize = require('./database');
const userRoutes = require('./routes/users');

const app = express();

// Initialize Sequelize and sync models with the database
sequelize.sync()
  .then(() => console.log('Sequelize synchronized with the database'))
  .catch((error) => console.error('Error synchronizing Sequelize:', error));

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
