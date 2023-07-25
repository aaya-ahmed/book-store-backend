const cartcontroller=require("../controller/cart.controller")
const authorization = require("../middleware/authorization")
const router=require("express").Router()

router.post("/addtocart",authorization,cartcontroller.addtocart)
router.delete("/deletefromcart/:id",authorization,cartcontroller.deletefromcart)
router.get("/showcart",authorization,cartcontroller.showcart)
router.post("/buy",authorization,cartcontroller.buy)

module.exports=router
