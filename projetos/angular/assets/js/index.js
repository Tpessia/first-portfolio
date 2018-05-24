var $$ = document.querySelectorAll.bind(document);

document.addEventListener('DOMContentLoaded', function () {
    var sidenav = M.Sidenav.init($$('#sidenav')[0], {});

    angular.element($$('.sidenav li')).on('click', function () {
        sidenav.close();
    });
});