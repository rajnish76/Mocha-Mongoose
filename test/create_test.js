const assert = require("assert");
const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", (done) => {
    const rajnish = new User({ name: "rajnish" });
    rajnish.save().then(() => {
      assert(!rajnish.isNew);
      done();
    });
  });
});
