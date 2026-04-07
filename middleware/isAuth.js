const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const supplierModel = require('./../model/supplierModel');

const isAuth = async (req, res, next) => {
  try {
    const reqToken = req.cookies.jwtToken; 

    if (!reqToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = await promisify(jwt.verify)(reqToken, 'hahaha');

    const user = await supplierModel.findById(decoded.id);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.supplierId = decoded.id;
    next(); 
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = isAuth;
