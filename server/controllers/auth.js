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
                    res.json({ message: "signup success" });
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
                    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                    const {_id, name, email } = savedUser
                    res.json({ token, user: {_id, name, email } });
                    console.log(token);

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
