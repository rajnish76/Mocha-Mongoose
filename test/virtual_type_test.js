const assert = require("assert");
const User = require("../src/user");

describe("Virtual types", () => {
  it("postCount returns number of posts", (done) => {
    const rajnish = new User({
      name: "rajnish",
      posts: [{ title: "Node.js Doc" }],
    });
    rajnish
      .save()
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        assert(rajnish.postCount === 1);
        done();
      });
  });
});
