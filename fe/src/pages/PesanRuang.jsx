import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import HeaderSection from "../components/HeaderSection";

const PesanRuang = () => {
  const navigate = useNavigate();

  const [units, setUnits] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 🔹 Ambil data unit & rooms dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitRes, roomRes] = await Promise.all([
          axios.get("http://localhost:5000/api/units"),
          axios.get("http://localhost:5000/api/rooms"),
        ]);
        setUnits(unitRes.data);
        setRooms(roomRes.data);
      } catch (err) {
        console.error("❌ Gagal memuat data:", err);
        alert("Gagal memuat data unit atau ruangan!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Isi kapasitas otomatis berdasarkan ruangMeeting
  useEffect(() => {
    const selectedRoom = rooms.find(
      (r) => r.ruang === formData.ruangMeeting // ✅ gunakan field "ruang" dari API
    );
    if (selectedRoom) {
      setFormData((prev) => ({ ...prev, kapasitas: selectedRoom.kapasitas }));
    }
  }, [formData.ruangMeeting, rooms]);

  // 🔹 Handle perubahan input form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.jenisKonsumsi, value]
          : prev.jenisKonsumsi.filter((v) => v !== value);
        return { ...prev, jenisKonsumsi: updated };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 Kirim data ke backend
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
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* 🔹 Topbar */}
      <Topbar />

      <div className="flex flex-1 pt-14">
        {/* 🔹 Sidebar */}
        <Sidebar />

        {/* 🔹 Konten Tengah */}
        <main className="flex-1 ml-16 flex flex-col items-center justify-center px-4 py-10">
          <div className="w-full max-w-4xl">
            <HeaderSection
              title="Ruang Meeting"
              subtitle="Pesan Ruangan"
              onBack={() => navigate(-1)}
            />

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {loading ? (
                <p className="text-gray-500 text-center py-10">
                  Memuat data form...
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 🔸 Informasi Ruang Meeting */}
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Informasi Ruang Meeting
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Unit */}
                    <div>
                      <label className="block text-gray-700 mb-1">Unit</label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-600 outline-none"
                        required
                      >
                        <option value="">Pilih Unit</option>
                        {units.map((unit) => (
                          <option key={unit._id} value={unit.name}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ruang Meeting */}
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Pilihan Ruang Meeting
                      </label>
                      <select
                        name="ruangMeeting"
                        value={formData.ruangMeeting}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-600 outline-none"
                        required
                      >
                        <option value="">Pilih Ruangan</option>
                        {rooms.map((room) => (
                          <option key={room._id} value={room.ruang}>
                            {room.ruang}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Kapasitas */}
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Kapasitas Ruangan
                    </label>
                    <input
                      type="text"
                      name="kapasitas"
                      value={
                        formData.kapasitas ? `${formData.kapasitas} Orang` : ""
                      }
                      readOnly
                      className="w-full border rounded-lg p-2 bg-gray-100 text-gray-600"
                    />
                  </div>

                  {/* 🔸 Informasi Rapat */}
                  <hr className="my-6" />
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Informasi Rapat
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Tanggal Rapat
                      </label>
                      <input
                        type="date"
                        name="tanggalRapat"
                        value={formData.tanggalRapat}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-600 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Waktu Mulai
                      </label>
                      <input
                        type="time"
                        name="waktuMulai"
                        value={formData.waktuMulai}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">
                        Waktu Selesai
                      </label>
                      <input
                        type="time"
                        name="waktuSelesai"
                        value={formData.waktuSelesai}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Jumlah Peserta */}
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Jumlah Peserta
                    </label>
                    <input
                      type="number"
                      name="jumlahPeserta"
                      value={formData.jumlahPeserta}
                      onChange={handleChange}
                      placeholder="Masukkan jumlah peserta"
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-600 outline-none"
                    />
                  </div>

                  {/* Jenis Konsumsi */}
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Jenis Konsumsi
                    </label>
                    <div className="flex gap-4">
                      {["Snack Siang", "Makan Siang", "Snack Sore"].map(
                        (item) => (
                          <label key={item} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              value={item}
                              checked={formData.jenisKonsumsi.includes(item)}
                              onChange={handleChange}
                            />
                            {item}
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Nominal Konsumsi */}
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Nominal Konsumsi
                    </label>
                    <input
                      type="number"
                      name="nominalKonsumsi"
                      value={formData.nominalKonsumsi}
                      onChange={handleChange}
                      placeholder="Rp"
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-600 outline-none"
                    />
                  </div>

                  {/* Tombol */}
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
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PesanRuang;
