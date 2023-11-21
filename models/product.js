const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose
//   .connect("mongodb://127.0.0.1:27017/ecomproj", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((res) => console.log("...connected"))
//   .catch((error) => console.log(error));

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    productImage: { type: String, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = { Product };
