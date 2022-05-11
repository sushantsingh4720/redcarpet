const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please add a name']
    },
    email:{
        type: String,
        required: [true, 'please add an email']
    },
    password:{
        type: String,
        required: [true, 'please add a password']
    }
});

module.exports = mongoose.model('User',userSchema);