var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    // Выводит все заказы
    const orders = await sequelize.models.Order.findAll();
    res.send(orders);
});

module.exports = router;
