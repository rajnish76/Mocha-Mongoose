const assert = require("assert");
const User = require("../src/user");

describe("Reading user out of the database", () => {
  let rajnish;
  beforeEach((done) => {
    rajnish = new User({ name: "rajnish" });
    rajnish.save().then(() => done());
  });

  xit("finds all users name of rajnish", (done) => {
    User.find({ name: "rajnish" }).then((users) => {
      assert(users[0]._id.toString() === rajnish._id.toString());
      done();
    });
  });

  it("find user with a particular id", (done) => {
    User.findOne({ _id: rajnish.id }).then((user) => {
      assert(user._id.toString() === rajnish._id.toString());
      done();
    });
  });
});
