const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { models } = require('../db');

const routes = {
    signin: require('./routes/signin'),
    signup: require('./routes/signup'),
    bestPlayers: require('./routes/bestPlayers'),
    myStats: require('./routes/myStats'),
    user: require('./routes/user')
    // Add more routes here...
    // items: require('./routes/items'),
};

const app = express();

app.use(session({ secret: 'eirfiagfhidfhg',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({logFn: function(){}}),
        cookie: { maxAge: 3600000,secure: false, httpOnly: true }
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
    return async function(req, res, next) {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/') // will always fire after session is destroyed
    })
});
// We provide a root route just as an example
app.get('/', async (req, res) => {
    if (req.session.authorized === 1) {
        res.render('main_auth.hbs', {
            title: 'Main page',
            name: req.session.name
        })
    } else {
        res.render('signin.hbs', {
            title: 'Main page'
        })
    }
});

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
    if (routeController.getAll) {
        app.get(
            `/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.getAll)
        );
    }
    if (routeController.getById) {
        app.get(
            `/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.getById)
        );
    }
    if (routeController.create) {
        app.post(
            `/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.create)
        );
    }
    if (routeController.sign) {
        app.post(
            `/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.sign)
        );
    }
    if (routeController.update) {
        app.put(
            `/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.update)
        );
    }
    if (routeController.update) {
        app.put(
            `/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.update)
        );
    }
    if (routeController.remove) {
        app.delete(
            `/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.remove)
        );
    }
    if (routeController.remove) {
        app.post(
            `/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.remove)
        );
    }
}

module.exports = app;