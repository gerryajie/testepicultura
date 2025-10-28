/* eslint-disable react/prop-types */
const MeetingTable = ({ data }) => {
  return (
    <div className="mt-6 bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-3 text-left">Unit</th>
            <th className="px-4 py-3 text-left">Ruang Meeting</th>
            <th className="px-4 py-3 text-left">Kapasitas</th>
            <th className="px-4 py-3 text-left">Tanggal Rapat</th>
            <th className="px-4 py-3 text-left">Waktu</th>
            <th className="px-4 py-3 text-left">Jumlah Peserta</th>
            <th className="px-4 py-3 text-left">Konsumsi</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{row.unit}</td>
                <td className="px-4 py-2">{row.ruangMeeting}</td>
                <td className="px-4 py-2">{row.kapasitas} Orang</td>
                <td className="px-4 py-2">
                  {new Date(row.tanggalRapat).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-2">
                  {row.waktuMulai} s/d {row.waktuSelesai}
                </td>
                <td className="px-4 py-2">{row.jumlahPeserta} Orang</td>
                <td className="px-4 py-2">
                  {row.jenisKonsumsi && row.jenisKonsumsi.join(", ")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center text-gray-500 py-4 italic"
              >
                Tidak ada data tersedia
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingTable;
