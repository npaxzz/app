const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

mongoose
  .connect("mongodb://localhost:27017/db18", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true, min: 0 },
  stock: { type: Number, min: 0 },
  date_added: { type: Date, default: new Date() },
  description: { type: String },
});

productSchema.plugin(paginate);

module.exports = mongoose.model("Product", productSchema);
