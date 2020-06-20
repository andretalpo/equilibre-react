import React from 'react';
import { LoggedTemplate } from '../../templates';
import List from '@material-ui/core/List';
import { ExpenseListItem } from '../../components/molecules';
import ApiService from '../../api/service';
import Skeleton from '@material-ui/lab/Skeleton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

class Expenses extends React.Component {
    state = {
        expenses: [],
        cards: [],
        selectedCard: "",
        startDate: new Date(),
        endDate: new Date(),
    }

    async handleChangeCard() {
        const expenses = await ApiService.getExpenses(this.state.selectedCard._id, this.state.startDate, this.state.endDate);
        const categories = await ApiService.getCategories(this.props.userInfo._id);
        const expensesWithCategories = expenses.map(expense => (
            {
                ...expense,
                category: categories.find(c => c._id === expense.category)
            }
        ));
        this.setState({ expenses: expensesWithCategories })
    }

    async handleChangeStartDate() {

    }

    async handleChangeEndDate() {

    }

    async componentDidMount() {
        try {
            const cards = await ApiService.getCards(this.props.userInfo._id);
            this.setState({ cards, selectedCard: cards[0] });

            this.handleChangeCard();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <LoggedTemplate {...this.props} title="Compras">
                <FormControl fullWidth>
                    <InputLabel id="select-card">Cartão</InputLabel>
                    <Select value={this.state.selectedCard} onChange={this.handleChangeCard} labelId="select-card">
                        {this.state.cards.map((card, index) => <MenuItem key={index} value={card}>{`${card.name} - ${card.provider}`}</MenuItem>)}
                    </Select>
                </FormControl>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-start"
                        label="De"
                        format="dd/MM/yyyy"
                        value={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-end"
                        label="Até"
                        format="dd/MM/yyyy"
                        value={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
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