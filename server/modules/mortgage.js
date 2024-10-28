const SCHEDULE_NUMBER_OF_PAYMENTS_PER_YEAR = {
  MONTHLY: 12,
  'BI-WEEKLY': 24,
  'ACCELERATED-BI-WEEKLY': 26,
};

const shouldCalculateCmhcInsurance = (
  propertyPrice,
  downPayment,
  amortizationPeriod
) => {
  if (propertyPrice >= 1000000) {
    return false;
  }
  const downPaymentPercentage = (downPayment * 100) / propertyPrice;
  if (downPaymentPercentage < 5 || downPaymentPercentage >= 20) {
    return false;
  }
  if (amortizationPeriod > 25) {
    return false;
  }
  return true;
};

const calculateCmhcInsurance = (propertyPrice, downPayment) => {
  const downPaymentPercentage = (downPayment * 100) / propertyPrice;
  if (downPaymentPercentage < 5 || downPaymentPercentage >= 20) {
    return 0;
  }
  const remainingPrice = propertyPrice - downPayment;
  const cmchInsurance = (remainingPrice * 3.1) / 100;
  return cmchInsurance;
};

const calculatePaymentPerSchedule = (
  propertyPrice,
  { annualInterestRate, amortizationPeriod, paymentSchedule },
  downPayment = 0
) => {
  if (
    !paymentSchedule ||
    !SCHEDULE_NUMBER_OF_PAYMENTS_PER_YEAR[paymentSchedule]
  ) {
    throw new Error('Payment Schedule is undefined');
  }
  const numberOfPaymentsPerYear =
    SCHEDULE_NUMBER_OF_PAYMENTS_PER_YEAR[paymentSchedule];

  if (!amortizationPeriod) {
    throw new Error('Amortization Period is undefined');
  }
  const numberOfPaymentsOverAmortizationYears =
    numberOfPaymentsPerYear * amortizationPeriod;
  let baseMortagePaymentPerSchedule;
  try {
    const interestRatePerSchedule =
      annualInterestRate / 100 / numberOfPaymentsPerYear;
    baseMortagePaymentPerSchedule =
      (propertyPrice *
        interestRatePerSchedule *
        Math.pow(
          1 + interestRatePerSchedule,
          numberOfPaymentsOverAmortizationYears
        )) /
      (Math.pow(
        1 + interestRatePerSchedule,
        numberOfPaymentsOverAmortizationYears
      ) -
        1);
  } catch (error) {
    console.log(error);
    //TODO improve error handling to handle an error atribute
    throw new Error('Error calculating Mortgage Per Schedule');
  }

  let cmchInsurancePaymentPerSchedule = 0;
  if (
    shouldCalculateCmhcInsurance(propertyPrice, downPayment, amortizationPeriod)
  ) {
    const cmchInsurance = calculateCmhcInsurance(propertyPrice, downPayment);
    cmchInsurancePaymentPerSchedule =
      cmchInsurance / numberOfPaymentsOverAmortizationYears;
  }

  const downPaymentPerSchedule =
    downPayment > 0 ? downPayment / numberOfPaymentsOverAmortizationYears : 0;

  return parseFloat(
    (baseMortagePaymentPerSchedule - downPaymentPerSchedule + 0).toFixed(2)
  );
};

module.exports = {
  calculatePaymentPerSchedule,
  calculateCmhcInsurance,
};
