var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const menuItems = await sequelize.models.MenuItem.findAll();

    res.render('menu', {
        title: "Restaurant Menu",
        menu: menuItems,
});
})

// router.post('/', async function(req, res, next) {
//         const menuItems = await sequelize.models.MenuItem.create({
//             title: req.body.title,
//             picture: req.body.picture,
//             cost: req.body.cost,
//             callQuantity: req.body.callQuantity,
//             description: req.body.description
//         });
//
//         res.send(`${menuItems.id}`);
// });

module.exports = router;
