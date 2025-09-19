import { Teacher, Timetable } from "@/types";
import { cn } from "@/utils";
import { ListGroup, ListGroupItem } from "flowbite-react";

interface Props {
  data: Timetable;
  selectedTeacherId?: Teacher["id"];
}

export function TeacherTimetable({ data, selectedTeacherId }: Props) {
  if (!selectedTeacherId) return null;

  return (
    <ListGroup className="w-full max-w-xs border-2 border-gray-400 text-lg md:w-2/3 dark:border-gray-400">
      {data.activities
        .filter(({ teacherIds }) => teacherIds.includes(selectedTeacherId))
        .reduce((acc, { subjectId, groupIds, cards }) => {
          const classObj = data.classes.find((cl) =>
            cl.groupSets.some((group) =>
              group.groups.some((gr) => groupIds.includes(gr.id)),
            ),
          );

          return [
            ...acc,
            ...cards.map((card) => ({
              ...card,
              subjectId,
              classObj: classObj,
            })),
          ];
        }, [])
        .toSorted((a, b) => {
          const aDay = data.days.find((day) => day.id === a.dayId);
          const bDay = data.days.find((day) => day.id === b.dayId);

          if (aDay.position < bDay.position) return -1;
          if (aDay.position > bDay.position) return 1;

          const aPeriod = data.periods.find(
            (period) => period.id === a.periodId,
          );
          const bPeriod = data.periods.find(
            (period) => period.id === b.periodId,
          );

          return aPeriod.position - bPeriod.position;
        })
        .map(({ id, classObj, dayId, periodId, subjectId }, i, arr) => {
          const day = data.days.find((day) => day.id === dayId);
          const period = data.periods.find((period) => period.id === periodId);
          const subject = data.subjects.find(
            (subject) => subject.id === subjectId,
          );
          const viewIndex = data.views
            .filter((view) => !view.isDefault)
            .findIndex((view) => view.entityIds.includes(classObj.id));
          const position =
            viewIndex > 0 ? period.position - 6 : period.position;
          const isPrevDifferentDay =
            arr[i - 1] && arr[i].dayId !== arr[i - 1].dayId;

          return (
            <ListGroupItem
              className={cn("border-gray-400 dark:border-gray-400", {
                "border-t": i > 0,
                "border-t-6": isPrevDifferentDay,
              })}
              key={id}
            >
              <div className="flex w-full gap-3 truncate">
                <span>{day.shortName}</span>
                <span>{position}.</span>
                <span className="font-bold">{classObj.name}</span>
                <span>({subject.name})</span>
              </div>
            </ListGroupItem>
          );
        })}
    </ListGroup>
  );
}
