const express= require('express');
const productR=express.Router();
const productController = require('./product.controller');
const auth = require('../auth');
const prefixUrl='/api/v1/product'

module.exports = (app) => {
    app
        .route(prefixUrl + '/')
        .all(auth.userAuth)
        .get(productController.getAllProducts);

    app
        .route(prefixUrl + '/userlogin/')
        .get(productController.getAllProducts);

    
    app
        .route(prefixUrl + "/")
        .all(auth.userAuth)
        .post(productController.createProduct);

    app
      .route(prefixUrl + "/:id")
      .all(auth.userAuth)
      .get(productController.getProductById);

    app
      .route(prefixUrl + "/:id")
      .all(auth.userAuth)
      .put(productController.deleteProduct);

    
    
}

// productR.get('/',productController.getProducts);
// productR.get('/:id',productController.getProductsById);
// productR.post('/',productController.createProduct);
// productR.delete('/:id',productController.deleteProducts);
