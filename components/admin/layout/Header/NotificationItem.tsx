import { DropdownItem } from "../dropdown/DropdownItem"
import Image from "next/image";
import { Notification } from "@/types/notification";

const NotificationItem = ({notification, closeDropdown}: {notification: Notification, closeDropdown: any}) => {
    const {name, action, item, type, time} = notification

    return (
        <li>
            <DropdownItem
                onItemClick={closeDropdown}
                className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
            >
                <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                    <Image
                        width={40}
                        height={40}
                        src="/images/user/user-02.png"
                        alt="User"
                        className="w-full overflow-hidden rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                </span>

                <span className="block">
                    <span className="mb-1.5 space-x-1 block text-theme-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium text-gray-800 dark:text-white/90">
                            {name}
                        </span>
                        <span>{action}</span>
                        <span className="font-medium text-gray-800 dark:text-white/90">
                            {item}
                        </span>
                    </span>

                    <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                        <span>{type}</span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span>{time / 1000} min ago</span>
                    </span>
                </span>
            </DropdownItem>
        </li>
    )
}

export default NotificationItem
