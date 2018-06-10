app.controller("UserSettingsController", function ($scope, userService) {
    $scope.userSecure = userService.userSecure;
});