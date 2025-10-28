import Room from "../models/roomModel.js";

// 🔹 GET semua ruangan
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data ruangan" });
  }
};

// 🔹 POST tambah ruangan baru
export const createRoom = async (req, res) => {
  try {
    const { ruang, kapasitas } = req.body;

    if (!ruang || !kapasitas)
      return res.status(400).json({ error: "Ruang dan kapasitas wajib diisi" });

    const newRoom = new Room({ ruang, kapasitas });
    await newRoom.save();

    res.status(201).json({ message: "Ruangan berhasil ditambahkan", data: newRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambahkan ruangan" });
  }
};
