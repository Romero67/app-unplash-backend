const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (user) {
      return res.status(400).json({
        error: "User with that mail does not exist",
      });
    } else {
     
      const user = new User(req.body);
      user.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "please check fields, there was an Error",
          });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json(user);
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that mail does not exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: 86400 });

    const { _id, email } = user;
    return res.json({ token, user: { _id, email } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};
