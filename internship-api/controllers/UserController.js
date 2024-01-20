const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const jwtkey = "internship@hackathon";
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const isUsername = await User.findOne({ username });
    if (isUsername)
      return res.json({ msg: "Username already exists", status: false });
    const isEmail = await User.findOne({ email });
    if (isEmail) return res.json({ msg: "Email already used", status: false });
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPass });
    delete user.password;
    const token = jwt.sign({user: user._id},jwtkey,)
    return res.json({ status: true, token });
  } catch (e) {
    next(e);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "No user found", status: false });
    if (!(await bcrypt.compare(password, user.password)))
      return res.json({ msg: "Wrong Password", status: false });
    else {
      const token = jwt.sign({user: user._id},jwtkey)
      return res.json({ status: true, token });
    }
  } catch (e) {
    next(e);
  }
};
module.exports.getData = async (req,res,next) => {
    try {
        const {id} = req.params
        console.log(id);
        const user = await User.findOne({_id: id})
        if (!user) return res.json({ msg: "No user found", status: false })
        else {console.log(user.data);
            return res.json(user.data)}
    } catch (e) {
        next(e)
    }
}