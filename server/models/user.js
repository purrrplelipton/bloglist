import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
        trim: true,
      },
      last: {
        type: String,
        required: true,
        trim: true,
      },
    },
    alias: {
      type: String,
      // required: true,
      // unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

UserSchema.plugin(mongooseUniqueValidator);

export const User = model("User", UserSchema);
