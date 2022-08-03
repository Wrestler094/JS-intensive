const { models } = require('../../db');
const { getIdParam } = require('../helpers');

async function getAll(request, response) {
    if (request.session.authorized) {
        response.render('alreadyregistered.hbs', {
            title: 'Sign in',
        })
    } else {
        response.render('signin.hbs', {
            title: 'Sign in',
        })
    }
}

async function sign(req, response) {
    const result = await models.user.findAndCountAll({
        where: {
            login: req.body.login,
            password: req.body.password
        }
    });
    if (result.count) {
        req.session.authorized = 1;
        req.session.login = result.rows[0].dataValues.login;
        req.session.name = result.rows[0].dataValues.name;
        req.session.user_id = result.rows[0].dataValues.id;

        response.status(201).json({
            status: 'ok',
            login: result.rows[0].dataValues.login
        });
    } else {
        response.status(404).json({
            status: 'error',
            error: {
                message: "Error: Incorrect login",
            },
        });
    }
}

module.exports = {
    getAll,
    sign
};