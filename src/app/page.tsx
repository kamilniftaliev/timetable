import type { Timetable } from "@/types";
import timelineData from "../../public/cedvel.json";
import Table from "@/components/table";
// import { InstallPrompt, PushNotificationManager } from "@/components";
import { Suspense } from "react";
import { Title } from "@/components";

let originalData = timelineData as any as Timetable;

originalData = {
  ...originalData,
  teachers: originalData.teachers.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  ),
};

export default function Home() {
  return (
    <>
      {/* <PushNotificationManager /> */}
      {/* <InstallPrompt /> */}
      <main className="flex flex-col items-center gap-4 print:gap-0">
        <Title className="print:hidden" />

        <Suspense fallback={<h1>Yüklənir...</h1>}>
          <Table originalData={originalData} />
        </Suspense>
      </main>
    </>
  );
}
