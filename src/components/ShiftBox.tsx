import { twMerge } from "tailwind-merge";
import { usePerson } from "../hooks/usePerson";
import type { Shift } from "../types";

export const ShiftBox = ({
  day,
  shifts,
  type,
  addOrRemoveEmployee,
}: {
  day: number;
  shifts: {
    employee: string;
    shift: Shift;
  }[];
  addOrRemoveEmployee: (params: {
    name: string;
    day: number;
    type: "morning" | "afternoon" | "evening";
  }) => void;
  type: "morning" | "afternoon" | "evening";
}) => {
  const { selectedPerson, setSelectedPerson } = usePerson();
  const isAlreadySelected = shifts.some((s) => s.employee === selectedPerson);

  return (
    <div className='hover:bg-sky-800/30 p-1 rounded transition-all duration-200 group min-h-[42px] flex flex-col gap-3'>
      {shifts.length > 0 && (
        <div className='flex gap-1 items-center'>
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
          "p-1 cursor-pointer bg-sky-200 text-sky-800 rounded-lg w-full hidden ",
          !selectedPerson ? "hidden" : "group-hover:block"
        )}
        onClick={() =>
          addOrRemoveEmployee({
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
