import { useState } from "react";
import { schedule as dummy } from "../constants";
import type { Schedule } from "../types";

export const useSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule>(dummy);

  function addOrRemoveEmployee({
    name,
    day,
    type,
  }: {
    name: string;
    day: number;
    type: "morning" | "afternoon" | "evening";
  }) {
    const employeeSchedule = schedule.employees[name];
    if (!employeeSchedule) return;

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
      ...schedule,
      employees: {
        ...schedule.employees,
        [name]: updatedEmployeeSchedule,
      },
    };

    // Here you would typically set the state, but since we're using useState
    // only to initialize, we'll skip that part.
    console.log("Updated Schedule:", updatedSchedule);

    setSchedule(updatedSchedule);
  }

  return {
    schedule,
    addOrRemoveEmployee,
  };
};
