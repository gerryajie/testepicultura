export default function RoomCard({ name, capacity, status }) {
  const isAvailable = status === "available"
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-all duration-200">
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <p className="text-sm text-gray-500 mb-3">Kapasitas: {capacity} orang</p>
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          isAvailable
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {isAvailable ? "Tersedia" : "Terpakai"}
      </span>
    </div>
  )
}
