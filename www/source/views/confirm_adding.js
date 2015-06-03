RAD.view("view.confirm_adding", RAD.Blanks.View.extend({
    url: 'source/templates/confirm_adding.html',
    attributes: {
    },

    card: null,

    events: {
        'tap .save-card': 'saveCard'
    },

    onEndAttach: function () {
    },

    onNewExtras: function (extras) {
        this.card = extras.card;
    },

    saveCard: function (e) {
        e.preventDefault();
        var card = new RAD.models.card();
        card.saveCard(this.card);
    }
}));