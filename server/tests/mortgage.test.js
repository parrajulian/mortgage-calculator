const {
  calculatePaymentPerSchedule,
  calculateCmhcInsurance,
} = require('../modules/mortgage');

describe('test mortgage functions', function () {
  it('mortgagePerSchedule with no down payment', function () {
    expect(
      calculatePaymentPerSchedule(
        330000,
        {
          amortizationPeriod: 10,
          paymentSchedule: 'MONTHLY',
          annualInterestRate: 5.27,
        },
        0
      )
    ).toBe(3543.88);
  });

  it('mortgagePerSchedule with down payment', function () {
    expect(
      calculatePaymentPerSchedule(
        330000,
        {
          amortizationPeriod: 10,
          paymentSchedule: 'MONTHLY',
          annualInterestRate: 5.27,
        },
        250000
      )
    ).toBe(1460.54);
  });

  it('mortgagePerSchedule test cmch insurance to be 0 when no down payment', function () {
    expect(calculateCmhcInsurance(10000, 5000)).toBe(0);
  });
  it('mortgagePerSchedule test cmch insurance to be 0 when down payment greater than 20%', function () {
    expect(calculateCmhcInsurance(100000, 80000)).toBe(0);
  });
  it('mortgagePerSchedule test cmch insurance', function () {
    expect(calculateCmhcInsurance(100000, 10000)).toBe(2790);
  });
});
