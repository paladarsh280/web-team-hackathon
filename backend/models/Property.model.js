import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },
    category: { type: String, required: true },
    belongingTo: { type: String, enum: ["Accused", "Complainant", "Unknown"] },
    nature: { type: String, enum: ["Stolen", "Recovered", "Seized"] },
    description: { type: String },


    currentLocation: { type: String, required: true },


    qrCodeString: { type: String, unique: true },


    imagePath: { type: String },

    status: {
      type: String,
      enum: ["In-Custody", "Disposed", "Transferred", "At-Court", "FSL"],
      default: "In-Custody"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);