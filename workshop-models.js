const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

mongoose
  .connect("mongodb://localhost:27017/workshop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { authSource: "admin" },
    user: "root",
    pass: "1Mango2Banana",
  })
  .catch((err) => console.log(err));

const questionSchema = new mongoose.Schema({
  question: { type: String, require: true },
  detail: { type: String },
  questioner: { type: String, require: true },
  date_posted: { type: Date, default: new Date() },
  num_answers: { type: Number },
  image_file: { type: String },
});

const answersSchema = new mongoose.Schema({
  question_id: { type: mongoose.Types.ObjectId },
  answer: { type: String },
  answerer: { type: String },
  data_posted: { type: Date, default: new Date() },
});

mongoose.plugin(paginate);
module.exports.Question = mongoose.model("Question", questionSchema);
module.exports.Answer = mongoose.model("Answer", answersSchema);
