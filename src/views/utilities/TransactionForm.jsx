import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown'; // Import Dropdown from PrimeReact
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';

// Validation schema for the transaction form
const transactionValidationSchema = Yup.object().shape({
  accountId: Yup.string().required('Sender Account is required'),
  ifsc: Yup.string().required('Receiver IFSC is required'),
  accountNumber: Yup.string().required('Receiver Account Number is required'),
  amount: Yup.number().required('Amount is required').positive('Amount must be a positive number'),
});

const TransactionForm = ({ ifsc, accountNumber, amount }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for the form submission
  const [accounts, setAccounts] = useState([]); // State for accounts fetched from API
  const [accountLoading, setAccountLoading] = useState(true); // Loading state for fetching accounts
  const toast = useRef(null);

  // Fetch accounts on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/account-details', {
      params: {
        userId: AuthService.getUserFromToken().userId, // Get userId from token
      },
      withCredentials: true,
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setAccounts(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching accounts:', error);
    })
    .finally(() => setAccountLoading(false));
  }, []);

  // Handle form submission
  const handleTransactionSubmit = async (values) => {
    try {
      setLoading(true); // Show loading state
      const transactionPayload = {
        senderAccountId: values.accountId, // Sender's account ID
        recipientAccountNumber: values.accountNumber, // Receiver's account number
        recipientIFSC: values.ifsc, // Receiver's IFSC code
        amount: values.amount,
      };

      await axios.post('http://localhost:8080/api/transactions', transactionPayload,{withCredentials:true}).then(response=> {
        if (response.data.statusCode === 0) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: response.data.message, life: 3000 });
        }else if (response.data.statusCode === 3 || response.data.statusCode === 1 || response.data.statusCode === 2) {
            toast.current.show({ severity: 'warn', summary: 'Warn', detail: response.data.message, life: 3000 });
        }else if (response.data.statusCode === 4) {
            toast.current.show({ severity: 'error', summary: 'Failed', detail: response.data.message, life: 3000 });
        }
      })
      .catch(error => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error processing transaction', life: 3000 });
      })

     
      

      // Redirect after successful payment
      setTimeout(() => navigate('/utils/util-beneficiary'), 3000);
    } catch (error) {
      // Display error toast
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error processing transaction', life: 3000 });
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Map accounts to dropdown options
  const accountOptions = accounts.map(account => ({
    label: `${account.accountType})`, // Customize label as needed
    value: account.accountID,
  }));

  return (
    <div className="transaction-form">
      <h2>Make Payment</h2>
      <Toast ref={toast} />
      {accountLoading ? (
        <p>Loading accounts...</p> // Show loading indicator while fetching accounts
      ) : (
        <Formik
          initialValues={{
            accountId: '', // Sender's account ID (selected from dropdown)
            ifsc: ifsc || '', // Receiver's IFSC code
            accountNumber: accountNumber || '', // Receiver's account number
            amount: amount || '',
          }}
          validationSchema={transactionValidationSchema}
          onSubmit={handleTransactionSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="p-fluid">
                {/* Sender Account Dropdown */}
                <div className="p-field">
                  <label htmlFor="accountId">Sender Account ID</label>
                  <Field
                    name="accountId"
                    as={Dropdown}
                    options={accountOptions} // Pass account options to the dropdown
                    placeholder="Select Account"
                  />
                  <ErrorMessage name="accountId" component="small" className="p-error" />
                </div>

                {/* Receiver IFSC */}
                <div className="p-field">
                  <label htmlFor="ifsc">Receiver IFSC Code</label>
                  <Field as={InputText} name="ifsc"   />
                  <ErrorMessage name="ifsc" component="small" className="p-error" />
                </div>

                {/* Receiver Account Number */}
                <div className="p-field">
                  <label htmlFor="accountNumber">Receiver Account Number</label>
                  <Field as={InputText} name="accountNumber"   />
                  <ErrorMessage name="accountNumber" component="small" className="p-error" />
                </div>

                {/* Amount Field */}
                <div className="p-field mb-3">
                  <label htmlFor="amount">Amount</label>
                  <Field as={InputText} name="amount" type="number"  />
                  <ErrorMessage name="amount" component="small" className="p-error" />
                </div>

                <Button type="submit" label="Pay" icon="pi pi-check" className='mt-3' loading={loading} />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default TransactionForm;
