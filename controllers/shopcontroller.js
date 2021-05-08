const { Router } = require("express");
const { SaleListing } = require("../models");
const validateSession = require("../middleware/validate-session");
const router = Router();

// 1 = Admin
// 2 = Artist
// 3 = Supporter

/* *************************************
*** CREATE FOR SALE LISTING - ARTIST ***
************************************* */
// *** Works in Postman *** //
router.post("/create-listing", validateSession, (req, res) => {
    if (req.user.role != '2'){
        res.json({message: 'Only Artists Can Create For Sale Listings!'})
    }
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
    if (req.user.role != '2'){
        res.json({message: 'Only Artists Can Access This!'})
    }
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
    if (req.user.role != '2'){
        res.json({message: 'Only Artists Can Update For Sale Listings'})
    }
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
    if (req.user.role != '2'){
        res.json({message: 'Only Artists Can Delete For Sale Listings!'})
    }
    const query = { where: { id: req.params.id, userId: req.user.id } }; //params points to the URL

    SaleListing.destroy(query) //.destroy() is a sequelize method to remove an item from a database - query tells Sequelize what to look for in trying to find an item to delete. If nothing matches, nothing is done.
        .then(() => res.status(200).json({ message: "For Sale Listing Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

// /* *****************************************
// *** SUPPORTER - VIEW ALL FOR SALE LISTINGS ***
// ****************************************** */
// *** Works in Postman *** //
router.get("/view-all-listings", validateSession, (req, res) => {
    SaleListing.findAll()
        .then(listing => res.status(200).json(listing))
        .catch(err => res.status(500).json({ error: err }))
});

// /* *****************************************
// *** SUPPORTER - VIEW ARTIST SHOP BY ID ***
// ****************************************** */
router.get("/view-artist-shop/:id", validateSession, (req, res) => {
    let userId = req.params.id
    SaleListing.findAll({
        where: { userId: userId }
    })
        .then(listing => res.status(200).json(listing))
        .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;