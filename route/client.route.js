const express = require('express');
const router = express.Router();
const clientRouter = require('../controleur/client.controller');


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    clientRouter.authenticate(req.body)
        .then(client => client ? res.json(client) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    clientRouter.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    clientRouter.getAll()
        .then(client => res.json(client))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    clientRouter.getById(req.client.sub)
        .then(client => client ? res.json(client) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    clientRouter.getById(req.params.id)
        .then(client => client ? res.json(client) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    clientRouter.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    clientRouter.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}