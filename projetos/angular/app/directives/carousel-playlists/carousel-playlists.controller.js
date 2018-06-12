app.controller("CarouselPlaylistsController", function ($scope) {
    $scope.onClick = function (name) {
        $scope.onImgClick({ 'name': name });
    }
});