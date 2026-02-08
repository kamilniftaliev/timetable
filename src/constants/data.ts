import type { Timetable } from "@/types";
import timelineData from "../../public/cedvel.json";

const originalData = timelineData as any as Timetable;

export const timetable = {
  ...originalData,
  teachers: originalData.teachers.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  ),
};

export const SELECTOR_CLASS_OPTIONS = [
  {
    value: "",
    name: `Bütün siniflər (${timetable.classes.length})`,
  },
  ...timetable.classes.map((classObj) => ({
    value: classObj.name,
    name: classObj.name,
  })),
];

export const SELECTOR_TEACHER_OPTIONS = [
  {
    value: "",
    name: `Bütün müəllimlər (${timetable.teachers.length})`,
  },
  ...timetable.teachers.map((teacher) => ({
    value: teacher.name,
    name: teacher.name,
  })),
];

export const PERIOD_TIMES = {
  0: "08:30",
  1: "09:20",
  2: "10:10",
  3: "11:05",
  4: "11:55",
  5: "12:45",
  6: "13:35",
};
