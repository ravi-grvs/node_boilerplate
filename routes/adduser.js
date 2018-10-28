const express = require('express');
const router = express.Router();
const userInutValidate = require('../util/validate').userInutValidate;
const logger = require('../util/logger');

router.post('/adduser', (req, res) => {
    userInutValidate(req.body)
        .then(() => {
            let response = {
                "status": "SUCCESS",
                "message": "valid user"
            }
            res.send(response);
            logger.info({response
             : req.body})
        })
        .catch((err) => {
            logger.error(err);
            res.send(err);
        })
});

module.exports = router;
