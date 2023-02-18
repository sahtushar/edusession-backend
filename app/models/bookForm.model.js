const mongoose = require("mongoose");

const BookForm = mongoose.model(
  "BookForm",
  new mongoose.Schema({
    username: String,
    email: String,
    course: String,
    subject: String,
    specialRequirement: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = BookForm;
