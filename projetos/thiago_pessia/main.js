//NAVBAR

$("ul.nav li").on("click", function() {
	$("ul.nav li").each(function() {
		$(this).removeClass();
	});

	$(this).addClass("active");
});

$(window).scroll(function() {
    var hT = $('div.page-header').offset().top,
	    hH = $('div.page-header').outerHeight(),
	    wH = $(window).height(),
	    wS = $(this).scrollTop();

	if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
		$('ul.nav li[class="active"]').each(function() {
			$(this).removeClass('active');
		});

		$('ul.nav li a[href="#"]').parent().addClass("active");
	}
});

$(window).scroll(function() {
    var hT = $('#carouselElement').offset().top,
	    hH = $('#carouselElement').outerHeight(),
	    wH = $(window).height(),
	    wS = $(this).scrollTop();

	if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
		$('ul.nav li[class="active"]').each(function() {
			$(this).removeClass('active');
		});

		$('ul.nav li a[href="#carouselElement"]').parent().addClass("active");
	}
});

$(window).scroll(function() {
    var hT = $('#exp').offset().top,
	    hH = $('#exp').outerHeight(),
	    wH = $(window).height(),
	    wS = $(this).scrollTop();

	if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
		$('ul.nav li[class="active"]').each(function() {
			$(this).removeClass('active');
		});

		$('ul.nav li a[href="#exp"]').parent().addClass("active");
	}
});

$(window).scroll(function() {
    var hT = $('#well').offset().top,
	    hH = $('#well').outerHeight(),
	    wH = $(window).height(),
	    wS = $(this).scrollTop();

	if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
		$('ul.nav li[class="active"]').each(function() {
			$(this).removeClass('active');
		});

		$('ul.nav li a[href="#well"]').parent().addClass("active");
	}
});

//close navbar on click
$('.navbar-collapse a, main, footer').click(function(){
    $(".navbar-collapse").collapse('hide');
});

//MODAL TOGGLE

$("#exp").on("click", function() {
	$("#modal").modal("show");
});

//CHANGE ANCHOR
//obs: ficaria muito mais facil criar uma div geral em torno dos elementos alvo (carousel e botão), e direcionar o href para ela

function changeAnchor() {
	if($(window).width() < 992) {
		$('ul.nav li a[href="#carouselElement"').attr('href','#exp');
	}
	else {
		$('ul.nav li a[href="#exp"').attr('href','#carouselElement');
	}
}

changeAnchor();

//resize event (trigger on rezise stop)
var rtime, 
	timeout = false,
	delta = 200

$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        //actual code
        changeAnchor();
    }               
}