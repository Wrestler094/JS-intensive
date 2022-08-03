var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

router.post('/', async (req, res, next) => {
    if (req && req.body && req.body.login && req.body.password) {
        try {
            const userdata = await sequelize.models.User.findAll({
                where: {
                    login: req.body.login
                }
            });

            if (userdata.length) {
                if (userdata[0].dataValues.password === req.body.password) {
                    res.send(JSON.stringify({
                        res: true,
                        data: userdata[0]
                    }));
                } else {
                    res.send(JSON.stringify({
                        res: false,
                        err: {
                            errors: [{
                                message: 'Wrong password'
                            }]
                        }
                    }));
                }
            } else {
                res.send(JSON.stringify({
                    res: false,
                    err: {
                        errors: [{
                            message: 'Login not found'
                        }]
                    }
                }));
            }
        } catch (err) {
            res.send(JSON.stringify({
                res: false,
                err: err
            }));
        }
    } else {
        res.send(JSON.stringify({
            res: false,
            err: {
                errors: [{
                    message: 'Something went wrong!'
                }]
            }
        }));
    }
});

module.exports = router;
