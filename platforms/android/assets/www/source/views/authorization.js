/**
 * Created by dmitriy on 21.05.15.
 */
RAD.view("view.authorization", RAD.Blanks.View.extend({
    url: 'source/templates/authorization.html',
    events: {
        'click .sign-up': 'showRegistrationForm',
        'click #authorization .login': 'showLogin',
        'click #sign-up-form .save': 'createUser',
        'click #login-form .login': 'login'
    },

    createUser: function (e) {
        var form = $('#sign-up-form'),
            userParams = {
                name: null,
                password: null,
                email: null
            },
            user,
            that = this;
        e.preventDefault();

        if(this.isFormValid(form)) {
            userParams.name = form.find('input[name="name"]').val();
            userParams.password = form.find('input[name="password"]').val();
            userParams.email = form.find('input[name="email"]').val();
            form.find('.input-field').val('');

            user = new Parse.User({
                username: userParams.name,
                password: userParams.password,
                email: userParams.email
            });
            user.signUp(null, {
                success: function(user) {
                    $('.hide').hide();
                    that.updateData(user.get('username'));
                },
                error: function(user, error) {
                    if(error.code === 202) {
                        console.log('name' + error);
                        $('.name-exist').show();
                    }
                    if(error.code === 203) {
                        console.log('mail' + error);
                        $('.email-exist').show();
                    }
                }
            });
        }
    },

    login: function (e) {
        var form = $('#login-form'),
            userParams = {
                password: null,
                name: null
            },
            user,
            that = this;
        e.preventDefault();
        localStorage.clear();

        if(this.isFormValid(form)) {
            userParams.name = form.find('input[name="name"]').val();
            userParams.password = form.find('input[name="password"]').val();
            form.find('.input-field').val('');

            Parse.User.logIn(userParams.name, userParams.password, {
                success: function(user) {
                    that.updateData();
                },
                error: function(user, error) {
                    if(error.code === 101) {
                        $('.wrong-name').show();
                    }
                }
            });
        }
    },

    updateData: function () {
        var user = Parse.User.current().get('username');
        RAD.models.cardsList.fetchByUsers(user);
    },

    showLogin: function (e) {
        e.preventDefault();
        $('form').hide();
        $('#login-form').show();
    },

    isFormValid: function (form) {
        var fields = $(form.find('.input-field')),
            i = 0, fieldsQuantity = fields.length,
            result = false,
            value = null,
            className = null,
            emailRegular = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        for(i; i < fieldsQuantity; i++) {
            value = $(fields[i]).val();
            className = '.' + $(fields[i]).attr('name');
            result = true;

            if(fields[i]['name'] === 'name') {
                if(value === null || value === '') {
                    $(className).show();
                    result = false;
                }
            } else if(fields[i]['name'] === 'password') {
                if(value === null || value === '') {
                    $(className).show();
                    result = false;
                }
            } else if(fields[i]['name'] === 'email') {
                if(!emailRegular.test(value)) {
                    $(className).show();
                    result = false;
                }
            }
        }

        return result;

    },

    showRegistrationForm: function (e) {
        e.preventDefault();
        $('form').hide();
        $('#sign-up-form').show();
    }
}));