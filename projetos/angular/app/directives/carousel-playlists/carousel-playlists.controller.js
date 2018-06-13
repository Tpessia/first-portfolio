app.controller("CarouselPlaylistsController", function ($rootScope, $scope) {
    $scope.fallbackImg = $rootScope.fallbackImg;
    
    $scope.$watch('focusedElem', function (newElem, oldElem) {
        if (newElem !== oldElem) {
            var name = newElem.getAttribute('data-playlist-name');
            $scope.onSlide({ 'name': name });
        }
    });
});