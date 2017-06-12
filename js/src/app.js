( function() {


	init();

	function init() {

	}

	$('.items').on('click', function(e) {
		if( e.ctrlKey ) {
			$(this).toggleClass('active')
		}
	})


	$('.buttons.button-left').on('click', function(e) {
		//select items on left column with active class
		$('#innerWrapper-left .columns .items.active').css('background', 'gold')
		jQuery.each( $('#innerWrapper-left .columns .items.active'), function(index, value) {
			var a_0 = "<div";
			var a_1 = " class='items";
			var a_2 = " item-";
			var a_3 = +index+"'";
			var a_4 = "></div>";
			var a_total = a_0+a_1+a_2+a_3+a_4;
			console.log('a total: ', a_total);
			$('#innerWrapper-right .columns').append(a_total)
		});
		
		//move them to the right column
		//remove them from left column
		//remove class active 
	});

	$('.buttons.button-right').on('click', function(e) {

	});
})();