const { insertMany } = require("./model");
const Emp = require("./model");

save();

function save() {
  let doc1 = {
    name: "James Bond",
    salary: 30000,
    birthday: new Date(1990, 9, 30),
    married: true,
    phones: ["081234xxxx", "0233xxxx"],
  };

  new Emp(doc1).save((err) => {
    if (!err) {
      console.log("doc1 saved");
      create();
    }
  });
}

function create() {
  let doc2 = {
    name: "Flint Stone",
    salary: 25000,
    birthday: new Date(1995, 11, 31),
    married: false,
    phones: ["0888xxxxxx"],
  };
  Emp.create(doc2, (err) => {
    if (!err) {
      console.log("doc2 saved");
      insertMany();
    }
  });
}

function insertMany() {
  let docs = [
    {
      name: "Tom Jerry",
      salary: 23000,
      birthday: new Date(1997, 10, 10),
      married: true,
      phones: [],
    },
    {
      name: "Harry Potter",
      salary: 20000,
      birthday: new Date(1998, 8, 14),
      married: false,
      phones: [],
    },
  ];

  Emp.insertMany(docs, (err) => {
    if (!err) {
      console.log("docs saved");
    }
  });
}
