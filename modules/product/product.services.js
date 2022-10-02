const ProductModel = require('./product.model');

const productServices = {
    getAllProducts: async () => {
        try {
            const products = await ProductModel.find();
            return {
                success: true,
                data: products,
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error,
            };
        }
    },
    getProductById: async (id) => {
        try {
            const product = await ProductModel.findOne(id);
            return {
                success: true,
                data: product,
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error,
            };
        }

    },
    createProduct: async (product) => {
        try {
            const theproduct = await ProductModel.create(product);
            return {
                success: true,
                data: theproduct,
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error,
            };
        }
    },
    deleteProduct:async (id) => {
        try {
            const product = await ProductModel.delete(id);
            return {
                success: true,
                data: product,
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                data: error,
            };
        }
    }

}

module.exports = productServices;