import React from 'react';
import { LoggedTemplate } from '../../templates';
import List from '@material-ui/core/List';
import { CardListItem } from '../../components/molecules';
import ApiService from '../../api/service';
import { AddExpenseDialog } from '../../components/molecules';
import { AddCardDialog } from '../../components/molecules';

class Cards extends React.Component {
    state = {
        cards: [],
        
    }

    async componentDidMount() {
        const cards = await ApiService.getCards(this.props.userInfo._id);
        this.setState({ cards });
    }

    render() {
        return (
            <LoggedTemplate {...this.props} title="Cartões">
                <AddCardDialog {...this.props} addMethod={this.addCard}  />
                <List>
                    {this.state.cards.map((card, index) =>
                        <CardListItem card={card}
                            deleteMethod={this.deleteCard}
                            editMethod={this.editCard}
                            key={index} />
                    )}
                </List>
                <div className="floating-button-align">
                    <AddExpenseDialog {...this.props} onChange={this.onChange} />
                </div>
            </LoggedTemplate>
        );
    }

    deleteCard = async (card) => {
        await ApiService.deleteCard(card._id);
        this.onChange();
        this.componentDidMount();
    }

    editCard = async (id, card) => {
        await ApiService.editCard(id, card);
        this.componentDidMount();
    }

    addCard = async (card) => {
        await ApiService.addCard(card);
        this.componentDidMount();
    }

    onChange = () => {
        this.setState({
            refreshCards: !this.state.refreshCards,
        });
        console.log(this.state.refreshCards)
        
    }
}

export default Cards;