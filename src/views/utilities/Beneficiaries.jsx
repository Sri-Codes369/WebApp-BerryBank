import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AuthService from 'services/AuthService';

// Validation Schema using Yup
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
  // transferLimit: Yup.number().positive('Transfer Limit must be a positive number'),
  // activationStart: Yup.date().nullable().required('Activation Start Date is required'),
  // activationEnd: Yup.date()
  //   .nullable()
  //   .min(Yup.ref('activationStart'), 'End Date must be after Start Date')
  //   .required('Activation End Date is required'),
});

const Beneficiary = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [types, setTypes] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editBeneficiary, setEditBeneficiary] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const toast = React.useRef(null); 

  useEffect(() => {
    fetchBeneficiaries();
    fetchBeneficiaryTypes();
  }, []);

  // Fetch all beneficiaries
  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/beneficiary/1/' + AuthService.getUserFromToken().userId + '/0'); // Update with correct API path
      setBeneficiaries(response.data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error fetching beneficiaries' });
    }
  };

  // Fetch beneficiary types
  const fetchBeneficiaryTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/beneficiary/types'); // Update with correct API path
      setTypes(response.data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error fetching types' });
    }
  };

  // Convert date string to Date object
  const parseDate = (dateStr) => {
    return dateStr ? new Date(dateStr) : null;
  };

  // Convert Date object to YYYY-MM-DD string
  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Form Submission (Insert/Update)
  const handleSubmit = async (values) => {
    try {
      // Convert Date objects back to strings for submission
      const { activationStart, activationEnd, ...submittedValues } = values;
      const payload = {
        ...submittedValues,
        activationStart: formatDate(activationStart),
        activationEnd: formatDate(activationEnd),
      };

      if (isEditMode) {
        await axios.put(`http://localhost:8080/api/beneficiary/${editBeneficiary.beneficiaryId}`, payload); // Update API
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Beneficiary updated' });
        window.location.reload();
      } else {
        await axios.post('http://localhost:8080/api/beneficiary', payload); // Insert API
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Beneficiary added' });
        window.location.reload();
      }
      setShowForm(false);
      setIsEditMode(false);
      setEditBeneficiary(null); // Clear editBeneficiary
      fetchBeneficiaries();
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error saving beneficiary' });
    }
  };

  // Handle Edit
  const handleEdit = (rowData) => {
    setEditBeneficiary({
      ...rowData,
      activationStart: parseDate(rowData.activationStart),
      activationEnd: parseDate(rowData.activationEnd),
    });
    setIsEditMode(true);
    setShowForm(true);
  };

  // Handle Add
  const handleAdd = () => {
    setIsEditMode(false);
    setEditBeneficiary(null); // Clear editBeneficiary
    setShowForm(true);
  };

  // Handle Delete
  const handleDelete = (rowData) => {
    confirmDialog({
      message: 'Are you sure you want to delete this beneficiary?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await axios.delete(`http://localhost:8080/api/beneficiary/${rowData.beneficiaryId}`);
          toast.current.show({ severity: 'success', summary: 'Deleted', detail: 'Beneficiary deleted' });
          fetchBeneficiaries();
        } catch (error) {
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error deleting beneficiary' });
        }
      },
    });
  };

  // Render Action Buttons (Edit/Delete)
  const actionBodyTemplate = (rowData) => {
    return (
      <div className='flex'>
        <Button icon="pi pi-pencil" rounded text raised aria-label="Edit" onClick={() => handleEdit(rowData)} />
        <Button icon="pi pi-trash" severity="warning" rounded text raised aria-label="Delete" onClick={() => handleDelete(rowData)} />
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Button label="Add Beneficiary" icon="pi pi-plus" onClick={handleAdd} />
      <DataTable value={beneficiaries}>
        <Column field="name" header="Name" />
        <Column field="accountNumber" header="Account Number" />
        <Column field="bankName" header="Bank Name" />
        <Column field="ifscCode" header="IFSC Code" />
        <Column field="beneficiaryTypeName" header="Beneficiary Type" />
        {/* <Column field="transferLimit" header="Transfer Limit" /> */}
        <Column body={actionBodyTemplate} header="Actions" />
      </DataTable>

      {/* Add/Edit Beneficiary Form */}
      <Dialog visible={showForm} onHide={() => setShowForm(false)} header={isEditMode ? 'Edit Beneficiary' : 'Add Beneficiary'}>
        <Formik
          initialValues={editBeneficiary || {
            name: '',
            userId: AuthService.getUserFromToken().userId,
            accountNumber: '',
            confirmAccountNumber: '',
            bankName: '',
            address: '',
            mobileNumber: '',
            email: '',
            ifscCode: '',
            beneficiaryType: '',
            transferLimit: '',
            activationStart: null,
            activationEnd: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="p-fluid">
                <div className="p-field">
                  <label htmlFor="name">Name</label>
                  <Field as={InputText} name="name" />
                  <ErrorMessage name="name" component="small" className="p-error" />
                </div>
                <div className="p-field">
                  <label htmlFor="accountNumber">Account Number</label>
                  <Field as={InputText} name="accountNumber" />
                  <ErrorMessage name="accountNumber" component="small" className="p-error" />
                </div>
                <div className="p-field">
                  <label htmlFor="confirmAccountNumber">Confirm Account Number</label>
                  <Field as={InputText} name="confirmAccountNumber"   />
                  <ErrorMessage name="confirmAccountNumber" component="small" className="p-error" />
                </div>
                <div className="p-field">
                  <label htmlFor="bankName">Bank Name</label>
                  <Field as={InputText} name="bankName" />
                  <ErrorMessage name="bankName" component="small" className="p-error" />
                </div>
                <div className="p-field">
                  <label htmlFor="ifscCode">IFSC Code</label>
                  <Field as={InputText} name="ifscCode" />
                  <ErrorMessage name="ifscCode" component="small" className="p-error" />
                </div>
                <div className="p-field">
                  <label htmlFor="beneficiaryType">Beneficiary Type</label>
                  <Dropdown
                    value={values.beneficiaryType}
                    options={types.map(type => ({ label: type.name, value: type.id }))}
                    onChange={(e) => setFieldValue('beneficiaryType', e.value)}
                    placeholder="Select Beneficiary Type"
                  />
                  <ErrorMessage name="beneficiaryType" component="small" className="p-error" />
                </div>
                <div className="p-field">
                  <label htmlFor="transferLimit">Transfer Limit</label>
                  <Field as={InputText} name="transferLimit" type="number" />
                  <ErrorMessage name="transferLimit" component="small" className="p-error" />
                </div>
                <div className="p-field">
                  <label htmlFor="activationStart">Activation Start Date</label>
                  <Field name="activationStart">
                    {({ field, form }) => (
                      <Calendar
                        id="activationStart"
                        value={values.activationStart}
                        onChange={(e) => setFieldValue('activationStart', e.value)}
                        showButtonBar
                        dateFormat="yy-mm-dd"
                      />
                    )}
                  </Field>
                </div>
                <div className="p-field">
                  <label htmlFor="activationEnd">Activation End Date</label>
                  <Field name="activationEnd">
                    {({ field, form }) => (
                      <Calendar
                        id="activationEnd"
                        value={values.activationEnd}
                        onChange={(e) => setFieldValue('activationEnd', e.value)}
                        showButtonBar
                        dateFormat="yy-mm-dd"
                      />
                    )}
                  </Field>
                </div>
                <Button type="submit" label="Save" />
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default Beneficiary;

