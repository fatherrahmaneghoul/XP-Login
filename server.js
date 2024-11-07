const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database'); // Import the database setup

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Register Route
app.post('/register', (req, res) => {
    const { fullName, email, username, password } = req.body;

    // Check if all fields are filled
    if (!fullName || !email || !username || !password) {
        return res.status(400).send("All fields are required!");
    }

    // Insert the new user into the database
    db.run(
        `INSERT INTO users (full_name, email, username, password) VALUES (?, ?, ?, ?)`,
        [fullName, email, username, password],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send("Error saving user.");
            }
            res.redirect('/index.html');
        }
    );
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the database
    db.get(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row) {
                res.redirect('/welcome.html');
            } else {
                res.send('Invalid username or password.');
            }
        }
    );
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


