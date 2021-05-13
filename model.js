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

let employeeSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  birthday: Date,
  married: Boolean,
  phones: Array,
});

module.exports = mongoose.model("Emp", employeeSchema);
