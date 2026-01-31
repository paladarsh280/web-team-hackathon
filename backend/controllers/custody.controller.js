import Property from "../models/Property.model.js";
import CustodyLog from "../models/CustodyLog.model.js";

export const moveProperty = async (req, res) => {
  try {
    const { propertyId, toLocation, receiverName, remarks, actionType } = req.body;


    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const previousLocation = property.currentLocation;


    await CustodyLog.create({
      propertyId,
      caseId: property.caseId,
      actionBy: req.user._id,
      actionType: actionType || "Transfer",
      fromLocation: previousLocation,
      toLocation,
      receiverName,
      remarks,
    });


    property.currentLocation = toLocation;


    if (toLocation.toLowerCase().includes("court")) property.status = "At-Court";
    else if (toLocation.toLowerCase().includes("lab")) property.status = "FSL";
    else property.status = "In-Custody";

    await property.save();

    res.json({ message: "Movement logged successfully", property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to log movement" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const logs = await CustodyLog.find({ propertyId })
      .populate("actionBy", "name")
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};