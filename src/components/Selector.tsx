import { ICON_SIZE_CLASSES } from "@/constants";
import { cn } from "@/utils";
import { Button, Label, Select, SelectProps } from "flowbite-react";
import { useCallback, useMemo } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Props extends Omit<SelectProps, "onChange"> {
  options: { value: string; name: string }[];
  label: string;
  onChange: (value: string) => void;
  selectedValue?: SelectProps["value"];
}

export function Selector({ onChange, selectedValue, options, label }: Props) {
  const selectorId = useMemo(
    () => label.toLocaleLowerCase().replace(/[^A-Za-z0-9]+/g, ""),
    [label],
  );

  const handleChange = useCallback(
    (event: {
      target: EventTarget & {
        value?: string;
      };
    }) => {
      const value = event.target.value;

      onChange(value);
    },
    [onChange],
  );

  const firstOptionValue = options[0].value;

  return (
    <div className="flex flex-col items-center gap-2 md:w-auto">
      <Label className="text-xl font-semibold" htmlFor={selectorId}>
        {label}
      </Label>
      <div className="flex w-full items-center gap-2">
        <Select
          onChange={handleChange}
          id={selectorId}
          className="selector-container max-w-sm grow text-lg font-medium md:w-sm"
          value={selectedValue}
        >
          {options.map(({ value, name }) => (
            <option key={value} value={value} className="text-lg font-medium">
              {name}
            </option>
          ))}
        </Select>
        {selectedValue !== firstOptionValue && (
          <Button
            color="alternative"
            className="cursor-pointer px-2"
            onClick={handleChange}
            value={firstOptionValue}
          >
            <IoMdCloseCircleOutline
              className={cn(ICON_SIZE_CLASSES, "text-white")}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
