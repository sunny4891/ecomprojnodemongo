const mongoose = require("mongoose");
const { DB_URL } = process.env;

// console.log(DB_URL);

async function createConnection() {
  const connection = await mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("...connected"))
    .catch((error) => console.log(error));
}

module.exports = { createConnection };
