"use client";

import type { TeacherTimetable, Timetable } from "@/types";
import {
  cn,
  getCellClass,
  getDays,
  getPeriodPosition,
  getSubject,
  getTitle,
  getViewPeriods,
} from "@/utils";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Label, Select } from "flowbite-react";
import { TeacherActivityList } from "./TeacherActivityList";
import { ICON_SIZE_CLASSES, TABLE_CLASSES } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Title } from "./Title";
import { MdOutlineIosShare } from "react-icons/md";
import { FaLink, FaCheck } from "react-icons/fa6";

interface Props {
  originalData: Timetable;
}

export default function Table({ originalData }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const teacherName = searchParams.get("teacher");
  const originalTeacherId =
    (teacherName &&
      originalData.teachers.find(({ name }) => name === teacherName)?.id) ||
    "";
  const [selectedTeacherId, setSelectedTeacherId] = useState(originalTeacherId);

  const className = searchParams.get("class");
  const originalClassId =
    (className &&
      originalData.classes.find(({ name }) => name === className)?.id) ||
    "";
  const [selectedClassId, setSelectedClassId] = useState(originalClassId);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      document.title =
        selectedTeacherId && teacherName
          ? `${teacherName} cədvəli`
          : getTitle();
    }, 0);
  }, [selectedTeacherId, teacherName]);

  useEffect(() => {
    if (!linkCopied) return;

    const timeout = setTimeout(() => setLinkCopied(false), 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [linkCopied]);

  const toggleParams = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) params.set(name, value);
      else params.delete(name);

      router.push(`${pathname}?${params}`);
    },
    [searchParams, pathname],
  );

  const onTeacherSelect = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const teacherId = event.target.value;

      const teacherName =
        teacherId &&
        originalData.teachers.find(({ id }) => id === teacherId)?.name;

      setSelectedTeacherId(teacherId);
      toggleParams("teacher", teacherName);
    },
    [toggleParams],
  );

  const onClassSelect = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const classId = event.target.value;

      const className =
        classId && originalData.classes.find(({ id }) => id === classId)?.name;

      setSelectedClassId(classId);
      toggleParams("class", className);
    },
    [toggleParams],
  );

  const data = useMemo(() => {
    let activities = selectedTeacherId
      ? originalData.activities.filter((activity) =>
          activity.teacherIds.includes(selectedTeacherId),
        )
      : originalData.activities;

    if (selectedClassId) {
      activities = activities.filter((activity) =>
        activity.groupIds.some((groupId) =>
          originalData.classes
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
        ? originalData.classes.filter((classObj) =>
            classObj.groupSets.some(({ groups }) =>
              groups.some(({ id }) => selectedTeacherGroupIds.includes(id)),
            ),
          )
        : originalData.classes;

    if (selectedClassId) {
      classes = classes.filter((cl) => cl.id === selectedClassId);
    }

    const selectedTeacherCards = selectedTeacherId
      ? originalData.activities
          .filter(({ teacherIds }) => teacherIds.includes(selectedTeacherId))
          .reduce((acc, { subjectId, groupIds, cards }) => {
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
  }, [selectedTeacherId, selectedClassId]);

  const share = useCallback(async () => {
    try {
      const url = window.location.href;

      if (navigator.share) {
        let schoolPrefix = teacherName || className ? "" : "Məktəb";
        const text =
          `${schoolPrefix} ${teacherName || ""} ${className ? `${className} sinfi üzrə` : ""} cədvəli:`
            .replaceAll(/\s+/g, " ")
            .trim();
        await navigator.share({
          title: text,
          url,
          text,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setLinkCopied(true);
      }
    } catch (error) {
      console.log("Error sharing", error);
    }
  }, []);

  const canShow =
    (!selectedTeacherId || data.selectedTeacherCards.length > 0) &&
    data.activities.length > 0;

  return (
    <>
      <div className="flex w-full flex-col justify-center gap-4 md:flex-row print:hidden">
        <div className="flex flex-col items-center gap-2 md:w-auto">
          <Label className="text-xl font-semibold" htmlFor="teachers">
            Müəllim cədvəli:
          </Label>
          <Select
            onChange={onTeacherSelect}
            id="teachers"
            className="selector-container w-full max-w-sm text-lg font-medium md:w-sm"
            value={selectedTeacherId}
          >
            <option value="" className="text-lg font-medium">
              Bütün Müəllimlər ({originalData.teachers.length})
            </option>
            {originalData.teachers.map((teacher) => (
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

        <div className="flex flex-col items-center gap-2 md:w-auto">
          <Label className="text-xl font-semibold" htmlFor="classes">
            Sinif cədvəli:
          </Label>
          <Select
            onChange={onClassSelect}
            id="classes"
            className="selector-container w-full max-w-sm text-lg font-medium md:w-sm"
            value={selectedClassId}
          >
            <option value="" className="text-lg font-medium">
              Bütün siniflər ({originalData.classes.length})
            </option>
            {originalData.classes.map((classObj) => (
              <option
                key={classObj.id}
                value={classObj.id}
                className="text-lg font-medium"
              >
                {classObj.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      {canShow ? (
        <>
          <TeacherActivityList
            selectedTeacherCards={data.selectedTeacherCards}
            data={data}
          />
          <Button
            className="gap-2 bg-neutral-900 text-xl font-bold text-white md:text-base dark:bg-white dark:text-gray-900 print:hidden"
            onClick={share}
          >
            {linkCopied ? (
              <>
                <FaCheck className={ICON_SIZE_CLASSES} />
                Link Kopyalandı
              </>
            ) : (
              <>
                {navigator.share ? (
                  <MdOutlineIosShare className={ICON_SIZE_CLASSES} />
                ) : (
                  <FaLink className={ICON_SIZE_CLASSES} />
                )}
                Paylaş
              </>
            )}
          </Button>
          {linkCopied && (
            <p className="text-center text-xl font-semibold">
              Bu linkə keçid edən hər kəs eyni cədvəli görəcək.
            </p>
          )}
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
