const { register, login, getData} = require('../controllers/UserController')
const {verifyToken} = require("../controllers/middlewares/UserMiddleware")
const router = require('express').Router()
router.post("/register",register)
router.post("/login",login)
router.get("/getData/:id",verifyToken,getData)
module.exports = router
