const { models } = require('../../db');
const { getIdParam } = require('../helpers');

async function getAll(request, response) {
    if (request.session.authorized) {
        response.render('alreadyregistered.hbs', {
            title: 'Sign in',
        })
    } else {
        response.render('signup.hbs', {
            title: 'Sign up',
        })
    }
}

async function sign(req, response) {
    if (req.body.login === '') {
        req.body.login = null;
    }
    if (req.body.password === '') {
        req.body.password = null;
    }
    req.body.countGames = 0;
    req.body.countWins = 0;
    req.body.destroy4cage = 0;
    req.body.destroy3cage = 0;
    req.body.destroy2cage = 0;
    req.body.destroy1cage = 0;
    await models.user.create(req.body).then((item) => {
        response.status(201).json({
            status: 'ok',
            id: item.id
        });
    }).catch((err) => {
        response.status(500).json({
            status: 'error',
            error: {
                message: err.message,
            },
        });
    })
}

module.exports = {
    getAll,
    sign
};