import React from 'react';
import { LoggedTemplate } from '../../templates';
import List from '@material-ui/core/List';
import { CardListItem } from '../../components/molecules';
import ApiService from '../../api/service';
import { AddExpenseDialog } from '../../components/molecules';

class Cards extends React.Component {
    state = {
        cards: []
    }

    async componentDidMount() {
        const cards = await ApiService.getCards(this.props.userInfo._id);
        this.setState({ cards });
    }

    render() {
        return (
            <LoggedTemplate {...this.props} title="Cartões">
                <List>
                    {this.state.cards.map((card, index) =>
                        <CardListItem card={card}
                            deleteMethod={this.deleteCard}
                            editMethod={this.editCard}
                            key={index} />
                    )}
                </List>
                <div className="floating-button-align">
                    <AddExpenseDialog {...this.props} />
                </div>
            </LoggedTemplate>
        );
    }

    deleteCard = async (card) => {
        await ApiService.deleteCard(card._id);
        this.componentDidMount();
    }

    editCard = async (id, card) => {
        await ApiService.editCard(id, card);
        this.componentDidMount();
    }
}

export default Cards;