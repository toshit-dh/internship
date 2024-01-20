const { register, login, setAvatar, allUsers, addFriend, shownonFriends, addFriendRequest ,getAllUsers, allUserstp, removeFriendReq, addRemoveAll} = require('../controllers/UserController')
const router = require('express').Router()
router.post("/register",register)
router.post("/login",login)
module.exports = router
