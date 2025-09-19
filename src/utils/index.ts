import type {
  Class,
  Day,
  Period,
  Teacher,
  TeacherTimetable,
  Timetable,
  View,
} from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
    `h-8 min-w-38 w-38 max-h-8 min-h-8 py-1 px-2 text-center truncate`,
    {
      "border-l": classIndex > 0,
    },
  );
}

export function getSubjectName(
  data: Timetable,
  cl: Class,
  day: Day,
  period: Period,
) {
  let subjectName = "";

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

  if (activity) {
    subjectName =
      data.subjects.find((subject) => subject.id === activity.subjectId)
        ?.name || "";
  }

  return subjectName;
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
