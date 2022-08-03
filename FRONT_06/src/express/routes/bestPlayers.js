const { models } = require('../../db');
const { getIdParam } = require('../helpers');
const {Op} = require("sequelize");

async function getAll(request, response) {
    await models.user.findAll({
        where: {
            countGames: {
                [Op.gte]: 100
            }
        }
    }).then((users) => {
        users.forEach((item) => {
            item.winRate = item.countWins / item.countGames * 100;
            item.winRate = item.winRate.toFixed(2);
        })
        response.render('bestplayers.hbs', {
            title: 'Best Players',
            users: users
        })
    });
}

module.exports = {
    getAll,
};