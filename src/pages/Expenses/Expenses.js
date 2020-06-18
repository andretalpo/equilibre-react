import React from 'react';
import { LoggedTemplate } from '../../templates';
import List from '@material-ui/core/List';
import { ExpenseListItem } from '../../components/molecules';
import ApiService from '../../api/service';

class Expenses extends React.Component {
    state = {
        expenses: [],
    }

    async componentDidMount() {
        try {
            const expenses = await ApiService.getExpenses('5ee17abd65dcb1515c65cbac', '2020-01-01', '2020-12-31');
            this.setState({ expenses })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <LoggedTemplate {...this.props} title="Compras">
                <List>
                    {this.state.expenses.map((expense, index) => <ExpenseListItem expense={expense} index={index} />)}
                </List>
            </LoggedTemplate>
        );
    }
}

export default Expenses;