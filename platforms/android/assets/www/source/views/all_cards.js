RAD.view("view.all_cards", RAD.Blanks.View.extend({
    url: 'source/templates/all_cards.html',
    events: {
        'tap .card': 'showCardCode',
        'tap #back-main-page': 'showMainPage'
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
            i = 0, cardsQuantity = cards.length,
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
                cardNumber: null
            }
        };
        if(currentNumber) {
            options.extras.cardNumber = currentNumber;
            RAD.core.publish('navigation.show', options);
        }
    },

    showMainPage: function (e) {
        e.preventDefault();
        var options = {
            container_id: '#screen',
            content: "view.main_page",
            animation: 'none'
        };
        RAD.core.publish('navigation.show', options);
    }
}));