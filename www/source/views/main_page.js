/**
 * Created by dmitriy on 27.05.15.
 */
RAD.view("view.main_page", RAD.Blanks.View.extend({
    url: 'source/templates/main_page.html',
    events: {
        'tap #new-card': 'createNewCard',
        'tap #show-all': 'showAllCards',
        'tap .logout': 'logout'
    },

    onInitialize: function () {
    },

    onEndAttach: function () {
        this.showFavorites();
    },

    logout: function () {
        localStorage.clear();
        location.reload();
    },

    showFavorites: function () {
        var options = {
            container_id: '#favorites',
            content: "view.favorites",
            animation: 'none'
        };
        RAD.core.publish('navigation.show', options);
    },

    showAllCards: function (e) {
        e.preventDefault();
        var options = {
            container_id: '#screen',
            content: "view.all_cards",
            animation: 'none'
        };
        RAD.core.publish('navigation.show', options);
    },
    
    createNewCard: function () {
        var options = {
            container_id: '#screen',
            content: "view.add_card",
            animation: 'none'
        };
        RAD.core.publish('navigation.show', options);
    }
    
}));