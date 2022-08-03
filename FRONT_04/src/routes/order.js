var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    // Выводит все заказы
    // const orders = await sequelize.models.Order.findAll();

    // Выводит все активные заказы
    const orders = await sequelize.models.Order.findAll({
        where: {
            isActive: true
        }
    });

    res.send(orders);
});

router.post('/', async function(req, res, next) {
    if (req && req.body && (req.body.isActive === true || req.body.isActive === false)) {
        const orders = await sequelize.models.Order.create({
            isActive: req.body.isActive,
            items: req.body.items,
        });

        res.send(`${orders.id}`);
    } else {
        res.send(`0`);
    }
});

module.exports = router;
