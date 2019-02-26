module.exports = (app) => {
    const moniteurs = require('../controleur/moniteur.controller.');

    // Create a new moniteurs
    app.post('/moniteurs', moniteurs.create);

    // Retrieve all moniteursId
    app.get('/moniteurs', moniteurs.findAll);

    // Retrieve a single car with cartId
    app.get('/moniteurs/:moniteurId', moniteurs.findOne);

    // Update a Note with cartId
    app.put('/moniteurs/:moniteurId', moniteurs.update);

    // Delete a Note with cartId
    app.delete('/moniteurs/:moniteurId', moniteurs.delete);
}