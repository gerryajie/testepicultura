import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PesanRuang = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    unit: "",
    ruangMeeting: "",
    kapasitas: "",
    tanggalRapat: "",
    waktuMulai: "",
    waktuSelesai: "",
    jumlahPeserta: "",
    jenisKonsumsi: [],
    nominalKonsumsi: "",
  });

  // 🔹 Ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitRes, roomRes] = await Promise.all([
          axios.get("http://localhost:5000/api/units"),
          axios.get("http://localhost:5000/api/rooms"),
        ]);

        setUnits(unitRes.data);
        setRooms(roomRes.data);
      } catch (error) {
        console.error("❌ Gagal memuat data:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 Handle perubahan input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.jenisKonsumsi, value]
          : prev.jenisKonsumsi.filter((v) => v !== value);
        return { ...prev, jenisKonsumsi: updated };
      });
    } else if (name === "ruangMeeting") {
      // 🔸 Ambil kapasitas dari ruangan yang dipilih
      const selectedRoom = rooms.find((r) => r.ruangMeeting === value);
      setFormData((prev) => ({
        ...prev,
        ruangMeeting: value,
        kapasitas: selectedRoom ? selectedRoom.kapasitas : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 Submit data ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/meetings", formData);
      alert("✅ Ruangan berhasil dipesan!");
      navigate("/ruang-meeting");
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan data!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <div className="text-sm text-gray-500 mb-6">
          Ruang Meeting &gt;{" "}
          <span className="text-blue-600 font-medium">Pesan Ruangan</span>
        </div>

        <h2 className="text-xl font-semibold mb-6">Informasi Ruang Meeting</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unit */}
            <div>
              <label className="block text-gray-700 mb-1">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
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
              <label className="block text-gray-700 mb-1">Ruang Meeting</label>
              <select
                name="ruangMeeting"
                value={formData.ruangMeeting}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              >
                <option value="">Pilih Ruangan</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r.ruangMeeting}>
                    {r.ruangMeeting}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Kapasitas otomatis dari API */}
          <div>
            <label className="block text-gray-700 mb-1">Kapasitas</label>
            <input
              type="text"
              name="kapasitas"
              value={formData.kapasitas}
              onChange={handleChange}
              placeholder="Kapasitas otomatis terisi"
              className="w-full border rounded-lg p-2 bg-gray-100"
              readOnly
            />
          </div>

          <hr className="my-6" />
          <h2 className="text-xl font-semibold mb-4">Informasi Rapat</h2>

          {/* Tanggal & Waktu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">Tanggal Rapat</label>
              <input
                type="date"
                name="tanggalRapat"
                value={formData.tanggalRapat}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Waktu Mulai</label>
              <input
                type="time"
                name="waktuMulai"
                value={formData.waktuMulai}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Waktu Selesai</label>
              <input
                type="time"
                name="waktuSelesai"
                value={formData.waktuSelesai}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>

          {/* Jumlah Peserta */}
          <div>
            <label className="block text-gray-700 mb-1">Jumlah Peserta</label>
            <input
              type="number"
              name="jumlahPeserta"
              value={formData.jumlahPeserta}
              onChange={handleChange}
              placeholder="Masukkan jumlah peserta"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Jenis Konsumsi */}
          <div>
            <label className="block text-gray-700 mb-1">Jenis Konsumsi</label>
            <div className="flex gap-4">
              {["Snack Siang", "Makan Siang", "Snack Sore"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={formData.jenisKonsumsi.includes(item)}
                    onChange={handleChange}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Nominal Konsumsi */}
          <div>
            <label className="block text-gray-700 mb-1">Nominal Konsumsi</label>
            <input
              type="number"
              name="nominalKonsumsi"
              value={formData.nominalKonsumsi}
              onChange={handleChange}
              placeholder="Rp"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/ruang-meeting")}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-teal-700 hover:bg-teal-800 rounded-lg text-white"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PesanRuang;
