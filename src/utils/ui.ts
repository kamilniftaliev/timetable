import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Timetable } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getShiftText(data: Timetable) {
  const shiftName =
    data.views.length === 1 ? `Yalnız ${data.views[0].name}` : "Hər iki növbə";

  return `${shiftName} üzrə`;
}

export function getCellClass(classIndex: number) {
  return cn(
    `w-38 print:w-auto print:text-[10px] py-1 px-2 print:px-0.5 print:py-0 text-center truncate`,
    {
      "border-l": classIndex > 0,
    },
  );
}
