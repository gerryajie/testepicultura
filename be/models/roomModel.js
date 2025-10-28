import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    ruang: {
      type: String,
      required: true,
      trim: true,
    },
    kapasitas: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("room", roomSchema);
