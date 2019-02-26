const Car = require('../model/car.model');

//Create new car
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "car content can not be empty"
        });
    }

    // Create a car
    const car = new Car({
        model: req.body.model || "No car model", 
        description: req.body.description,
        nbrh: req.body.nbrh,
        eta: req.body.eta
    });
    

    // Save car in the database
    car.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the car."
        });
    });
};

// Retrieve all car from the database.
exports.findAll = (req, res) => {
    Car.find()
    .then(cars => {
        res.send(cars);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving cars."
        });
    });
};

// Find a single car with a cartId
exports.findOne = (req, res) => {
    Car.findById(req.params.carId)
    .then(car => {
        if(!car) {
            return res.status(404).send({
                message: "car not found with id " + req.params.carId
            });            
        }
        res.send(car);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "car not found with id " + req.params.carId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving car with id " + req.params.carId
        });
    });
};

// Update a car
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "car content can not be empty"
        });
    }

    // Find and update car with the request body
    Car.findByIdAndUpdate(req.params.carId, {
        model: req.body.model || "No car model", 
        description: req.body.description,
        nbrh: req.body.nbrh,
        eta: req.body.eta
    }, {new: true})
    .then(car => {
        if(!car) {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });
        }
        res.send(car);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.carId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.carId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Car.findByIdAndRemove(req.params.carId)
    .then(car => {
        if(!car) {
            return res.status(404).send({
                message: "car not found with id " + req.params.carId
            });
        }
        res.send({message: "car deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "car not found with id " + req.params.carId
            });                
        }
        return res.status(500).send({
            message: "Could not delete car with id " + req.params.carId
        });
    });
};