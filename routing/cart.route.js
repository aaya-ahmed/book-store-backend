const cartcontroller=require("../controller/cart.controller")
const authorization = require("../middleware/authorization")
const router=require("express").Router()

router.post("/addtocart",cartcontroller.addtocart)
router.delete("/deletefromcart/:id",cartcontroller.deletefromcart)
router.get("/showcart",cartcontroller.showcart)
router.post("/buy",cartcontroller.buy)

module.exports=router
