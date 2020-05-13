import { Stock, Till } from './till';

// I felt confident with that amount of tests. If it was a real project I would've write much more of them
describe('Till', () => {
  describe('set stock', () => {
    it('should set stock to 0 if empty payload was given', () => {
      const payload = {} as Stock;
      const till = new Till({
        quarter: 1,
        dime: 1,
        nickel: 1,
        penny: 1,
      });

      till.stock = payload;

      expect(till.stock).toEqual({
        quarter: 0,
        dime: 0,
        nickel: 0,
        penny: 0,
      })
    });

    it('should set stock to 0 if empty payload was given', () => {
      const payload = {
        quarter: 3,
        dime: 3,
        nickel: 3,
        penny: 3,
      } as Stock;
      const till = new Till({
        quarter: 1,
        dime: 1,
        nickel: 1,
        penny: 1,
      });

      till.stock = payload;

      expect(till.stock).toEqual(payload)
    });
  });
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

      describe('below 25', () => {
        it('if last digit is 5 and no nickels or pennies', () => {
          const cents = 15;
          const till = new Till({
            quarter: 10,
            dime: 10,
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

        it('if last digit is 7 and no pennies', () => {
          const cents = 17;
          const till = new Till({
            quarter: 10,
            dime: 10,
            nickel: 10,
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

      describe('above 25', () => {
        it('if last digit non zero even number and no pennies', () => {
          const cents = 34;
          const till = new Till({
            quarter: 10,
            dime: 10,
            nickel: 10,
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

      it('given 10 dimes; if the change amount were $0.99 you should report that you can\'t make change', () => {
        const cents = 99;
        const till = new Till({
          quarter: 0,
          dime: 10,
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
    });

    describe('should return proper change', () => {
      it('given 10 dimes and 34 pennies in the till; if the change amount were $0.99 you should offer 9 dimes and 9 pennies', () => {
        const cents = 99;
        const till = new Till({
          quarter: 0,
          dime: 10,
          nickel: 0,
          penny: 34,
        });
        const result = till.getChange(cents);

        expect(result).toEqual({
          quarter: 0,
          dime: 9,
          nickel: 0,
          penny: 9,
        });
        expect(till.stock).toEqual({
          quarter: 0,
          dime: 1,
          nickel: 0,
          penny: 25
        });
      });

      it('given 10 dimes, 3 nickels, and 9 pennies; if the change amount were $0.99 you should offer 9 dimes, 1 nickel, and 4 pennies', () => {
        const cents = 99;
        const till = new Till({
          quarter: 0,
          dime: 10,
          nickel: 3,
          penny: 9,
        });
        const result = till.getChange(cents);

        expect(result).toEqual({
          quarter: 0,
          dime: 9,
          nickel: 1,
          penny: 4,
        });
        expect(till.stock).toEqual({
          quarter: 0,
          dime: 1,
          nickel: 2,
          penny: 5
        });
      });
    });
  });
});
