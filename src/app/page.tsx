import Table from "@/components/Table";
// import { InstallPrompt, PushNotificationManager } from "@/components";
import { Suspense } from "react";
import { Title } from "@/components";
import { getTitle } from "@/utils";
import { APP_VERSION, PAGE_DESCRIPTION } from "@/constants";
import { Spinner } from "flowbite-react";

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
      <main className="flex flex-col items-center h-full gap-4 print:gap-0">
        <Title className="print:hidden" />

        <Suspense
          fallback={
            <Spinner
              className="my-20"
              aria-label="Cədvəl Yüklənir..."
              color="gray"
              size="xl"
            />
          }
        >
          <Table />
        </Suspense>
        <footer className="mt-16 text-xs print:hidden">v{APP_VERSION}</footer>
      </main>
    </>
  );
}
