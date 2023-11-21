const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/ecomproj";

async function createConnection() {
  console.log("creating connection");
  const connection = await mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("...connected"))
    .catch((error) => console.log(error));
}

module.exports = { createConnection };
