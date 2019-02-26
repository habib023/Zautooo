module.exports = (app) => {
    const cars = require('../controleur/car.controller');

    // Create a new car
    app.post('/cars', cars.create);

    // Retrieve all cartId
    app.get('/cars', cars.findAll);

    // Retrieve a single car with cartId
    app.get('/cars/:carId', cars.findOne);

    // Update a Note with cartId
    app.put('/cars/:carId', cars.update);

    // Delete a Note with cartId
    app.delete('/cars/:carId', cars.delete);
}