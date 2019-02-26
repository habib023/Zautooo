const Moniteur = require('../model/moniteur.js');

//Create new moniteur
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "moniteur content can not be empty"
        });
    }

    // Create a moniteur
    const moniteur = new Moniteur({
        
        name: req.body.name,
        prenom: req.body.prenom,
        nbrh: req.body.nbrh,
        login: req.body.login,
        password: req.body.password,
        disp: req.body.disp 
        
    });
    

    // Save moniteur in the database
    moniteur.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the moniteur."
        });
    });
};

// Retrieve all moniteur from the database.
exports.findAll = (req, res) => {
    Moniteur.find()
    .then(moniteurs => {
        res.send(moniteurs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving Moniteurs."
        });
    });
};

// Find a single moniteur with a MoniteurtId
exports.findOne = (req, res) => {
    Moniteur.findById(req.params.moniteurId)
    .then(moniteur => {
        if(!moniteur) {
            return res.status(404).send({
                message: "Moniteur not found with id " + req.params.moniteurId
            });            
        }
        res.send(moniteur);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Moniteur not found with id " + req.params.moniteurId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving Moniteur with id " + req.params.moniteurId
        });
    });
};

// Update a moniteur
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "moniteur content can not be empty"
        });
    }

    // Find and moniteurId  with the request body
    Moniteur.findByIdAndUpdate(req.params.moniteurId, {
        name: req.body.name || "No name moniteur" ,
        prenom: req.body.prenom || "No prenom moniteur",
        nbrh: req.body.nbrh,
        login: req.body.login,
        password: req.body.password,
        disp: req.body.disp
    }, {new: true})
    .then(moniteur => {
        if(!moniteur) {
            return res.status(404).send({
                message: "moniteur not found with id " + req.params.moniteurId
            });
        }
        res.send(moniteur);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "moniteur not found with id " + req.params.moniteurId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note moniteur with id " + req.params.moniteurId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Moniteur.findByIdAndRemove(req.params.moniteurId)
    .then(moniteur => {
        if(!moniteur) {
            return res.status(404).send({
                message: "moniteurId not found with id " + req.params.moniteurId
            });
        }
        res.send({message: "moniteurId deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "moniteurId not found with id " + req.params.moniteurId
            });                
        }
        return res.status(500).send({
            message: "Could not delete moniteur with id " + req.params.moniteurId
        });
    });
};