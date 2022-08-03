var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const users = await sequelize.models.MenuItem.findAll();
    res.send(users);
})

module.exports = router;
