const express = require('express');
const router = express.Router();
const currency_api = require('../currency_api');
const convertor = currency_api.convertor;

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