const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose
//   .connect("mongodb://127.0.0.1:27017/ecomproj", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,  34
//   })
//   .then((res) => console.log("...connected"))
//   .catch((error) => console.log(error));

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    active: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

userSchema.statics.isExists = async function isExists(email) {
  let user = await this.findOne({ email });
  console.log(user?.email);
  return user ? true : false;
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
