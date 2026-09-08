import { Timestamp } from "next/dist/server/lib/cache-handlers/types"

export type Notification = {
    id: number
    name: string
    action: string 
    item: string 
    type: string //nanti enum
    time: Timestamp
}