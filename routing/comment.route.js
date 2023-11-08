const comment=require("../controller/comment.controller.js")
const authorization = require("../middleware/authorization.js")
const router=require("express").Router()

router.post("/createcomment",comment.createcomment)
router.patch("/editcomment",comment.editcomment)
router.get("/getcommentsforbook/:id",comment.getcommentsforbook)
router.delete("/removecomment/:id",comment.removecomment)

module.exports=router
