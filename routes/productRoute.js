const router = require('express').Router();
const upload = require('./../middleware/uploads')
const isAuth = require('./../middleware/isAuth')
const productModel = require('./../model/productModel');

router.post('/create',isAuth,upload.single('image'), async (req, res) => {
  try {
    const { productName, price, status,quantity,
      productDescription,
      category, } = req.body;
    const productImg = req.file ? req.file.filename : "";
    const supplierId = req.supplierId;  
    console.log(supplierId)

    const newProduct = new productModel({
      productName,
      price,
      quantity,
      productDescription,
      category,
      status,
      productImg,
      supplierId
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" +  error });
  }
});

router.get('/display', async(req, res) => {
  try {
    const response = await productModel.find()


    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
})

router.get('/details/:id', async (req, res) => {
  const product = await productModel.findById(req.params.id).populate('supplierId');
  if (!product) return res.status(404).send("Product not found");
  res.render('productDetails', { product });
});

module.exports = router;
