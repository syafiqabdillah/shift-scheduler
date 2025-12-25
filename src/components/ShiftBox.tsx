import { twMerge } from "tailwind-merge";
import { usePerson } from "../hooks/usePerson";
import { useScheduleStore } from "../hooks/useScheduleStore";
import type { Shift } from "../types";

export const ShiftBox = ({
  day,
  shifts,
  type,
}: {
  day: number;
  shifts: {
    employee: string;
    shift: Shift;
  }[];

  type: "morning" | "afternoon" | "evening";
}) => {
  const { selectedPerson, setSelectedPerson } = usePerson();
  const { addOrRemovePersonOnSchedule } = useScheduleStore();
  const isAlreadySelected = shifts.some((s) => s.employee === selectedPerson);

  return (
    <div
      className={twMerge(
        "hover:bg-sky-800/30 p-2 rounded transition-all duration-200 group min-h-[42px] flex flex-col gap-3",
        type === "morning" ? "bg-morning" : "",
        type === "afternoon" ? "bg-afternoon" : "",
        type === "evening" ? "bg-evening" : ""
      )}
    >
      {shifts.length > 0 && (
        <div className='flex gap-1 items-center overflow-x-auto'>
          {shifts.map((s, idxShift) => {
            return (
              <div
                key={`${type}-${idxShift}`}
                onClick={() => setSelectedPerson(s.employee)}
                className={twMerge(
                  "cursor-pointer transition-all duration-200 ease-in-out",
                  s.employee === selectedPerson &&
                    "text-emerald-300 font-bold text-xl"
                )}
              >
                <div>{s.employee}</div>
              </div>
            );
          })}
        </div>
      )}
      <button
        className={twMerge(
          "mx-2 cursor-pointer bg-sky-200 text-sky-800 rounded hidden ",
          !selectedPerson ? "hidden" : "group-hover:block"
        )}
        onClick={() =>
          addOrRemovePersonOnSchedule({
            name: selectedPerson || "",
            day,
            type,
          })
        }
      >
        {isAlreadySelected ? "Remove" : "Add"} <strong>{selectedPerson}</strong>
      </button>
    </div>
  );
};
