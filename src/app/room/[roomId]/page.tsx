import { getRoom } from "@/data-access/rooms";
import { GithubIcon, Tag } from "lucide-react";
import Link from "next/link";
import { TagsList } from "@/components/tags-list";
import { DevFinderVideo } from "./video-player";
import { splitTags } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

export default async function RoomPage(props: { params: { roomId: string } }) {
    unstable_noStore();
    const roomId = props.params.roomId;

    const room = await getRoom(roomId);

    if (!room) {
        return <div>Room not found</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
            <div className="md:col-span-3 p-4 pr-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    <DevFinderVideo room={room} />
                </div>
            </div>
            <div className="md:col-span-1 p-4 pl-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                    <h1 className="text-base">{room?.name}</h1>
                    {room.githubRepo && (
                        <Link
                            href={room.githubRepo}
                            className="flex items-center gap-2 text-center text-small self-center"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubIcon />
                            Github Project
                        </Link>
                    )}
                    <p className="text-base text-gray-500">{room?.description}</p>

                    <TagsList tags={splitTags(room.tags)} />
                </div>
            </div>
        </div>
    );
}