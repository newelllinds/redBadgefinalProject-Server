const { Router } = require('express');
const { User } = require('../models')
// const router = require("express").Router();
// const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*USER SIGN-UP*/
// *** Works in Postman *** //
const router = Router();
router.post("/create", function (req, res) {
    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 13),
        role: req.body.user.role
  })
    .then(
        function createSuccess(user) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        res.json({
            user: user,
            message: "User successfully created!",
            sessionToken: token,
            role: user.role
        });
      }
    )

    .catch((err) => res.status(500).json({ error: err }));
});

/*USER SIGN-IN*/
// *** Works in Postman *** //
router.post("/login", function (req, res) {
    User.findOne({
        where: {
            username: req.body.user.username,
        },
    })
    
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                    
                    res.status(200).json({
                        user: user,
                        message: "User successfully logged in!",
                        sessionToken: token
                    });
                
                } else {
                    res.status(502).send({ error: "Login failed" });
                }
            });
        } else {
            res.status(500).json({ error: "User does not exist." });
        }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;