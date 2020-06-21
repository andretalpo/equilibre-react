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
import Grid from '@material-ui/core/Grid';
import './Expenses.css';
import moment from 'moment';

class Expenses extends React.Component {
    state = {
        expenses: [],
        cards: [],
        categories: [],
        selectedCard: "",
        startDate: moment(),
        endDate: moment(),
    }

    async handleChangeCard() {
        //Mudar estado do cartao selecionado
        const expenses = await ApiService.getExpenses(this.state.selectedCard._id, '2020-01-01', '2020-12-01');
        const categories = await ApiService.listAllCategories(this.props.userInfo._id);
        const expensesWithCategories = expenses.map(expense => (
            {
                ...expense,
                card: this.state.selectedCard,
                category: categories.find(c => c._id === expense.category)
            }
        ));
        this.setState({ expenses: expensesWithCategories, categories })
    }

    async handleChangeStartDate(startDate) {
        this.setState({ startDate });
    }

    async handleChangeEndDate(endDate) {
        this.setState({ endDate });
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

                {this.state.expenses.length <= 0 ? (<Skeleton animation="wave" />) :
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
                }
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