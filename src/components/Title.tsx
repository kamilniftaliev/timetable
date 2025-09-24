import { getTitle } from "@/utils";
import { cn } from "@/utils";
import { ClassValue } from "clsx";

interface Props {
  className?: ClassValue;
  shiftNumber?: number;
}

export function Title({ className, shiftNumber }: Props) {
  return (
    <h1
      className={cn(
        "w-full px-6 text-center text-2xl font-bold md:w-2/3 print:w-full print:text-base",
        className,
      )}
    >
      {getTitle({ shiftNumber })} (22 Sentyabr 2025)
    </h1>
  );
}
