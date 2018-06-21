app.controller("UserSettingsController", function ($rootScope, $scope, $location, userService, FileUploader) {  
    
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

    // Materialize init

    var instances = M.Tooltip.init($$('.tooltipped'), {});

    // Uploader config

    $scope.uploader = new FileUploader({
        alias: 'avatar',
        queueLimit: 1,
        removeAfterUpload: true
    });

    $scope.uploader.onAfterAddingFile = function (item) {
        item.url = $rootScope.baseUrl + 'src/php/settings.update.php';
        item.formData = [{
            'userId': userService.userSecure.userId
        }];
    }

    $scope.uploader.onWhenAddingFileFailed = function (item, filter, options) {
        if (filter.name == "queueLimit") {
            $scope.uploader.clearQueue();
            $scope.uploader.addToQueue(item);
        }
    }

    

    // Actions & Events

    $scope.onSubmit = function () {
        var item = $scope.uploader.queue[0];

        item.onSuccess = function (response, status, headers) {
            if (response == "1") {
                console.log(response);
                // Atualizar avatar, nome...
            }
        }

        $scope.uploader.uploadItem(0);
    };
});