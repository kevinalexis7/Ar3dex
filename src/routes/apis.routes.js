const express = require('express');
const { getAllProducts, getOneProduct } = require('../controllers/apis/productsApiController');
const { checkEmail } = require('../controllers/apis/usersApisController');
const router = express.Router();

/* /apis */
router
  .get('/products', getAllProducts)
  .get('/products/:id', getOneProduct)
  .get('/users/check-email', checkEmail)

module.exports = router;