import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  unit: String,
  ruangMeeting: String,
  kapasitas: Number,
  tanggalRapat: String,
  waktuMulai: String,
  waktuSelesai: String,
  jumlahPeserta: Number,
  jenisKonsumsi: [String],
  nominalKonsumsi: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Meeting", meetingSchema);
