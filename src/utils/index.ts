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
  const position = viewIndex > 0 ? period.position - 6 : period.position;

  return position;
}
