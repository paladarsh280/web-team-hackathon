import mongoose from "mongoose";

const custodyLogSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },
    actionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionType: {
      type: String,
      enum: ["Check-In", "Check-Out", "Transfer", "Disposal"],
      required: true,
    },
    fromLocation: { type: String },
    toLocation: { type: String, required: true },
    receiverName: { type: String },
    remarks: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("CustodyLog", custodyLogSchema);