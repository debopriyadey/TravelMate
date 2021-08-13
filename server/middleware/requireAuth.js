const jwt = require('jsonwebtoken');
const Users = require('../models/users.js');

const requiredLogin = (req, res, next) => {
    let token = "";
    if(!req.cookies)return res.status(401).json({error: "Token not found"});
    token = req.cookies.token;
    jwt.verify( token, process.env.JWT_SECRET, (err, payload) => {  
        if(err){
            return res.status(401).json({error: "Invalid token"});
        }
        const {_id} = payload
        Users.findOne({_id: _id, token}).then((user) =>{
            if(user){
                req.user=user
                next();
            } else {
                return res.status(401).json({error: "Invalid token"});
            }
        }).catch((err) => {
            next(err);
        })
    })

}

module.exports = requiredLogin;