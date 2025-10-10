"use client";

import { Suspense } from "react";
import { Title } from "@/components";
import { getTitle } from "@/utils";
import { APP_VERSION, PAGE_DESCRIPTION, timetable } from "@/constants";
import { Spinner } from "flowbite-react";

// export async function generateMetadata({
//   searchParams,
// }: {
//   searchParams: Promise<Record<string, string>>;
// }) {
//   const { teacher, class: className } = await searchParams;

//   const title = getTitle({
//     className,
//     teacher,
//   });

//   return {
//     title: title,
//     description: PAGE_DESCRIPTION,
//   };
// }

console.log("timetable", timetable);

// const classes = timetable.classes
//   .reduce(
//     (
//       acc,
//       {
//         name,
//         shortName,
//         marks,
//         startOnFirstPeriod,
//         forbidGaps,
//         groupsFinishTogether,
//         maxDiff,
//       },
//     ) => {
//       let classStr = `${name}\t${name}\t${marks}\t${+startOnFirstPeriod}\t${+forbidGaps}\t${+groupsFinishTogether}\t${maxDiff}`;

//       return `
// ${acc}
// ${classStr}`;
//     },
//     "",
//   )
//   .trim();
const activities = timetable.activities
  .reduce((acc, { subjectId, teacherIds, groupIds, cards }) => {
    const subject = timetable.subjects.find((s) => s.id === subjectId)!;
    const teachers = timetable.teachers
      .filter((t) => teacherIds.includes(t.id))
      .map((t) => t.name)
      .join(",");
    const classes = timetable.classes
      .filter((c) =>
        c.groupSets.find(
          (gs) =>
            groupIds.includes(gs.id) ||
            gs.groups.find((group) => groupIds.includes(group.id)),
        ),
      )
      .map((c) => c.name)
      .join(",");
    const lessonCount = cards.length;
    let activityStr = `${subject.name} {${subject.shortName}}\t${teachers}\t${classes}\t\t${lessonCount}\t1`;

    return `
${acc}
${activityStr}`;
  }, "")
  .trim();

export default function Home() {
  return (
    <main className="flex flex-col items-center h-full gap-4 print:gap-0">
      <Title className="print:hidden" />

      <textarea
        className="dark:text-wh§ h-36 w-xl border-2 border-black bg-white dark:bg-black"
        defaultValue={activities}
      ></textarea>
      <footer className="mt-16 text-xs print:hidden">v{APP_VERSION}</footer>
    </main>
  );
}
