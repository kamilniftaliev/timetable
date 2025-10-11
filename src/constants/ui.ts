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
  stickyCell: `bg-gray-100 dark:bg-gray-800 print:text-xs z-10`,
  numberCell:
    "w-8 print:w-6 text-center font-bold sticky z-10 left-23 print:left-5 print:text-xs",
  get numberContainer() {
    return (
      "w-8 print:w-6 px-2 print:px-1 border-x-3 border-black dark:border-white print:border-black leading-8 print:leading-4! " +
      this.stickyCell
    );
  },
  get timeCell() {
    return `${this.numberCell} w-16 print:w-11 left-7 `;
  },
  get timeContainer() {
    return `${this.numberContainer} border-r-0 w-16 print:w-11 `;
  },
};

export const ICON_SIZE_CLASSES = "w-5 h-5";
