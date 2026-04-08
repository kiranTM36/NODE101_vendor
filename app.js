const express = require('express')
const db = require('./db')
const vendorModel = require('./model/vendorModel')
const supplierModel = require('./model/supplierModel')
const vendorRoute = require('./routes/vendorRoute')
const supplierRoute = require('./routes/supplierRoute')
const productRoute = require('./routes/productRoute')
const productModel = require('./model/productModel')
const cookieParser = require('cookie-parser')
const { promisify } = require('util');
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set('view engine','ejs')
app.use(cookieParser())

app.use( async(req, res, next)=> {
   try {
    const token = req.cookies.jwtToken
    if(!token){
         res.locals.user = null
        return next()
    }else{
        const decoded= await promisify(jwt.verify)(token, 'hahaha');
        res.locals.user = decoded
        next()
    }
   } catch (error) {
    
   }
})

app.get('/signup',(req, res)=> {
    res.render('signup')
})

app.get('/forgetPass', (req, res)=> {
    res.render('forgetPassword')
})

app.get('/login',(req, res)=> {
    res.render('login')
})
const PORT = 3700
app.use('/uploads',express.static('uploads/'))

app.get('/', async(req, res) => {
    const data = await productModel.find()
    res.render('Home',{data : data})
})

app.get('/addProduct', (req, res) => {
    res.render('productUpload')
})

app.get('/logout', (req, res) => {
  res.clearCookie('jwtToken');  // removes the cookie
  res.redirect('/login');       // or send response
});

app.get('/verifyOTP',(req, res)=> {
    res.render('verifyOTP')
})

app.use('/vendor', vendorRoute)
app.use('/supplier',supplierRoute)
app.use('/product', productRoute)

app.listen(PORT, () => {
    console.log("App Started")
})