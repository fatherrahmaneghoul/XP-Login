const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db'); // Create a new SQLite database file

// Create a users table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
});

module.exports = db; // Export the database for use in other files
