const express = require('express');
const EntryController = require('../controllers/entryController');

const router = express.Router();

router.get('/', EntryController.getAllEntries);
router.get('/:id', EntryController.getEntry);
router.post('/', EntryController.createEntry);

module.exports = router;
