const express = require('express');
const router = express.Router();
const adminRouter = require('../controleur/admin.controller');


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
    adminRouter.authenticate(req.body)
        .then(admin => admin ? res.json(admin) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    adminRouter.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    adminRouter.getAll()
        .then(admin => res.json(admin))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    adminRouter.getById(req.admin.sub)
        .then(admin => admin ? res.json(admin) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    adminRouter.getById(req.params.id)
        .then(admin => admin ? res.json(admin) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    adminRouter.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    adminRouter.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}