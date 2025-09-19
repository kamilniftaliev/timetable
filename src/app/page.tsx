import type { Timetable } from "@/types";
import timelineData from "../../public/cedvel.json";
import Table from "@/components/table";
// import { InstallPrompt, PushNotificationManager } from "@/components";
import { TITLE } from "@/constants";

const originalData = timelineData as any as Timetable;

export default function Home() {
  return (
    <>
      {/* <PushNotificationManager /> */}
      {/* <InstallPrompt /> */}
      <main className="flex flex-col items-center gap-4">
        <h1 className="w-full px-6 text-center text-2xl font-bold md:w-2/3">
          {TITLE} (22 Sentyabr 2025)
        </h1>

        <Table originalData={originalData} />
      </main>
    </>
  );
}
