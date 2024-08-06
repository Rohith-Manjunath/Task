const User = require("../models/UserModel");
const { jwtToken } = require("../utils/jwtToken");

exports.Home = (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the home page",
  });
};

exports.Register = async (req, res, next) => {
  try {
    const { name, email, password, isTeacher } = req.body;

    if ((!name, !email, !password, !isTeacher)) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      isTeacher,
    });
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (e) {
    res.status(400).json({
      message: "Error while registering user",
      error: e.message,
    });
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password / User not found" });
    }
    const isPasswordCorrect = await user.comparePasswords(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    jwtToken("Login successful", 200, user, res);
  } catch (e) {
    res.status(400).json({
      message: "Error while registering user",
      error: e.message,
    });
  }
};

exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: "Error while registering user",
      error: e.message,
    });
  }
};
