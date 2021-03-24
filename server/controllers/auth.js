import Users from '../models/users.js';
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../keys.js';
import bcrypt from 'bcryptjs';

export const signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(422).json("please enter all fields");
    }
    Users.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "email already registered" });
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
                        res.json({ message: "signup success" });
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

export const signin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({error:"please enter all fileds"});
    }
    Users.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "invalid" });
            }
            bcrypt.compare(password, savedUser.password)
             .then((doMatch) => {
                 if(doMatch){
                    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                    // const username = savedUser.name;
                    res.json({ token, savedUser });
                 }
                 else {
                    return res.status(412).json({ error: "invalid" });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
}
