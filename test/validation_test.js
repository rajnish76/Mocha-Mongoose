const assert = require("assert");
const User = require("../src/user");

describe("Validation records", () => {
  it("require a user name", () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name is required.");
  });

  it("require a user name than 3 characters", () => {
    const user = new User({ name: "Hel" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer than 3 characters.");
  });

  it("disallows invalid records from being saved", (done) => {
    const user = new User({ name: "Hel" });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === "Name must be longer than 3 characters.");
      done();
    });
  });
});
