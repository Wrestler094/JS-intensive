var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

router.get('/', async function (req, res, next) {
    try {
        const vacancies = await sequelize.models.Vacancy.findAll({
            where: {
                creator: req.query.id
            }
        })

        res.send(JSON.stringify({
            data: vacancies
        }));
    } catch (err) {
        console.log(err);
        res.send(JSON.stringify({
            data: null
        }));
    }
});

module.exports = router;