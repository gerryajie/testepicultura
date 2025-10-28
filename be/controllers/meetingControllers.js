import Meeting from "../models/meetingModels.js";

export const getMeetings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalMeetings = await Meeting.countDocuments();
    const meetings = await Meeting.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data: meetings,
      currentPage: page,
      totalPages: Math.ceil(totalMeetings / limit),
      totalItems: totalMeetings,
    });
  } catch (err) {
    console.error("❌ Error fetching meetings:", err);
    res.status(500).json({ message: "Server Error" });
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
