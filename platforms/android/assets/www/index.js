(function (document, window) {
    'use strict';
    Parse.initialize("0sgIlHFNNC5B0jVbRyu5n5uLvp0ubD5zuqF4J1i6", "H1E4Wrsz4saaHpCSrZjFHM5RzdEs26QRN3uP6bxK");
    var scripts = [
        "source/models/card.js",
        "source/collections/cards.js",
        "source/views/ean_13_draw.js",
        "source/views/code_128_draw.js",
        "source/views/itf.js",
        "source/views/add_card.js",
        "source/views/confirm_adding.js",
        "source/views/draw_card.js",
        "source/views/authorization.js",
        "source/views/favorites.js",
        "source/views/all_cards.js",
        "source/views/main_page.js",
        "source/views/cards_app.js"
    ];
    function onEndLoad() {
        RAD.core.initialize();
        RAD.core.publish('navigation.show', {
            container_id: '#screen',
            content: 'view.cards_app',
            animation: 'none'
        });
    }
    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));