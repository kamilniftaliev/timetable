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
    value: classObj.id,
    name: classObj.name,
  })),
];

export const SELECTOR_TEACHER_OPTIONS = [
  {
    value: "",
    name: `Bütün Müəllimlər (${timetable.teachers.length})`,
  },
  ...timetable.teachers.map((teacher) => ({
    value: teacher.id,
    name: teacher.name,
  })),
];
