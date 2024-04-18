"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useParams, useRouter } from "next/navigation"
import { editRoomAction } from "./actions"
import { Room } from "@/db/schema"
 
const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  githubRepo: z.string().min(1).max(200),
  tags: z.string().min(1).max(100),
})

export function EditRoomForm({room}: {room: Room}) {
    const router = useRouter();
    const params = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: room.name,
          description: room.description ?? "",
          githubRepo: room.githubRepo ?? "",
          tags: room.tags
        },
      })

     async function onSubmit(values: z.infer<typeof formSchema>) {
       await editRoomAction({
         id: params.roomId as string,
          ...values
       });
      }

      return (
        
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public room name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Please provide a description of your room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="githubRepo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Repo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Please provide a link to your Github project repo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="javascript, ReactJs, tailwind"/>
                </FormControl>
                <FormDescription>
                  List your programming languages, frameworks and libraries.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
    
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      
      )
}