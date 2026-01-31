import Case from "../models/Case.model.js";
import Property from "../models/Property.model.js";

export const createCaseWithProperties = async (req, res) => {
  try {

    const caseData = JSON.parse(req.body.caseData);
    const propertiesData = JSON.parse(req.body.propertiesData);


    const newCase = await Case.create({
      ...caseData,
      createdBy: req.user._id,
      status: "Active",
    });



    const propertiesToSave = propertiesData.map((prop, index) => ({
      ...prop,
      caseId: newCase._id,

      qrCodeString: `${newCase.crimeNumber}-${Date.now()}-${index}`,
      currentLocation: prop.location,
    }));

    await Property.insertMany(propertiesToSave);

    res.status(201).json({
      message: "Case and Properties Created Successfully",
      caseId: newCase._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create case" });
  }
};



export const getAllCases = async (req, res) => {
  try {

    const cases = await Case.find().sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};


export const getCaseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const caseInfo = await Case.findById(id);
    const properties = await Property.find({ caseId: id });

    if (!caseInfo) return res.status(404).json({ message: "Case not found" });

    res.json({ caseInfo, properties });
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};