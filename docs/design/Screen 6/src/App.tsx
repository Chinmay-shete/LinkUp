import { useEffect } from "react";
import {
  Flag,
  MessageCircle,
  MessageSquare,
  Mic,
  PhoneOff,
  RefreshCcw,
  Send,
  Settings,
  SkipForward,
  Sparkles,
  User,
  UserSearch,
  Video,
  VolumeX,
  WifiOff,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="flex flex-col w-285 h-239">
          <header className="sticky z-20 bg-white border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex top-0 px-8 py-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-xl bg-neutral-900 text-neutral-50 flex justify-center items-center">
                <MessageCircle className="size-5" />
              </div>
              <span className="font-bold text-neutral-950 text-lg leading-7 tracking-tight">
                Omegal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="font-medium text-neutral-950 text-sm leading-5 gap-2"
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
          <main className="grid grid-cols-2 min-h-0 px-8 py-6 flex-1 gap-6">
            <div className="grid grid-cols-1 min-h-0 gap-6">
              <div className="relative rounded-2xl bg-neutral-900 border-neutral-200 border-1 border-solid overflow-hidden">
                <img
                  alt="Stranger"
                  className="object-cover grayscale opacity-20 absolute inset-0 w-full h-full"
                  data-authorname="Richard Jaimes"
                  data-authorurl="https://unsplash.com/@richardconr"
                  data-blurhash="LD6*t1t78_M{_NozDiRj%hofMxWB"
                  data-photoid="4B6-E8c7t9I"
                  src="https://images.unsplash.com/photo-1516117525866-d85459db7457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB2aWRlbyUyMGNhbGwlMjBwb3J0cmFpdCUyMGRhcmslMjByb29tfGVufDF8MXx8fDE3ODA1MDczNDB8MA&ixlib=rb-4.1.0&q=80&w=400"
                />
                <div className="bg-neutral-900/70 absolute inset-0" />
                <div className="z-10 absolute left-4 top-4">
                  <Badge className="backdrop-blur-sm bg-neutral-800/80 text-neutral-300 border-black/1 border-0 border-solid gap-1.5">
                    <span className="size-2 rounded-full bg-neutral-500" />
                    Disconnected · Stranger
                  </Badge>
                </div>
                <div className="z-10 flex absolute inset-0 flex-col justify-center items-center gap-2">
                  <WifiOff className="size-10 text-neutral-600" />
                  <span className="font-medium text-neutral-500 text-sm leading-5">
                    Stream ended
                  </span>
                </div>
                <div className="z-10 flex absolute left-4 bottom-4 items-center gap-2">
                  <div className="size-9 rounded-lg bg-neutral-800/60 text-neutral-600 flex justify-center items-center">
                    <VolumeX className="size-4" />
                  </div>
                  <div className="size-9 rounded-lg bg-neutral-800/60 text-neutral-600 flex justify-center items-center">
                    <Flag className="size-4" />
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl bg-neutral-900 border-neutral-200 border-1 border-solid overflow-hidden">
                <img
                  alt="You"
                  className="object-cover opacity-60 absolute inset-0 w-full h-full"
                  data-authorname="Jurica Koletić"
                  data-authorurl="https://unsplash.com/@juricakoletic"
                  data-blurhash="LHDcj=%MGcE2~XV?OaR+ELNFwHs."
                  data-photoid="7YVZYZeITc8"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXwxfHx8MTc4MDMxOTQ3Nnww&ixlib=rb-4.1.0&q=80&w=400"
                />
                <div className="bg-gradient-to-t from-neutral-900/60 to-transparent absolute inset-0" />
                <div className="z-10 absolute left-4 top-4">
                  <Badge className="backdrop-blur-sm bg-neutral-800/80 text-neutral-200 border-black/1 border-0 border-solid gap-1.5">
                    <User className="size-3" />
                    You
                  </Badge>
                </div>
                <div className="z-10 flex absolute left-4 bottom-4 items-center gap-2">
                  <div className="size-9 rounded-lg bg-neutral-800/70 text-neutral-200 flex justify-center items-center">
                    <Mic className="size-4" />
                  </div>
                  <div className="size-9 rounded-lg bg-neutral-800/70 text-neutral-200 flex justify-center items-center">
                    <Video className="size-4" />
                  </div>
                  <div className="size-9 rounded-lg bg-neutral-800/70 text-neutral-200 flex justify-center items-center">
                    <RefreshCcw className="size-4" />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative min-h-0 rounded-2xl bg-white border-neutral-200 border-1 border-solid flex flex-col overflow-hidden">
              <div className="border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-6 py-4 justify-between items-center">
                <span className="font-semibold text-neutral-950 text-sm leading-5">
                  Conversation
                </span>
                <Badge
                  className="text-neutral-500 text-xs leading-4"
                  variant="secondary"
                >
                  Ended
                </Badge>
              </div>
              <div className="overflow-y-auto opacity-60 flex px-6 py-4 flex-col flex-1 gap-4">
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-neutral-100 text-neutral-950 text-sm leading-5 px-4 py-2">
                    Hey there! How's it going?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl bg-blue-600 text-white text-sm leading-5 px-4 py-2">
                    Pretty good, just exploring this app for the first time.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-neutral-100 text-neutral-950 text-sm leading-5 px-4 py-2">
                    Same here! Where are you from?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl bg-blue-600 text-white text-sm leading-5 px-4 py-2">
                    I'm based in Lisbon. Beautiful city, you should visit
                    sometime.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-neutral-100 text-neutral-950 text-sm leading-5 px-4 py-2">
                    That sounds amazing. I've always wanted to go to Portugal!
                  </div>
                </div>
              </div>
              <div className="pointer-events-none opacity-50 border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid px-6 py-4">
                <div className="rounded-xl bg-neutral-100 flex px-4 items-center gap-2 h-11">
                  <MessageSquare className="size-4 text-neutral-500" />
                  <span className="text-neutral-500 text-sm leading-5">
                    Messaging disabled
                  </span>
                </div>
              </div>
              <div className="z-10 backdrop-blur-sm bg-neutral-950/10 flex absolute inset-0 p-8 justify-center items-center">
                <Card className="max-w-md shadow-xl rounded-2xl bg-white border-red-600/15 border-1 border-solid p-8 gap-6 w-full">
                  <CardHeader className="text-center p-0 items-center gap-4">
                    <div className="size-16 rounded-full bg-red-600/10 flex justify-center items-center">
                      <WifiOff className="size-8 text-red-600" />
                    </div>
                    <CardTitle className="font-bold text-neutral-950 text-xl leading-7">
                      The stranger has disconnected from the room.
                    </CardTitle>
                    <CardDescription className="text-neutral-500 text-sm leading-5">
                      The session has ended. Start a new match to keep chatting.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-0">
                    <Button className="font-semibold rounded-xl bg-blue-600 text-white text-sm leading-5 gap-2 w-full h-12">
                      <UserSearch className="size-5" />
                      Find a New Stranger
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </main>
          <footer className="bg-white border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex px-8 py-4 items-center gap-4">
            <Button className="font-medium rounded-xl bg-red-600 text-white px-5 gap-2 h-12">
              <PhoneOff className="size-4" />
              Stop
            </Button>
            <Button
              className="font-medium rounded-xl px-5 gap-2 h-12"
              variant="outline"
            >
              <SkipForward className="size-4" />
              Next
            </Button>
            <div className="pointer-events-none opacity-50 rounded-xl bg-neutral-100 flex px-4 items-center flex-1 gap-2 h-12">
              <MessageSquare className="size-4 text-neutral-500" />
              <span className="text-neutral-500 text-sm leading-5">
                Type a message...
              </span>
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
