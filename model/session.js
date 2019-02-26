const Joi = require('joi');
const mongoose = require('mongoose');
const {client} = require('./client');
const {car} = require('./car.model');

const SessionSchema =mongoose.Schema({
  heure: Number ,
  date: Date ,
   client: { 
        type: new mongoose.Schema({
          username : String,
               
 }) },
           
        
  car: { type: new mongoose.Schema({
    model: {
      type: String,
      

    },
    
  })
  
  },

  moniteur: { type: new mongoose.Schema({
    name: {
      type: String
    }})}


  
 // validate: Boolean ,
  
});



  



module.exports.Session = mongoose.model('Session', SessionSchema);
