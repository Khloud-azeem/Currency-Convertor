const express = require('express');
const router = express.Router();
const convertor = require('../currency_api');

router.get('/:from/:to/:amount', async (req, res) => {
    try {
        await convertor(req.params.from, req.params.to, req.params.amount)
            .then(result => {
                res.send({'conversion result': result});
            });
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;