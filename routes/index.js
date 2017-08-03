const express = require('express');
const router = express.Router();
const Cart = require('../models/cart')
const User = require('../models/user')
const passport = require('passport')
const Product = require('../models/product')

/* GET home page. */
router.get('/', function (req, res) {
  Product.find()
    .then(data => {
      res.render('home', {
        title: 'Shopping Cart',
        products: data
      });
    })
    .catch(err => {
      throw console.log(err);
    })
});

router.get('/add-to-cart/:id', function (req, res) {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId)
    .then(product => {
      cart.add(product, product.id);
      req.session.cart = cart;
      // console.log(req.session.cart);
      res.redirect('/')
    })
    .catch(err => {
      console.log(err);
    })

})
router.get('/shopping-cart', function (req, res) {
  if (!req.session.cart) {
    return res.render('shopping-cart', {
      products: null
    })
  }
  let cart = new Cart(req.session.cart);
  res.render('shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  })
})
//Update new title
// Product.findOneAndUpdate({price: 12}, {$set:{title:"Naomi"}},function(err, doc){
router.post('/submit', (req, res) => {
  let name = req.body.search;
  let price = req.body.price;
  // "SELECT * FROM sach WHERE name iLIKE '%'+name+'%' AND price BETWEEN 10 AND 50";
  Product.find({
    title: new RegExp(name, "i")
  })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
      throw console.log(err);
    })
})
module.exports = router;