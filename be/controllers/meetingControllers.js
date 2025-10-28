import Meeting from "../models/meetingModels.js";

export const getMeetings = async (req, res) => {
  try {
    const data = await Meeting.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createMeeting = async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    const saved = await meeting.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
