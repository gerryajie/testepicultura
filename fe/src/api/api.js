import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // ganti jika beda port

// ✅ Get daftar unit
export const getUnits = async () => {
  const res = await axios.get(`${API_BASE}/units`);
  return res.data;
};

// ✅ Get daftar ruang meeting (get-room)
export const getRooms = async () => {
  const res = await axios.get(`${API_BASE}/get-room`);
  return res.data;
};

// ✅ Get semua meeting
export const getMeetings = async () => {
  const res = await axios.get(`${API_BASE}/meetings`);
  return res.data;
};

// ✅ Create meeting baru
export const createMeeting = async (data) => {
  const res = await axios.post(`${API_BASE}/meetings`, data);
  return res.data;
};
