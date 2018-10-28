const Joi = require('joi');

exports.userInutValidate = (reqBody) => {
    return new Promise((resolve, reject) => {
        const userSchema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            })
        });
        Joi.validate(reqBody, userSchema, (err) => {
            if (err === null) {
                resolve();
            } else {
                reject(err.details[0].message);
            }
        });
    })
}
