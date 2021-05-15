const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/db17", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { authSource: "admin" },
    user: "root",
    pass: "1Mango2Banana",
  })
  .catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true, min: 0 },
  stock: { type: Number, min: 0 },
  date_added: { type: Date, default: new Date() },
  dascription: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
