const book=require("../controller/book.controller.js")
const authorization = require("../middleware/authorization.js")
const router=require("express").Router()
const upload = require("../middleware/upload")

router.post("/addbook",book.addbook)
router.post('/uploadbookimg/:id',upload.single('imagebook'),book.uploadimg)
router.post('/addcontent/:id',upload.single('book'),book.addcontent)
router.post("/addlike",book.increasenumberoflike)
router.post("/adddislike",book.dcreasenumberoflike)
router.patch("/editbook/:id",book.editbook)
router.delete("/deletebook/:id",book.deletebook)
router.get("/getbook/:id",book.showbook)
router.get("/getbookbyname/:name",book.getbookbyname)
router.get("/allbooks",book.showbookglobal)
router.get("/books",book.showallbooks)
router.get("/allbooksbycatgeory/:id",book.getBooksByCategory)
router.get("/getuserbook",book.getuserbook)



module.exports=router
