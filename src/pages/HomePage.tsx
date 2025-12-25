import { startOfDay } from "date-fns";
import { twMerge } from "tailwind-merge";
import { Header } from "../components/Header";
import { ShiftBox } from "../components/ShiftBox";
import { useScheduleStore } from "../hooks/useScheduleStore";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Homepage = () => {
  const {
    schedule: { year, month, employees },
  } = useScheduleStore();

  const date = new Date(year, month - 1);

  const daysInMonth = new Date(year, month, 0).getDate();

  const employeeNames = Object.keys(employees);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const shiftDays = [];
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const shifts = [];
    for (let j = 0; j < employeeNames.length; j++) {
      const employee = employeeNames[j];
      const shift = employees[employee][day];
      shifts.push({ employee, shift });
    }
    shiftDays.push({ day, shifts });
  }

  const startDayOfMonth = startOfDay(date);

  return (
    <div className='bg-slate-900 text-gray-200 min-h-screen tracking-wide text-[12px]'>
      <Header date={date} />
      <div className='p-4'>
        <div className='grid grid-cols-7 gap-x-2 gap-y-4 sticky top-10 bg-slate-900 z-10 py-2'>
          {DAYS.map((day) => {
            return (
              <div key={day} className='font-bold'>
                {day}
              </div>
            );
          })}
        </div>
        <div className='grid grid-cols-7 gap-x-2 gap-y-4'>
          {/* buffer */}
          {Array.from({ length: startDayOfMonth.getDay() }).map((_, i) => (
            <div key={i} />
          ))}
          {/* days */}
          {shiftDays.map((item) => {
            const day = item.day;
            const shifts = item.shifts;
            const morningShifts = shifts.filter((s) => s.shift?.morning);
            const afternoonShifts = shifts.filter((s) => s.shift?.afternoon);
            const eveningShifts = shifts.filter((s) => s.shift?.evening);

            return (
              <div key={item.day} className={twMerge("rounded p-1")}>
                <div>{item.day}</div>
                <hr />
                {/* morning */}
                <ShiftBox day={day} shifts={morningShifts} type='morning' />
                <hr />
                {/* afternoon */}
                <ShiftBox day={day} shifts={afternoonShifts} type='afternoon' />
                <hr />
                {/* evening */}
                <ShiftBox day={day} shifts={eveningShifts} type='evening' />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
