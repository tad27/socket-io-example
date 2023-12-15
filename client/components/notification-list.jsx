"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellRing } from "lucide-react";

const NotificationItem = ({ item, setNotifications }) => {
  const handleSeen = () => {
    setNotifications((prev) => prev.filter((value) => value.id !== item.id));
  };

  return (
    <div
      onClick={handleSeen}
      className=" flex items-center space-x-4 rounded-md border p-4"
    >
      <BellRing />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
      {/* <Switch /> */}
    </div>
  );
};

export function NotificationList({ notifications, setNotifications }) {
  return (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>
        <article className="flex flex-col gap-2">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <NotificationItem
                item={item}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            ))
          ) : (
            <h3>There is no Notification!</h3>
          )}
        </article>
      </PopoverContent>
    </Popover>
  );
}
