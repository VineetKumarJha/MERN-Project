if(process.env.NODE_ENV != "production") {
    require("dotenv").config()
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose= require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utlis/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User =  require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);


const dbUrl = process.env.ATLASDB_URL;

main()
.then(() => {
    console.log("Server Connected to Database Successfully!");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
};

const port = 8080;

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600 ,     // it is given in seconds.
})

store.on("error",(err) => {
    console.log("Error in MONGO SESSION STORE",err);
});

const sessionOptions = {
    store:  store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success") ;
    res.locals.error = req.flash("error") ;
    res.locals.currUser = req.user ;
    next();
})

// // app.get("/demo",async (req, res)=> {
// //     let fakeUser = new User ({
// //         email:"student@gmail.com",
// //         username:"delta"
// //     });
// //     let registeredUser = await User.register(fakeUser, "helloWorld");  // register method is a convenience method to register a new user instance with a given password. Check username is unique or not. No need to define if-else condition.
// //     res.send(registeredUser);
// // });

// app.get("/testListing",async (req, res) => {
// //    let sampleListing = new Listing({
// //         title : "My new Villa",
// //         description: "By the beach",
// //         price: 1200,
// //         location: "Chandigarh Haryana",
// //         country:"India",
// //     });
// //     await sampleListing.save();
// //     console.log("Sample was saved!");
//     res.send("Successful! testing");
// });


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.all(/.*/,(req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    let {statusCode=500 , message="Something Went Wrong" } = err;
    res.render("error.ejs", {message});
    // res.status(statusCode).send(message);
})

app.listen(port, () => {
    console.log("App is listening to the port", port);
});

