const { Router } = require("express");
const { ArtistProfile } = require("../models");
const validateSession = require("../middleware/validate-session");
const router = Router();

/* ***************************
*** CREATE ARTIST PROFILE ***
**************************** */
// *** Works in Postman *** //
router.post("/create-profile", validateSession, (req, res) => {
    const Profile = {
        about_the_artist: req.body.artist.about_the_artist,
        mediums: req.body.artist.mediums,
        inspiration: req.body.artist.inspiration,
        achievements: req.body.artist.achievements,
        website: req.body.artist.website,
        userId: req.user.id
    }
    ArtistProfile.create(Profile)
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(500).json({ error: err }))

});

/* ***************************
*** VIEW ARTIST PROFILE ***
**************************** */
// *** Works in Postman *** //
router.get("/view-profile", validateSession, (req, res) => {
    let userid = req.user.id
    ArtistProfile.findAll({
        where: { userId: userid }
    })
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(500).json({ error: err }))
});


/* ***************************
*** UPDATE ARTIST PROFILE BY INDIVIDUAL ARTIST ***
**************************** */
// *** Works in Postman *** //
router.put("/update-profile/:id", validateSession, function (req, res) {
    const updateProfile = {
        about_the_artist: req.body.artist.about_the_artist,
        mediums: req.body.artist.mediums,
        inspiration: req.body.artist.inspiration,
        achievements: req.body.artist.achievements,
        website: req.body.artist.website,
        // userId: req.user.id
    };
    
    const query = { where: { id: req.params.id, userId: req.user.id } };
    
    ArtistProfile.update(updateProfile, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});

/* ***************************
*** DELETE ARTIST PROFILE BY INDIVIDUAL ARTIST***
**************************** */
// *** Works in Postman *** //
router.delete("/delete-profile/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, userId: req.user.id } }; //params points to the URL

    ArtistProfile.destroy(query) //.destroy() is a sequelize method to remove an item from a database - query tells Sequelize what to look for in trying to find an item to delete. If nothing matches, nothing is done.
        .then(() => res.status(200).json({ message: "Artist Profile Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;