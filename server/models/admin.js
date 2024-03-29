const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("admin", adminSchema);
