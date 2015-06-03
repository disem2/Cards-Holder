/**
 * Created by dmitriy on 29.05.15.
 */
/**
 * Created by dmitriy on 27.05.15.
 */
RAD.view("view.add_card", RAD.Blanks.View.extend({
    url: 'source/templates/add_card.html',
    attributes: {
    },

    events: {
        'tap #add-type': 'showAddType',
        'tap #add-card .save-typing': 'saveTyping',
        'tap #add-card .back': 'closeAddType',
        'tap #back-main-page': 'showMainPage'
    },

    onEndAttach: function () {
    },

    showAddType: function (e) {
        e.preventDefault();
        $('.type-hide').hide();
        $('.type-form').show();
    },

    closeAddType: function () {
        $('.type-form').hide();
        $('.type-hide').show();
    },

    saveTyping: function (e) {
        e.preventDefault();
        var card = {
            cardName: $('#add-card').find('.card-name').val(),
            cardNumber: $('#add-card').find('.card-number').val(),
            store: $('#store').val(),
            user: Parse.User.current().get('username')
        };
        this.closeAddType();
        this.showConfirm(card);
    },

    showConfirm: function (card) {
        var options = {
            container_id: '#confirm-adding',
            content: "view.confirm_adding",
            animation: 'none',
            extras: {
                card: card
            }
        };
        RAD.core.publish('navigation.show', options);
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