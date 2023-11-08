const user=require("../controller/user.controller.js")
const authorization = require("../middleware/authorization.js")
const router=require("express").Router()
const upload = require("../middleware/upload")

router.get("/profile",user.profile)
router.patch("/update",user.edituser)
router.patch("/changestatus",user.changestatususer)
router.delete("/deleteaccount",user.deleteuser)
router.post('/uploaduserimg' ,upload.single('imageuser'),user.uploadimg)
router.get("/getreport",user.getreport)
router.get('/allusers',user.getallusers)
router.get('/getalladmins',user.getalladmins)

module.exports=router
