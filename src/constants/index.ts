import type { Schedule } from "../types";

export const schedule: Schedule = {
  year: 2025,
  month: 12,
  employees: {
    Alice: {
      1: {
        morning: true,
        afternoon: false,
        evening: false,
        x: false,
      },
      2: {
        morning: false,
        afternoon: false,
        evening: true,
        x: false,
      },
      3: {
        morning: false,
        afternoon: true,
        evening: false,
        x: false,
      },
    },
    Bob: {
      1: {
        morning: false,
        afternoon: true,
        evening: false,
        x: false,
      },
      2: {
        morning: false,
        afternoon: false,
        evening: false,
        x: true,
      },
      3: {
        morning: false,
        afternoon: false,
        evening: true,
        x: false,
      },
    },
    Charlie: {
      1: {
        morning: false,
        afternoon: true,
        evening: true,
        x: false,
      },
      2: {
        morning: false,
        afternoon: false,
        evening: false,
        x: true,
      },
      3: {
        morning: true,
        afternoon: true,
        evening: false,
        x: false,
      },
    },
  },
};
