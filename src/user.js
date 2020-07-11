const mongoose = require("mongoose");
const PostSchema = require("./post");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    validate: {
      validator: (name) => name.length > 3,
      message: "Name must be longer than 3 characters.",
    },
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "blogPost" }],
});

UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

UserSchema.pre("remove", async function (next) {
  const BlogPost = mongoose.model("blogpost");
  await BlogPost.remove({ _id: { $in: this.blogPosts } });
  next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
