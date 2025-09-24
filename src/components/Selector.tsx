import { Label, Select, SelectProps } from "flowbite-react";

interface Props extends SelectProps {
  options: { value: string; name: string }[];
  label: string;
}

export function Selector({ onChange, value, options, label }: Props) {
  const selectorId = label.toLocaleLowerCase().replace(/[^A-Za-z0-9]+/g, "");

  return (
    <div className="flex flex-col items-center gap-2 md:w-auto">
      <Label className="text-xl font-semibold" htmlFor={selectorId}>
        {label}
      </Label>
      <Select
        onChange={onChange}
        id={selectorId}
        className="selector-container w-full max-w-sm text-lg font-medium md:w-sm"
        value={value}
      >
        {options.map(({ value, name }) => (
          <option key={value} value={value} className="text-lg font-medium">
            {name}
          </option>
        ))}
      </Select>
    </div>
  );
}
