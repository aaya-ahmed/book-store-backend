const user=require("../controller/user.controller.js")
const authorization = require("../middleware/authorization.js")
const router=require("express").Router()
const upload = require("../middleware/upload")

router.get("/profile",authorization,user.profile)
router.patch("/update",authorization,user.edituser)
router.patch("/changestatus",authorization,user.changestatususer)
router.delete("/deleteaccount",authorization,user.deleteuser)
router.post('/uploaduserimg' ,authorization,upload.single('imageuser'),user.uploadimg)
router.get("/getreport",authorization,user.getreport)
router.get('/allusers',user.getallusers)
router.get('/getalladmins',user.getalladmins)

module.exports=router
