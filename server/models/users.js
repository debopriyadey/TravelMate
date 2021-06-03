import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    likes: {
        type: Array,
        default: []
    }

});

const Users = mongoose.model('Users', userSchema);

export default Users;