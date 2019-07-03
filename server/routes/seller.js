const router = require('express').Router();
const Product = require('../model/product');
const multer = require('multer');
const checkJWT = require('../middleware/checkjwt');
// const path   = require('path');
// const mongoose = require('mongoose');
const faker = require('faker');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.route('/products')
  .get(checkJWT, (req, res, next) => {
    Product.find({ owner: req.decoded.user._id })
      .populate('owner')
      .populate('category')
      .exec((error, products) => {
        if (products) {
          res.json({
            success: true,
            message: "Products",
            products: products
          });
        }
      })
  })
  .post([checkJWT, upload.single('product_picture')], (req, res, next) => {
    console.log(req.file);
    const url = req.protocol + '://' + req.get('host');
    const product = new Product();
    product.owner = req.decoded.user._id;
    product.category = req.body.categoryId;
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = url + '/uploads/' + req.file.filename;
    product.save();
    res.json({
      success: true,
      message: 'Successfully Added the Product'

    });
  });


  // Teststing
  router.get('/faker/test/', (req,res,next) =>  {
    for(i=0; i<30; i++){
      const product = new Product();
      product.owner ='5d15ddb0b957a02a58a51bbf';
      product.category ='5d1735da5a52881a3c257383';
      product.title = faker.commerce.productName();
      product.price = faker.commerce.price();
      product.description = faker.lorem.words();
      product.image = faker.image.food();
      product.save();
    }
    res.json({
      success: true,
      message: 'Successfully Added the Product'

    });
  })

module.exports = router;
