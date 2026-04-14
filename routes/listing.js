const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validatelisting} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const { index ,renderNewForm} = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/")
     .get(wrapAsync(listingController.index))
     .post(isLoggedIn, 
          validatelisting,
          upload.single('listing[image][url]'),
          wrapAsync( listingController.createListing )
     )

router.route("/:id")
     .get(wrapAsync( listingController.showAllListing))
     .put(isLoggedIn, 
          isOwner, 
          upload.single('listing[image][url]'),
          validatelisting,
          wrapAsync( 
               listingController.updateListing
          )
     )
     .delete(isLoggedIn,
          isOwner, 
          wrapAsync( listingController.destroyListing
          )
     );



router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync( listingController.renderEditForm));


module.exports = router;