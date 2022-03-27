const express = require('express')
const { Category } = require('../models/catergoies')
const Product = require('../models/products')
const cloudinary = require('cloudinary')

exports.newproduct = async (req, res) => {
    try {
        let images = []
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        let imagesLinks = [];
        console.log(images, 'data')
        let result
        for (let i = 0; i < images.length; i++) {
             result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'backendapi'
            });
            console.log(result, 'res')
            console.log(imagesLinks, 'links1')

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        console.log(imagesLinks, 'links')

        req.body.images = imagesLinks
        console.log(req.body.images)
        req.body.user = req.user.id;
        console.log(req.body, 'body')
        const products = await Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            rating: req.body.rating,
            images:imagesLinks,
            category: req.body.category,
            stock: req.body.stock,
            IsFeature: req.body.IsFeature,
            user:req.user.id,

            numbOfReviews: req.body.numbOfReviews
        })
        if (!products) {
            res.status(400).json({ message: "failed to add product" })
        }
        console.log(products,'orpd')
        await products.save()
        res.status(200).json({ message: "Sucess", products })
    } catch (err) {
        console.log(err)
    }
}

exports.Getproduct = async (req, res) => {
    try {
        // const userParam = req.body.id
        // const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
        // const skip = parseInt(req.query.skip);// Make sure to parse the skip to number
        const products = await Product.find().populate('category').populate('subCategory').populate('user')
        // .limit(limit).skip(skip);
        // console.log('Not working', products, userParam);

        // if (userParam == products.user.id) {
        //     console.log('WOrking', products.user.id, userParam);
        // }
        res.status(200).json({
            message: "Product fetch",
            count: products.length,
            products

        })
    } catch (err) {
        console.log(err)
    }
}
// search by keywords
exports.search = async (req, res) => {
    var regex = new RegExp(req.params.name, 'i')
    const searchproducts = await Product.find({ name: regex })
    // .then((result) => {
    //     res.status(200).json({ result, count: Product.length })
    // })
    if (!searchproducts) {
        res.status(400).json({ message: "not found" })
        return;
    }
    res.status(200).json({
        searchproducts,
        count: Product.length
    })
}


exports.updateProducts = async (req, res) => {
    try {
        const products = await Product.findById(req.params.product)
        // console.log(category, 'category')
        if (products) {
            res.status(400).json({ message: " found" })
        }
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            wishlist: req.body.wishlist,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            // "seller": "self",
            stock: req.body.stock,
            // "numbOfReviews": 2,
            // "user": "622d90f31dc844dcdbee7620",
            // "reviews
        }, { new: true })
        if (!product) {
            res.status(400).json({ message: "Product list not avaialble" })
        }
        res.status(200).json(product)
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.deleteProducts = async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id);
        if (!products) {
            res.status(400).json({
                message: "failed to fetch or delete product",

            })
        }
        await products.remove()
        res.status(200).json({
            message: true,
        })
    } catch (err) {
        console.log(err)
    }
}
exports.getListByCategory = async (req, res) => {
    try {

        const categoryById = await Category.findById(req.params.id);
        console.log(categoryById)

        // const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
        // const skip = parseInt(req.query.skip);// Make sure to parse the skip to number

        const getListByCategory = await Product.find({ category: categoryById })
        // .limit(limit).skip(skip);
        if (!getListByCategory) {
            res.status(400).json({ message: "cant find data" })
            return;
        }
        res.status(200).json({ message: "Product by categroies", getListByCategory })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.productreview = async (req, res) => {
    try {

        const reviews = await Product.findById(req.params.id);
        console.log(reviews)

        this.products.filter(res => {
            console.log(res)
        })
        res.status(200).json({
            message: "Product reviews",

            reviews

        })

    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.sortbyprice = async (req, res) => {
    try {
        // const sortObject = {};
        const p = req.params.price
        console.log(p)
        const pricedata = await Product.find({ price: { $eq: p } }).select({ price: 1, name: 1 }).sort({ price: -1 });
        console.log(pricedata)


        res.status(200).json({
            message: "Sort By Price",

            pricedata

        })

    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}



exports.sortbypriceeq = async (req, res) => {
    try {
        const sortObject = {};
        const p = req.params.price
        console.log(p)
        const pricedata = await Product.find({ price: { $gte: p } }).select({ price: 1, name: 1 }).sort({ price: -1 });
        console.log(pricedata)

        // this.products.filter(res => {
        //     console.log(res)
        // })
        res.status(200).json({
            message: "Sort By Price",

            pricedata

        })

    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.lessthensortbyprice = async (req, res) => {
    try {
        const sortObject = {};
        const p = req.query.price
        const s = req.query.prices

        console.log('p', p)
        console.log('s', s)
        const pricedatafilter = await Product.find({ price: { $gte: p, $lte: s } }).select({ price: 1, name: 1 }).sort({ price: -1 });
        // const pricedatafilter = await Product.find({ price: { $gt:p,$lt:s} }).select({ price: 1, name: 1 }).sort({ price: -1 });
        console.log(pricedatafilter)

        // this.products.filter(res => {
        //     console.log(res)
        // })
        res.status(200).json({
            message: "Sort By Price",

            pricedatafilter

        })

    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.GetproductById = async (req, res) => {
    try {


        // const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
        // const skip = parseInt(req.query.skip);// Make sure to parse the skip to number

        const getProductId = await Product.findById(req.params.id).populate('category').populate('subCategory')
        // .limit(limit).skip(skip);
        if (!getProductId) {
            res.status(400).json({ message: "Product Not Found" })
            return;
        }
        res.status(200).json({ message: "Product By Category", getProductId })

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
        console.log(err)
    }
}


exports.Promotion = async (req, res) => {
    try {
        const getProductId = await Product.findById(req.params.id).populate('category', 'user')
        if (!getProductId) {
            res.status(400).json({ message: "Product Not Found" })
            return;
        }
        res.status(200).json({ message: "Product By Promotion", getProductId })

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
        console.log(err)
    }
}

exports.getProductByUserId = async (req, res) => {
    try {
        console.log(req.user.id, 'userId')
        const productsByUserId = await Product.find({ user: req.user._id })
        console.log(productsByUserId, 'products')
        if (!productsByUserId) {
            res.status(400).json({ message: "you have no productsByUserId" })
            return;
        }
        res.status(200).json({ message: "Products", count: productsByUserId.length, productsByUserId })
    } catch (error) {
        console.log(error);
    }
}
