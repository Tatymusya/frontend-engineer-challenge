/**
 * Преобразует временные единицы в миллисекунды.
 *
 * @example
 * ms({ seconds: 30 })     // → 30_000
 * ms({ minutes: 1 })      // → 60_000
 * ms({ hours: 1 })        // → 3_600_000
 * ms({ days: 1 })         // → 86_400_000
 * ms({ hours: 2, minutes: 30 }) // → 9_000_000 (2.5 часа)
 */

export const MS = {
  SECOND: 1000,
  MINUTE: 60_000,
  HOUR: 3_600_000,
  DAY: 86_400_000,
} as const;

export const toMs = ({
  milliseconds = 0,
  seconds = 0,
  minutes = 0,
  hours = 0,
  days = 0,
}: {
  milliseconds?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
}): number => {
  return (
    milliseconds +
    seconds * MS.SECOND +
    minutes * MS.MINUTE +
    hours * MS.HOUR +
    days * MS.DAY
  );
}

export const toHours = ({
  milliseconds = 0,
  seconds = 0,
  minutes = 0,
  hours = 0,
  days = 0,
}: {
  milliseconds?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
}) => {
  return (
    milliseconds +
    seconds * MS.SECOND +
    minutes * MS.MINUTE +
    hours * MS.HOUR +
    days * MS.DAY
  );
}