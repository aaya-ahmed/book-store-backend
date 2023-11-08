const router=require("express").Router()
const log=require("../controller/log.controller.js")
const authorization=require("../middleware/authorization.js")
router.post("/userregister",log.userregister)
router.post("/adminregister",log.adminregister)
router.post("/login",log.login)
router.delete("/logout",log.logout)
router.delete("/logoutall",log.logoutall)

module.exports=router
