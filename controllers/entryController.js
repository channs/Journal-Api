const Entry = require('../models/entry');

class EntryController {
    static async createEntry(req, res) {
        try {
            const entry = await Entry.create(req.body);
            res.status(201).json(entry);
        } catch (error) {
            console.error('Error creating entry:', error);
            res.status(500).json({ error: 'Failed to create entry' });
        }
    }

    static async getAllEntries(req, res) {
        try {
            const entries = await Entry.getAll();
            res.json(entries);
        } catch (error) {
            console.error('Error fetching entries:', error);
            res.status(500).json({ error: 'Failed to fetch entries' });
        }
    }

    static async getEntry(req, res) {
        try {
            const entry = await Entry.getById(req.params.id);
            if (!entry) {
                return res.status(404).json({ error: 'Entry not found' });
            }
            res.json(entry);
        } catch (error) {
            console.error('Error fetching entry:', error);
            res.status(500).json({ error: 'Failed to fetch entry' });
        }
    }
}

module.exports = EntryController;
