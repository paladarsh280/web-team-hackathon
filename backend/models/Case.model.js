import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    policeStation: { type: String, required: true },
    crimeNumber: { type: String, required: true },
    sectionOfLaw: { type: String, required: true },
    investigatingOfficer: { type: String, required: true },


    status: {
      type: String,
      enum: ["Active", "Disposed", "Pending Court"],
      default: "Active"
    },


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Case", caseSchema);