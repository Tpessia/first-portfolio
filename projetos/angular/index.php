<!DOCTYPE html>
<html ng-app="noisePolution">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Noise Pollution{{ title !== undefined && title != '' ? ' - ' + title : '' }}</title>
    <link rel="icon" type="image/png" href="favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <base href="<?php echo $_SERVER['REQUEST_URI']; ?>">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="./lib/materialize/materialize.min.css" rel="stylesheet">
    <link href="./assets/styles/css/index.css" rel="stylesheet">

    <script src="./lib/angular/angular.min.js"></script>
    <script src="./lib/angular/angular-route.min.js"></script>
    <script src="./lib/angular/angular-animate.min.js"></script>
    <script src="./app/app.min.js"></script>

    <!-- <script src="./lib/jquery/jquery-3.2.1.min.js"></script> -->
    <script src="./lib/materialize/materialize.min.js"></script>
    <script src="./assets/js/index.js"></script>
</head>
<body>
    
    <header ng-controller="HeaderController">
        <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">
                    <img src="assets/img/logo.png" alt="Noise Polution" class="hide-on-small-only">
                    <img src="assets/img/logo-simple.png" alt="NP" class="hide-on-med-and-up">
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
            <div class="img-wrapper" ng-repeat="imgSrc in topsImg">
                <img ng-src="{{ imgSrc }}">
            </div>
            <div id="bannerOverlay">
                <div id="bannerText">Your Tracks, Artists and Albuns in a single place</div>
            </div>
        </div>
    </header>

    <main class="container">
        <div class="row">
            <div class="col s12" ng-view="">
                <!-- NG VIEW -->
            </div>
        </div>
    </main>

    <footer class="page-footer">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text">Footer Content</h5>
                    <p class="grey-text text-lighten-5">You can use rows and columns here to organize your footer content.</p>
                </div>
                <div class="col l4 offset-l2 s12">
                    <h5 class="white-text">Links</h5>
                    <ul>
                        <li>
                            <a class="grey-text text-lighten-5" href="#!">Link 1</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-5" href="#!">Link 2</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-5" href="#!">Link 3</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-5" href="#!">Link 4</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container grey-text text-lighten-5">
                © 2014 Copyright Text
                <a class="grey-text text-lighten-5 right" href="#!">More Links</a>
            </div>
        </div>
    </footer>

</body>
</html>