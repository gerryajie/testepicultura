import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RuangMeeting = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meetings");
      setData(res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Ruang Meeting</h2>
          <p className="text-sm text-gray-500">Daftar Pemesanan Ruangan</p>
        </div>
        <button
          onClick={() => navigate("/pesan-ruang")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow"
        >
          <Plus size={16} /> Pesan Ruangan
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">UNIT</th>
              <th className="p-3 text-left">RUANG MEETING</th>
              <th className="p-3 text-left">KAPASITAS</th>
              <th className="p-3 text-left">TANGGAL RAPAT</th>
              <th className="p-3 text-left">WAKTU</th>
              <th className="p-3 text-left">JUMLAH PESERTA</th>
              <th className="p-3 text-left">JENIS KONSUMSI</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{row.unit}</td>
                <td className="p-3">{row.ruangMeeting}</td>
                <td className="p-3">{row.kapasitas} Orang</td>
                <td className="p-3">
                  {new Date(row.tanggalRapat).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3">
                  {row.waktuMulai} s/d {row.waktuSelesai}
                </td>
                <td className="p-3">{row.jumlahPeserta} Orang</td>
                <td className="p-3">
                  {Array.isArray(row.jenisKonsumsi)
                    ? row.jenisKonsumsi.join(", ")
                    : row.jenisKonsumsi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RuangMeeting;
