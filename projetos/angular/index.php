<?php
// Start the session
// session_start();
// $_SESSION["teste"] = "teste";
?>
<!DOCTYPE html>
<html lang="en" ng-app="noisePolution">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title ng-bind="title !== undefined && title != '' ?  title + ' | Noise Pollution' : 'Noise Pollution'">Noise Pollution</title>
    <link rel="icon" type="image/png" href="favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <base href="<?php echo $_SERVER['REQUEST_URI']; ?>">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="./lib/materialize/materialize.min.css" rel="stylesheet">
    <link href="./assets/styles/css/main.css" rel="stylesheet">
</head>
<body ng-controller="UserController">    
    <header ng-controller="HeaderController">
        <ul id="user-dropdown-items" class="dropdown-content">
            <li ng-repeat="item in navItems.user" ng-class="{'active': isActive(item.url)}">
                <a href="{{ '#!' + item.url }}">{{ item.text }}</a>
            </li>
            <li>
                <a class="logout" ng-click="userMethods.logOut">Log Out</a>
            </li>
        </ul>
        <nav class="z-depth-1">
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">
                    <!-- <img src="assets/img/logo.png" alt="Noise Polution" class="hide-on-small-only"> -->
                    <img src="assets/img/logo-simple-raw-256x256.png" alt="NP">
                </a>
                <a href="#" data-target="sidenav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li ng-repeat="item in navItems.main" ng-class="{'active': isActive(item.url)}">
                        <a href="{{ '#!' + item.url }}">{{ item.text }}</a>
                    </li>
                    <li ng-if="!user.isLogged">
                        <a data-target="login-modal" class="login modal-trigger">Log In</a>
                    </li>
                    <li id="loginAvatar" ng-class="{'active': isActive('/user') || isActive('/user/playlists')}" ng-if="user.isLogged">
                        <a id="user-dropdown" href="#!" data-target="user-dropdown-items">
                            <img alt="{{ user.name }}" class="circle avatar" ng-src="{{ user.avatar }}" >
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <ul id="sidenav" class="sidenav">
            <li ng-if="user.isLogged">
                <div class="user-view">
                    <div class="background">
                        <img ng-src="{{ headerImgs.topTrack }}">
                    </div>
                    <a href="#user"><img class="circle" alt="{{ user.name }}" ng-src="{{ user.avatar }}"></a>
                    <a href="#name"><span class="white-text name">John Doe</span></a>
                    <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
                </div>
            </li>
            <li ng-repeat="item in navItems.main" ng-class="{'active': isActive(item.url)}">
                <a href="{{ '#!' + item.url }}">{{ item.text }}</a>
            </li>
            <li><div class="divider"></div></li>
            <li ng-if="!user.isLogged">
                <a data-target="login-modal" class="login modal-trigger">Log In</a>
            </li>
            <li ng-if="user.isLogged" ng-repeat="item in navItems.user" ng-class="{'active': isActive(item.url)}">
                <a href="{{ '#!' + item.url }}">{{ item.text }}</a>
            </li>
            <li ng-if="user.isLogged">
                <a class="logout" ng-click="userMethods.logOut()">Log Out</a>
            </li>
        </ul>

        <div id="banner" class="{{ titleClass }}">
            <div id="img-wrapper1" class="img-wrapper" ng-style="{'background-image':'url(' + headerImgs.topTrack + ')'}"></div>
            <div id="img-wrapper2" class="img-wrapper" ng-style="{'background-image':'url(' + headerImgs.topArtist + ')'}"></div>
            <div id="img-wrapper3" class="img-wrapper" ng-style="{'background-image':'url(' + headerImgs.topTag + ')'}"></div>
            <div id="bannerOverlay">
                <img id="img-logo" src="assets/img/logo-simple-raw-256x256.png">
                <div id="bannerText">
                    Your Tracks, Artists and Albums in a single place
                </div>
            </div>
        </div>
        
        <div login-modal sign-in="userMethods.signIn()" sign-up="userMethods.signUp()" id="login-modal" class="modal">
            <!-- Login Modal -->
        </div>
    </header>

    <main class="container" ng-view="">
        <!-- NG VIEW -->
    </main>

    <aside yt-player>
        <!-- YT PLAYER -->
    </aside>

    <footer class="page-footer">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text">Noise Pollution</h5>
                    <p class="grey-text text-lighten-5">A website created with AngularJS, bringing together entertainment and learning.</p>
                </div>
                <div class="col l4 offset-l2 s12">
                    <h5 class="white-text">Other Projects</h5>
                    <ul>
                        <li>
                            <a class="grey-text text-lighten-5" href="/">Portfolio</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-5" href="/projetos/clima">Weather</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-5" href="/projetos/tablefy">Tablefy</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-5" href="/projetos/cronometro">Cronometer</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container grey-text text-lighten-5">
                Create by Thiago Pessia
                <a class="grey-text text-lighten-5 right" href="/contato">Contact</a>
            </div>
        </div>
    </footer>

    <script src="./lib/angular/angular.min.js"></script>
    <script src="./lib/angular/angular-route.min.js"></script>
    <script src="./lib/angular/angular-animate.min.js"></script>
    <script src="./lib/youtube-embed/iframe_api.js"></script>
    <script src="./lib/youtube-embed/angular-youtube-embed.js"></script>
    <script src="./app/app.min.js"></script>

    <!-- <script src="./lib/jquery/jquery-3.2.1.min.js"></script> -->
    <script src="./lib/materialize/materialize.min.js"></script>
    <script src="./assets/js/index.js"></script>
</body>
</html>