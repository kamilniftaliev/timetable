import { POSITION_SUFFIX } from "@/constants";
import { Timetable } from "@/types";
import { cn, getPeriodPosition, getShiftText } from "@/utils";
import { ListGroup, ListGroupItem } from "flowbite-react";

interface Props {
  data: Timetable;
  selectedTeacherCards?: any[];
}

export function TeacherActivityList({ data, selectedTeacherCards }: Props) {
  if (!selectedTeacherCards.length) return null;

  const shiftText = getShiftText(data);

  return (
    <div className="w-full max-w-sm md:w-2/3 print:hidden">
      <p className="text-center text-xl font-bold">
        {shiftText} toplam {selectedTeacherCards.length} dərs
      </p>
      <ListGroup className="mt-4 w-full border-2 border-gray-400 text-lg dark:border-gray-400">
        {selectedTeacherCards.map(
          ({ id, classObj, dayId, periodId, subjectId }, i, arr) => {
            const day = data.days.find((day) => day.id === dayId);
            const period = data.periods.find(
              (period) => period.id === periodId,
            );
            const subject = data.subjects.find(
              (subject) => subject.id === subjectId,
            );
            const position = getPeriodPosition(data, classObj, period);
            const isPrevDifferentDay =
              arr[i - 1] && arr[i].dayId !== arr[i - 1].dayId;
            const have2Shifts = data.views.length === 2;
            const classShiftIndex = have2Shifts
              ? data.views.findIndex((view) =>
                  view.entityIds.includes(classObj.id),
                )
              : 0;

            return (
              <ListGroupItem
                className={cn(
                  "teacher-timeline-list-item border-gray-400 dark:border-gray-400",
                  {
                    "border-t": i > 0,
                    "border-t-4": isPrevDifferentDay,
                  },
                )}
                key={id}
              >
                <div className="flex w-full gap-1.5 truncate">
                  <span>{day.shortName}</span>
                  {have2Shifts && <span>{classShiftIndex + 1}-ая см.</span>}
                  <span>
                    {position}-{POSITION_SUFFIX[position]} урок
                  </span>
                  <span>
                    <span className="font-bold uppercase">{classObj.name}</span>{" "}
                    кл.
                  </span>
                  <span>({subject.shortName})</span>
                </div>
              </ListGroupItem>
            );
          },
        )}
      </ListGroup>
    </div>
  );
}
