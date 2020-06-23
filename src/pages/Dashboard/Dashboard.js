import React from 'react';
import { LoggedTemplate } from '../../templates';
import { AddExpenseDialog } from '../../components/molecules';
import './Dashboard.css';

const Dashboard = (props) => {
    return  <LoggedTemplate {...props} title='Dashboard'>
                 jhdaçfb lkdfnbçdaflbkndfçbdaflknbçdafblndafbçdfjlnbadçfbn asdflwdfsldfkjsdflksjdfl
                 <div className="floating-button-align">
                    <AddExpenseDialog {...props}/>
                </div>
            </LoggedTemplate>
}

export default Dashboard;