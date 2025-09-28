import { POSITION_SUFFIX } from "@/constants";
import { TeacherTimetable, Timetable } from "@/types";
import { cn, getPeriodPosition, getShiftText, getLessonSuffix } from "@/utils";
import { ListGroup, ListGroupItem } from "flowbite-react";

interface Props {
  data: Timetable;
  selectedTeacherCards?: TeacherTimetable["selectedTeacherCards"];
}

export function TeacherActivityList({ data, selectedTeacherCards }: Props) {
  if (!selectedTeacherCards.length) return null;

  const shiftText = getShiftText(data);

  const groupedByClass = Object.entries(
    selectedTeacherCards.reduce(
      (acc, card) => {
        const className = card.classObj.name;

        return {
          ...acc,
          [className]: acc[className] ? acc[className] + 1 : 1,
        };
      },
      {} as Record<string, number>,
    ),
  ).toSorted(([classA], [classB]) => parseInt(classA) - parseInt(classB));

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 md:max-w-full md:items-center print:hidden">
      <p className="text-center text-xl font-bold">
        {shiftText} toplam {selectedTeacherCards.length} dərs
      </p>

      <div className="flex w-full flex-col items-start justify-center gap-4 md:flex-row">
        {groupedByClass.length > 1 && (
          <ListGroup className="mx-auto w-56 border-2 border-gray-400 text-lg md:mx-0 dark:border-gray-400">
            {groupedByClass.map(([className, amount], i) => {
              return (
                <ListGroupItem
                  className={cn(
                    "teacher-timeline-list-item border-gray-400 dark:border-gray-400",
                    {
                      "border-t": i > 0,
                    },
                  )}
                  key={className}
                >
                  <div className="flex w-full justify-center gap-1.5 truncate">
                    <span className="font-bold uppercase">{className}</span>
                    <span>
                      класс - {amount} {getLessonSuffix(amount)}
                    </span>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}

        <ListGroup className="w-full border-2 border-gray-400 text-lg md:w-80 dark:border-gray-400">
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
                      <span className="font-bold uppercase">
                        {classObj.name}
                      </span>{" "}
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
    </div>
  );
}
