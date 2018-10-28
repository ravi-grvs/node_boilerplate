const express = require('express');
const router = express.Router();
const userInutValidate = require('../util/validate').userInutValidate;
const logger = require('../util/logger');
const RedisCacheManager = require('../util/RedisCacheManager');

router.post('/adduser', (req, res) => {
    userInutValidate(req.body)
        .then(() => {
            RedisCacheManager.setCache(`${req.body.username}`, `${req.body.email}`);
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
