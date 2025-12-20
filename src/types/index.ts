export type Shift = {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  x: boolean;
};

export type Schedule = {
  year: number;
  month: number;
  employees: Record<string, Record<number, Shift>>;
};
