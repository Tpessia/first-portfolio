function run() {
	var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
	var array2 = [];

	for (var i = 0; i < 15; i++) {
		var rnd = array[Math.floor(Math.random() * (25 - i))];
		array2.push(rnd);
		var index = array.indexOf(rnd);
		if (index > -1) {
    		array.splice(index, 1);
		}
	}

array2.sort(function(a,b){ return a-b})

$('#div1').html(array2.toString());
}

$('button').click(run);

$('#div1').css({
	'text-align': 'center',
	'font-size': '50px'
});

$('body').css({
	'text-align': 'center',
	'height': '100%',
	'margin': '0px'
});

$('button').css({
	'font-size': '30px',
	'margin-bottom': '15px'
});

$('html').css({
	'text-align': 'center',
	'height': '100%'
});

run();