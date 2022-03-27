const Wishlist = require('../models/whislist')
const Products = require('../models/products')
exports.addwishlist = async (req, res) => {
    try {
        const productFind = await Products.findById(req.body.productId)

        console.log(productFind, 'redrs')
        // const products = []
        const Productname = productFind.name
        const productId = productFind.id
        const productprice = productFind.price
        const quantity = req.body.quantity

        const totalSub = productprice * quantity

        req.body.userId = req.user.id;
        console.log(req.body.userId)
        const wishlistAdd = await Wishlist.create({
            userId: req.user.id,
            wishlist: {
                productId: productFind.id,
                quantity: req.body.quantity,
                name: productFind.name,
                price: totalSub
            }
        })
        console.log(wishlistAdd)
        res.status(200).json({ message: "Cart created ", wishlistAdd })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
}
exports.getWishlist = async (req, res) => {

    try {
        const wishList = await Wishlist.find();
        console.log(wishList)

        if (!wishList) {
            res.status(400).json({ message: "wishList   not found" });

            return;
        }
        res.status(200).json({ message: "wishList ", count: wishList.length, wishList })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}


exports.deletewishlist = async (req, res) => {

    try {
        const deleteWishlist = await Wishlist.findByIdAndDelete(req.params.id)
        if (!deleteWishlist) {
            res.status(400).json({ message: "deleteWishlist data notfound" })
            return;
        }
        res.status(200).json({ message: "Wishlist Delete Sucessfully" })
    } catch (err) {

    }


}