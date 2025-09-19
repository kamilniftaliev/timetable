import { Class, Period, Timetable } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPeriodPosition(
  data: Timetable,
  classObj: Class,
  period: Period,
) {
  const viewIndex = data.views
    .filter((view) => !view.isDefault)
    .findIndex((view) => view.entityIds.includes(classObj.id));

  const isFirstShift = data.views[viewIndex].name.includes("1");

  const position = isFirstShift ? period.position : period.position - 6;

  return position;
}

export function getShiftText(data: Timetable) {
  const shiftName =
    data.views.length === 1 ? `Yalnız ${data.views[0].name}` : "Hər iki növbə";

  return `${shiftName} üzrə`;
}
