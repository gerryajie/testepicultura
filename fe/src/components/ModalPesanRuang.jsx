import { useEffect, useState } from "react";
import axios from "axios";

const ModalPesanRuang = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    unit: "",
    room: "",
    capacity: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [units, setUnits] = useState([]);
  const [rooms, setRooms] = useState([]);

  // 🔹 Ambil data unit dan ruangan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitRes, roomRes] = await Promise.all([
          axios.get("http://localhost:5000/api/units"),
          axios.get("http://localhost:5000/api/rooms"), // ✅ updated endpoint
        ]);
        setUnits(unitRes.data);
        setRooms(roomRes.data);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 Ketika ruangan dipilih, otomatis isi kapasitas
  const handleRoomChange = (e) => {
    const selectedRoomName = e.target.value;
    const selectedRoom = rooms.find((r) => r.name === selectedRoomName);

    setForm({
      ...form,
      room: selectedRoomName,
      capacity: selectedRoom ? selectedRoom.capacity : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/meetings", form);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Pesan Ruang Meeting</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium">Unit</label>
            <select
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              className="w-full border rounded-md px-2 py-1"
              required
            >
              <option value="">Pilih Unit</option>
              {units.map((u) => (
                <option key={u._id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ruang Meeting */}
          <div>
            <label className="block text-sm font-medium">Ruang Meeting</label>
            <select
              value={form.room}
              onChange={handleRoomChange}
              className="w-full border rounded-md px-2 py-1"
              required
            >
              <option value="">Pilih Ruangan</option>
              {rooms.map((r) => (
                <option key={r._id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Kapasitas (otomatis) */}
          <div>
            <label className="block text-sm font-medium">Kapasitas</label>
            <input
              type="text"
              value={form.capacity}
              readOnly
              className="w-full border rounded-md px-2 py-1 bg-gray-100"
              placeholder="Kapasitas otomatis terisi"
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-sm font-medium">Tanggal</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border rounded-md px-2 py-1"
              required
            />
          </div>

          {/* Waktu Mulai */}
          <div>
            <label className="block text-sm font-medium">Waktu Mulai</label>
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              className="w-full border rounded-md px-2 py-1"
              required
            />
          </div>

          {/* Waktu Selesai */}
          <div>
            <label className="block text-sm font-medium">Waktu Selesai</label>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className="w-full border rounded-md px-2 py-1"
              required
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg border"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPesanRuang;
