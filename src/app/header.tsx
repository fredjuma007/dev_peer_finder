"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";


function AccountDropdown() {
    const session = useSession();

    const isLoggedIn = !!session.data;

    return (
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant={"link"}>
    <Avatar className="mr-2">
  <AvatarImage src={session.data?.user?.image ?? ""} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

        {session.data?.user?.name}
    </Button>
    </DropdownMenuTrigger>
  <DropdownMenuContent>
        {isLoggedIn ? (
            <DropdownMenuItem onClick={() => signOut()} >
                <LogOutIcon className="mr-2" />
                Sign Out
            </DropdownMenuItem>      
                ) : ( 
            <DropdownMenuItem onClick={() => signIn("google")}>
                <LogInIcon className="mr-2" />
                Sign Out
            </DropdownMenuItem>
                )}
  </DropdownMenuContent>
</DropdownMenu>

    )
}

export function Header() {
    const session = useSession();

    return (
        <header className="bg-gray-200 py-2 dark:bg-gray-900 container mx-auto">
            <div className="flex justify-between items-center">
            
                    <Link href="/" className="flex gap-2 items-center text-xl hover:underline">
                    <Image
                    src="/logo.png"
                    width="50"
                    height="50"
                    alt="the DevPeerFinder logo"
                    />
                    DevPeerFinder
                    </Link>

            <div className="flex items-center gap-4">
                <AccountDropdown />
          <ModeToggle />
           </div>
          </div>
        </header>
    )
}