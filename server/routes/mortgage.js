const Mortage = require('../modules/mortgage');

const mortgageRoute = (app) =>
  app.get('/mortgage-per-schedule', (req, res) => {
    const {
      propertyPrice,
      downPayment,
      annualInterestRate,
      amortizationPeriod,
      paymentSchedule,
    } = req.query;
    const mortagePerSchedule = Mortage.calculatePaymentPerSchedule(
      propertyPrice,
      { annualInterestRate, amortizationPeriod, paymentSchedule },
      downPayment
    );
    res.json(mortagePerSchedule);
  });

module.exports = { mortgageRoute };
