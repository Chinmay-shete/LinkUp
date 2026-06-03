import { useEffect } from "react";
import {
  Loader2,
  MessageCircle,
  MessageCircleDashed,
  MessageSquare,
  MessagesSquare,
  PhoneOff,
  Send,
  Settings,
  SkipForward,
  Sparkles,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="flex flex-col w-full h-239">
          <header className="sticky z-20 bg-white border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex top-0 px-8 py-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-xl bg-neutral-900 text-neutral-50 flex justify-center items-center">
                <MessageCircle className="size-5" />
              </div>
              <span className="font-bold text-xl leading-7 tracking-tight">
                Omegal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="font-medium text-sm leading-5 gap-2"
                variant="ghost"
              >
                <Sparkles className="size-4" />
                Interests
              </Button>
              <Button className="text-neutral-500" size="icon" variant="ghost">
                <Settings className="size-5" />
              </Button>
              <Avatar className="size-9">
                <AvatarFallback className="font-semibold bg-neutral-100 text-neutral-900 text-xs leading-4">
                  ME
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="grid grid-cols-1 p-8 flex-1 gap-6 overflow-hidden">
            <div className="relative min-h-0 rounded-2xl bg-neutral-900 flex flex-col h-full overflow-hidden">
              <div className="text-center flex px-8 flex-col justify-center items-center flex-1 gap-4">
                <Loader2 className="size-10 animate-spin text-neutral-500" />
                <p className="font-medium text-neutral-400 text-sm leading-5">
                  Looking for a stranger to chat with...
                </p>
              </div>
              <div className="shadow-lg rounded-xl bg-neutral-800 border-neutral-700 border-1 border-solid absolute right-4 bottom-4 w-32 h-40 overflow-hidden">
                <img
                  alt="You"
                  className="object-cover w-full h-full"
                  data-authorname="Levi Meir Clancy"
                  data-authorurl="https://unsplash.com/@levimeirclancy"
                  data-blurhash="LE8:x7$*0f9tt7RjaexaELIp$*=|"
                  data-photoid="KIWxM_XvLlI"
                  src="https://images.unsplash.com/photo-1647593782884-1a6779139eb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0JTIwd2ViY2FtJTIwc2VsZmllJTIwY2FzdWFsfGVufDF8MXx8fDE3ODA1MDczMzd8MA&ixlib=rb-4.1.0&q=80&w=400"
                />
                <div className="rounded-full bg-black/50 flex absolute left-2 top-2 px-2 py-1 items-center gap-1">
                  <User className="size-3 text-white" />
                  <span className="font-medium text-white text-[10px]">
                    You
                  </span>
                </div>
              </div>
            </div>
            <div className="min-h-0 rounded-2xl bg-white border-neutral-200 border-1 border-solid flex flex-col h-full overflow-hidden">
              <div className="border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-6 py-4 items-center gap-2">
                <MessagesSquare className="size-4 text-neutral-500" />
                <span className="font-semibold text-sm leading-5">
                  Conversation
                </span>
              </div>
              <div className="overflow-y-auto text-center flex px-6 flex-col justify-center items-center flex-1 gap-3">
                <div className="size-12 rounded-full bg-neutral-100 flex justify-center items-center">
                  <MessageCircleDashed className="size-6 text-neutral-500" />
                </div>
                <p className="text-neutral-500 text-sm leading-5">
                  Waiting for a connection...
                </p>
              </div>
              <div className="border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex p-4 items-center gap-2">
                <div className="pointer-events-none cursor-not-allowed opacity-50 rounded-xl bg-neutral-100 flex px-4 items-center flex-1 gap-2">
                  <MessageSquare className="size-4 text-neutral-500" />
                  <input
                    className="bg-transparent outline-none text-sm leading-5 flex-1 h-11"
                    disabled={true}
                    id="messagebox"
                    placeholder="Type a message..."
                  />
                </div>
                <Button
                  className="size-11 shrink-0 opacity-50 rounded-xl"
                  disabled={true}
                  size="icon"
                >
                  <Send className="size-4" />
                </Button>
                <Button
                  className="shrink-0 rounded-xl gap-2 h-11"
                  variant="outline"
                >
                  <SkipForward className="size-4" />
                  Next
                </Button>
              </div>
            </div>
          </main>
          <footer className="bg-white border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex px-8 py-4 items-center gap-4">
            <Button className="rounded-xl bg-red-600 text-white px-5 gap-2 h-12">
              <PhoneOff className="size-4" />
              Stop
            </Button>
            <Button className="rounded-xl px-5 gap-2 h-12" variant="outline">
              <SkipForward className="size-4" />
              Next
            </Button>
            <div className="pointer-events-none cursor-not-allowed opacity-50 rounded-xl bg-neutral-100 flex px-4 items-center flex-1 gap-2 h-12">
              <MessageSquare className="size-4 text-neutral-500" />
              <input
                className="bg-transparent outline-none text-sm leading-5 flex-1 h-full"
                disabled={true}
                placeholder="Type a message..."
              />
            </div>
            <Button
              className="size-12 shrink-0 rounded-xl bg-neutral-900 text-neutral-50"
              size="icon"
            >
              <Send className="size-4" />
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}
