const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
.then(() => {
    console.log("Server Connected to Database Successfully!");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

const initDB = async() => {
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({
    ...obj,
    owner:'69d9d4305c83d7df5e9d9c13',
   }))
    await Listing.insertMany(initData.data);
    console.log("Data was Initialize");
}

initDB();