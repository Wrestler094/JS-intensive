var express = require('express');
var router = express.Router();

const db = require('../sequelize/models/index');
const sequelize = db.sequelize;

router.get('/', async function (req, res, next) {
    try {
        const vacancies = await sequelize.models.Vacancy.findAll({
            where: {
                isActive: true
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

router.post('/', async (req, res, next) => {
    try {
        const vacancy = await sequelize.models.Vacancy.create({
            title: req.body.title,
            description: req.body.description,
            englishLevel: getEnglishLevel(req.body.englishLevel),
            grade: getGrade(req.body.grade),
            tags: parseTags(req.body.tags),
            isActive: true,
            creator: req.body.creator,
            responders: null
        });

        res.send(JSON.stringify({
            res: true,
            data: vacancy
        }));
    } catch (err) {
        console.log(err);
        res.send(JSON.stringify({
            res: false,
            err: err
        }));
    }
});

module.exports = router;

function getEnglishLevel(number) {
    switch (number) {
        case '1': {
            return 'Beginner';
        }
        case '2': {
            return 'Intermediate'
        }
        case '3': {
            return 'Advanced'
        }
    }
}

function getGrade(number) {
    switch (number) {
        case '1': {
            return 'Junior';
        }
        case '2': {
            return 'Middle'
        }
        case '3': {
            return 'Senior'
        }
    }
}

function parseTags(tagsString) {
    if (tagsString) {
        let tagsArray = tagsString.split(',');

        if (tagsArray.length) {
            tagsArray.forEach((item, i, arr) => arr[i] = item.trim());
            return tagsArray;
        }
    }

    return null;
}