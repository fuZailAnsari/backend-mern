const brands = require('../models/brands')
// const brand = require('../models/brands')


exports.addBrands = async (req, res) => {
    try {
        const data = req.body
        const brand = await brands.create({
            // date: { type: Date, default: Date.now },

            brandName: req.body.brandName,

            contactPerson: req.body.contactPerson,

            contact: req.body.contact,

            email: req.body.email,

            marketplaceUrl: req.body.marketplaceUrl,

            ownwebsiteUrl: req.body.ownwebsiteUrl,

            // category: { type: mongoose., },

            city: req.body.city,

            revenueinCrores: req.body.revenueinCrores,

            monthlyRevenue: req.body.monthlyRevenue,

            additionalInformation: req.body.additionalInformation,

            approval: req.body.approval
        })
        if (!brand) {
            res.status(400).json({ message: 'cannot add brand' })
            return;
        }
        await brand.save()
        res.status(200).json({ message: "brands added ,awating for approval", brand })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong", err })
    }
}


// exports.Approved = async (req, res) => {
//     try {
//         console.log(req)
//         let data = req.body['approval']
//         const approval = await brand.findByIdAndUpdate( req.query.id , {
//             data
//         }, {
//             new: true
//         })
//         if (!approval) {
//             res.status(400).json({ message: "cannot approve brands" })
//             return;
//         }
//         res.status(200).json({ message: "barnds approved" })

//     } catch (err) {
//         res.status(500).json({ message: "something went wrong" })
//     }
// }

exports.Approved = async (req, res) => {
    try {
        // let data = req.body
        const updateCategory = await brands.findByIdAndUpdate(req.params.id, {
            approval: req.body.approval
        }, {
            new: true
        })
        if (!updateCategory) {
            res.status(400).json({ message: "not able to update category" })
            return;
        }
        res.status(200).json({ message: "update sucessfully", updateCategory })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.getAllBrands = async (req, res) => {
    try {
        const getBrand = await brands.find()
        if (!getBrand) {
            res.status(400).json({ message: "no brands found" })
            return;
        }
        res.status(200).json({ message: "brand details found", count: getBrand.length,getBrand })

    } catch (err) {
        res.status(500).json({ message: "something went Wrog !" })
    }
}

exports.deleteBrand = async (req, res) => {
    try {
        const deleteBrands = await brands.findByIdAndDelete(req.params.id)
        if (!deleteBrands) {
            res.status(400).json({ message: "brand data notfound" })
            return;
        }
        res.status(200).json({ message: "BrandsDelete Sucessfully" })
    } catch (err) {

    }
}

exports.getBrandById = async (req, res) => {
    try {
        const getbrandByID = await brands.findById(req.params.id )
        console.log(this.getBrandById)
        if (!getbrandByID) {
            res.status(400).json({ messga: "brand doesnt not exist" })
            return;
        }
        res.status(200).json({ message: "brands by id", getbrandByID })
    } catch (err) {
        res.status(500).json({message:"something went wrong",err})
    }
}