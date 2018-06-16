app.directive('loginModal', function () {
    return {
        scope: {
            signIn: '&',
            signUp: '&'
        },
        controller: 'LoginModalController',
        templateUrl: 'app/directives/login/login.partial.html',
        link: function (scope, element, attr) {
            scope.instances = M.Modal.init($$('#login-modal'), {});
        }
    };
});