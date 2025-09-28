import moment from "moment";
import "moment/locale/az";

moment.locale("az");

export function getTitle({
  shiftNumber = 0,
  teacher,
  className,
}: {
  shiftNumber?: number;
  teacher?: string;
  className?: string;
} = {}) {
  let title = `Xaçmaz şəhəri Akademik Zərifə Əliyeva adına 8 nömrəli təbiət təmayüllü liseyin rus bölməsi ${shiftNumber ? `${shiftNumber}-ci növbə` : ""} üzrə cədvəli`;

  if (teacher) {
    title = `${teacher} üçün ${className ? `${className} sinfi üzrə ` : ""} cədvəl`;
  } else if (className) {
    title = `${className} sinfi üzrə cədvəl`;
  }

  return title.replaceAll(/\s+/g, " ");
}

export function getNextMondayDate() {
  // Get next week's Monday
  const nextMonday = moment().add(1, "weeks").startOf("isoWeek");

  // Format as "D MMMM YYYY"
  return nextMonday
    .format("D MMMM YYYY")
    .replace(/\b\p{L}/u, (c) => c.toUpperCase());
}

export function getLessonSuffix(amount: number) {
  if (amount === 1) return "урок";

  if (amount < 5) return "урока";

  return "уроков";
}
