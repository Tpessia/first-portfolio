app.controller("TracksGridController", function ($scope) {
    $scope.cutStr = function (text, letters) {
        return text.length > letters ? text.substr(0, letters) + "..." : text;
    };

    $scope.newTab = function (url) {
        window.open(url);
    };
});