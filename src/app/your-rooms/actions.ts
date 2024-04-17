"use server";

import { deleteRoom, getRoom } from "@/data-access/rooms";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
    // authenticate user
    const session = await getSession();
    if (!session) {
        throw new Error("User not authenticated");
    }

    // did the user create the room?
    const room = await getRoom(roomId);

    if (room?.userId !== session.user.id) {
        throw new Error("User is not authorized to delete this room");
    }
    
    await deleteRoom(roomId);

    revalidatePath("/your-rooms"); //refresh the your-rooms page
}