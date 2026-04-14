const Listing = require("./models/listing");
const Review = require("./models/review")
const ExpressError = require("./utlis/ExpressError.js");
const {listingSchema, reviewSchema} =require("./schema.js");


module.exports.isLoggedIn = (req, res, next)=> {
    // console.log(req.user);     this save user info in the session . If the user is logged in req.user stored a object otherwise it wil show undefined.
    if(!req.isAuthenticated()){ 
        req.session.redirectUrl = req.originalUrl; // here we did not use this because after login, passport reset the session object.
        req.flash("error","Please Logged in first");
        return res.redirect("/login");
    };
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
        let listing = await Listing.findById(id);
        if(!res.locals.currUser || !listing.owner._id.equals(res.locals.currUser._id)){
            req.flash("error", "You are not the owner of this listing");
            return res.redirect(`./listings/${id}`);
        }
    next();
}

module.exports.validatelisting = (req, res, next) => {
    
    let {error} = listingSchema.validate(req.body)      //validating server side data using Joi package.
        if(error){
            let errMsg = error.details.map((el) => el.message).join(",")
            throw new ExpressError(400, errMsg);
        }
    next();
}

module.exports.validateReview = (req, res, next) => {
    
    let {error} = reviewSchema.validate(req.body)      //validating server side data using Joi package.
        if(error){
            let errMsg = error.details.map((el) => el.message).join(",")
            throw new ExpressError(400, errMsg);
        }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
        let review = await Review.findById(reviewId);
        if(!review.author._id.equals(res.locals.currUser._id)){
            req.flash("error", "You did not create this review");
            return res.redirect(`./listings/${id}`);
        }
    next();
}