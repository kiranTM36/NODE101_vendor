const supplierModel = require('./../model/supplierModel')
const sendMail = require('./../utils/sendMail')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.post('/signup', async(req, res)=> {
    try {
        const data = req.body
        const newVendor = new supplierModel(data)
        const response = await newVendor.save()

        console.log("Data Saved")
        res.redirect('/login')
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "error"})
    }
})

router.post('/login', async(req, res)=> {
    try {
        const {email, password} = req.body

        const user = await supplierModel.findOne({email : email})
        if(!user) return res.status(404).json({message : "No user Found"})

        const isMatchPass = await bcrypt.compare(password,user.password)
        if(!isMatchPass) return res.status(404).json({message : "Incorrect pass"})

        const token = jwt.sign({id : user._id,email : user.email}, 'hahaha',
            {
                expiresIn : '30d'
            }
        )
        res.cookie('jwtToken',token)
        res.redirect('/')
        console.log(token)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "error"})
    }
})

router.post('/forgetPass', async (req, res) => {
    try {
        const { email } = req.body

        const otp = Math.floor(100000 + Math.random() * 900000)
        const user = await supplierModel.findOne({ email })
        user.otp = otp
        await user.save()


        await sendMail({
            email: email,
            subject: "Password Reset",
            text: `Your OTP ${otp}`
        })

        res.redirect('/verifyOTP')

    } catch (error) {
        console.log(error)
        res.send("Error")
    }
})

router.post('/verifyOtp', async (req, res) => {
    try {
        const { email, otp } = req.body

        const user = await supplierModel.findOne({ email })

        if (!user) {
            return res.send("User not found")
        }

        if (user.otp == otp) {
            res.redirect('/login')
        } else {
            res.send("Invalid OTP")
        }

    } catch (error) {
        console.log(error)
        res.send("Error")
    }
})

module.exports = router