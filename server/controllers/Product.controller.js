import mongoose from 'mongoose';
import ProductModel from '../model/Product.model.js';
import jwt from 'jsonwebtoken'

// Create a new product
export async function createProduct(req, res) {
    console.log('Creating product...', req.body);

    try {
        const { title, description, price, image } = req.body;

        // Get the user ID from the decoded token
        // const token = req.headers.authorization.split(" ")[1];
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // const createdBy = decodedToken.userId;

        const product = new ProductModel({
            title,
            description,
            price,
            image,
            // createdBy: mongoose.Types.ObjectId(createdBy), // Convert createdBy to ObjectId
        });

        const savedProduct = await product.save();
        res.status(201).send({ msg: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}

// Get all products
// export async function getProducts(req, res) {
//     try {
//         const products = await ProductModel.find().populate('createdBy', 'username');
//         res.status(200).send(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).send({ error: "Internal server error" });
//     }
// }

export async function getProducts(req, res) {
    try {
        const products = await ProductModel.find();

        res.status(200).send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}
