"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { NotificationList } from "@/components/notification-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const notificationItems = [
  {
    id: 1,
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    id: 2,
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    id: 3,
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState(notificationItems);
  const { toast } = useToast();

  useEffect(() => {
    setSocket(io("http://192.168.1.201:4000"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      console.log(data);
      setResults((prev) => [...prev, data]);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      id: Math.floor(Math.random() * 100),
      title: "Teklu",
      description: "Hello Tad",
    };

    socket.emit("send-message", { ...body });
    setNotifications((prev) => [...prev, body]);
    toast({
      title: body.title,
      description: body.description,
    });
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full flex justify-end gap-2">
          {notifications.length > 0 ? (
            <Badge variant="secondary" className="border border-slate-700">
              {notifications.length >= 10
                ? notifications.length
                : "0" + notifications.length}
            </Badge>
          ) : null}
          <ModeToggle />
          <NotificationList
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
        <h2 className="text-3xl text-slate-300">Socket Client</h2>
        <Button
          onClick={handleSubmit}
          // className="h-10 px-6 font-semibold rounded-md bg-emerald-600 hover:bg-emerald-500 transition-all text-white"
          type="submit"
        >
          Submit
        </Button>
        <article className="flex flex-col">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="border-2 border-slate-900 bg-slate-950 px-2 py-1 min-w-[200px] m-2 rounded-md"
            >
              <h3 className="text-slate-300 text-xl">{notification.title}</h3>
              <p className="text-slate-400">{notification.description}</p>
            </div>
          ))}
        </article>
      </main>
      <Toaster />
    </>
  );
}
