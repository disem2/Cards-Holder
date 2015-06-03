/**
 * Created by dmitriy on 22.05.15.
 */
RAD.view("view.ean_13", RAD.Blanks.View.extend({
    url: 'source/views/js_barcode.html',
    attributes: {
    },
    field: {
        canvas: document.createElement('canvas'),
        context: null
    },
    barcode: {
        cardNumber: null,
        drawingPosition: {
            x: 20,
            y: 20
        },
        lineWidth: 2,
        lineHeight: 60,
        separateLineHeight: 70,
        leftCodingSequence: [],
        rightCodingSequence: ['C', 'C', 'C', 'C', 'C', 'C']
    },
    color: {
        white: 'transparent',
        black: '#000000'
    },
    events: {
        'tap #back-main-page': 'showMainPage'
    },

    onInitialize: function () {
    },

    onNewExtras: function (extras) {
        this.barcode.cardNumber = extras.cardNumber;
    },

    onEndAttach: function () {
        this.field.canvas.id = "field";
        this.field.canvas.width = 100 * this.barcode.lineWidth + this.barcode.drawingPosition.x * 2;
        this.field.canvas.height = this.barcode.separateLineHeight + this.barcode.drawingPosition.y * 2;
        this.field.context = this.field.canvas.getContext("2d");
        var cardNumber = this.barcode.cardNumber,
            card = new RAD.models.card();
        card.set('number', cardNumber);

        this.drawBarcode(cardNumber);
    },

    setLeftCodingSequence: function (number) {
        var sequences = {
            0: ['A', 'A', 'A', 'A', 'A', 'A'],
            1: ['A', 'A', 'B', 'A', 'B', 'B'],
            2: ['A', 'A', 'B', 'B', 'A', 'B'],
            3: ['A', 'A', 'B', 'B', 'B', 'A'],
            4: ['A', 'B', 'A', 'A', 'B', 'B'],
            5: ['A', 'B', 'B', 'A', 'A', 'B'],
            6: ['A', 'B', 'B', 'B', 'A', 'A'],
            7: ['A', 'B', 'A', 'B', 'A', 'B'],
            8: ['A', 'B', 'A', 'B', 'B', 'A'],
            9: ['A', 'B', 'B', 'A', 'B', 'A']
        };

        this.barcode.leftCodingSequence = sequences[number];
    },

    getNumberCode: function (codingSymbol, number) {
        var coding = {
            'A': {
                0: [0, 0, 0, 1, 1, 0, 1],
                1: [0, 0, 1, 1, 0, 0, 1],
                2: [0, 0, 1, 0, 0, 1, 1],
                3: [0, 1, 1, 1, 1, 0, 1],
                4: [0, 1, 0, 0, 0, 1, 1],
                5: [0, 1, 1, 0, 0, 0, 1],
                6: [0, 1, 0, 1, 1, 1, 1],
                7: [0, 1, 1, 1, 0, 1, 1],
                8: [0, 1, 1, 0, 1, 1, 1],
                9: [0, 0, 0, 1, 0, 1, 1]
            },
            'B': {
                0: [0, 1, 0, 0, 1, 1, 1],
                1: [0, 1, 1, 0, 0, 1, 1],
                2: [0, 0, 1, 1, 0, 1, 1],
                3: [0, 1, 0, 0, 0, 0, 1],
                4: [0, 0, 1, 1, 1, 0, 1],
                5: [0, 1, 1, 1, 0, 0, 1],
                6: [0, 0, 0, 0, 1, 0, 1],
                7: [0, 0, 1, 0, 0, 0, 1],
                8: [0, 0, 0, 1, 0, 0, 1],
                9: [0, 0, 1, 0, 1, 1, 1]
            },
            'C': {
                0: [1, 1, 1, 0, 0, 1, 0],
                1: [1, 1, 0, 0, 1, 1, 0],
                2: [1, 1, 0, 1, 1, 0, 0],
                3: [1, 0, 0, 0, 0, 1, 0],
                4: [1, 0, 1, 1, 1, 0, 0],
                5: [1, 0, 0, 1, 1, 1, 0],
                6: [1, 0, 1, 0, 0, 0, 0],
                7: [1, 0, 0, 0, 1, 0, 0],
                8: [1, 0, 0, 1, 0, 0, 0],
                9: [1, 1, 1, 0, 1, 0, 0]
            }
        };
        return coding[codingSymbol][number];
    },

    getDrawingPosition: function (position, part) {
        var correctingNumber = {
            'leftCode': 3,
            'rightCode': 8
        };
        return {
            x: ((position - 1) * 7 + correctingNumber[part]) * this.barcode.lineWidth + this.barcode.drawingPosition.x,
            y: this.barcode.drawingPosition.y
        }
    },

    drawBarcode: function (code) {
        var uri = null;

        this.setLeftCodingSequence(+code.split('')[0]);

        this.drawOutControl('left');

        this.drawLeftCode(code);
        this.drawRightCode(code);

        this.drawMiddleControl();

        this.drawOutControl('right');

        uri = this.field.canvas.toDataURL('image/png');

        $("#barcode").attr('src', uri);
    },

    drawLinesOfNumber: function (codingSymbol, symbol, drawingPosition) {
        var numberCode = this.getNumberCode(codingSymbol, symbol),
            i = 0, codeLength = numberCode.length;

        for(i; i < codeLength; i++) {
            if(numberCode[i] === 1) {
                this.drawLine(drawingPosition, this.barcode.lineHeight, this.color.black);
            } else {
                this.drawLine(drawingPosition, this.barcode.lineHeight, this.color.white);
            }
            drawingPosition.x += this.barcode.lineWidth;
        }
    },

    drawLeftCode: function (code) {
        var symbols = (code).split('').map(Number),
            i = 1,
            drawingPosition = null;
        for(i; i <= 6; i++) {
            drawingPosition = this.getDrawingPosition(i, 'leftCode');
            this.drawLinesOfNumber(this.barcode.leftCodingSequence[i-1], symbols[i], drawingPosition);
        }
    },

    drawRightCode: function (code) {
        var symbols = (code).split('').map(Number),
            i = 7,
            drawingPosition = null;
        for(i; i <= 12; i++) {
            drawingPosition = this.getDrawingPosition(i, 'rightCode');
            this.drawLinesOfNumber(this.barcode.rightCodingSequence[i-7], symbols[i], drawingPosition);
        }
    },

    drawOutControl: function (part) {
        var drawingPosition = {
            x: null,
            y: this.barcode.drawingPosition.y
        };
        if(part === 'left') {
            drawingPosition.x = this.barcode.drawingPosition.x;
        } else if(part === 'right') {
            drawingPosition.x = 92 * this.barcode.lineWidth + this.barcode.drawingPosition.x;
        }
        this.drawLine(drawingPosition, this.barcode.separateLineHeight, this.color.black);
        drawingPosition.x += this.barcode.lineWidth;
        this.drawLine(drawingPosition, this.barcode.separateLineHeight, this.color.white);
        drawingPosition.x += this.barcode.lineWidth;
        this.drawLine(drawingPosition, this.barcode.separateLineHeight, this.color.black);
        drawingPosition.x += this.barcode.lineWidth;
    },

    drawMiddleControl: function () {
        var drawingPosition = {
            x: 45 * this.barcode.lineWidth + this.barcode.drawingPosition.y,
            y: this.barcode.drawingPosition.y
        };
        this.drawLine(drawingPosition, this.barcode.separateLineHeight, this.color.white);
        drawingPosition.x += this.barcode.lineWidth;
        this.drawLine(drawingPosition, this.barcode.separateLineHeight, this.color.black);
        drawingPosition.x += this.barcode.lineWidth;
        this.drawLine(drawingPosition, this.barcode.separateLineHeight, this.color.white);
        drawingPosition.x += this.barcode.lineWidth;
        this.drawLine(drawingPosition, this.barcode.separateLineHeight, this.color.black);
        drawingPosition.x += this.barcode.lineWidth;
        this.drawLine(drawingPosition, this.barcode.separateLineHeight, this.color.white);
    },

    drawLine: function (position, height, color) {
        this.field.context.beginPath();
        this.field.context.moveTo(position.x, position.y);
        this.field.context.lineTo(position.x, position.y + height);
        this.field.context.lineWidth = this.barcode.lineWidth;
        this.field.context.strokeStyle = color;
        this.field.context.stroke();
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