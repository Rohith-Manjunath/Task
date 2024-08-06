const mongoose = require("mongoose");

exports.dbConnection = (URI) => {
  try {
    mongoose.connect(URI).then((data) => {
      console.log("connected to database");
    });
  } catch (e) {
    console.log(e.message);
  }
};
