import React from 'react';
import { LoggedTemplate } from '../../templates';
import { ExpensesTable } from '../../components/molecules';

const Expenses = (props) => {
    return (
        <LoggedTemplate {...props} title="Compras">
            <ExpensesTable />
        </LoggedTemplate>
    );
}

export default Expenses;