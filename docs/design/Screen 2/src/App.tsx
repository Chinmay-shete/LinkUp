import { useEffect } from "react";
import { MessageCircle, Settings, Sparkles, Video } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="relative flex flex-col w-full h-239 overflow-hidden">
          <header className="sticky z-20 bg-white border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex top-0 px-8 justify-between items-center w-full h-16">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-xl bg-neutral-900 text-neutral-50 flex justify-center items-center">
                <MessageCircle className="size-5" />
              </div>
              <span className="font-extrabold text-neutral-950 text-xl leading-7 tracking-tight">
                Omegal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="font-medium text-neutral-950 text-sm leading-5 px-3 gap-2 h-9"
                variant="ghost"
              >
                <Sparkles className="size-4" />
                Interests
              </Button>
              <Button
                className="size-9 text-neutral-500"
                size="icon"
                variant="ghost"
              >
                <Settings className="size-5" />
              </Button>
              <Avatar className="size-9 border-neutral-200 border-1 border-solid">
                <AvatarFallback className="font-semibold bg-neutral-100 text-neutral-900 text-xs leading-4">
                  ME
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="relative flex px-8 justify-center items-center flex-1">
            <div className="pointer-events-none -z-10 absolute inset-0 overflow-hidden">
              <div className="left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,oklch(0.55_0.22_264/.08),transparent_70%)] rounded-full absolute" />
            </div>
            <div className="max-w-3xl text-center flex flex-col items-center gap-8 w-full">
              <div className="rounded-full bg-neutral-100 border-neutral-200 border-1 border-solid flex px-4 py-1.5 items-center gap-2">
                <span className="size-2 bg-[oklch(0.55_0.22_264)] rounded-full flex" />
                <span className="font-medium text-neutral-500 text-xs leading-4">
                  No registration. 100% anonymous.
                </span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <h1 className="leading-tight font-extrabold text-neutral-950 text-5xl leading-12 tracking-tight">
                  Connect with random strangers instantly.
                </h1>
                <p className="max-w-xl text-neutral-500 text-lg leading-7">
                  No registration required. Instant text chat and peer-to-peer
                  video calls.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Button className="bg-[oklch(0.55_0.22_264)] font-semibold rounded-xl text-white text-base leading-6 px-7 gap-2 h-12">
                  <MessageCircle className="size-5" />
                  Start Text Chat
                </Button>
                <Button
                  className="font-semibold rounded-xl text-neutral-950 text-base leading-6 border-neutral-200 border-0 border-solid px-7 gap-2 h-12"
                  variant="outline"
                >
                  <Video className="size-5" />
                  Video Call Mode
                </Button>
              </div>
              <div className="max-w-2xl border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex mt-4 pt-8 justify-center items-center gap-8 w-full">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-neutral-950 text-2xl leading-8">
                    2.4M
                  </span>
                  <span className="text-neutral-500 text-xs leading-4">
                    Active chats
                  </span>
                </div>
                <div className="bg-neutral-200 w-px h-10" />
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-neutral-950 text-2xl leading-8">
                    190+
                  </span>
                  <span className="text-neutral-500 text-xs leading-4">
                    Countries
                  </span>
                </div>
                <div className="bg-neutral-200 w-px h-10" />
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-neutral-950 text-2xl leading-8">{`<3s`}</span>
                  <span className="text-neutral-500 text-xs leading-4">
                    Avg. match time
                  </span>
                </div>
              </div>
            </div>
          </main>
          <footer className="bg-white border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex px-8 py-6 justify-between items-center w-full">
            <span className="text-neutral-500 text-sm leading-5">
              © 2026 Omegal. Made in India.
            </span>
            <nav className="flex items-center gap-6">
              <a className="text-neutral-500 text-sm leading-5" href="#">
                Terms of Service
              </a>
              <a className="text-neutral-500 text-sm leading-5" href="#">
                Privacy Policy
              </a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
