RAD.view("view.favorites", RAD.Blanks.View.extend({
    url: 'source/templates/favorites.html',
    events: {
        'tap .card': 'showCardCode'
    },

    onInitialize: function () {
    },

    onEndAttach: function () {
        var cards = JSON.parse(localStorage.getItem('CardsList'));
        this.changeModel(RAD.models.cardsList);
        this.putCardsToCollection(cards);
    },

    putCardsToCollection: function (cards) {
        var card = null,
            i = 0, cardsQuantity = cards.length < 4 ? cards.length: 4,
            currentCard = null;
        this.model.reset();
        for(i; i < cardsQuantity; i++) {
            card = new RAD.models.card();
            currentCard = cards[i];
            card.set('name', currentCard.name);
            card.set('storeName', currentCard.storeName);
            card.set('storeCardNumber', '' + currentCard.storeCardNumber);
            card.set('fullCardNumber', '' + currentCard.fullCardNumber);
            card.set('user', currentCard.user);
            this.model.add(card);
        }
    },
    
    showCardCode: function (e) {
        e.preventDefault();
        var currentNumber = '' + $(e.currentTarget).data('id');
        var options = {
            container_id: '#screen',
            content: "view.draw_card",
            animation: 'none',
            extras: {
                cardNumber: currentNumber
            }
        };
        RAD.core.publish('navigation.show', options);
    }
}));