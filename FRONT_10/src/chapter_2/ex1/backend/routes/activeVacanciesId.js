var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

router.post('/:id', async (req, res, next) => {
    console.log(req.params.id);

    try {
        const vacancy = await sequelize.models.Vacancy.findAll({
            where: {
                id: req.params.id
            }
        });

        res.send(JSON.stringify({
            data: vacancy
        }));
    } catch (err) {
        console.log(err);
        res.send(JSON.stringify({
            data: null
        }));
    }

});

module.exports = router;
