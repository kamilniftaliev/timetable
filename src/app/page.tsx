import type { Timetable } from "@/types";
import timelineData from "../../public/cedvel.json";
import Table from "@/components/table";

const originalData = timelineData as any as Timetable;

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="text-center text-3xl font-bold md:w-1/2">
        Xaçmaz şəhəri Akademik Zərifə Əliyeva adına 8 nömrəli təbiət təmayüllü
        liseyin rus bölməsi üzrə cədvəl (22 Sentyabr 2025)
      </h1>

      <Table originalData={originalData} />
    </main>
  );
}
