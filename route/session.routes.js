module.exports = (app) => {
    const session = require('../controleur/session.controller');

    // Create a new session
    app.post('/session', session.create);

    // Retrieve all sessionsId
    app.get('/session', session.findAll);

    // Retrieve a single sessin  with sessiontId
    app.get('/session/:sessionId', session.findOne);

    // Update a Note with cartId
   // app.put('/session/:sessionId', session.update);

    // Delete a Note with cartId
    app.delete('/session/:sessionId', session.delete);
}