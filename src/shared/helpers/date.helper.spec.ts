import * as dateHelper from './date.helper';

describe('DateHelper', () => {
  describe('addTime', () => {
    it('should add a year', () => {
      const defaultDate = new Date('2023-01-05');
      const result = dateHelper.addTime(
        defaultDate,
        1,
        dateHelper.TimeUnitEnum.YEAR,
      );
      expect(result.getUTCFullYear()).toEqual(2024);
    });

    it('should add a month', () => {
      const defaultDate = new Date('2023-01-05');
      const result = dateHelper.addTime(
        defaultDate,
        1,
        dateHelper.TimeUnitEnum.MONTH,
      );
      expect(result.getUTCMonth() + 1).toEqual(2);
    });

    it('should add a day', () => {
      const defaultDate = new Date('2023-01-05');
      const result = dateHelper.addTime(
        defaultDate,
        1,
        dateHelper.TimeUnitEnum.DAY,
      );
      expect(result.getUTCDate()).toEqual(6);
    });

    it('should add an hour', () => {
      const defaultDate = new Date('2023-01-05');
      const result = dateHelper.addTime(
        defaultDate,
        1,
        dateHelper.TimeUnitEnum.HOUR,
      );
      expect(result.getUTCHours()).toEqual(1);
    });

    it('should add a minute', () => {
      const defaultDate = new Date('2023-01-05');
      const result = dateHelper.addTime(
        defaultDate,
        1,
        dateHelper.TimeUnitEnum.MINUTE,
      );
      expect(result.getUTCMinutes()).toEqual(1);
    });

    it('should add a second', () => {
      const defaultDate = new Date('2023-01-05');
      const result = dateHelper.addTime(
        defaultDate,
        1,
        dateHelper.TimeUnitEnum.SECOND,
      );
      expect(result.getUTCSeconds()).toEqual(1);
    });

    it('should add a millisecond', () => {
      const defaultDate = new Date('2023-01-05');
      const result = dateHelper.addTime(
        defaultDate,
        23,
        dateHelper.TimeUnitEnum.MILLISECOND,
      );
      expect(result.getUTCMilliseconds()).toEqual(23);
    });
  });
});
