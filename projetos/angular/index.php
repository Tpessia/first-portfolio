<!DOCTYPE html>
<html lang="en" ng-app="noisePolution">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ title !== undefined && title != '' ?  title + ' | ' : '' }}Noise Pollution</title>
    <link rel="icon" type="image/png" href="favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <base href="<?php echo $_SERVER['REQUEST_URI']; ?>">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="./lib/materialize/materialize.min.css" rel="stylesheet">
    <link href="./assets/styles/css/main.css" rel="stylesheet">
</head>
<body>
    
    <header ng-controller="HeaderController">
        <nav class="z-depth-1">
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">
                    <!-- <img src="assets/img/logo.png" alt="Noise Polution" class="hide-on-small-only"> -->
                    <img src="assets/img/logo-simple.png" alt="NP">
                </a>
                <a href="#" data-target="sidenav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li ng-repeat="item in navItens" ng-class="{'active': isActive(item.url)}">
                        <a href="{{ '#!' + item.url }}">{{ item.text }}</a>
                    </li>
                </ul>
            </div>
        </nav>
        <ul class="sidenav" id="sidenav">
            <li ng-repeat="item in navItens" ng-class="{'active': isActive(item.url)}">
                <a href="{{ '#!' + item.url }}">{{ item.text }}</a>
            </li>
        </ul>
        <div id="banner">
            <div class="img-wrapper" ng-style="{'background-image':'url(' + topsImg.img1 + ')'}"></div>
            <div class="img-wrapper" ng-style="{'background-image':'url(' + topsImg.img2 + ')'}"></div>
            <div class="img-wrapper" ng-style="{'background-image':'url(' + topsImg.img3 + ')'}"></div>
            <div id="bannerOverlay">
                <div id="bannerText">
                    <img id="img-logo" src="assets/img/logo.png">
                    Your Tracks, Artists and Albuns in a single place
                </div>
            </div>
        </div>
    </header>

    <main class="container" ng-view="">
        <!-- NG VIEW -->
    </main>

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
    <script src="./app/app.min.js"></script>

    <!-- <script src="./lib/jquery/jquery-3.2.1.min.js"></script> -->
    <script src="./lib/materialize/materialize.min.js"></script>
    <script src="./assets/js/index.js"></script>

</body>
</html>