const productService = require("./product.services");
const productController = {
    getAllProducts: async (req, res) => {
        res.send(await productService.getAllProducts());
    },
    getProductById: async (req, res) => {
        res.send(await productService.getProductById({ _id: req.params.id }));
    },
    createProduct: async (req, res) => {
        res.send(await productService.createProduct(req.body));
    },
    deleteProduct: async (req, res) => {
        res.send(await productService.deleteProduct({ _id: req.params.id }));
    },
};

module.exports = productController;
