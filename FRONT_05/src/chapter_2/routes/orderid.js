var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;
const {Op} = require("sequelize");

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
    let isRendered = 0;

    if (req.params.id && Number.isInteger(parseInt(req.params.id))) {
        const order = await sequelize.models.Order.findAll({
            where: {
                id: req.params.id
            }
        });

        if (order.length) {
            if (order[0].dataValues.items.length) {
                const menuItems = await sequelize.models.MenuItem.findAll({
                    where: {
                        id: order[0].dataValues.items
                    }
                });

                if (menuItems.length) {
                    let orderStatus = order[0].dataValues.isActive ? "Open" : "Closed";
                    let costOfOrder = menuItems.reduce((total, item) => {
                        return total + item.dataValues.cost;
                    }, 0);

                    res.render('order', {
                        title: `Order #${req.params.id} (${orderStatus})`,
                        order: menuItems,
                        orderSum: costOfOrder,
                        isActive: !order[0].dataValues.isActive
                    })

                    isRendered = 1;
                }
            }
        }
    }

    if (isRendered === 0) {
        res.render('error', {
            message: "Заказ не найден",
            error: {
                status: "404",
                stack: "Заказ не найден, проверьте id заказа"
            }
        });
    }
});

router.put('/id', async function(req, res, next) {
    if (req && req.body && req.body.id && Number.isInteger(req.body.id)) {
        await sequelize.models.Order.update(req.body, {
            where: {
                id: req.body.id
            }
        });

        res.send(`${req.body.id}`);
    } else {
        res.send("0");
    }
});

router.delete('/:id', async function(req, res, next) {
    if (req.params.id && Number.isInteger(parseInt(req.params.id))) {
        await sequelize.models.Order.update({
            isActive: false
        }, {
            where: {
                id: req.params.id
            }
        });

        console.log(req.params.id);

        res.send(`${req.params.id}`);
    } else {
        res.send("0");
    }
});

module.exports = router;
