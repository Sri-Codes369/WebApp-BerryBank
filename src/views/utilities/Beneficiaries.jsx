import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Beneficiary Name is required'),
  accountNumber: Yup.string()
    .required('Beneficiary Account Number is required')
    .matches(/^\d+$/, 'Account Number must be digits only'),
  confirmAccountNumber: Yup.string()
    .required('Confirm Account Number is required')
    .oneOf([Yup.ref('accountNumber')], 'Account Numbers must match'),
  bankName: Yup.string().required('Beneficiary Bank Name is required'),
  ifscCode: Yup.string()
    .required('IFSC Code is required')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code'),
  beneficiaryType: Yup.string().required('Beneficiary Type is required'),
  transferLimit: Yup.number().positive('Transfer Limit must be a positive number'),
  activationStart: Yup.date().nullable().required('Activation Start Date is required'),
  activationEnd: Yup.date()
    .nullable()
    .min(Yup.ref('activationStart'), 'End Date must be after Start Date')
    .required('Activation End Date is required'),
});

const Beneficiary = () => {
  const theme = useTheme();

  return (
    <MainCard title="All Beneficiaries" secondary={<SecondaryAction link="#" />}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard title="My Beneficiaries">
            <Grid container spacing={gridSpacing}>
              {/* Content for My Beneficiaries */}
            </Grid>
          </SubCard>
        </Grid>
        <Grid item xs={12}>
          <SubCard title="Add Beneficiaries">
            <Formik
              initialValues={{
                name: '',
                accountNumber: '',
                confirmAccountNumber: '',
                bankName: '',
                ifscCode: '',
                beneficiaryType: '',
                nickname: '',
                address: '',
                mobileNumber: '',
                email: '',
                transferLimit: '',
                activationStart: null,
                activationEnd: null,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Form>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="name"
                          label="Beneficiary Name *"
                          fullWidth
                          error={touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="accountNumber"
                          label="Beneficiary Account Number *"
                          fullWidth
                          error={touched.accountNumber && !!errors.accountNumber}
                          helperText={touched.accountNumber && errors.accountNumber}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="confirmAccountNumber"
                          label="Confirm Account Number *"
                          fullWidth
                          error={touched.confirmAccountNumber && !!errors.confirmAccountNumber}
                          helperText={touched.confirmAccountNumber && errors.confirmAccountNumber}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="bankName"
                          label="Beneficiary Bank Name *"
                          fullWidth
                          error={touched.bankName && !!errors.bankName}
                          helperText={touched.bankName && errors.bankName}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="ifscCode"
                          label="IFSC Code *"
                          fullWidth
                          error={touched.ifscCode && !!errors.ifscCode}
                          helperText={touched.ifscCode && errors.ifscCode}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="beneficiaryType"
                          label="Beneficiary Type *"
                          fullWidth
                          select
                          error={touched.beneficiaryType && !!errors.beneficiaryType}
                          helperText={touched.beneficiaryType && errors.beneficiaryType}
                        >
                          <MenuItem value="individual">Individual</MenuItem>
                          <MenuItem value="business">Business</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="nickname"
                          label="Nickname (Optional)"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="address"
                          label="Beneficiary Address (Optional)"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="mobileNumber"
                          label="Mobile Number (Optional)"
                          fullWidth
                          error={touched.mobileNumber && !!errors.mobileNumber}
                          helperText={touched.mobileNumber && errors.mobileNumber}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="email"
                          label="Email ID (Optional)"
                          fullWidth
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field name="activationStart">
                          {({ field }) => (
                            <DatePicker
                              {...field}
                              label="Activation Start Date *"
                              value={values.activationStart}
                              onChange={(value) => setFieldValue('activationStart', value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  error={touched.activationStart && !!errors.activationStart}
                                  helperText={touched.activationStart && errors.activationStart}
                                />
                              )}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field name="activationEnd">
                          {({ field }) => (
                            <DatePicker
                              {...field}
                              label="Activation End Date *"
                              value={values.activationEnd}
                              onChange={(value) => setFieldValue('activationEnd', value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  error={touched.activationEnd && !!errors.activationEnd}
                                  helperText={touched.activationEnd && errors.activationEnd}
                                />
                              )}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                          Add Beneficiary
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                </LocalizationProvider>
              )}
            </Formik>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Beneficiary;
