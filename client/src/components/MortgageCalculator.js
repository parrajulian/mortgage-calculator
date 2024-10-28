import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Grid2 } from '@mui/material';
import { PaymentSchedule } from '../constants/mortgageCalculator';

const MortgageCalculator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    //TODO can set the url on a separate file
    const response = await fetch(
      'http://localhost:5000/mortgage-per-schedule?' +
        new URLSearchParams(formData).toString()
    );
    const paymentPerSchedule = await response.json();
    setPaymentPerSchedule(paymentPerSchedule);
  };

  const [paymentPerSchedule, setPaymentPerSchedule] = useState();

  return (
    <>
      <h1>Mortgage Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={6} lg={3} xl={2}>
            <TextField
              label="Property Price"
              type="number"
              {...register('propertyPrice', {
                required: 'Property Price is required',
              })}
              error={!!errors.propertyPrice}
              helperText={errors.propertyPrice?.message}
            />
          </Grid2>
          <Grid2 item xs={6} lg={3} xl={2}>
            <TextField
              label="Down Payment"
              defaultValue={0}
              type="number"
              {...register('downPayment')}
            />
          </Grid2>
          <Grid2 item xs={6} lg={3} xl={2}>
            <TextField
              label="Annual Interest Rate"
              type="number"
              {...register('annualInterestRate', {
                required: 'Annual Interest Rate is required',
              })}
              inputProps={{
                min: '0',
                step: '0.01',
              }}
              error={!!errors.annualInterestRate}
              helperText={errors.annualInterestRate?.message}
            />
          </Grid2>
          <Grid2 item xs={6} lg={3} xl={2}>
            <TextField
              label="Armortization Period"
              defaultValue={'5'}
              {...register('amortizationPeriod', {
                required: 'Armortization Period is required',
              })}
              error={!!errors.armortizationPeriod}
              helperText={errors.armortizationPeriod?.message}
              select
              style={{ width: 200 }}
            >
              {[5, 10, 15, 20, 25, 30].map((years) => (
                <MenuItem key={years} value={years}>
                  {years}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>
          <Grid2 item xs={6} lg={3} xl={2}>
            <TextField
              label="Payment Schedule"
              defaultValue={PaymentSchedule.monthly}
              {...register('paymentSchedule', {
                required: 'Payment Schedule is required',
              })}
              error={!!errors.paymentSchedule}
              helperText={errors.paymentSchedule?.message}
              select
              style={{ width: 200 }}
            >
              <MenuItem value={PaymentSchedule.monthly}>Monthly</MenuItem>{' '}
              <MenuItem value={PaymentSchedule.biWeekly}>Bi-weekly</MenuItem>{' '}
              <MenuItem value={PaymentSchedule.acceleratedBiWeekly}>
                Accelerated bi-weekly
              </MenuItem>
            </TextField>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2}>
          <Grid2 item xs={6} lg={3} xl={2}>
            <Button color="primary" type="submit">
              Submit
            </Button>{' '}
          </Grid2>{' '}
        </Grid2>
        {paymentPerSchedule && (
          <Grid2 item xs={6} lg={3} xl={2}>
            <h3>Payment Per Schedule : {paymentPerSchedule}</h3>
          </Grid2>
        )}
      </form>
    </>
  );
};

export default MortgageCalculator;
