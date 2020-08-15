import React from 'react';
import { LoggedTemplate } from '../../templates';
import List from '@material-ui/core/List';
import { CardListItem } from '../../components/molecules';
import ApiService from '../../api/service';
import { AddExpenseDialog } from '../../components/molecules';
import { AddCardDialog } from '../../components/molecules';
import { ConfirmDialog } from '../../components/atoms';

class Cards extends React.Component {
    state = {
        cards: [],
        apiErrorMessage: '',
        
    }

    async componentDidMount() {
        const cards = await ApiService.getCards(this.props.userInfo._id);
        this.setState({ cards });
    }

    render() {
        let floactButtonHeight=window.innerHeight - 100;
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
                {this.state.apiErrorMessage ? <ConfirmDialog open okMethod={this.clearApiErrorMessage} apiErrorMessage={this.state.apiErrorMessage}/> : ''}
                <div className="floating-button-align" style={{top:floactButtonHeight}}>
                    <AddExpenseDialog {...this.props} cards={this.state.cards} />
                </div>
            </LoggedTemplate>
        );
    }

    deleteCard = async (card) => {
        const data = await ApiService.deleteCard(card._id);
        
        if(data){
            this.setState({
              apiErrorMessage: data,  
            })
        }

        this.componentDidMount();
    }

    clearApiErrorMessage = () => {
        this.setState({
            apiErrorMessage: '',
        })
    }

    editCard = async (id, card) => {
        await ApiService.editCard(id, card);
        this.componentDidMount();
    }

    addCard = async (card) => {
        await ApiService.addCard(card);
        this.componentDidMount();
    }
}

export default Cards;