var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

router.post('/', async (req, res, next) => {
    try {
        await sequelize.models.User.create({
            login: req.body.login,
            password: req.body.password,
            isCompany: req.body.isCompany,
            companyName: req.body.companyName
        });

        res.send(JSON.stringify({
            res: true
        }));
    } catch (err) {
        res.send(JSON.stringify({
            res: false,
            err: err
        }));
    }
});

module.exports = router;
