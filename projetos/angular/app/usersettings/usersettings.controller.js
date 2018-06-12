app.controller("UserSettingsController", function ($scope, userService) {
    $scope.userSecure = userService.userSecure;

    $scope.onSubmit = function () {
        console.log("submit changes");
    };

    $scope.changeAvatar = function () {
        console.log("change avatar");
    }
});