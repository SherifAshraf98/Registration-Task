require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var showSuccessRegistrationAlert = false;
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Connect with the Database locally
// mongoose.connect("mongodb://localhost:27017/userDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// Connect with the Database using MongoDB atlas
mongoose.connect("mongodb+srv://admin-sherif:test-admin-user@regsiter-cluster.ybafy.mongodb.net/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true); //To solve deprication issue

// Create User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: Number,
  address: String
});

// Create Database collection
const User = mongoose.model("User", userSchema);

/* Regiter */
app.get("/", function(req, res) {

  // Render Registration Page without any alert
  res.render("registration", {
    showAlert: false
  });
});

app.post("/register", function(req, res) {

  // When client tries to register, check first if the entered email is already in our Database
  User.findOne({
    email: req.body.email
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser === null) {
        // If there is no such email in database, that means that it is a new userDB
        // Encrypt password using Hash and Salt
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          if (err) {
            console.log(err);
          } else {
            // Create user object with the enetered data by the user
            const userObject = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              mobile: req.body.mobile,
              address: req.body.address
            });
            // Save this user to our database
            userObject.save();

            //Render Login Page, with Registration Success message
            res.render("login", {
              showAlert: true,
              alertState: "success",
              alertMessage: "Thank You for your Registeration."
            });
          }
        });
      } else {
        // if this email is already in our database, then render the registration page again
        // Show message to the user indicating that there is such email already stored
        res.render("registration", {
          showAlert: true,
          alertState: "danger",
          alertMessage: "This email is already registered."
        })
      }
    }
  })
});

/* Login */
app.get("/login", function(req, res) {
  // Render Login page without any messages to the user
  res.render("login", {
    showAlert: false
  });
});

app.post("/login", function(req, res) {
  // If user tried to login, check if the enetered email is in our database
  // So find any user with such email
  User.findOne({
    email: req.body.email
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser !== null) {
        // If there is a user with such email, then comapre the entered password with tha hashed stored one
        bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
          if (result === true) {
            // If passwords match, then render the home Page
            // and show welcoming message with user's name
            res.render("home", {
              userName: foundUser.name
            })
          } else {
            // If passwords don't match
            // Render login page again with message indicating that there is something wrong in email or password
            res.render("login", {
              showAlert: true,
              alertState: "danger",
              alertMessage: "The email address or password you entered is incorrect."
            });
          }
        });
      } else {
        // If there is no such user with this entered emailValue
        // Render login page again, with message indicating that there is something wrong in email or password
        res.render("login", {
          showAlert: true,
          alertState: "danger",
          alertMessage: "The email address or password you entered is incorrect."
        });
      }
    }
  })
});

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server has started successfully.");
});
