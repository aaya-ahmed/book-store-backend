const comment=require("../controller/comment.controller.js")
const authorization = require("../middleware/authorization.js")
const router=require("express").Router()

router.post("/createcomment",authorization,comment.createcomment)
router.patch("/editcomment",authorization,comment.editcomment)
router.get("/getcommentsforbook/:id",authorization,comment.getcommentsforbook)
router.delete("/removecomment/:id",authorization,comment.removecomment)

module.exports=router
