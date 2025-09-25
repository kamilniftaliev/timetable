import type { Timetable } from "@/types";
import timelineData from "../../public/cedvel.json";

export const POSITION_SUFFIX = {
  1: "ый",
  2: "ой",
  3: "ий",
  4: "ый",
  5: "ый",
  6: "ой",
  7: "ой",
  8: "ой",
};

export const TABLE_CLASSES = {
  numberCell:
    "w-8 max-w-8 print:w-6 max-w-6 text-center font-bold sticky left-7 print:left-5 print:text-xs",
  stickyCell: `bg-gray-100 dark:bg-gray-800 print:text-xs`,
  get numberContainer() {
    return (
      "w-8 max-w-8 print:w-6 print:max-w-6 px-2 print:px-1 border-x-3 border-black dark:border-white leading-8 print:leading-4 " +
      this.stickyCell
    );
  },
};

export const ICON_SIZE_CLASSES = "w-5 h-5";

export const PAGE_DESCRIPTION = `Xaçmaz şəhəri Akademik Zərifə Əliyeva adına 8 nömrəli təbiət təmayüllü liseyin rus bölməsi üzrə cədvəli`;

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

export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "dev";
