import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRooms } from "@/data-access/rooms";
import { UserRoomCard } from "./user-room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function YourRoomsPage() {
  unstable_noStore();
  const rooms = await getUserRooms();

  return (
    <main className="min-h-screen p-24">
      <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl">Your Rooms</h1>
      <Button asChild>
        <Link href="/create-room">Create Room</Link>
      </Button>
      </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((room) => {
        return <UserRoomCard key={room.id} room={room} />;
      })}
    </div>

    {rooms.length === 0 && (
      <div className="flex flex-col gap-4 justify-center items-center mt-10">
        <Image
        src="/no-rooms.svg"
        width="400"
        height="400"
        alt="No rooms found"
        />

<h1 className="text-5xl font-bold text-center mb-2">You have no rooms yet</h1>
<Button asChild>
        <Link href="/create-room">Create Room</Link>
      </Button>
        <p className="text-gray-600">Your created rooms will appear here</p>

      </div>
    )}
    </main>
  );
}
