app.controller("UserSettingsController", function ($scope, $location, userService) {
    $scope.userSecure = userService.userSecure;

    redirectNotLogged();
    function redirectNotLogged() {
        if (!userService.user.isLogged) {
            $location.path("/");
        }
    }

    $scope.onSubmit = function () {
        console.log("submit changes");
    };

    $scope.changeAvatar = function () {
        console.log("change avatar");
    }
});