import { getMondayDate, getTitle } from "@/utils";
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
        "w-full px-6 text-center text-2xl font-bold sm:w-4/5 lg:w-full print:w-full print:text-base",
        className,
      )}
    >
      {getTitle({ shiftNumber })} <br /> ({getMondayDate()})
    </h1>
  );
}
