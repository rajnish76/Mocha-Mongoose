const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocuments", (done) => {
    const rajnish = new User({
      name: "rajnish",
      posts: [{ title: "Node.js Doc" }],
    });
    rajnish
      .save()
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        assert(user.posts[0].title === "Node.js Doc");
        done();
      });
  });

  it("Can add subdocuments to an existing record", (done) => {
    const rajnish = new User({
      name: "rajnish",
      posts: [],
    });
    rajnish
      .save()
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        user.posts.push({ title: "Node.js doc" });
        return user.save();
      })
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        assert(user.posts[0].title === "Node.js doc");
        done();
      });
  });

  it("can remove an existing subdocument", (done) => {
    const rajnish = new User({
      name: "rajnish",
      posts: [{ title: "Node.js doc" }],
    });
    rajnish
      .save()
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "rajnish" }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
