import React from 'react';
import { LoggedTemplate } from '../../templates';
import List from '@material-ui/core/List';
import { ExpenseListItem } from '../../components/molecules';
import ApiService from '../../api/service';
import Skeleton from '@material-ui/lab/Skeleton';

class Expenses extends React.Component {
    state = {
        expenses: [],
    }

    async componentDidMount() {
        try {
            const expenses = await ApiService.getExpenses('5eebff1cebc3bb0e44658b87', '2020-01-01', '2020-12-31');
            const categories = await ApiService.getCategories(this.props.userInfo._id);
            const expensesWithCategories = expenses.map(expense => (
                {
                    ...expense,
                    category: categories.find(c => c._id === expense.category)
                }
            ));
            this.setState({ expenses: expensesWithCategories })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <LoggedTemplate {...this.props} title="Compras">
                {this.state.expenses.length <= 0 ? (<Skeleton animation="wave" />) :
                    <List>
                        {this.state.expenses.map((expense, index) => <ExpenseListItem expense={expense} deleteMethod={this.deleteExpense} key={index} />)}
                    </List>
                }
            </LoggedTemplate>
        );
    }

    deleteExpense = async (expense) => {
        await ApiService.deleteExpense(expense._id);
        this.componentDidMount();
    }
}

export default Expenses;