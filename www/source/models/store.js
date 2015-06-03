/**
 * Created by dmitriy on 27.05.15.
 */
RAD.model('store', Parse.Object.extend({
    className: 'store',
    defaults: {
        storeName: '',
        additionCodeLeft: '',
        additionCodeRight: ''
    }

}), false);