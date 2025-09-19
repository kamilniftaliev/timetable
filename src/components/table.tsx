"use client";

import type { TeacherTimetable, Timetable } from "@/types";
import {
  cn,
  getCellClass,
  getDays,
  getPeriodPosition,
  getSubjectName,
  getViewPeriods,
} from "@/utils";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Label, Select } from "flowbite-react";
import { TeacherActivityList } from "./TeacherActivityList";
import { TABLE_CLASSES } from "@/constants";

interface Props {
  originalData: Timetable;
}

export default function Table({ originalData }: Props) {
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  const onTeacherSelect = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const teacherId = event.target.value;

      setSelectedTeacherId(teacherId);
    },
    [],
  );

  const data = useMemo(() => {
    const activities = selectedTeacherId
      ? originalData.activities.filter((activity) =>
          activity.teacherIds.includes(selectedTeacherId),
        )
      : originalData.activities;

    const selectedTeacherGroupIds = selectedTeacherId
      ? activities.reduce(
          (acc, activity) => [...new Set([...acc, ...activity.groupIds])],
          [],
        )
      : null;
    const classes =
      selectedTeacherId && selectedTeacherGroupIds
        ? originalData.classes.filter((classObj) =>
            classObj.groupSets.some(({ groups }) =>
              groups.some(({ id }) => selectedTeacherGroupIds.includes(id)),
            ),
          )
        : originalData.classes;
    const selectedTeacherCards = selectedTeacherId
      ? originalData.activities
          .filter(({ teacherIds }) => teacherIds.includes(selectedTeacherId))
          .reduce((acc, { subjectId, groupIds, cards }) => {
            const classObj = originalData.classes.find((cl) =>
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
            const aDay = originalData.days.find((day) => day.id === a.dayId);
            const bDay = originalData.days.find((day) => day.id === b.dayId);

            if (aDay.position < bDay.position) return -1;
            if (aDay.position > bDay.position) return 1;

            const aPeriod = originalData.periods.find(
              (period) => period.id === a.periodId,
            );
            const bPeriod = originalData.periods.find(
              (period) => period.id === b.periodId,
            );

            return aPeriod.position - bPeriod.position;
          })
      : [];
    let views = originalData.views.filter((view) => !view.isDefault);

    views = selectedTeacherId
      ? views.filter((view) =>
          view.entityIds?.some((classId) =>
            classes.some((cl) => cl.id === classId),
          ),
        )
      : views;

    return {
      ...originalData,
      views,
      classes,
      activities,
      selectedTeacherCards,
    } as TeacherTimetable;
  }, [selectedTeacherId]);

  return (
    <>
      <div className="flex w-full flex-col items-center gap-2 md:w-auto">
        <Label className="text-xl font-semibold" htmlFor="teachers">
          Müəllim cədvəli:
        </Label>
        <Select
          onChange={onTeacherSelect}
          id="teachers"
          className="w-full max-w-sm text-lg font-medium md:w-sm"
        >
          <option value="" className="text-lg font-medium">
            Bütün Müəllimlər
          </option>
          {data.teachers.map((teacher) => (
            <option
              key={teacher.id}
              value={teacher.id}
              className="text-lg font-medium"
            >
              {teacher.name}
            </option>
          ))}
        </Select>
      </div>
      {!selectedTeacherId || data.selectedTeacherCards.length > 0 ? (
        <>
          <TeacherActivityList
            selectedTeacherCards={data.selectedTeacherCards}
            data={data}
          />
          <div className="flex w-full flex-col gap-8">
            {data.views.map((view) => {
              const classes = data.classes.filter((cl) =>
                view.entityIds?.includes(cl.id),
              );
              const periods = getViewPeriods(data, view, selectedTeacherId);
              const days = getDays(data, selectedTeacherId);

              const tableDataWidth = classes.length * 200 + 150;
              const dayNameMaxHeight = periods.length * 35;

              return classes.length ? (
                <div
                  key={view.id}
                  className="mt-8 flex flex-col justify-center gap-6"
                >
                  <h2 className="text-center text-3xl font-bold">
                    {view.name}
                  </h2>
                  <div className="max-w-[calc(100vw-40px)] overflow-auto md:max-w-[calc(100vw-80px)]">
                    <table className="mx-auto border-4 dark:border-white">
                      <tbody>
                        {days.map((day, dayIndex) => {
                          return periods.length ? (
                            <tr key={day.id} className="border-t-3">
                              <td
                                className={cn(
                                  "sticky left-0",
                                  TABLE_CLASSES.stickyCell,
                                )}
                              >
                                <span
                                  className="vertical-text -mb-1 w-7 truncate text-center font-bold text-ellipsis"
                                  style={{
                                    maxHeight: dayNameMaxHeight,
                                  }}
                                >
                                  {periods.length > 2
                                    ? day.name
                                    : day.shortName}
                                </span>
                              </td>
                              <td>
                                <table
                                  className="inner-table"
                                  style={{
                                    maxWidth: tableDataWidth,
                                  }}
                                >
                                  {dayIndex === 0 && (
                                    <thead>
                                      <tr>
                                        <th
                                          className={TABLE_CLASSES.numberCell}
                                        >
                                          <div
                                            className={
                                              TABLE_CLASSES.numberContainer
                                            }
                                          >
                                            #
                                          </div>
                                        </th>
                                        {classes.map((cl, classIndex) => (
                                          <th
                                            className={getCellClass(classIndex)}
                                            key={cl.id}
                                          >
                                            {cl.name}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                  )}
                                  <tbody>
                                    {periods.map((period, periodIndex) => {
                                      const position = getPeriodPosition(
                                        data,
                                        classes[0],
                                        period,
                                      );

                                      return (
                                        <tr
                                          className={cn(
                                            (periodIndex > 0 ||
                                              dayIndex === 0) &&
                                              "border-t",
                                          )}
                                          key={period.id}
                                        >
                                          <td
                                            className={TABLE_CLASSES.numberCell}
                                          >
                                            <div
                                              className={
                                                TABLE_CLASSES.numberContainer
                                              }
                                            >
                                              {position}
                                            </div>
                                          </td>
                                          {classes.map((cl, classIndex) => {
                                            const subjectName = getSubjectName(
                                              data,
                                              cl,
                                              day,
                                              period,
                                            );

                                            return (
                                              <td
                                                className={getCellClass(
                                                  classIndex,
                                                )}
                                                key={cl.id + period.id}
                                              >
                                                {subjectName}
                                              </td>
                                            );
                                          })}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          ) : null;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </>
      ) : (
        <p className="text-xl font-bold">Bu müəllimin dərsi yoxdur</p>
      )}
    </>
  );
}
