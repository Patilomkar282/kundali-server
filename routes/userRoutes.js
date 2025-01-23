const express = require('express');
const router = express.Router();

// Basic user routes - we'll add controllers later
router.get('/profile', (req, res) => {
  res.send('User profile route');
});

module.exports = router;