const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../controleur/admin.controller');
const clientService = require('../controleur/client.controller');

module.exports = jwt;
module.exports = jwtclient;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked}).unless({
        path: [
            // public routes that don't require authentication (internaut )
            '/admin/authenticate',
            '/admin/register',
            '/send',
            '/session',
            '/client/authenticate',
            '/client/register',

            
            


        ]
    });
}

function jwtclient() {
    const secret = config.secret;
    return expressJwt({ secret,isRevokedclient}).unless({
        path: [
            // public routes that don't require authentication (internaut )
            '/admin/authenticate',
            '/admin/register',
            '/send',
            '/session',
            '/client/authenticate',
            '/client/register',

            
            


        ]
    });
}


async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub); 

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }


   


    done();
};

async function isRevokedclient(req, payload, done) {
     
    const  client = await clientService.getById(payload.sub); 

    // revoke token if user no longer exists
    

    if (!client) {
        return done(null, true);
    }


    done();
};
