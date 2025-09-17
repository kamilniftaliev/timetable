import { cn } from "@/utils";

interface Props {
  // @ts-ignore - sadas
  data: any;
}

export default function Table({ data }: Props) {
  const getCellClass = (classIndex: number) => {
    return cn(
      `h-8 max-h-8 min-h-8 w-[90px] max-w-[90px] min-w-[90px] py-1 px-2 text-center`,
      {
        "border-l-3": classIndex === 0,
        "border-l": classIndex > 0,
      },
    );
  };
  const numberCell = "min-w-8 border-l-3 text-center";

  return (
    <div className="mx-auto flex w-auto flex-col gap-8 overflow-auto">
      {data.views
        .filter((view) => !view.isDefault)
        .map((view) => {
          const classes = data.classes.filter((cl) =>
            view.entityIds?.includes(cl.id),
          );
          const periods = data.periods.filter(
            (period) => !view.excludedPeriodIds?.includes(period.id),
          );

          return (
            <div
              key={view.id}
              className="mt-8 flex flex-col justify-center gap-6"
            >
              <h2 className="text-center text-3xl font-bold">{view.name}</h2>
              <table className="mx-auto w-auto border-3">
                <tbody>
                  {data.days.map((day, dayIndex) => {
                    return (
                      <tr key={day.id} className="border-t-3">
                        <td className="">
                          <div
                            className={cn(`vertical-text w-full text-center`)}
                          >
                            {day.name}
                          </div>
                        </td>
                        <td>
                          <table>
                            {dayIndex === 0 && (
                              <thead>
                                <tr>
                                  <td className={numberCell}>#</td>
                                  {classes.map((cl, classIndex) => (
                                    <td
                                      className={cn(
                                        getCellClass(classIndex),
                                        "font-bold",
                                      )}
                                      key={cl.id}
                                    >
                                      {cl.name}
                                    </td>
                                  ))}
                                </tr>
                              </thead>
                            )}
                            <tbody>
                              {periods.map((period, periodIndex) => (
                                <tr
                                  className={cn(
                                    (periodIndex > 0 || dayIndex === 0) &&
                                      "border-t",
                                  )}
                                  key={period.id}
                                >
                                  <td className={numberCell}>
                                    {periodIndex + 1}
                                  </td>
                                  {classes.map((cl, classIndex) => {
                                    let subjectName = "";

                                    const activity = data.activities.find(
                                      (activity) =>
                                        activity.groupIds.some((groupId) =>
                                          cl.groupSets.some((group) =>
                                            group.groups.some(
                                              (gr) => gr.id === groupId,
                                            ),
                                          ),
                                        ) &&
                                        activity.cards.some(
                                          (card) =>
                                            card.dayId === day.id &&
                                            card.periodId === period.id,
                                        ),
                                    );

                                    if (activity) {
                                      subjectName =
                                        data.subjects.find(
                                          (subject) =>
                                            subject.id === activity.subjectId,
                                        )?.shortName || "";
                                    }

                                    return (
                                      <td
                                        className={getCellClass(classIndex)}
                                        key={cl.id + period.id}
                                      >
                                        {subjectName}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
}
