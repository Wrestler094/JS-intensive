var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    res.send('Route for PUT requests!');
});

router.put('/', async function(req, res, next) {
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

router.delete('/', async function(req, res, next) {
    if (req && req.body && req.body.id && Number.isInteger(req.body.id)) {
        await sequelize.models.Order.update({
            isActive: false
        }, {
            where: {
                id: req.body.id
            }
        });

        res.send(`${req.body.id}`);
    } else {
        res.send("0");
    }
});

module.exports = router;
