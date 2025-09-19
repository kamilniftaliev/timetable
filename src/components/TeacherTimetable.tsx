import { POSITION_SUFFIX } from "@/constants";
import { Teacher, Timetable } from "@/types";
import { cn, getPeriodPosition } from "@/utils";
import { ListGroup, ListGroupItem } from "flowbite-react";

interface Props {
  data: Timetable;
  selectedTeacherCards?: any[];
}

export function TeacherTimetable({ data, selectedTeacherCards }: Props) {
  if (!selectedTeacherCards.length) return null;

  return (
    <div className="w-full max-w-xs md:w-2/3">
      <p className="text-center text-xl font-bold">
        Toplam {selectedTeacherCards.length} dərs
      </p>
      <ListGroup className="mt-4 w-full max-w-xs border-2 border-gray-400 text-lg dark:border-gray-400">
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
                  <span>
                    {position}-{POSITION_SUFFIX[position]} урок
                  </span>
                  <span>
                    <span className="font-bold uppercase">{classObj.name}</span>{" "}
                    кл.
                  </span>
                  <span>({subject.name})</span>
                </div>
              </ListGroupItem>
            );
          },
        )}
      </ListGroup>
    </div>
  );
}
