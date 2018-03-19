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
    }
}