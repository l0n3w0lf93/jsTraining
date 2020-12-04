const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const passwordValidator = require('password-validator');


const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 40],
        message: 'Name must not exceed {ARGS[1]} characters.'
    })
];

// UserModel Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: 'Username already exists',
        required: [true, 'Name is required.'],
        validate: nameValidator,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true,

    },
    password:{
        type: String,
        required: true,
        default: '',
        validate: passwordValidator
    },
    confirm:{
        type: String,
        required: true,
    }
});


//save to db
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err); }
        user.password = hash;
        next();
    })
});

var UserModel = module.exports = mongoose.model('UserModel', UserSchema);

module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw new Error('Hashing failed', error)
    }
}
