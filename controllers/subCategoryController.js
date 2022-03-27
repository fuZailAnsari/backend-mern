const  {SubCategory}  = require('../models/subCategories');

exports.addSubCategory = async(req, res) => {
    try {
        const subCategories = new SubCategory({
            name: req.body.name,
            color: req.body.color,
            size: req.body.size,
        })
        await subCategories.save()
        res.status(200).json({ message: "Sub Category saved sucessfull", subCategories })
    } catch (err) {
        console.log(err);
    }
}

exports.getSubCategory = async (req, res) => {
    try {
        console.log(req)
        const subCategoryList = await SubCategory.find();
        console.log(subCategoryList)
        if (!subCategoryList) {
            res.status(400).json({ message: "SubCategory lIst not found" });
            return;
        }
        res.status(200).json({ message: "SubCategory list", subCategoryList })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.getSubCategoryById = async (req, res) => {
    try {
        const subCategoryById = await SubCategory.findById(req.params.id);
        if (!subCategoryById) {
            res.status(400).json({ message: "failed to fetch data" })
            return;
        }
        res.status(200).json({ message: "SubCategory Fetch sucessfully", subCategoryById })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.updateSubCategory = async (req, res) => {
    try {
        const updateSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            color: req.body.color,
            size: req.body.size,
        }, {
            new: true
        })
        if (!updateSubCategory) {
            res.status(400).json({ message: "not able to update subcategory" })
            return;
        }
        res.status(200).json({ message: "update sucessfully", updateSubCategory })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.deleteSubCategory = async (req, res) => {
    try {
        const deleteSubCategory = await SubCategory.findByIdAndRemove(req.params.id)
        if (!deleteSubCategory) {
            res.status(400).json({ message: "not able to delete SubCategory" })
            return;
        }
        res.status(200).json({ message: "SubCategory delete sucessfully" })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}
