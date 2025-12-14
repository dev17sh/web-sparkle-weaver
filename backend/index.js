const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Database error:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create users table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        location TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

app.get('/', (req, res) => {
    res.send("test")
})

app.post('/data', (req, res) => {
    const { name, email, password, role, location } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Insert data into database
    const sql = `INSERT INTO users (name, email, password, role, location) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(sql, [name, email, password, role, location], function(err) {
        if (err) {
            console.error('Database error:', err.message);
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ message: "Email already exists" });
            }
            return res.status(500).json({ message: "Error saving user" });
        }

        res.json({ 
            message: "User registered successfully",
            userId: this.lastID
        });
    });

    console.log(name, email, password, role, location);
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Query database for user
    const sql = `SELECT id, name, email, role, location FROM users WHERE email = ? AND password = ?`;
    
    db.get(sql, [email, password], (err, user) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ message: "Error checking user" });
        }

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({ 
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location
            }
        });
    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000"); 
})