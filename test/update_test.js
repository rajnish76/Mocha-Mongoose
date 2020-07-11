const assert = require("assert");
const User = require("../src/user");

function assertName(operation, done) {
  operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert((users[0].name = "alex"));
      done();
    });
}

describe("updating a user", () => {
  let rajnish;
  beforeEach((done) => {
    rajnish = new User({ name: "rajnish", likes: 0 });
    rajnish.save().then(() => done());
  });

  it("instence type using set n save", (done) => {
    rajnish.set({ name: "alex" });
    assertName(rajnish.save(), done);
  });

  it("A model instence can update", (done) => {
    rajnish.update({ name: "alex" });
    assertName(rajnish.save(), done);
  });

  xit("A model class can update", (done) => {
    assertName(User.update({ name: "rajnish" }, { name: "alex" }), done);
  });

  xit("A model class can find a record with an Id and update", (done) => {
    assertName(User.findByIdAndUpdate(rajnish._id, { name: "alex" }), done);
  });

  it("A user can have their postcount incremented by 1", (done) => {
    User.updateMany({ name: "rajnish" }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});
