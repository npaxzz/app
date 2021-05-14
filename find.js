const Emp = require("./model");

read();

function read() {
  Emp.find()
    .select("name")
    .exec((err, docs) => {
      //กำหนดวิธีดำเนินการกับข้อมูล
      if (!err) {
        console.log(`found ${docs.length} document(s)`);
        console.log("------------------------");
        for (d of docs) {
          console.log(d.name);
        }
      }
    });
}
