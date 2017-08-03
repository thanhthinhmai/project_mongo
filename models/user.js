const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})
userSchema.methods.encryptPassword = password =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}

userSchema.methods.valiPassword = password =>{
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User',userSchema)
