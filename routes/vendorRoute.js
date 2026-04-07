const vendorModel = require('./../model/vendorModel')

const bcrypt = require('bcrypt')
const router = require('express').Router()

router.post('/signup', async(req, res)=> {
    try {
        const data = req.body
        const newVendor = new vendorModel(data)
        const response = await newVendor.save()

        console.log("Data Saved")
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "error"})
    }
})

router.post('/login', async(req, res)=> {
    try {
        const {email, password} = req.body

        const user = await vendorModel.findOne({email : email})
        if(!user) return res.status(404).json({message : "No user Found"})

        const isMatchPass = bcrypt.compare(user.password,password)
        if(!isMatchPass) return res.status(404).json({message : "No user Found"})

        res.json({message : "Welcome Back"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "error"})
    }
})

module.exports = router