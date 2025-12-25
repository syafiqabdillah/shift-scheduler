import { persist } from "zustand/middleware";
import { create } from "zustand/react";
import { schedule as dummy } from "../constants";
import type { Schedule, ShiftType } from "../types";

type PersonState = {
  persons: string[];
  schedule: Schedule;
};

type PersonActions = {
  addPerson: (name: string) => void;
  removePerson: (name: string) => void;
  addOrRemovePersonOnSchedule: (args: {
    name: string;
    day: number;
    type: ShiftType;
  }) => void;
};

type PersonStore = PersonState & PersonActions;

export const useScheduleStore = create<PersonStore>()(
  persist(
    (set) => ({
      // States
      persons: ["Alice", "Bob", "Charlie"],
      schedule: dummy,
      // Actions
      addPerson: (name: string) =>
        set((state) => ({ persons: [...state.persons, name] })),
      removePerson: (name: string) =>
        set((state) => {
          const newPersons = state.persons.filter((person) => person !== name);
          const newSchedule = { ...state.schedule };

          // Remove person's schedule
          delete newSchedule.employees[name];

          return {
            persons: newPersons,
            schedule: newSchedule,
          };
        }),
      addOrRemovePersonOnSchedule: ({ name, day, type }) => {
        return set((state) => {
          const employeeSchedule = state.schedule.employees[name] || {};

          const daySchedule = Object.assign(
            {
              morning: false,
              afternoon: false,
              evening: false,
              x: false,
            },
            employeeSchedule[day]
          );

          // Toggle the shift
          daySchedule[type] = !daySchedule[type];

          // Update the employee's schedule
          const updatedEmployeeSchedule = {
            ...employeeSchedule,
            [day]: daySchedule,
          };

          // Update the overall schedule
          const updatedSchedule = {
            ...state.schedule,
            employees: {
              ...state.schedule.employees,
              [name]: updatedEmployeeSchedule,
            },
          };

          return { schedule: updatedSchedule };
        });
      },
    }),
    {
      name: "schedule-storage",
    }
  )
);
