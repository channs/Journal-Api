const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// In production, use Vercel's tmp directory
// In development, use local db directory but recreate DB on startup
const getDbPath = () => {
    if (process.env.NODE_ENV === 'production') {
        const tmpDir = '/tmp';
        return path.join(tmpDir, 'journal.db');
    } else {
        const dbDir = path.join(__dirname);
        const dbPath = path.join(dbDir, 'journal.db');
        
        // Remove existing database in development
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
            console.log('Removed existing development database');
        }
        
        return dbPath;
    }
};

const dbPath = getDbPath();
console.log(`Using database at: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
        
        // Create entries table
        db.run(`
            CREATE TABLE IF NOT EXISTS entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                category TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creating entries table:', err);
            } else {
                console.log('Entries table ready');
            }
        });
    }
});

module.exports = db;
