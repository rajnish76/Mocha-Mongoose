const mongoose = require("mongoose");

before((done) => {
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  mongoose.connection
    .once("open", () => {
      mongoose.set("useFindAndModify", false); //Removing deprecation Warning
      done();
    })
    .on("error", (err) => {
      console.warn("Warning", err);
    });
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
