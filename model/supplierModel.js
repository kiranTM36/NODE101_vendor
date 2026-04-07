const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const supplierSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,          // Make companyName required
        unique: true             // Ensure no duplicate company names
    },
    email: {
        type: String,
        required: true,
        unique: true,            // No duplicate emails
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

// Hash password before saving
supplierSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return 
        this.password = await bcrypt.hash(this.password, 10)
})


module.exports = mongoose.model('Supplier', supplierSchema)