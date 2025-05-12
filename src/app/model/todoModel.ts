import mongoose, { Schema } from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
  }
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
