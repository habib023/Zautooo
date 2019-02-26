const {Session} = require('../model/session'); 
//const {Car} = require('../model/car.model'); 
const {Client} = require('../model/client'); 
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

    const client = Client.findById(req.body.clientId);
    if (!client) return res.status(400).send('Invalid Client.');
    // Create a session
    const session = new Session({
        heure: req.body.heure, 
        date: req.body.date,
        client: {
            _id: client._id,
            username: client.username, 
        }
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

// Update a car
//exports.update = (req, res) => {
    // Validate Request
  //  if(!req.body) {
    //    return res.status(400).send({
      //      message: "car content can not be empty"
      //  });
   // }

    // Find and update session with the request body
   // Session.findByIdAndUpdate(req.params.sessionId, {
     //   model: req.body.model || "No car model", 
      //  description: req.body.description,
       // nbrh: req.body.nbrh,
       // eta: req.body.eta
   // }, {new: true})
    //.then(session => {
      //  if(!session) {
        //    return res.status(404).send({
          //      message: "session not found with id " + req.params.sessionId
           // });
        //}
       // res.send(session);
   // }).catch(err => {
     //   if(err.kind === 'ObjectId') {
       //     return res.status(404).send({
         //       message: "session not found with id " + req.params.sessionId
         //   });                
       // }
       // return res.status(500).send({
         //   message: "Something wrong updating note with id " + req.params.sessionId
       // });
    //});
//};

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



