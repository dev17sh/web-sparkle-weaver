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

// Create courses table
db.run(`
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        instructor TEXT,
        duration TEXT,
        level TEXT,
        image TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Create enrollments/purchases table
db.run(`
    CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        courseId INTEGER NOT NULL,
        stripePaymentId TEXT,
        status TEXT DEFAULT 'pending',
        amount REAL,
        enrolledAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (courseId) REFERENCES courses(id)
    )
`);

// Insert sample courses if empty
db.get('SELECT COUNT(*) as count FROM courses', [], (err, row) => {
    if (row && row.count === 0) {
        const courses = [
            { title: 'Web Development 101', description: 'Learn the basics of web development including HTML, CSS, and JavaScript. Perfect for beginners.', price: 49.99, instructor: 'John Doe', duration: '8 weeks', level: 'Beginner' },
            { title: 'Advanced JavaScript', description: 'Master advanced JavaScript concepts like closures, async/await, and functional programming.', price: 79.99, instructor: 'Jane Smith', duration: '10 weeks', level: 'Intermediate' },
            { title: 'React Mastery', description: 'Build modern React applications with hooks, context API, and state management solutions.', price: 99.99, instructor: 'Mike Johnson', duration: '12 weeks', level: 'Intermediate' },
            { title: 'Node.js Backend', description: 'Build scalable backend applications with Node.js, Express, and databases.', price: 89.99, instructor: 'Sarah Williams', duration: '10 weeks', level: 'Advanced' },
            { title: 'Python for Data Science', description: 'Learn Python programming with focus on data analysis, pandas, and NumPy libraries.', price: 69.99, instructor: 'Alex Chen', duration: '9 weeks', level: 'Beginner' },
            { title: 'CSS & UI Design', description: 'Master CSS, Tailwind, and modern UI design principles for beautiful websites.', price: 59.99, instructor: 'Emma Davis', duration: '7 weeks', level: 'Beginner' },
            { title: 'Full Stack Development', description: 'Complete full stack development course covering frontend, backend, and database design.', price: 129.99, instructor: 'Robert Miller', duration: '16 weeks', level: 'Advanced' },
            { title: 'TypeScript Pro', description: 'Write type-safe JavaScript with TypeScript. Learn interfaces, generics, and advanced types.', price: 74.99, instructor: 'Lisa Anderson', duration: '8 weeks', level: 'Intermediate' },
            { title: 'Cloud Deployment', description: 'Deploy applications to AWS, Google Cloud, and Azure with CI/CD pipelines.', price: 84.99, instructor: 'Mark Wilson', duration: '9 weeks', level: 'Advanced' },
            { title: 'Database Design', description: 'Master SQL, MongoDB, and database optimization techniques for production apps.', price: 79.99, instructor: 'Nina Patel', duration: '10 weeks', level: 'Intermediate' }
        ];
        
        courses.forEach(course => {
            db.run(`INSERT INTO courses (title, description, price, instructor, duration, level) VALUES (?, ?, ?, ?, ?, ?)`,
                [course.title, course.description, course.price, course.instructor, course.duration, course.level]);
        });
        
        console.log('Sample courses inserted successfully!');
    }
});

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

// Get all courses
app.get('/courses', (req, res) => {
    const sql = `SELECT * FROM courses`;
    
    db.all(sql, [], (err, courses) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ message: "Error fetching courses" });
        }

        res.json({
            message: "Courses fetched successfully",
            courses: courses || []
        });
    });
});

// Get single course
app.get('/courses/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM courses WHERE id = ?`;
    
    db.get(sql, [id], (err, course) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ message: "Error fetching course" });
        }

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({
            message: "Course fetched successfully",
            course: course
        });
    });
});

// Create payment intent
app.post('/create-payment-intent', (req, res) => {
    // This endpoint is no longer needed with fake payments
    // Just return a fake client secret for compatibility
    const { courseId } = req.body;
    res.json({
        clientSecret: `test_secret_${courseId}`,
        courseId: courseId
    });
});

// Confirm purchase (called after payment succeeds)
app.post('/confirm-purchase', (req, res) => {
    const { userId, courseId, paymentIntentId } = req.body;

    if (!userId || !courseId || !paymentIntentId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if already enrolled
    db.get(`SELECT * FROM enrollments WHERE userId = ? AND courseId = ?`, [userId, courseId], (err, enrollment) => {
        if (enrollment) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        // Get course price
        db.get(`SELECT price FROM courses WHERE id = ?`, [courseId], (err, course) => {
            if (err || !course) {
                return res.status(404).json({ message: "Course not found" });
            }

            // Create enrollment record
            const sql = `INSERT INTO enrollments (userId, courseId, stripePaymentId, status, amount) VALUES (?, ?, ?, ?, ?)`;
            
            db.run(sql, [userId, courseId, paymentIntentId, 'completed', course.price], function(err) {
                if (err) {
                    console.error('Database error:', err.message);
                    return res.status(500).json({ message: "Error creating enrollment" });
                }

                res.json({
                    message: "Course purchased successfully!",
                    enrollmentId: this.lastID
                });
            });
        });
    });
});

// Get user enrollments
app.get('/enrollments/:userId', (req, res) => {
    const { userId } = req.params;
    
    const sql = `
        SELECT e.*, c.title, c.description, c.instructor, c.duration 
        FROM enrollments e 
        JOIN courses c ON e.courseId = c.id 
        WHERE e.userId = ? AND e.status = 'completed'
    `;
    
    db.all(sql, [userId], (err, enrollments) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ message: "Error fetching enrollments" });
        }

        res.json({
            message: "Enrollments fetched successfully",
            enrollments: enrollments || []
        });
    });
});