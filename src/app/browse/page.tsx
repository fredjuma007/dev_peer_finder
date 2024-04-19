import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "./room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string
  };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search
    
  );

  return (
    <main className="min-h-screen p-24">
      <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl">Find Dev Rooms</h1>
      <Button asChild>
        <Link href="/create-room">Create Room</Link>
      </Button>
      </div>

    <div className="mb-12">
      <SearchBar />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((room) => {
        return <RoomCard key={room.id} room={room} />;
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

        <h1 className="text-5xl font-bold text-center mb-2">No Rooms Yet</h1>
        <Button asChild>
        <Link href="/create-room">Create Room</Link>
      </Button>
        <p className="text-gray-600">Created Rooms by you and other devs will appear here</p>

      </div>
    )}
    </main>
  );
}
