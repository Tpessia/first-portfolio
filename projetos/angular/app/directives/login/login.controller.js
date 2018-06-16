app.controller("LoginModalController", function ($scope, $route) {
    $scope.actions = {};
    $scope.formData = {
        signIn: {},
        signUp: {}
    };

    $scope.actions.signIn = function () {
        var data = $scope.formData.signIn;
        $scope.signIn({
            username: data.username,
            password: data.password
        });
    };

    $scope.actions.signUp = function () {
        var data = $scope.formData.signUp;
        $scope.signUp({
            data: {
                username: data.username,
                password: data.password,
                email: data.email
            }
        }).then(function (response) {
            if (response.data == "1") {
                M.toast({
                    html: 'User created',
                    displayLength: '3000'
                });

                $scope.instances[0].close();

                // $route.reload();
                // gambiarra
                setTimeout(function () {
                    M.Dropdown.init($$('#user-dropdown'), {
                        // coverTrigger: false,
                        alignment: 'right'
                    });
                }, 100);
            }
            else {
                M.toast({
                    html: 'Error on user creation',
                    classes: 'red darken-4',
                    displayLength: '3000'
                });

                console.log(response);
            }
        }, function (errResponse) {
            M.toast({
                html: 'Error on user creation',
                classes: 'red darken-4',
                displayLength: '3000'
            });

            console.log(errResponse);
        });
    };
});