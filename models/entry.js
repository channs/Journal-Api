const db = require('../db/database');

class Entry {
    static create(entry) {
        return new Promise((resolve, reject) => {
            const { title, content, category } = entry;
            const sql = `
                INSERT INTO entries (title, content, category)
                VALUES (?, ?, ?)
            `;
            
            db.run(sql, [title, content, category], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ id: this.lastID, title, content, category });
            });
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM entries
                ORDER BY created_at DESC
            `;
            
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM entries
                WHERE id = ?
            `;
            
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }
}

module.exports = Entry;
