const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const vendorSchema = new mongoose.Schema({
    shopName : {
        type : String,
        required : true,
        unique : true
    },
    ownerName : {
        type : String,
        required : true,
    },
    phoneNo : {
        type : String,
        required : true,
        length : 10
    },
    address : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    }
},{timestamps : true})

vendorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return ;

  this.password = await bcrypt.hash(this.password, 10);
  
});

module.exports = mongoose.model('vendor',vendorSchema)