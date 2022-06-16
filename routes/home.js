const express = require('express');
const router = express.Router();
  
router.get('/', async (req, res) => {
    try {
        res.render('index.html');
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;