import { useEffect } from "react";
import {
  Flag,
  Globe,
  Maximize2,
  MessageCircle,
  MessageSquare,
  Mic,
  MicOff,
  PhoneOff,
  RefreshCcw,
  Send,
  Settings,
  SkipForward,
  Sparkles,
  Video,
  VideoOff,
  Volume2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="flex flex-col w-285 h-239">
          <header className="sticky z-30 bg-white border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex top-0 px-8 py-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-xl bg-neutral-900 text-neutral-50 flex justify-center items-center">
                <MessageCircle className="size-5" />
              </div>
              <span className="font-bold text-lg leading-7 tracking-tight">
                Omegal
              </span>
            </div>
            <div className="flex items-center gap-4">
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
          <main className="grid grid-cols-2 px-8 py-6 flex-1 gap-6 overflow-hidden">
            <section
              className="relative rounded-2xl bg-neutral-900 overflow-hidden"
              id="remoteVideo"
            >
              <img
                alt="Stranger video feed"
                className="object-cover w-full h-full"
                data-authorname="Aleksei Zhivilov"
                data-authorurl="https://unsplash.com/@bb009x"
                data-blurhash="LaIFe.8_%gof~qR*jYj]o}xvM{WB"
                data-photoid="5I263mnTkPc"
                src="https://images.unsplash.com/photo-1743865319740-32121cae5959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhvbWUlMjBvZmZpY2UlMjBsYXB0b3AlMjB2aWRlbyUyMGNoYXR8ZW58MXwxfHx8MTc4MDUwNzM0NHww&ixlib=rb-4.1.0&q=80&w=400"
              />
              <div className="bg-[linear-gradient(to_bottom,oklch(0.145_0_0/.6),transparent)] absolute inset-x-0 top-0 h-24" />
              <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/.7),transparent)] absolute inset-x-0 bottom-0 h-28" />
              <div className="bg-[oklch(0.145_0_0/.5)] font-medium rounded-full text-white text-xs leading-4 flex absolute left-4 top-4 px-3 py-1.5 items-center gap-2">
                <span className="size-2 bg-[oklch(0.7_0.18_150)] rounded-full" />
                Connected · Stranger
              </div>
              <div className="bg-[oklch(0.145_0_0/.5)] font-medium rounded-full text-white text-xs leading-4 flex absolute right-4 top-4 px-3 py-1.5 items-center gap-1.5">
                <Globe className="size-3.5" />
                English
              </div>
              <div className="flex absolute left-4 bottom-4 items-center gap-2">
                <Button
                  className="size-10 bg-[oklch(0.145_0_0/.5)] rounded-full text-white"
                  size="icon"
                >
                  <Volume2 className="size-4" />
                </Button>
                <Button
                  className="size-10 bg-[oklch(0.145_0_0/.5)] rounded-full text-white"
                  size="icon"
                >
                  <Flag className="size-4" />
                </Button>
              </div>
              <div className="absolute right-4 bottom-4">
                <Button
                  className="size-10 bg-[oklch(0.145_0_0/.5)] rounded-full text-white"
                  size="icon"
                >
                  <Maximize2 className="size-4" />
                </Button>
              </div>
              <div
                className="border-[oklch(1_0_0/.8)] shadow-lg rounded-xl bg-neutral-800 border-black/1 border-2 border-solid absolute right-4 bottom-20 w-36 h-48 overflow-hidden"
                id="localVideo"
              >
                <img
                  alt="Your video feed"
                  className="object-cover w-full h-full"
                  data-authorname="Albert Dera"
                  data-authorurl="https://unsplash.com/@albertdera"
                  data-blurhash="LD83@Ss:0fIo-Bs:EMNGEMWC$*xZ"
                  data-photoid="ILip77SbmOE"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtYW4lMjBmYWNlJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfDF8fHwxNzgwNTA3MzQ0fDA&ixlib=rb-4.1.0&q=80&w=400"
                />
                <div className="bg-[oklch(0.145_0_0/.55)] font-medium rounded-full text-white text-[10px] absolute left-1.5 top-1.5 px-2 py-0.5">
                  You
                </div>
                <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/.7),transparent)] flex absolute inset-x-0 bottom-0 py-1.5 justify-center items-center gap-1.5">
                  <Button
                    className="size-6 bg-[oklch(1_0_0/.2)] rounded-full text-white"
                    size="icon"
                  >
                    <Mic className="size-3" />
                  </Button>
                  <Button
                    className="size-6 bg-[oklch(1_0_0/.2)] rounded-full text-white"
                    size="icon"
                  >
                    <Video className="size-3" />
                  </Button>
                  <Button
                    className="size-6 bg-[oklch(1_0_0/.2)] rounded-full text-white"
                    size="icon"
                  >
                    <RefreshCcw className="size-3" />
                  </Button>
                </div>
              </div>
              <div className="left-1/2 -translate-x-1/2 bg-[oklch(0.205_0_0/.85)] shadow-lg rounded-full flex absolute bottom-4 p-2 items-center gap-2">
                <Button
                  className="size-11 bg-[oklch(1_0_0/.12)] rounded-full text-white"
                  size="icon"
                >
                  <MicOff className="size-5" />
                </Button>
                <Button
                  className="size-11 bg-[oklch(1_0_0/.12)] rounded-full text-white"
                  size="icon"
                >
                  <VideoOff className="size-5" />
                </Button>
                <Button
                  className="size-11 rounded-full bg-[#e7000b] text-white"
                  size="icon"
                >
                  <PhoneOff className="size-5" />
                </Button>
              </div>
            </section>
            <section className="rounded-2xl bg-white border-neutral-200 border-1 border-solid flex flex-col overflow-hidden">
              <div className="border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 py-3 justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-[oklch(0.7_0.18_150)] rounded-full" />
                  <span className="font-semibold text-sm leading-5">
                    Stranger
                  </span>
                </div>
                <span className="text-neutral-500 text-xs leading-4">
                  Live chat
                </span>
              </div>
              <div className="overflow-y-auto flex p-4 flex-col flex-1 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-medium rounded-full bg-neutral-100 text-neutral-500 text-[11px] px-3 py-1">
                    You are now chatting with a random stranger
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <div className="max-w-[80%] rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-neutral-100 text-neutral-950 text-sm leading-5 px-4 py-2.5">
                    Hey there! How's it going?
                  </div>
                  <span className="text-neutral-500 text-[10px] px-1">
                    10:42
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="max-w-[80%] rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl bg-blue-600 text-white text-sm leading-5 px-4 py-2.5">
                    Pretty good! Just chilling. Where are you from?
                  </div>
                  <span className="text-neutral-500 text-[10px] px-1">
                    10:42
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <div className="max-w-[80%] rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-neutral-100 text-neutral-950 text-sm leading-5 px-4 py-2.5">
                    I'm from Berlin! And you?
                  </div>
                  <span className="text-neutral-500 text-[10px] px-1">
                    10:43
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="max-w-[80%] rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl bg-blue-600 text-white text-sm leading-5 px-4 py-2.5">
                    Nice! I'm in Toronto. Love the time zone chaos here 😅
                  </div>
                  <span className="text-neutral-500 text-[10px] px-1">
                    10:43
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <div className="max-w-[80%] rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-neutral-100 text-neutral-950 text-sm leading-5 px-4 py-2.5">
                    Haha totally. So what brings you to Omegal today?
                  </div>
                  <span className="text-neutral-500 text-[10px] px-1">
                    10:44
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="max-w-[80%] rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl bg-blue-600 text-white text-sm leading-5 px-4 py-2.5">
                    Just looking to meet interesting people. You seem cool!
                  </div>
                  <span className="text-neutral-500 text-[10px] px-1">
                    10:44
                  </span>
                </div>
              </div>
              <div className="border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex px-4 py-3 items-center gap-2">
                <div className="rounded-xl bg-neutral-100 flex px-3 items-center flex-1 gap-2 h-11">
                  <MessageSquare className="size-4 text-neutral-500" />
                  <input
                    className="bg-transparent outline-none text-sm leading-5 flex-1"
                    id="messagebox"
                    placeholder="Type a message..."
                    type="text"
                  />
                </div>
                <Button
                  className="size-11 rounded-xl bg-neutral-900 text-neutral-50"
                  size="icon"
                >
                  <Send className="size-4" />
                </Button>
                <Button
                  className="font-medium rounded-xl text-sm leading-5 gap-2 h-11"
                  variant="outline"
                >
                  <SkipForward className="size-4" />
                  Next
                </Button>
              </div>
            </section>
          </main>
          <footer className="bg-white border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex px-8 py-4 items-center gap-4">
            <Button className="font-medium rounded-xl bg-[#e7000b] text-white gap-2 h-12">
              <PhoneOff className="size-4" />
              Stop
            </Button>
            <Button
              className="font-medium rounded-xl gap-2 h-12"
              variant="outline"
            >
              <SkipForward className="size-4" />
              Next
            </Button>
            <div className="rounded-xl bg-neutral-100 flex px-4 items-center flex-1 gap-2 h-12">
              <MessageSquare className="size-4 text-neutral-500" />
              <input
                className="bg-transparent outline-none text-sm leading-5 flex-1"
                placeholder="Type a message..."
                type="text"
              />
            </div>
            <Button
              className="size-12 rounded-xl bg-neutral-900 text-neutral-50"
              size="icon"
            >
              <Send className="size-5" />
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}
