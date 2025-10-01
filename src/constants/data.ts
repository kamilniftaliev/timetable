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
  0: "08:00",
  1: "08:50",
  2: "09:40",
  3: "10:35",
  4: "11:25",
  5: "12:15",
  6: "13:05",
  7: "13:55",
  8: "14:45",
  9: "15:35",
  10: "16:25",
  11: "17:10",
  12: "17:15",
};
