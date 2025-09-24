import type { Timetable } from "@/types";
import timelineData from "../../public/cedvel.json";
import Table from "@/components/table";
// import { InstallPrompt, PushNotificationManager } from "@/components";
import { Suspense } from "react";
import { Title } from "@/components";
import { getTitle } from "@/utils";
import { PAGE_DESCRIPTION } from "@/constants";
import { Spinner } from "flowbite-react";

let originalData = timelineData as any as Timetable;

originalData = {
  ...originalData,
  teachers: originalData.teachers.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  ),
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { teacher, class: className } = await searchParams;

  const title = getTitle({
    className,
    teacher,
  });

  return {
    title: title,
    description: PAGE_DESCRIPTION,
  };
}

export default function Home() {
  return (
    <>
      {/* <PushNotificationManager /> */}
      {/* <InstallPrompt /> */}
      <main className="flex flex-col items-center gap-4 print:gap-0">
        <Title className="print:hidden" />

        <Suspense
          fallback={<Spinner aria-label="Cədvəl Yüklənir..." size="xl" />}
        >
          <Table originalData={originalData} />
        </Suspense>
      </main>
    </>
  );
}
