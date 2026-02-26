'use client';

import { useEffect, useState } from 'react';
import { RoomModel } from '@/models/roomModel';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL || '';
        const res = await fetch(`${backendUrl}/rooms`);
        if (!res.ok) throw new Error('Failed to fetch rooms');
        const data = await res.json();
        setRooms(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || 'Error fetching rooms');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomClick = async (roomNo: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL || '';
      const res = await fetch(`${backendUrl}/rooms`);
      if (!res.ok) throw new Error('Failed to fetch room info');
      const rooms = await res.json();
      const roomInfo = rooms.find((room: RoomModel) => room.roomNo === roomNo);
      if (roomInfo.users && Array.isArray(roomInfo.users) && roomInfo.users.length >= 3) {
        alert('This room already has more than 3 users.');
      } else {
        alert('You can join this room.');
      }
    } catch (err: any) {
      alert(err.message || 'Error fetching room info');
    }
  };

  return (
    <main className="flex-1 bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <section className="w-full h-full border border-gray-200 bg-white shadow-xl pl-6 pb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Rooms</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading && <div className="text-gray-500">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !error && rooms.length === 0 && (
            <div className="text-gray-500">No rooms available.</div>
          )}
          {!loading &&
            !error &&
            rooms.map((room, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-100 rounded-lg bg-gray-50 shadow-sm h-full flex flex-col cursor-pointer hover:bg-blue-50 transition"
                onClick={() => handleRoomClick(room.roomNo)}
              >
                <h2 className="text-xl font-semibold text-blue-900 mb-2">Room {room.roomNo}</h2>
                <hr className="my-2 border-gray-300" />
                <ul className="text-gray-700 list-disc list-inside">
                  {room.users && room.users.length > 0 ? (
                    room.users.map((user, uidx) => <li key={uidx}>{user.name}</li>)
                  ) : (
                    <li className="text-gray-400 italic">No users</li>
                  )}
                </ul>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
