const { Router } = require("express");
const { SaleListing } = require("../models");
const { ArtistProfile } = require("../models");
const { Supporter } = require('../models')
const validateSession = require("../middleware/validate-session");
const router = Router();

/* *****************************************
*** SUPPORTER - VIEW ALL ARTIST PROFILES ***
****************************************** */
router.get("/view-artist-profiles", validateSession, (req, res) => {
    Supporter.findAll()
        .then(profiles => res.status(200).json(profiles))
        .catch(err => res.status(500).json({ error: err }))
});



// /* *****************************************
// *** SUPPORTER - VIEW ALL FOR SALE LISTINGS ***
// ****************************************** */
// router.get("/view-all-listings", validateSession, (req, res) => {
//     SaleListing.findAll({
//         where: { userId: userid }
//     })
//         .then(listing => res.status(200).json(listing))
//         .catch(err => res.status(500).json({ error: err }))
// });



// /* ***************************************************************
// *** SUPPORTER - VIEW ALL FOR SALE LISTINGS BY SPECIFIC ARTIST ***
// *************************************************************** */
// router.get("/view-listings-byartist", validateSession, (req, res) => {
//     let userid = req.user.id
//     SaleListing.findAll({
//         where: { userId: userid }
//     })
//         .then(listing => res.status(200).json(listing))
//         .catch(err => res.status(500).json({ error: err }))
// });