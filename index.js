const express = require('express');
const cors = require('cors');
const entryRoutes = require('./routes/entryRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/entries', entryRoutes);

// Health check endpoint with DB path info
app.get('/health', (req, res) => {
    const db = require('./db/database');
    res.json({ 
        status: 'ok',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        dbPath: db.filename || 'In-memory database',
        baseUrl: `${req.protocol}://${req.get('host')}`
    });
});

// Root endpoint with API info
app.get('/', (req, res) => {
    res.json({
        name: 'Technology Leadership Journal API',
        version: '1.0.0',
        health: '/health',
        endpoints: {
            entries: '/entries'
        },
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
});

// Start server if running locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
