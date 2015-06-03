RAD.view("view.code_128", RAD.Blanks.View.extend({
    url: 'source/views/js_barcode.html',
    attributes: {
    },

    cardNumber: null,

    events: {
        'tap #back-main-page': 'showMainPage'
    },

    onNewExtras: function (extras) {
        this.cardNumber = extras.cardNumber;
    },

    onEndAttach: function () {
        $("#barcode").JsBarcode(this.cardNumber, {displayValue:true, fontSize: 18});
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