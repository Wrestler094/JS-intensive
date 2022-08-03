var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

router.post('/:id', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
    try {
        const vacancy = await sequelize.models.Vacancy.findAll({
            where: {
                id: req.params.id
            }
        });

        if (req.body.user) {
            let result;

            if (vacancy[0].dataValues.responders === null) {
                result = await sequelize.models.Vacancy.update({responders: [req.body.user]}, {
                    where: {
                        id: req.params.id
                    }
                });
            } else if (!(vacancy[0].dataValues.responders.includes(req.body.user))) {
                result = await sequelize.models.Vacancy.update({responders: vacancy[0].dataValues.responders.push(req.body.user)}, {
                    where: {
                        id: req.params.id
                    }
                });
            } else if (vacancy[0].dataValues.responders.includes(req.body.user)) {
                let responders = vacancy[0].dataValues.responders;
                responders = responders.filter(item => item !== req.body.user);

                result = await sequelize.models.Vacancy.update({
                    responders: responders.length ? responders : null
                }, {
                    where: {
                        id: req.params.id
                    }
                });
            }
        } else {
            await sequelize.models.Vacancy.update({isActive: false}, {
                where: {
                    id: req.params.id
                }
            });
        }

        res.send(`1`);
    } catch (err) {
        res.send(`0`);
    }
});

module.exports = router;
