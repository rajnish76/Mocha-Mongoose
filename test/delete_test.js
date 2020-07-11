const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let rajnish;
  beforeEach((done) => {
    rajnish = new User({ name: "rajnish" });
    rajnish.save().then(() => done());
  });

  it("model instance remove", async () => {
    await rajnish
      .remove()
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        assert(user === null);
      });
  });

  it("class method findOneAndDelete", () => {
    User.findOneAndDelete({ name: "rajnish" })
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        assert(user === null);
      });
  });

  it("class method findByIdAndDelete", () => {
    User.findByIdAndDelete(rajnish._id)
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        assert(user === null);
      });
  });
});
