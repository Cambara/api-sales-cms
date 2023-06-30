import moment from 'moment';

export enum TimeUnitEnum {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
  MILLISECOND = 'millisecond',
}

export const addTime = (
  date: Date,
  amount: number | string,
  unit: TimeUnitEnum,
) => moment(date).add(amount, unit).toDate();
