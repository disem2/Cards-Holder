/**
 * Created by dmitriy on 19.05.15.
 */
RAD.model('user', Parse.User.extend('todo', {
    defaults: {
        username: '',
        password: '',
        email: ''
    }
}), false);