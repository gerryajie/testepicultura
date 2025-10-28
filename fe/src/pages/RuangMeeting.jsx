import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import HeaderSection from "../components/HeaderSection";
import axios from "axios";

const RuangMeeting = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadData = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/meetings?page=${pageNumber}&limit=5`
      );
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <Topbar />
      <div className="flex flex-1 pt-14">
        <Sidebar />
        <main className="flex-1 p-6 ml-16">
          <div className="flex justify-between items-center mb-6">
            <HeaderSection title="Ruang Meeting" subtitle="Ruang Meeting" />
            <button
              onClick={() => navigate("/pesan-ruang")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              <Plus size={16} /> Pesan Ruangan
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            {loading ? (
              <p className="text-gray-500 text-center">Memuat data...</p>
            ) : (
              <>
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-blue-600 text-white text-sm text-left">
                      <th className="p-2 rounded-tl-lg">Unit</th>
                      <th className="p-2">Ruang Meeting</th>
                      <th className="p-2">Kapasitas</th>
                      <th className="p-2">Tanggal Rapat</th>
                      <th className="p-2">Waktu</th>
                      <th className="p-2">Jumlah Peserta</th>
                      <th className="p-2 rounded-tr-lg">Konsumsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} className="border-t text-sm">
                        <td className="p-2">{item.unit}</td>
                        <td className="p-2">{item.ruangMeeting}</td>
                        <td className="p-2">
                          {item.kapasitas ? `${item.kapasitas} Orang` : "-"}
                        </td>
                        <td className="p-2">
                          {new Date(item.tanggalRapat).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-2">
                          {item.waktuMulai && item.waktuSelesai
                            ? `${item.waktuMulai} s/d ${item.waktuSelesai}`
                            : "-"}
                        </td>
                        <td className="p-2">
                          {item.jumlahPeserta
                            ? `${item.jumlahPeserta} Orang`
                            : "-"}
                        </td>
                        <td className="p-2">
                          {item.jenisKonsumsi?.join(", ") || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* 🔹 Pagination */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-600 px-2">
                  <p>
                    Showing {(page - 1) * 5 + 1}–{(page - 1) * 5 + data.length} of{" "}
                    {totalPages * 5}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevPage}
                      disabled={page === 1}
                      className={`px-3 py-1 border rounded ${
                        page === 1
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      &lt; Back
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 border rounded ${
                          page === i + 1
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={nextPage}
                      disabled={page === totalPages}
                      className={`px-3 py-1 border rounded ${
                        page === totalPages
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Next &gt;
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RuangMeeting;
