var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const waiters = await sequelize.models.User.findAll();
    res.send(waiters);
});

router.post('/', async function (req, res, next) {
    console.log(req.body);

    if (req && req.body && req.body.name && req.body.role) {
        const waiter = await sequelize.models.User.create({
            name: req.body.name,
            login: req.body.login,
            password: req.body.password,
            orders: req.body.orders,
            role: req.body.role
        });

        res.send(`${waiter.id}`);
    } else {
        res.send(`0`);
    }
});

module.exports = router;
