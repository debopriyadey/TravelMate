import Users from '../models/users.js';
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../keys.js';

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
            const user = new Users({
                name,
                email,
                password
            })

            user.save()
                .then(user => {
                    res.json({ message: "success" });
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
}

export const signin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json("please enter all");
    }
    Users.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "invalid" });
            }
            else {
                if (savedUser.password == password) {
                    // return res.json({message: "login success"});
                    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                    res.json({ token })

                }
                else {
                    return res.status(422).json({ error: "invalid" });
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
