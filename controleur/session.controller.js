const {Session} = require('../model/session'); 
const {Car} = require('../model/car.model'); 
const {Client} = require('../model/client');
const {Moniteur} = require('../model/moniteur'); 
const mongoose = require('mongoose');
//const Fawn = require('fawn');


//Fawn.init(mongoose);

exports.findAll = (req, res) => {
    Session.find()
    .then(session => {
        res.send(session);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving sessiion."
        });
    });
};

//Create new session
exports.create = (req, res) => {
    // Request validation
   // if (error) return res.status(400).send(error.details[0].message);
    
    let client = Client.findById(Session.client);
    if (!client) return res.status(400).send('Invalid Client.');
    let car = Car.findById(Session.car);
    // Create a session
    const session = new Session({
     
        date: req.body.date,
       client: req.body.client,
        
            
        // l ajouter des autre attribu 


          
        
    });
    

    // Save session  in the database
    session.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the session."
        });
    });
};




// Find a single session with a sessiontId
exports.findOne = (req, res) => {
    Session.findById(req.params.sessionId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "session not found with id " + req.params.sessionId
            });            
        }
        res.send(session);
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving sesiion with id " + req.params.sessionId
        });
    });
};

// validate a session
exports.update = (req, res) => {
     //Validate Request
    if(!req.body) {
        return res.status(400).send({
          message: "session content can not be empty"
      });
    }

    
    //Find and update session with the request body
    let client = Client.findById(Session.client);
    let car = Car.findById(Session.car);
    let moniteur = Moniteur.findById(Session.moniteur);
 Session.findByIdAndUpdate(req.params.sessionId, {
   
    date: req.body.date,
    client: req.body.client,
    date: req.body.date,
    client: req.body.client,
    car:req.body.car,
    moniteur:req.body.moniteur,   

           }, {new: true})
    .then(session => {
        if(!session) {
         return res.status(404).send({
               message: "session not found with id " + req.params.sessionId
            });
        }
        res.send(session);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
            return res.status(404).send({
               message: "session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.sessionId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Session.findByIdAndRemove(req.params.sessionId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "session not found with id " + req.params.sessionId
            });
        }
        res.send({message: "session deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete session with id " + req.params.sessionId
        });
    });
};



