import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose a PrimeReact theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  // For layout utilities

const AdminDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [accStatus, setAccStatus] = useState([]); // Account status options
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null); // Selected status
    const [remarks, setRemarks] = useState(''); // Remarks input
    const [isRemarksVisible, setIsRemarksVisible] = useState(false); // Visibility of remarks text area
    const [errorMessage, setErrorMessage] = useState(''); // Error message for mandatory remarks
    const [isRemarksRequired, setIsRemarksRequired] = useState(false);
    useEffect(() => {
        // Fetch all accounts
        axios.get('http://localhost:8080/api/allAccount-details', {
            params: { queryType: 1, accountId: 0 },
            withCredentials: true
        })
            .then(response => {
                setAccounts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
                setLoading(false);
            });

        // Fetch account status options
        axios.get('http://localhost:8080/api/AccStatus-options', { withCredentials: true })
            .then(response => {
                setAccStatus(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching account status:', error);
                setLoading(false);
            });
    }, []);

    // Show account details
    const showAccountDetails = (account) => {
        setSelectedAccount(account);
        setSelectedStatus(account.accountStatusName); // Initialize with the current status
        setIsDialogVisible(true);
    };

    // Handle status change
    const onStatusChange = (e) => {
        const newStatusId = e.value;
        setSelectedStatus(newStatusId);

        // If status is different, make remarks mandatory
        if (newStatusId !== selectedAccount.accountStatusID) {
            setIsRemarksRequired(true);
        } else {
            setIsRemarksRequired(false);
            setRemarks(''); // Clear remarks if status is the same
        }
    };

    // Handle remarks change
    const onRemarksChange = (e) => {
        setRemarks(e.target.value);
    };

    // Hide dialog
    const hideDialog = () => {
        setIsDialogVisible(false);
        setIsRemarksVisible(false);
        setRemarks(''); // Reset remarks
    };

    // Save status and remarks
    const saveStatus = () => {
        if (isRemarksVisible && remarks.trim() === '') {
            setErrorMessage('Remarks are required for status change.');
            return;
        }
       const  data = {
            newAccountStatus: selectedStatus,
            newRemarks: remarks,
            accountId: selectedAccount.accountID,
        }


        // Make API call to update account status
        axios.put(`http://localhost:8080/api/updateAccStatus`, data, { withCredentials: true })
            .then(() => {
                // Reload or update account list after success
                setIsDialogVisible(false);
                setIsRemarksVisible(false);
                setRemarks('');
                setErrorMessage('');
                window.location.reload();
                // Optionally reload data or update local state
            })
            .catch((error) => {
                console.error('Error updating status:', error);
            });
    };

    // Header for DataTable
    const renderHeader = () => (
        <div className="flex justify-content-end">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
            </IconField>
        </div>
    );

    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <h5>All Bank Accounts</h5>
            <DataTable
                value={accounts}
                paginator
                rows={10}
                globalFilter={globalFilter}
                header={header}
                loading={loading}
                responsiveLayout="scroll"
                emptyMessage="No accounts found."
            >
                <Column field="accountNumber" header="Account Number" sortable />
                <Column field="accFullName" header="Full Name" sortable />
                <Column field="balanceAmount" header="Balance" sortable body={(rowData) => `₹${rowData.balanceAmount}`} />
                <Column field="accountStatusName" header="Account Status" sortable />
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <Button label="View" icon="pi pi-eye" className="p-button-info" onClick={() => showAccountDetails(rowData)} />
                    )}
                />
            </DataTable>

            {/* Account Details Dialog */}
            <Dialog header="Account Details" visible={isDialogVisible} style={{ width: '50vw' }} onHide={hideDialog}>
                {selectedAccount && (
                    <div className="p-grid p-fluid">
                        {/* Account Info Section */}
                        <div className="p-col-12 p-md-6">
                            <Card title="Account Info">
                                <p><strong>Account Number:</strong> {selectedAccount.accountNumber}</p>
                                <p><strong>Full Name:</strong> {selectedAccount.accFullName}</p>
                                <p><strong>Balance:</strong> ₹{selectedAccount.balanceAmount}</p>
                                <p><strong>Account Status:</strong> {selectedAccount.accountStatusName}</p>
                                <p><strong>Remarks:</strong> {selectedAccount.accRemarks}</p>
                            </Card>
                        </div>

                        {/* User Info Section */}
                        <div className="p-col-12 p-md-6">
                            <Card title="User Info">
                                <p><strong>User ID:</strong> {selectedAccount.userID}</p>
                                <p><strong>Username:</strong> {selectedAccount.userName}</p>
                                <p><strong>Email:</strong> {selectedAccount.userEmail}</p>
                                <p><strong>Phone:</strong> {selectedAccount.userPhone}</p>
                            </Card>
                        </div>

                        {/* KYC Info Section */}
                        <div className="p-col-12">
                            <Card title="KYC Info">
                                <p><strong>KYC Document:</strong> {selectedAccount.kycOptionLabel}</p>
                                <p><strong>KYC Document Number:</strong> {selectedAccount.kycDocumentNumber}</p>
                            </Card>
                        </div>

                        {/* Account Status Dropdown */}
                        {selectedAccount.accountStatusID !=3 && (
                            <div className="p-col-12">
                            <Card title="Update Account Status">
                                <Dropdown className='mb-2'
                                    value={selectedStatus}
                                    options={accStatus.map(status => ({ label: status.accStatus, value: status.accStatusId }))}
                                    onChange={onStatusChange}
                                    placeholder="Select Status"
                                />
                                {/* Remarks Textarea */}
                        {/* {isRemarksRequired && ( */}
                            <div className="p-col-12">
                                <div className="p-field">
                                   
                                    <InputText
                                        id="remarks"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        required={isRemarksRequired}
                                        
                                        placeholder="Enter remarks for changing the account status"
                                    />
                                    {isRemarksRequired && !remarks && <small className="p-error">Remarks are required when changing the account status.</small>}
                                </div>
                            </div>
                         {/* )} */}
                            </Card>
                        </div>
                        )}
                    </div>
                )}
                <div className="p-dialog-footer">
                <Button label="Cancel" icon="pi pi-times"  onClick={hideDialog} className="p-button-text" />
                   <Button label="Save" icon="pi pi-check" onClick={saveStatus} autoFocus />
                    
                </div>
            </Dialog>
        </div>
    );
};

export default AdminDashboard;
