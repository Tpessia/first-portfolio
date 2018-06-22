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

                $scope.userChangeable = {
                    'initialName': userService.user.name,
                    'name': userService.user.name,
                    'avatar': userService.user.avatar,
                    'oldPassword': "",
                    'newPassword': ""
                };
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
        item.url = $rootScope.baseUrl + 'src/php/settings.avatar.php';
        item.formData = [{
            'userId': userService.userSecure.userId
        }];
        
        var oldImg = $$('#avatar-img')[0],
            file = item._file;

        var newImg = document.createElement("img");
        newImg.id = "avatar-img";
        newImg.file = file;
        oldImg.parentNode.replaceChild(newImg, oldImg);

        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(newImg);
        reader.readAsDataURL(file);
    }

    $scope.uploader.onWhenAddingFileFailed = function (item, filter, options) {
        if (filter.name == "queueLimit") {
            $scope.uploader.clearQueue();
            $scope.uploader.addToQueue(item);
        }
    }

    

    // Actions & Events

    $scope.onSubmit = function () {
        var changing = [];

        if ($scope.uploader.queue.length != 0) { // Img changed
            changing.push('avatar');

            var item = $scope.uploader.queue[0];

            item.onSuccess = function (response, status, headers) {
                if (typeof response.UserID !== "undefined") {
                    $scope.$apply(function () {
                        $$('#avatar-img')[0].src = $scope.userChangeable.avatar = userService.user.avatar = response.Avatar + "?_=" + new Date().getTime();
                    });

                    M.toast({
                        html: 'Avatar changed',
                        displayLength: '3000'
                    });
                }
                else {
                    console.log(response);

                    M.toast({
                        html: 'Error on avatar change',
                        classes: 'red darken-4',
                        displayLength: '3000'
                    });
                }
            }

            $scope.uploader.uploadItem(0);
        }
        if ($scope.userChangeable.oldPassword != "" || $scope.userChangeable.newPassword != "") {
            changing.push('password');

            if ($scope.userChangeable.oldPassword != "" && $scope.userChangeable.newPassword != "") {
                userService.changePassword({
                    'userId': userService.userSecure.userId,
                    'oldPassword': $scope.userChangeable.oldPassword,
                    'newPassword': $scope.userChangeable.newPassword,
                }).then(function (response) {
                    if (typeof response.data.UserID !== "undefined") {
                        M.toast({
                            html: 'Password changed',
                            displayLength: '3000'
                        });
                    }
                    else {
                        console.log(response);

                        M.toast({
                            html: 'Error on password change',
                            classes: 'red darken-4',
                            displayLength: '3000'
                        });
                    }
                }, function (errResponse) {
                    console.log(errResponse);

                    M.toast({
                        html: 'Error on password change',
                        classes: 'red darken-4',
                        displayLength: '3000'
                    });
                });
            }
            else {
                M.toast({
                    html: 'Error on password change',
                    classes: 'red darken-4',
                    displayLength: '3000'
                });
            }
        }
        if ($scope.userChangeable.name != $scope.userChangeable.initialName) {
            changing.push('name');

            userService.changeName({
                'userId': userService.userSecure.userId,
                'newName': $scope.userChangeable.name
            }).then(function (response) {
                if (typeof response.data.UserID !== "undefined") {
                    $scope.userChangeable.name = userService.user.name = response.data.Name;

                    M.toast({
                        html: 'Name changed',
                        displayLength: '3000'
                    });
                }
                else {
                    console.log(response);

                    M.toast({
                        html: 'Error on name change',
                        classes: 'red darken-4',
                        displayLength: '3000'
                    });
                }
            }, function (errResponse) {
                console.log(errResponse);

                M.toast({
                    html: 'Error on name change',
                    classes: 'red darken-4',
                    displayLength: '3000'
                });
            });
        }
        if (changing.length == 0) {
            M.toast({
                html: 'No change has been made',
                classes: 'red darken-4',
                displayLength: '3000'
            });
        }
    };
});