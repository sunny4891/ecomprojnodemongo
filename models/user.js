const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose
//   .connect("mongodb://127.0.0.1:27017/ecomproj", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((res) => console.log("...connected"))
//   .catch((error) => console.log(error));

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // userType: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };