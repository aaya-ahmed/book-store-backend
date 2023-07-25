const category=require("../controller/category.controller.js")
const authorization = require("../middleware/authorization.js")
const router=require("express").Router()

router.post("/addcategory",category.addcategory)
router.patch("/updatecategory/:id",category.editcategory)
router.get("/getcategory/:id",authorization,category.showcategory)
router.get("/allcategorys",category.showallcategorys)
router.delete("/deletecategory/:id",category.deletecategory)

module.exports=router
