import React from 'react';
import { LoggedTemplate } from '../../templates';
import { AddExpenseDialog } from '../../components/molecules';
import './Dashboard.css';
import moment from 'moment';
import ApiService from '../../api/service';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

class Dashboard extends React.Component {
    state = {
        cards: [],
        selectedCard: {},
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
            cards.unshift({ name: 'Todos' });
            this.setState({ cards, selectedCard: cards[0] }, this.onChange);
        } catch (err) {
            console.log(err);
        }
    }

    async onChange() {
        const formatedStartDate = this.state.startDate ? this.state.startDate.format('yyyy-MM-DD') : {};
        const formatedEndDate = this.state.endDate ? this.state.endDate.format('yyyy-MM-DD') : {};
        
        const totalValue = await ApiService.getTotalValue(this.props.userInfo._id, formatedStartDate, formatedEndDate);

        const totalValuesByCard = await Promise.all(this.state.cards.map(async card => {
            const totalValueByCard = await ApiService.getTotalValue(this.props.userInfo._id, this.state.startDate, this.state.endDate, card._id);
            totalValueByCard._id = card._id;
            return totalValueByCard;
        }));
        
        this.setState({ totalValue, totalValuesByCard });
        //buscar valor por categoria ordenado por maior gasto
        //buscar top 10 compras mais caras
    }

    render() {
        return (
            <LoggedTemplate {...this.props} title='Dashboard' >

                <FormControl fullWidth>
                    <InputLabel id="select-card">Cartão</InputLabel>
                    <Select value={this.state.selectedCard} onChange={(card) => this.handleChangeCard(card)} labelId="select-card">
                        {this.state.cards.map((card, index) => <MenuItem key={index} value={card}>{`${card.name}`}</MenuItem>)}
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

                <div className="floating-button-align">
                    <AddExpenseDialog {...this.props} />
                </div>
            </LoggedTemplate>
        );
    }
}

export default Dashboard;