import RoomCard from "../components/RoomCard"

const rooms = [
  { name: "Ruang A - Jakarta", capacity: 10, status: "available" },
  { name: "Ruang B - Bandung", capacity: 8, status: "unavailable" },
  { name: "Ruang C - Surabaya", capacity: 12, status: "available" },
  { name: "Ruang D - Bali", capacity: 6, status: "unavailable" },
]

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Daftar Ruang Meeting</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room, i) => (
          <RoomCard key={i} {...room} />
        ))}
      </div>
    </div>
  )
}
