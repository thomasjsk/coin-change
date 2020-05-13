import { Till } from './till';

describe('Till', () => {

  describe('getChange', () => {
    describe('should throw error', () => {
      it('if till is empty', () => {
        const cents = 44;
        const till = new Till({
          quarter: 0,
          dime: 0,
          nickel: 0,
          penny: 0,
        });

        let result;
        try {
          result = till.getChange(cents);
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
        }

        expect(result).toBeUndefined();
        expect(till.stock).toEqual(till.stock);
      });

      it('if no even coins in till', () => {
        const cents = 44;
        const till = new Till({
          quarter: 6,
          dime: 0,
          nickel: 1,
          penny: 0,
        });

        let result;
        try {
          result = till.getChange(cents);
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
        }

        expect(result).toBeUndefined();
        expect(till.stock).toEqual(till.stock);
      });

      it('if no odd coins in till', () => {
        const cents = 73;
        const till = new Till({
          quarter: 6,
          dime: 0,
          nickel: 1,
          penny: 0,
        });

        let result;
        try {
          result = till.getChange(cents);
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
        }

        expect(result).toBeUndefined();
        expect(till.stock).toEqual(till.stock);
      });
    });

    describe('should return proper change', () => {
      it('test', () => {
        const cents = 93;
        const till = new Till({
          quarter: 5,
          dime: 4,
          nickel: 2,
          penny: 9,
        });
        const result = till.getChange(cents);

        expect(result).toEqual({
          quarter: 3,
          dime: 1,
          nickel: 1,
          penny: 3,
        });
        expect(till.stock).toEqual({
          quarter: 2,
          dime: 3,
          nickel: 1,
          penny: 6
        });
      });
    });
  });
});
