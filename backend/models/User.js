// const path = require("path");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    referralCount: {
      type: Number,
      required: true,
    },
    referred: {
      type: [ String ],
      required: false
    },
    referrer: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
  }
);


// userSchema.virtual("cover_src").get(function() {
//     if (this.cover && this.coverType) {
//         return `data:${this.coverType};charset=utf-8;base64,${this.cover.toString('base64')}`
//     }
// })

module.exports = mongoose.model("User", userSchema);
