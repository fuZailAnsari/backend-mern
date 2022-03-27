const express = require('express');
const { Category } = require('../models/catergoies');
// const router = require('../routes/routes');

exports.categories = async (req, res) => {
    try {
        
        const category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            image: req.body.image,
            subCategory: req.body.subCategory
        })
        await category.save()
        res.status(200).json({ message: "categoy saved sucessfull", category })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.getCategory = async (req, res) => {
    try {
        console.log(req)
        const categoryList = await Category.find().populate('subCategory');
        console.log(categoryList)
        if (!categoryList) {
            res.status(400).json({ message: "Category lIst not found" });
           
            return;
        }
        res.status(200).json({ message: "category list", categoryList })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const categoryById = await Category.findById(req.params.id).populate('subCategory');
        if (!categoryById) {
            res.status(400).json({ message: "failed to fetch data" })
            return;
        }
        res.status(200).json({ message: "category Fetch sucessfully", categoryById })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            subCategory:req.body.subCategory
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

exports.deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndRemove(req.params.id)
        if (!deleteCategory) {
            res.status(400).json({ message: "not able to delete category" })
            return;
        }
        res.status(200).json({ message: "catergory delete sucessfully" })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

