
RAD.view("view.cards_app", RAD.Blanks.View.extend({
    url: 'source/templates/cards_app.html',
    attributes: {
    },
    
    events: {
    },

    onInitialize: function () {
        if (Parse.User.current()) {
            this.showMainPage();
        } else {
            this.showAuthorization();
        }
    },

    showAuthorization: function () {
        var options = {
            container_id: '#screen',
            content: "view.authorization",
            animation: 'none'
        };
        RAD.core.publish('navigation.show', options);
    },

    showMainPage: function () {
        var options = {
            container_id: '#screen',
            content: "view.main_page",
            animation: 'none'
        };
        RAD.core.publish('navigation.show', options);
    }
}));