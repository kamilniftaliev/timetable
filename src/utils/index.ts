import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import "moment/locale/az";
import type {
  Class,
  Day,
  Period,
  Teacher,
  TeacherTimetable,
  Timetable,
  View,
} from "@/types";

moment.locale("az");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPeriodPosition(
  data: Timetable,
  classObj: Class,
  period: Period,
) {
  const view =
    data.views.length === 1
      ? data.views[0]
      : data.views.find((view) => view.entityIds.includes(classObj.id));

  const isFirstShift = view.name.includes("1");

  const position = isFirstShift ? period.position : period.position - 6;

  return position;
}

export function getShiftText(data: Timetable) {
  const shiftName =
    data.views.length === 1 ? `Yalnız ${data.views[0].name}` : "Hər iki növbə";

  return `${shiftName} üzrə`;
}

export function getViewPeriods(
  data: TeacherTimetable,
  view: View,
  selectedTeacherId: Teacher["id"],
) {
  const periodPositions = selectedTeacherId
    ? data.selectedTeacherCards.reduce(
        (acc, card) => {
          const cardPeriod = data.periods.find(
            (period) => card.periodId === period.id,
          );

          return {
            ...acc,
            min: acc.min > cardPeriod.position ? cardPeriod.position : acc.min,
            max: acc.max < cardPeriod.position ? cardPeriod.position : acc.max,
          };
        },
        {
          min: data.periods.length + 1,
          max: 0,
        },
      )
    : null;

  const periods = data.periods.filter((period) => {
    const isExcluded = view.excludedPeriodIds?.includes(period.id);

    if (isExcluded) return false;

    if (!selectedTeacherId) return true;

    return (
      period.position >= periodPositions.min &&
      period.position <= periodPositions.max
    );
  });

  return periods;
}

export function getCellClass(classIndex: number) {
  return cn(
    `w-38 print:w-auto print:text-[10px] py-1 px-2 print:px-0.5 print:py-0 text-center truncate`,
    {
      "border-l": classIndex > 0,
    },
  );
}

export function getSubject(
  data: Timetable,
  cl: Class,
  day: Day,
  period: Period,
) {
  const activity = data.activities.find(
    (activity) =>
      activity.groupIds.some((groupId) =>
        cl.groupSets.some((group) =>
          group.groups.some((gr) => gr.id === groupId),
        ),
      ) &&
      activity.cards.some(
        (card) => card.dayId === day.id && card.periodId === period.id,
      ),
  );

  return (
    activity &&
    data.subjects.find((subject) => subject.id === activity.subjectId)
  );
}

export function getDays(data: Timetable, selectedTeacherId: Teacher["id"]) {
  return selectedTeacherId
    ? data.days.filter((day) =>
        data.activities.some((activity) =>
          activity.cards.some((card) => card.dayId === day.id),
        ),
      )
    : data.days;
}

export function getTitle({
  shiftNumber = 0,
  teacher,
  className,
}: {
  shiftNumber?: number;
  teacher?: string;
  className?: string;
} = {}) {
  let title = `Xaçmaz şəhəri Akademik Zərifə Əliyeva adına 8 nömrəli təbiət təmayüllü liseyin rus bölməsi ${shiftNumber ? `${shiftNumber}-ci növbə` : ""} üzrə cədvəli`;

  if (teacher) {
    title = `${teacher} üçün ${className ? `${className} sinfi üzrə ` : ""} cədvəl`;
  } else if (className) {
    title = `${className} sinfi üzrə cədvəl`;
  }

  return title.replaceAll(/\s+/g, " ");
}

export function getNextMondayDate() {
  // Get next week's Monday
  const nextMonday = moment().add(1, "weeks").startOf("isoWeek");

  // Format as "D MMMM YYYY"
  return nextMonday
    .format("D MMMM YYYY")
    .replace(/\b\p{L}/u, (c) => c.toUpperCase());
}
