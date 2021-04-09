const { Router } = require("express");
const { SaleListing } = require("../models");
const validateSession = require("../middleware/validate-session");
const router = Router();

/* *************************************
*** CREATE FOR SALE LISTING - ARTIST ***
************************************* */
// *** Works in Postman *** //
router.post("/create-listing", validateSession, (req, res) => {
    const Listing = {
        image: req.body.listing.image,
        description: req.body.listing.description,
        price: req.body.listing.price,
        pickup_info: req.body.listing.pickup_info,
        userId: req.user.id
    }
    SaleListing.create(Listing)
        .then(listing => res.status(200).json(listing))
        .catch(err => res.status(500).json({ error: err }))

});

/* ******************************
*** VIEW MY LISTINGS - ARTIST ***
****************************** */
// *** Works in Postman *** //
router.get("/view-my-listings", validateSession, (req, res) => {
    let userid = req.user.id
    SaleListing.findAll({
        where: { userId: userid }
    })
        .then(listing => res.status(200).json(listing))
        .catch(err => res.status(500).json({ error: err }))
});


/* ***************************************
*** UPDATE INDIVIDUAL LISTING - ARTIST ***
*************************************** */
// *** Works in Postman *** //
router.put("/update-listing/:id", validateSession, function (req, res) {
    const updateListing = {
        image: req.body.listing.image,
        description: req.body.listing.description,
        price: req.body.listing.price,
        pickup_info: req.body.listing.pickup_info
    };
    
    const query = { where: { id: req.params.id, userId: req.user.id } };
    
    SaleListing.update(updateListing, query)
        .then((listings) => res.status(200).json(listings))
        .catch((err) => res.status(500).json({ error: err }));
});

/* ***************************************
*** DELETE INDIVIDUAL LISTING - ARTIST ***
*************************************** */
// *** Works in Postman *** //
router.delete("/delete-listing/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, userId: req.user.id } }; //params points to the URL

    SaleListing.destroy(query) //.destroy() is a sequelize method to remove an item from a database - query tells Sequelize what to look for in trying to find an item to delete. If nothing matches, nothing is done.
        .then(() => res.status(200).json({ message: "For Sale Listing Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;