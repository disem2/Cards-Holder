/**
 * Created by dmitriy on 27.05.15.
 */
RAD.view("view.draw_card", RAD.Blanks.View.extend({
    url: 'source/views/js_barcode.html',
    attributes: {
    },
    card: null,

    events: {
    },

    onNewExtras: function (extras) {
        this.card = extras.cardNumber;
    },

    onEndAttach: function () {
        var cardNumber = this.card;

        if(this.isCodeEAN(cardNumber)) {
            this.addEAN_13(cardNumber);
        } else if(this.isCodeITF(cardNumber)){
            this.addITF(cardNumber);
        } else {
            this.addCode_128(cardNumber);
        }
    },

    addCard: function () {
        var cardNumber = $('#set-card').find('.card-number').val();

        if(this.isCodeEAN(cardNumber)) {
            this.addEAN_13(cardNumber);
        } else if(this.isCodeITF(cardNumber)){
            this.addITF(cardNumber);
        } else {
            this.addCode_128(cardNumber);
        }
    },

    isCodeEAN: function (code) {
        var number = code.split('').map(Number),
            evenSum = number[1]+number[3]+number[5]+number[7]+number[9]+number[11],
            oddSum = number[0]+number[2]+number[4]+number[6]+number[8]+number[10];

        return (10 - ((oddSum + evenSum * 3) % 10)) === number[12] && number.length === 13;
    },

    isCodeITF: function (code) {
        var number = code.split('').map(Number);

        return number.length > 13;
    },

    addEAN_13: function (cardNumber) {
        var options = {
            container_id: '#screen',
            content: "view.ean_13",
            animation: 'none',
            extras: {
                cardNumber: cardNumber
            }
        };
        if(cardNumber) {
            RAD.core.publish('navigation.show', options);
        } else {
            alert('You must enter number of card');
        }
    },

    addCode_128: function (cardNumber) {
        var options = {
            container_id: '#screen',
            content: "view.code_128",
            animation: 'none',
            extras: {
                cardNumber: cardNumber
            }
        };
        if(cardNumber) {
            RAD.core.publish('navigation.show', options);
        } else {
            alert('You must enter number of card');
        }
    },

    addITF: function (cardNumber) {
        var options = {
            container_id: '#screen',
            content: "view.itf",
            animation: 'none',
            extras: {
                cardNumber: cardNumber
            }
        };
        if(cardNumber) {
            RAD.core.publish('navigation.show', options);
        } else {
            alert('You must enter number of card');
        }
    }
}));