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
    const token = jwt.sign({ user: user._id }, jwtkey);
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
      const token = jwt.sign({ user: user._id }, jwtkey);
      return res.json({ status: true, token });
    }
  } catch (e) {
    next(e);
  }
};
module.exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) return res.json({ msg: "No user found", status: false });
    else return res.json(user.data);
  } catch (e) {
    next(e);
  }
};
module.exports.postData = async (req, res, next) => {
  try {
    console.log("ji");
    const { id } = req.params;
    const data = req.body;
    console.log(data);
    const user = await User.findOne({ _id: id });
    if (!user) return res.json({ msg: "No user found", status: false });
    user.data = data;
    console.log("saved");
    await user.save();
    console.log("done");
    return res.json({ msg: "Data updated successfully", status: true });
  } catch (e) {
    next(e);
  }
};
module.exports.recruit = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findOne({ _id: id });
    if (!user) return res.json({ msg: "No user found", status: false });
    if (user.data.userType === "worker")
      return res.json({ msg: "Unauthorised", status: false });
    const data = req.body;
    console.log(data);
    let recruit = [];
    if (!user.recruitments) {
      user.recruitments = recruit;
    } else {
      recruit = user.recruitments;
    }
    const filename = req.file.filename
    const imageUrl = `/uploads/images/${filename}`;
    recruit.push({...data,imageUrl});
    console.log("pushed");
    await user.save();
  } catch (e) {
    next(e);
  }
};
module.exports.getRecruiters = async (req, res, next) => {
  try {
    console.log("ji");
    const recruiters = await User.find({ 'data.userType': 'recruiter' }).populate('recruitments');
    const recruiterData = recruiters.map(recruiter => ({
      username: recruiter.username, 
      recruitments: recruiter.recruitments,
    }));
    console.log(recruiterData);
    return res.json(recruiterData);
  } catch (e) {
    next(e);
  }
};
