const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    supplierId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Supplier'
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    productImg : {
        type : String,
        required : true
    },
    productDescription : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['available','outOfStock'],
        required : true
    }
},{timestamps : true})

module.exports = mongoose.model('product',productSchema)