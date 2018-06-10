var $$ = document.querySelectorAll.bind(document);

document.addEventListener('DOMContentLoaded', function () {

    // Nav dropdown

    var instances = M.Dropdown.init($$('#user-dropdown'), {
        // coverTrigger: false,
        alignment: 'right'
    });

    // Sidenav

    var sidenav = M.Sidenav.init($$('#sidenav')[0], {});

    angular.element($$('.sidenav li')).on('click', function () {
        sidenav.close();
    });
});