const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose
//   .connect("mongodb://127.0.0.1:27017/ecomproj", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((res) => console.log("...connected"))
//   .catch((error) => console.log(error));

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Category = mongoose.model("category", categorySchema);

module.exports = { Category };
