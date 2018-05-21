app.controller("AlbunsController", function ($scope, albunsService) {
    $scope.page = "Albums";

    $scope.albuns = albunsService.getAlbuns();
});