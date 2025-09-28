import type {
  Class,
  Day,
  Period,
  Teacher,
  TeacherTimetable,
  Timetable,
  View,
} from "@/types";

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

export function getDays(data: Timetable, selectedTeacherId: Teacher["id"]) {
  return selectedTeacherId
    ? data.days.filter((day) =>
        data.activities.some((activity) =>
          activity.cards.some((card) => card.dayId === day.id),
        ),
      )
    : data.days;
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
