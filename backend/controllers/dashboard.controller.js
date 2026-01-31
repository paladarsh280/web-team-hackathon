import Case from "../models/Case.model.js";

export const getDashboardStats = async (req, res) => {
  try {

    const [total, active, disposed] = await Promise.all([
      Case.countDocuments(),
      Case.countDocuments({ status: "Active" }),
      Case.countDocuments({ status: "Disposed" }),
    ]);

    res.status(200).json({
      totalCases: total,
      pendingCases: active,
      disposedCases: disposed,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};