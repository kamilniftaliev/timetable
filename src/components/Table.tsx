"use client";

import {
  cn,
  getCellClass,
  getDays,
  getPeriodPosition,
  getSubjects,
  getViewPeriods,
  reportAnalyticEvent,
} from "@/utils";
import { useCallback, useEffect, useMemo } from "react";
import { TeacherActivityList } from "./TeacherActivityList";
import {
  timetable,
  SELECTOR_CLASS_OPTIONS,
  SELECTOR_TEACHER_OPTIONS,
  TABLE_CLASSES,
  PERIOD_TIMES,
} from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Title } from "./Title";
import { Selector } from "./Selector";
import { ShareButton } from "./ShareButton";
import { useTimetableData } from "@/hooks";
import { FaRegClock } from "react-icons/fa";

export default function Table() {
  useEffect(() => {
    const resetScrolls = () => {
      document.querySelectorAll("*").forEach((el) => {
        if (el.scrollTop !== 0 || el.scrollLeft !== 0) {
          el.scrollTop = 0;
          el.scrollLeft = 0;
        }
      });
    };
    window.addEventListener("beforeprint", resetScrolls);
    return () => window.removeEventListener("beforeprint", resetScrolls);
  }, []);

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
            {data.views?.map((view, viewIndex) => {
              const classes = data.classes.filter((cl) =>
                view.entityIds?.includes(cl.id),
              );
              const overflowsHorizontally = classes.length > 7;
              const periods = getViewPeriods(data, view, selectedTeacherId);
              const days = getDays(data, selectedTeacherId);

              const dayNameMaxHeight = periods.length * 35;

              return classes.length ? (
                <div
                  key={view.id}
                  className="view-container flex flex-col justify-center gap-6 print:mt-0 print:gap-2"
                >
                  {data.views?.length > 1 && (
                    <>
                      <Title
                        shiftNumber={data.views?.length > 1 ? viewIndex + 1 : 0}
                        className="hidden print:block"
                      />

                      <h2 className="text-center text-3xl font-bold print:hidden">
                        {view.name}
                      </h2>
                    </>
                  )}
                  <div className="max-h-[90vh] max-w-[calc(100vw-40px)] overflow-auto border-3 border-black md:max-w-[calc(100vw-80px)] dark:border-white print:max-h-none print:max-w-full print:overflow-visible print:border-black">
                    <table className="mx-auto border-separate border-spacing-0">
                      <thead>
                        <tr>
                          <th className="sticky top-0 left-0 z-30 w-7 border-b-2 border-black bg-gray-50 dark:border-white dark:bg-gray-800 print:w-4.5 print:border-black print:bg-white" />
                          <th
                            className={cn(
                              TABLE_CLASSES.timeCell,
                              "top-0 z-30 border-b-2 border-black bg-gray-50 dark:border-white dark:bg-gray-800 print:border-black print:bg-white",
                            )}
                          >
                            <div
                              className={cn(
                                TABLE_CLASSES.timeContainer,
                                "py-2 print:py-1!",
                              )}
                            >
                              <FaRegClock className="mx-auto" />
                            </div>
                          </th>
                          <th
                            className={cn(
                              TABLE_CLASSES.numberCell,
                              "top-0 z-30 border-b-2 border-black bg-gray-50 dark:border-white dark:bg-gray-800 print:border-black print:bg-white",
                            )}
                          >
                            <div
                              className={cn(
                                TABLE_CLASSES.numberContainer,
                                "print:py-0.5!",
                              )}
                            >
                              #
                            </div>
                          </th>
                          {classes.map((cl, classIndex) => (
                            <th
                              className={cn(
                                getCellClass(classIndex),
                                "sticky top-0 z-20 border-b-2 border-black bg-gray-50 font-bold dark:border-white dark:bg-gray-800 print:border-black print:bg-white",
                              )}
                              key={cl.id}
                            >
                              {cl.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {days.map((day, dayIndex) =>
                          periods.length
                            ? periods.map((period, periodIndex) => {
                                const position = getPeriodPosition(
                                  data,
                                  classes[0],
                                  period,
                                );
                                const periodTime =
                                  viewIndex > 0 ? periodIndex + 6 : periodIndex;

                                const borderClass =
                                  periodIndex === 0 && dayIndex > 0
                                    ? "border-t-3"
                                    : periodIndex > 0
                                      ? "border-t"
                                      : "";

                                return (
                                  <tr key={day.id + period.id}>
                                    {periodIndex === 0 && (
                                      <td
                                        rowSpan={periods.length}
                                        className={cn(
                                          "sticky left-0",
                                          TABLE_CLASSES.stickyCell,
                                          dayIndex > 0 && "border-t-3",
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
                                    )}
                                    <td
                                      className={cn(
                                        TABLE_CLASSES.timeCell,
                                        borderClass,
                                      )}
                                    >
                                      <div
                                        className={cn(
                                          TABLE_CLASSES.timeContainer,
                                        )}
                                      >
                                        {PERIOD_TIMES[periodTime]}
                                      </div>
                                    </td>
                                    <td
                                      className={cn(
                                        TABLE_CLASSES.numberCell,
                                        borderClass,
                                      )}
                                    >
                                      <div
                                        className={cn(
                                          TABLE_CLASSES.numberContainer,
                                        )}
                                      >
                                        {position}
                                      </div>
                                    </td>
                                    {classes.map((cl, classIndex) => {
                                      const subjects = getSubjects(
                                        data,
                                        cl,
                                        day,
                                        period,
                                      );

                                      return (
                                        <td
                                          className={cn(
                                            getCellClass(classIndex),
                                            borderClass,
                                          )}
                                          key={cl.id + period.id}
                                        >
                                          {subjects.length > 0
                                            ? subjects.map((subject, index) => (
                                                <div
                                                  key={subject.id}
                                                  className="mr-[3px] inline-block"
                                                >
                                                  <span
                                                    className={cn(
                                                      overflowsHorizontally
                                                        ? "print:hidden"
                                                        : "",
                                                    )}
                                                  >
                                                    {index > 0 && "və "}
                                                    {
                                                      subject[
                                                        subjects.length > 1
                                                          ? "shortName"
                                                          : "name"
                                                      ]
                                                    }
                                                  </span>
                                                  <span
                                                    className={cn("hidden", {
                                                      "print:block":
                                                        overflowsHorizontally,
                                                    })}
                                                  >
                                                    {subject.shortName}
                                                  </span>
                                                </div>
                                              ))
                                            : ""}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })
                            : null,
                        )}
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
