/**
 * Created by dmitriy on 14.05.15.
 */
RAD.model('cardsList', Parse.Collection.extend({
    model: RAD.model('card'),
    query: new Parse.Query(RAD.model('card')),

    initialize: function () {
    },
    
    fetchByUsers: function (name) {
        var that = this;
        this.query.equalTo("user", name);
        this.query.find({
            success: function(results) {
                var i = 0, cardsQuantity = results.length;
                that.reset();
                for(i; i < cardsQuantity; i++) {
                    that.add(results[i]);
                }
                localStorage.setItem('CardsList', JSON.stringify(that));
                location.reload();
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

}), true);