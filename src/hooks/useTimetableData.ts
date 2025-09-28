import { useMemo } from "react";
import type { TeacherTimetable } from "@/types";
import { timetable } from "@/constants";

export function useTimetableData(
  selectedTeacherId: string,
  selectedClassId: string,
) {
  return useMemo(() => {
    let activities = selectedTeacherId
      ? timetable.activities.filter((activity) =>
          activity.teacherIds.includes(selectedTeacherId),
        )
      : timetable.activities;

    if (selectedClassId) {
      activities = activities.filter((activity) =>
        activity.groupIds.some((groupId) =>
          timetable.classes
            .find((cl) => cl.id === selectedClassId)
            ?.groupSets.some(({ groups }) =>
              groups.some((group) => group.id === groupId),
            ),
        ),
      );
    }

    const selectedTeacherGroupIds = selectedTeacherId
      ? activities.reduce(
          (acc, activity) => [...new Set([...acc, ...activity.groupIds])],
          [],
        )
      : null;
    let classes =
      selectedTeacherId && selectedTeacherGroupIds
        ? timetable.classes.filter((classObj) =>
            classObj.groupSets.some(({ groups }) =>
              groups.some(({ id }) => selectedTeacherGroupIds.includes(id)),
            ),
          )
        : timetable.classes;

    if (selectedClassId) {
      classes = classes.filter((cl) => cl.id === selectedClassId);
    }

    const selectedTeacherCards = selectedTeacherId
      ? timetable.activities
          .filter(({ teacherIds }) => teacherIds.includes(selectedTeacherId))
          .reduce(
            (acc, { subjectId, groupIds, cards }) => {
              const classObj = classes.find((cl) =>
                cl.groupSets.some((group) =>
                  group.groups.some((gr) => groupIds.includes(gr.id)),
                ),
              );

              if (!classObj) return acc;

              return [
                ...acc,
                ...cards.map((card) => ({
                  ...card,
                  subjectId,
                  classObj: classObj,
                })),
              ];
            },
            [] as TeacherTimetable["selectedTeacherCards"],
          )
          .toSorted((a, b) => {
            const aDay = timetable.days.find((day) => day.id === a.dayId);
            const bDay = timetable.days.find((day) => day.id === b.dayId);

            if (aDay.position < bDay.position) return -1;
            if (aDay.position > bDay.position) return 1;

            const aPeriod = timetable.periods.find(
              (period) => period.id === a.periodId,
            );
            const bPeriod = timetable.periods.find(
              (period) => period.id === b.periodId,
            );

            return aPeriod.position - bPeriod.position;
          })
      : [];
    let views = timetable.views.filter((view) => !view.isDefault);

    views = selectedTeacherId
      ? views.filter((view) =>
          view.entityIds?.some((classId) =>
            classes.some((cl) => cl.id === classId),
          ),
        )
      : views;

    return {
      ...timetable,
      views,
      classes,
      activities,
      selectedTeacherCards,
    } as TeacherTimetable;
  }, [selectedTeacherId, selectedClassId]);
}
