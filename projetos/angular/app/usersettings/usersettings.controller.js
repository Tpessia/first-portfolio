app.controller("UserSettingsController", function ($scope, $location, userService) {    
    // Check session

    redirectNotLogged();
    function redirectNotLogged() {
        $scope.$parent.sessionLoginResponse.then(function (response) {
            if (!userService.user.isLogged) {
                // Redirect

                $location.path("/");
            }
            else {
                $scope.userSecure = userService.userSecure;
            }
        }, function (errResponse) {
            console.log(errResponse);
        });
    }

    // Actions & Events

    $scope.onSubmit = function () {
        console.log("submit changes");
    };

    $scope.changeAvatar = function () {
        console.log("change avatar");
    }
});