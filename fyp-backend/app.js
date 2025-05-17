const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Basic route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = require('./models/db');

// Test connection
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));