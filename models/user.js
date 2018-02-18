var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kvnet');
var userschema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    admin: Boolean,
    passwordhash: String,
    password: String
});

var users = mongoose.model("users", userschema);
module.exports = users;