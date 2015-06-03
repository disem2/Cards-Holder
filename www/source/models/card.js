/**
 * Created by dmitriy on 14.05.15.
 */
RAD.model('card', Parse.Object.extend({
    className: 'card',
    defaults: {
        name: '',
        storeName: '',
        storeCardNumber: null,
        fullCardNumber: null,
        user: null,
        usageQuantity: 0
    },

    saveCard: function (card) {
        var storesAdditionCode = {
            '911': {
                before: '550000',
                after: '2'
            }
        },
            fullNumber = null,
            that = this;
        this.set('name', card.cardName);
        this.set('storeCardNumber', card.cardNumber);

        if(storesAdditionCode[store]) {
            fullNumber = storesAdditionCode[store].before + number + storesAdditionCode[store].after;
        } else {
            fullNumber = card.cardNumber;
        }
        this.set('storeName', card.store);
        this.set('fullCardNumber', fullNumber);
        this.set('user', card.user);
        
        this.save({
            success: function () {
                var user = card.user;
                RAD.models.cardsList.fetchByUsers(user);
            },
            error: function () {
                
            }
        });
    },

    removeCard: function () {
        this.destroy();
    }

}), false);