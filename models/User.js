const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  affirmationDuration: Number,
  affirmations: {
    addressingInsecurities: {
      topOfHead: String,
      eyebrow: String,
      sideOfEye: String,
      underEye: String,
      underNose: String,
      chin: String,
      collarbone: String,
      underArm: String,
    },
    shiftingToDesires: {
      topOfHead: String,
      eyebrow: String,
      sideOfEye: String,
      underEye: String,
      underNose: String,
      chin: String,
      collarbone: String,
      underArm: String,
    },
    givingPermission: {
      topOfHead: String,
      eyebrow: String,
      sideOfEye: String,
      underEye: String,
      underNose: String,
      chin: String,
      collarbone: String,
      underArm: String,
    },
    affirmationsAndGratitude: {
      topOfHead: String,
      eyebrow: String,
      sideOfEye: String,
      underEye: String,
      underNose: String,
      chin: String,
      collarbone: String,
      underArm: String,
    },
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
