const Users = require('../models/users.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../keys.js').default;
const bcrypt = require('bcryptjs');
const validator = require('validator');

const signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(422).json({ error: "Please enter all fields" });
    }else if(!validator.isEmail(email)){
        return res.status(422).json({error: "Enter valid email"})
    }
    Users.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email already registered" });
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new Users({
                        name,
                        email,
                        password: hashedpassword
                    })

                    user.save()
                        .then(user => {
                            res.status(201).json({ message: "Signup success" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err);
        })
}

const signin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please enter all fields" });
    }else if(!validator.isEmail(email)){
        return res.status(422).json({error: "Enter valid email"})
    }
    Users.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            bcrypt.compare(password, savedUser.password)
                .then((doMatch) => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        // const username = savedUser.name;
                        res.json({ token, savedUser });
                    }
                    else {
                        return res.status(401).json({ error: "Invalid credentials" });
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
}


const getUserById = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        res.status(200).json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = {
    signup,
    signin,
    getUserById
}