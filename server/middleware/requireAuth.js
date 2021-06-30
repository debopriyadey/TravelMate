const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../keys.js');
const Users = require('../models/users.js');

const requiredLogin = (req, res, next) => {

    const { authorization } = req.headers
    if(!authorization){
        return res.status(401).json({error: "must be login"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify( token, JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({error: "wrong token"});
        }
        const {_id} = payload
        Users.findById( _id ).then((userdata) => {
            req.users = userdata
            next()
        })
    })
}

module.exports = requiredLogin;