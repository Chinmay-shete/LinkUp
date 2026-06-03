import { useEffect } from "react";
import {
  Globe,
  MessageCircle,
  MessageSquare,
  Phone,
  PhoneCall,
  PhoneOff,
  Send,
  Settings,
  SkipForward,
  Sparkles,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="relative w-285 h-239 overflow-hidden">
          <div className="blur-sm scale-[1.02] select-none pointer-events-none flex absolute inset-0 flex-col">
            <header className="bg-white border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-8 py-4 justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-xl bg-neutral-900 text-neutral-50 flex justify-center items-center">
                  <MessageCircle className="size-5" />
                </div>
                <span className="font-bold text-lg leading-7 tracking-tight">
                  Omegal
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Button className="rounded-xl gap-2" variant="ghost">
                  <Sparkles className="size-4" />
                  Interests
                </Button>
                <Button className="rounded-xl" size="icon" variant="ghost">
                  <Settings className="size-5" />
                </Button>
                <Avatar className="size-9">
                  <AvatarFallback className="font-semibold bg-neutral-100 text-neutral-900 text-xs leading-4">
                    ME
                  </AvatarFallback>
                </Avatar>
              </div>
            </header>
            <main className="grid grid-cols-2 p-8 flex-1 gap-6">
              <div className="relative rounded-2xl bg-neutral-100 overflow-hidden">
                <img
                  alt="Stranger"
                  className="object-cover w-full h-full"
                  data-authorname="Ghen Mar Cuaño"
                  data-authorurl="https://unsplash.com/@ghenmar"
                  data-blurhash="LILX3-9s_Noz?va%_3DOS#xaIUNH"
                  data-photoid="R6dSBkz32B8"
                  src="https://images.unsplash.com/photo-1595986630530-969786b19b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG9uJTIwcGhvbmUlMjB2aWRlbyUyMGNhbGx8ZW58MXwxfHx8MTc4MDUwNzMzN3ww&ixlib=rb-4.1.0&q=80&w=400"
                />
                <div className="bg-gradient-to-b from-black/60 to-transparent absolute inset-x-0 top-0 h-24" />
                <div className="font-medium rounded-full bg-black/50 text-white text-xs leading-4 flex absolute left-4 top-4 px-3 py-1.5 items-center gap-2">
                  <span className="size-2 rounded-full bg-green-500" />
                  Connected · Stranger
                </div>
                <div className="font-medium rounded-full bg-black/50 text-white text-xs leading-4 flex absolute right-4 top-4 px-3 py-1.5 items-center gap-1.5">
                  <Globe className="size-3.5" />
                  English
                </div>
              </div>
              <div className="relative rounded-2xl bg-neutral-100 overflow-hidden">
                <img
                  alt="You"
                  className="object-cover w-full h-full"
                  data-authorname="Surface"
                  data-authorurl="https://unsplash.com/@surface"
                  data-blurhash="LTA-I;t6R4ae*0RkMwfQR-n~oJkC"
                  data-photoid="AnzxhCjE1v0"
                  src="https://images.unsplash.com/photo-1648737966282-b193f74a1503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB2aWRlbyUyMGNhbGwlMjBwb3J0cmFpdHxlbnwxfDF8fHwxNzgwNTA3MzM3fDA&ixlib=rb-4.1.0&q=80&w=400"
                />
                <div className="bg-gradient-to-b from-black/60 to-transparent absolute inset-x-0 top-0 h-24" />
                <div className="font-medium rounded-full bg-black/50 text-white text-xs leading-4 flex absolute left-4 top-4 px-3 py-1.5 items-center gap-1.5">
                  <User className="size-3.5" />
                  You
                </div>
              </div>
            </main>
            <footer className="bg-white border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex px-8 py-6 items-center gap-4">
              <Button className="rounded-xl bg-red-600 text-white gap-2 h-12">
                <PhoneOff className="size-4" />
                Stop
              </Button>
              <Button className="rounded-xl gap-2 h-12" variant="outline">
                <SkipForward className="size-4" />
                Next
              </Button>
              <div className="rounded-xl bg-neutral-100 flex px-4 items-center flex-1 gap-2 h-12">
                <MessageSquare className="size-4 text-neutral-500" />
                <span className="text-neutral-500 text-sm leading-5">
                  Type a message...
                </span>
              </div>
              <Button className="size-12 rounded-xl" size="icon">
                <Send className="size-5" />
              </Button>
            </footer>
          </div>
          <div className="z-10 backdrop-blur-sm bg-black/60 flex absolute inset-0 justify-center items-center">
            <Card className="shadow-2xl rounded-2xl border-neutral-200 border-0 border-solid p-8 gap-4 w-105">
              <CardHeader className="flex p-0 flex-col items-center gap-4">
                <div className="relative flex justify-center items-center">
                  <span className="inline-flex size-24 animate-pulse rounded-full bg-blue-600/30 absolute" />
                  <div className="relative size-20 ring-4 ring-[#2563eb]/30 rounded-full bg-blue-600 text-white flex justify-center items-center">
                    <Phone className="size-9" />
                  </div>
                </div>
                <div className="text-center flex flex-col items-center gap-2">
                  <h2 className="font-bold text-neutral-950 text-2xl leading-8">
                    Incoming Video Call
                  </h2>
                  <p className="text-neutral-500 text-sm leading-5">
                    Stranger is inviting you to a live video call...
                  </p>
                </div>
              </CardHeader>
              <CardFooter className="grid grid-cols-2 p-0 gap-4">
                <Button className="rounded-xl bg-green-600 text-white gap-2 w-full h-12">
                  <PhoneCall className="size-4" />
                  Accept Call
                </Button>
                <Button className="rounded-xl bg-red-600 text-white gap-2 w-full h-12">
                  <PhoneOff className="size-4" />
                  Reject Call
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
