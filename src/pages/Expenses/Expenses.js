import React from 'react';
import { LoggedTemplate } from '../../templates';
import List from '@material-ui/core/List';
import { ExpenseListItem } from '../../components/molecules';
import ApiService from '../../api/service';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import './Expenses.css';
import moment from 'moment';
import { AddExpenseDialog } from '../../components/molecules';

class Expenses extends React.Component {
    state = {
        expenses: [],
        cards: [],
        categories: [],
        selectedCard: "",
        startDate: moment().startOf('month'),
        endDate: moment(),
    }

    async handleChangeCard(event) {
        this.setState({ selectedCard: event.target.value }, this.onChange);
    }

    async handleChangeStartDate(startDate) {
        this.setState({ startDate }, this.onChange);
    }

    async handleChangeEndDate(endDate) {
        this.setState({ endDate }, this.onChange);
    }

    async componentDidMount() {
        try {
            const cards = await ApiService.getCards(this.props.userInfo._id);
            const categories = await ApiService.listAllCategories(this.props.userInfo._id);
            this.setState({ cards, selectedCard: cards[0], categories }, this.onChange);
        } catch (err) {
            console.log(err);
        }
    }

    async onChange() {
        const formatedStartDate = this.state.startDate ? this.state.startDate.format('yyyy-MM-DD') : {};
        const formatedEndDate = this.state.endDate ? this.state.endDate.format('yyyy-MM-DD') : {};

        if (this.state.selectedCard) {
            const expenses = await ApiService.getExpenses(this.state.selectedCard._id, formatedStartDate, formatedEndDate);
            if (expenses) {
                const expensesWithCategories = expenses.map(expense => (
                    {
                        ...expense,
                        card: this.state.selectedCard,
                        category: this.state.categories.find(c => c._id === expense.category)
                    }
                ));
                this.setState({ expenses: expensesWithCategories });
            } else {
                this.setState({ expenses: [] });
            }
        }
    }

    render() {
        return (
            <LoggedTemplate {...this.props} title="Compras">

                <FormControl fullWidth>
                    <InputLabel id="select-card">Cartão</InputLabel>
                    <Select value={this.state.selectedCard} onChange={(card) => this.handleChangeCard(card)} labelId="select-card">
                        {this.state.cards.map((card, index) => <MenuItem key={index} value={card}>{`${card.name} - ${card.provider}`}</MenuItem>)}
                    </Select>
                </FormControl>

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            className="datepicker-width"
                            margin="normal"
                            id="date-start"
                            label="De"
                            format="DD/MM/yyyy"
                            value={this.state.startDate}
                            onChange={(date) => this.handleChangeStartDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            className="datepicker-width"
                            margin="normal"
                            id="date-end"
                            label="Até"
                            format="DD/MM/yyyy"
                            value={this.state.endDate}
                            onChange={(date) => this.handleChangeEndDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>

                <List>
                    {this.state.expenses.map((expense, index) =>
                        <ExpenseListItem expense={expense}
                            cards={this.state.cards}
                            categories={this.state.categories}
                            deleteMethod={this.deleteExpense}
                            editMethod={this.editExpense}
                            key={index} />
                    )}
                </List>
                <div className="floating-button-align">
                    <AddExpenseDialog {...this.props} />
                </div>
            </LoggedTemplate>
        );
    }

    deleteExpense = async (expense) => {
        await ApiService.deleteExpense(expense._id);
        this.componentDidMount();
    }

    editExpense = async (id, expense) => {
        await ApiService.editExpense(id, expense);
        this.componentDidMount();
    }
}

export default Expenses;