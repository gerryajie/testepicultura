// controllers/unitController.js
import Unit from "../models/unitModels.js";

export const getUnits = async (req, res) => {
  try {
    const units = await Unit.find().sort({ name: 1 });
    res.status(200).json(units);
  } catch (error) {
    console.error("Error fetching units:", error);
    res.status(500).json({ message: "Gagal mengambil data unit", error });
  }
};
