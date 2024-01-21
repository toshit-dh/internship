const { register, login, getData, postData} = require('../controllers/UserController')
const {verifyToken} = require("../middlewares/UserMiddleware")
const router = require('express').Router()
router.post("/register",register)
router.post("/login",login)
router.get("/getData/:id",verifyToken,getData)
router.post("/postData/:id",verifyToken,postData)
module.exports = router
