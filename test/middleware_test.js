const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middlware", () => {
  let joee, blogPost;

  beforeEach((done) => {
    joee = new User({ name: "joee" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is",
    });
    joee.blogPosts.push(blogPost);
    Promise.all([joee.save(), blogPost.save()]).then(() => done());
  });
  it.only("users clean up dangling blogposts on remove", (done) => {
    joee
      .remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
