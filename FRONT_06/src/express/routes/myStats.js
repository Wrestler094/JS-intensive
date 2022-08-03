const { models } = require('../../db');
const { getIdParam } = require('../helpers');

async function getAll(request, response) {
    if (request.session.authorized) {
        const result = await models.user.findByPk(request.session.user_id);
        const shipsTotal = result.destroy4cage + result.destroy3cage + result.destroy2cage + result.destroy1cage;
        const winRate = result.countGames === 0 ? 0 : result.countWins / result.countGames * 100;
        response.render('mystats.hbs', {
            title: 'My Stats',
            shipsTotal: shipsTotal,
            ships4: result.destroy4cage,
            ships3: result.destroy3cage,
            ships2: result.destroy2cage,
            ships1: result.destroy1cage,
            gamesTotal: result.countGames,
            winRate: winRate.toFixed(2)
        })
    } else {
        response.render('signin.hbs', {
            title: 'Sign in',
        })
    }
}

module.exports = {
    getAll
};