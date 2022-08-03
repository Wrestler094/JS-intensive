const { models } = require('../../db');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
    const users = await models.user.findAll();
    res.status(200).json(users);
}

async function getById(req, res) {
    const id = getIdParam(req);
    const user = await models.user.findByPk(id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({
            status: 'error',
            error: {
                message: '404 - Not found'
            }
        });
    }
}

async function create(req, response) {
    if (req.body.id) {
        response.status(400).json({
            status: 'error',
            error: {
                message: `Bad request: ID should not be provided, since it is determined automatically by the database.`
            }
        })
    } else {
        if (req.body.login === '') {
            req.body.login = null;
        }
        if (req.body.password === '') {
            req.body.password = null;
        }
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
}

async function update(req, res) {
    const id = req.session.user_id;
    const user = await models.user.findByPk(id);
    const userUpdate = {
        countGames: user.countGames + 1,
        countWins: user.countWins + req.body.win,
        destroy4cage: user.destroy4cage + 1 * req.body.win,
        destroy3cage: user.destroy3cage + 2 * req.body.win,
        destroy2cage: user.destroy2cage + 3 * req.body.win,
        destroy1cage: user.destroy1cage + 4 * req.body.win,
    }
    console.log(userUpdate)
    await models.user.update(userUpdate, {
        where: {
            id: id
        }
    });
    res.status(200).end();
}

async function remove(req, res) {
    const id = getIdParam(req);
    await models.user.destroy({
        where: {
            id: id
        }
    });
    res.status(200).end();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};