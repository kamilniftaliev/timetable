"use client";

import {
  cn,
  getCellClass,
  getDays,
  getPeriodPosition,
  getSubject,
  getViewPeriods,
  reportAnalyticEvent,
} from "@/utils";
import { useCallback, useMemo } from "react";
import { TeacherActivityList } from "./TeacherActivityList";
import {
  timetable,
  SELECTOR_CLASS_OPTIONS,
  SELECTOR_TEACHER_OPTIONS,
  TABLE_CLASSES,
} from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Title } from "./Title";
import { Selector } from "./Selector";
import { ShareButton } from "./ShareButton";
import { useTimetableData } from "@/hooks";

export default function Table() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const className = searchParams.get("class") || "";
  const teacherName = searchParams.get("teacher") || "";

  const selectedClassId = useMemo(() => {
    const classId =
      (className &&
        timetable.classes.find(({ name }) => name === className)?.id) ||
      "";

    return classId;
  }, [className]);

  const selectedTeacherId = useMemo(() => {
    const teacherId =
      (teacherName &&
        timetable.teachers.find(({ name }) => name === teacherName)?.id) ||
      "";

    return teacherId;
  }, [teacherName]);

  const toggleParams = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
        reportAnalyticEvent({
          action: "selector_interaction",
          category: "engagement",
          label: name,
          value,
        });
      } else {
        params.delete(name);
      }

      router.push(`${pathname}?${params}`);
    },
    [searchParams, pathname],
  );

  const onTeacherSelect = useCallback(
    (teacherName: string) => {
      toggleParams("teacher", teacherName);
    },
    [toggleParams],
  );

  const onClassSelect = useCallback(
    (className: string) => {
      toggleParams("class", className);
    },
    [toggleParams],
  );

  const data = useTimetableData(selectedTeacherId, selectedClassId);

  const canShow =
    (!teacherName || data.selectedTeacherCards.length > 0) &&
    data.activities.length > 0;

  return (
    <>
      <div className="flex w-full flex-col justify-center gap-4 md:flex-row print:hidden">
        <Selector
          label="Müəllim:"
          onChange={onTeacherSelect}
          selectedValue={teacherName}
          options={SELECTOR_TEACHER_OPTIONS}
        />
        <Selector
          label="Sinif:"
          onChange={onClassSelect}
          selectedValue={className}
          options={SELECTOR_CLASS_OPTIONS}
        />
      </div>
      {canShow ? (
        <>
          <TeacherActivityList
            selectedTeacherCards={data.selectedTeacherCards}
            data={data}
          />
          <ShareButton
            teacherName={teacherName}
            className={className}
            selectedClassId={selectedClassId}
            selectedTeacherId={selectedTeacherId}
          />
          <div className="flex w-full flex-col items-center gap-8">
            {data.views.map((view, viewIndex) => {
              const classes = data.classes.filter((cl) =>
                view.entityIds?.includes(cl.id),
              );
              const overflowsHorizontally = classes.length > 7;
              const periods = getViewPeriods(data, view, selectedTeacherId);
              const days = getDays(data, selectedTeacherId);

              const tableDataWidth = classes.length * 150;
              const dayNameMaxHeight = periods.length * 35;

              return classes.length ? (
                <div
                  key={view.id}
                  className="view-container mt-8 flex flex-col justify-center gap-6 print:mt-0 print:gap-2"
                >
                  <Title
                    shiftNumber={data.views.length > 1 ? viewIndex + 1 : 0}
                    className="hidden print:block"
                  />

                  <h2 className="text-center text-3xl font-bold print:hidden">
                    {view.name}
                  </h2>
                  <div className="max-w-[calc(100vw-40px)] overflow-auto md:max-w-[calc(100vw-80px)] print:max-w-full">
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
                                  className="vertical-text -mb-1 w-7 truncate text-center font-bold text-ellipsis print:w-4.5"
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
                                            const subject = getSubject(
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
                                                {subject ? (
                                                  <>
                                                    <span
                                                      className={cn(
                                                        overflowsHorizontally
                                                          ? "print:hidden"
                                                          : "",
                                                      )}
                                                    >
                                                      {subject.name}
                                                    </span>
                                                    <span
                                                      className={cn("hidden", {
                                                        "print:block":
                                                          overflowsHorizontally,
                                                      })}
                                                    >
                                                      {subject.shortName}
                                                    </span>
                                                  </>
                                                ) : (
                                                  ""
                                                )}
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
