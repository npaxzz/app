const mongoose = require("mongoose");
moogoose
  .connect("mongdb://localhost:27017/db17", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
