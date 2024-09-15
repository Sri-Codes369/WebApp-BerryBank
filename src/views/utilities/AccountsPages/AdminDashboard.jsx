import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose a PrimeReact theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  // For layout utilities
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const AdminDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all accounts in the bank
        axios.get('http://localhost:8080/api/allAccount-details', {
            params: {
                queryType: 1, // Fetch all accounts
                accountId: 0
            }
        }, { withCredentials: true })
            .then(response => {
                setAccounts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
                setLoading(false);
            });
    }, []);

    // Header for the DataTable
    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
            </IconField>
        </div>
        );
    };

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
                <Column field="accFullName" header="Holder" sortable />
                <Column field="balanceAmount" header="Balance" sortable body={(rowData) => `₹ ${rowData.balanceAmount}`} />
                <Column field="accountStatusName" header="Account Status" sortable />
                <Column
                    header="Actions"
                    body={() => (
                        <Button label="View" icon="pi pi-eye" className="p-button-info" />
                    )}
                />
            </DataTable>
        </div>
    );
};

export default AdminDashboard;
