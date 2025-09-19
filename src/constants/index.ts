export const TITLE = `Xaçmaz şəhəri Akademik Zərifə Əliyeva adına 8 nömrəli təbiət təmayüllü liseyin rus bölməsi üzrə cədvəli`;

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
  numberCell: "w-8 max-w-8 text-center font-bold sticky left-7",
  stickyCell: `bg-gray-100 dark:bg-gray-800`,
  get numberContainer() {
    return (
      "w-full px-2 border-x-3 border-black dark:border-white leading-8 " +
      this.stickyCell
    );
  },
};
