const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      lowercase: true,
      unique: [true, "Email already exists"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getJWTToken = async function () {
  return jwt.sign({ id: this._id }, process.env.SECRET, { expiresIn: "24h" });
};

UserSchema.methods.comparePasswords = async function (password) {
  {
    return await bcrypt.compare(password, this.password);
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
