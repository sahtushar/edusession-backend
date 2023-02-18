const db = require("../models");
const BookForm = db.bookForm;
const Role = db.role;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.bookForm = (req, res) => {
  const form = new BookForm({
    username: req.body.username,
    email: req.body.email,
    course: req.body.course,
    subject: req.body.subject,
    specialRequirement: req.body.specialRequirement,
  });
  console.log("here0");
  form.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err, status: 500 });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err, status: 500 });
            return;
          }

          form.roles = roles.map((role) => role._id);
          form.save((err) => {
            if (err) {
              res.status(500).send({ message: err, status: 500 });
              return;
            }

            res
              .status(200)
              .send({ message: "Form Submitted Successfully", status: 200 });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err, status: 500 });
          return;
        }

        form.roles = [role._id];
        form.save((err) => {
          if (err) {
            res.status(500).send({ message: err, status: 500 });
            return;
          }

          res.status(200).send({
            message: "Form Submitted Successfully.",
            status: 200,
          });
        });
      });
    }
  });
};

exports.bookedClass = (req, res) => {
  BookForm.find({
    username: req.body.username,
  }) 

    // .populate("roles", "-__v")
    .exec((err, forms) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!forms) {
        return res.status(404).send({ message: "Not found." });
      }
      res.status(200).send({
        username:req.body.username,
        forms:forms
      });
    });
};
