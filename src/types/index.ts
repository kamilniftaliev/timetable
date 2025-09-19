export type Timetable = {
  readonly id: string;
  readonly name: string;
  readonly published: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schoolId: string;
  readonly schoolName: string;
  readonly year: string;
  readonly version: string;
  readonly creatorId: string;
  readonly editorId: string;
  readonly days: Day[];
  readonly periods: Period[];
  readonly subjects: Day[];
  readonly teachers: Teacher[];
  readonly classes: Class[];
  readonly activities: Activity[];
  readonly views: View[];
  readonly cardStyles: CardStyle[];
};

export type TeacherTimetable = Timetable & {
  selectedTeacherCards: Array<
    Card & {
      classObj: Class;
      subjectId: Activity["id"];
    }
  >;
};

export type Activity = {
  readonly id: string;
  readonly subjectId: string;
  readonly teacherIds: string[];
  readonly groupIds: string[];
  readonly cards: Card[];
};

export type Card = {
  readonly id: string;
  readonly dayId: string;
  readonly periodId: string;
};

export type CardStyle = {
  readonly id: string;
  readonly backgroundType: number;
  readonly borderType: number;
  readonly lengthTypes: number[];
  readonly entityTypes: number[];
};

export type Class = {
  readonly id: string;
  readonly position: number;
  readonly name: string;
  readonly shortName: string;
  readonly color: string;
  readonly startOnFirstPeriod: boolean;
  readonly forbidGaps: boolean;
  readonly groupsFinishTogether: boolean;
  readonly maxDiff: number;
  readonly groupSets: GroupSet[];
  readonly marks: Array<number[]>;
};

export type GroupSet = {
  readonly id: string;
  readonly groups: Day[];
  readonly position?: number;
};

export type Day = {
  readonly id: string;
  readonly position?: number;
  readonly name?: string;
  readonly shortName?: string;
  readonly color?: string;
};

export type Period = {
  readonly id: string;
  readonly position: number;
  readonly startHour: number;
  readonly endHour: number;
  readonly endMinute: number;
};

export type Teacher = {
  readonly id: string;
  readonly position: number;
  readonly name: string;
  readonly shortName: string;
  readonly color: string;
  readonly marks?: Array<number[]>;
  readonly minPerDay?: number;
  readonly maxPerDay?: number;
};

export type View = {
  readonly id: string;
  readonly position: number;
  readonly name: string;
  readonly isDefault?: boolean;
  readonly shortName?: string;
  readonly entityType?: number;
  readonly entityIds?: string[];
  readonly excludedPeriodIds?: string[];
};
