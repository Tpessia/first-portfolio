var pessia = {
    localStorageSupport: function() {
        if (typeof localStorage === 'object') {
            try {
                localStorage.setItem('localStorage', 1);
                localStorage.removeItem('localStorage');
                return true;
            } catch (e) {
                Storage.prototype._setItem = Storage.prototype.setItem;
                Storage.prototype.setItem = function () { };
                alert('O seu navegador não suporta o armazenamento local de informações. No Safari, a causa mais comum é usar "Modo de Navegação Privada". Tente entrar novamente com outro navegador ou entre em contato caso o problema persista.');
                $("body").html("");
                window.stop();
                throw new Error("Aplicação parada devido à falta de recursos essenciais!");
            }
        }    
    },

    import: function(path) {
        var script = document.createElement("script");
        script.src = path;
        document.head.appendChild(script);
    },

    currentPath: function() {
        return window.location.href.split("/").filter(function (item) { return item !== ''; }).slice(-1)[0];
    },

    sfBottom: function(selector, foo) {
        //SCROLL FIRE BOTTOM
        //acionado quando qualquer parte do elemento(inner+padding) aparece na parte de baixo da tela

        $(window).scroll(function () {
            var sT = $(selector).offset().top,
                sH = $(selector).outerHeight(),
                wH = $(window).height(),
                wS = $(window).scrollTop();
            if (wS + wH > sT && wS < sT + sH) {
                foo();
            }
        });
    },

    sfTop: function (selector, foo) {
        //acionado quando qualquer parte do elemento(inner+padding) aparece na parte de cima da tela

        $(window).scroll(function () {
            var sT = $(selector).offset().top,
                sH = $(selector).outerHeight(),
                wH = $(window).height(),
                wS = $(window).scrollTop();
            if (wS > sT + sH) {
                    foo();
                }
            }
        );
    },

    sfBottomToggle: function(selector, foo) {
        //SCROLL FIRE BOTTOM TOGGLE
        //útil para sidebars com estados visível e não visível

        //seletor -> "#meuElemento"
        //foo -> function foo() { fazerAlgo(); }

        if (typeof scrollId === "undefined") {
            scrollId = [];
            scrollId[0] = 0;
        }
        else {
            scrollId[scrollId.length] = 0;
        }

        var id = scrollId.length - 1;

        $(window).scroll(function () {
            var sT = $(selector).offset().top,
                sH = $(selector).outerHeight(),
                wH = $(window).height(),
                wS = $(window).scrollTop();
            if (scrollId[id] == 0) {
                if (wS + wH > sT && wS < sT + sH) {
                    foo();
                    scrollId[id] ^= 1;
                }                
            }
            else {
                if (wS < sT + sH && sT > wS + wH) {
                    foo();
                    scrollId[id] ^= 1;
                }
            }
        });
    },

    sfTopToggle: function(selector, foo) {
        //SCROLL FIRE TOP TOGGLE
        //útil para sidebars com estados visível e não visível

        //seletor -> "#meuElemento"
        //foo -> function foo() { fazerAlgo(); }

        if (typeof scrollId === "undefined") {
            scrollId = [];
            scrollId[0] = 0;
        }
        else {
            scrollId[scrollId.length] = 0;
        }
        var id = scrollId.length - 1;

        $(window).scroll(function () {
            var sT = $(selector).offset().top,
                sH = $(selector).outerHeight(),
                wH = $(window).height(),
                wS = $(window).scrollTop();

            if (scrollId[id] == 0) {
                if (wS > sT + sH) {
                    foo();
                    scrollId[id] ^= 1;
                }
            }
            else {
                if (wS < sT + sH) {
                    foo();
                    scrollId[id] ^= 1;
                }
            }
        });
    },

    writeAnimation: function(text, selector, time) {
        var i = 1;
        $(selector).html(text[0]);
        var inter = setInterval(function() {
            $(selector).html($(selector).html() + text[i]);
            i++;
            if (i >= text.length) {
                clearInterval(inter);
            }
        }, time);
    },

    mouseSpeed: function (mspdConfig) { //{unit = "m/s" || "px/s", options = "all" || "direction" || "speed"}
        // mspdConfig = {
        //     options: (typeof mspdConfig == "undefined" || typeof mspdConfig.options == "undefined") ? "all" : mspdConfig.options,
        //     unit: (typeof mspdConfig == "undefined" || typeof mspdConfig.unit == "undefined") ? "m/s" : mspdConfig.unit
        // };

        if (mspdConfig.unit != "m/s" && mspdConfig.unit != "px/s")
            throw "mspdConfig.unit inicializada incorretamente! (Valores possíveis: \"m/s\" ou \"px/s\")";

        if (mspdConfig.options != "all" && mspdConfig.options != "direction" && mspdConfig.options != "speed")
            throw "mspdConfig.options inicializada incorretamente! (Valores possíveis: \"all\", \"direction\" ou \"speed\")";

        mspd = {};
        mspdData = {};
        mspdData.t0 = new Date();
        mspdData.x0 = 0;
        mspdData.y0 = 0;

        if (mspdConfig.options == "all") {
            $(document).mousemove(function (e) {
                initPosTime(e);

                calcSpeed(mspdConfig.unit);
                verifDir();

                savePosTime();
            });
        }

        if (mspdConfig.options == "speed") {
            $(document).mousemove(function (e) {
                initPosTime(e);

                calcSpeed(mspdConfig.unit);

                savePosTime(e);
            });
        }

        if (mspdConfig.options == "direction") {
            $(document).mousemove(function (e) {
                initPosTime(e);

                verifDir();

                savePosTime();
            });
        }

        function initPosTime(e) {
            mspdData.t = new Date();
            mspdData.x = e.pageX;
            mspdData.y = e.pageY;
        }

        function savePosTime() {
            mspdData.t0 = mspdData.t;
            mspdData.x0 = mspdData.x;
            mspdData.y0 = mspdData.y;
        }

        function calcSpeed(_unit) {
            mspdData.dD = Math.sqrt(Math.pow(mspdData.y - mspdData.y0, 2) + Math.pow(mspdData.x - mspdData.x0, 2)); //em pixels

            if (_unit == "m/s") {
                mspdData.dD = mspdData.dD / 3779.527559055; //em metros
            }


            mspdData.dT = (mspdData.t.getTime() - mspdData.t0.getTime()) / 1000; //em segundos

            mspd.rawSpeed = (mspdData.dD / mspdData.dT).toFixed(2);

            mspd.speed = mspd.rawSpeed + " " + _unit;
        }

        function verifDir() {
            if (mspdData.x > mspdData.x0)
                mspd.dirX = "right";
            else if (mspdData.x < mspdData.x0)
                mspd.dirX = "left";

            if (mspdData.y > mspdData.y0)
                mspd.dirY = "down";
            else if (mspdData.y < mspdData.y0)
                mspd.dirY = "up";
        }
    }
}