const auth=require("../controller/auth.controller.js")
const authorization = require("../middleware/authorization.js")
const router=require("express").Router()

router.post("/addauth",auth.add)
router.delete("/delete",auth.remove)

module.exports=router
