( function() {

// We want to be able to initialize the widget to determine the initial state
	// function TwoColumns(name) {
	// 	this.name = name;

	// 	function getItemPosition(item) {
	// 		return item.position;
	// 	}
	// }

	// var twoColumnsObject = new TwoColumns({
	// 	itemA: {
	// 		text: "Item A",
	// 		position: "left"
	// 	},
	// 	itemB: {
	// 		text: "Item B",
	// 		position: "left"
	// 	},
	// 	itemC: {
	// 		text: "Item C",
	// 		position: "left"
	// 	},
	// 	itemD: {
	// 		text: "Item C",
	// 		position: "right"
	// 	},
	// });

	init();

	function init() {
		// console.log(TwoColumns.getItemPosition('itemA'))
		// if ( twoColumnsObject ) {
		// 	console.log(twoColumnsObject )	
		// 	for ( var i=0; i<twoColumnsObject.length; i++ ) {
		// 		console.log(twoColumnsObject[i])
		// 	}
		// }

		$('#innerWrapper-left .columns').append('<div class="items"><p>Item A</p></div>');
		$('#innerWrapper-left .columns').append('<div class="items"><p>Item B</p></div>');
		$('#innerWrapper-left .columns').append('<div class="items"><p>Item C</p></div>');
		$('#innerWrapper-left .columns').append('<div class="items"><p>Item D</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items"><p>Item A</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items"><p>Item B</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items"><p>Item C</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items"><p>Item D</p></div>');		

		$('#innerWrapper-left .columns .items:nth-child(1)').addClass('active pos_0');
		$('#innerWrapper-left .columns .items:nth-child(2)').addClass('active pos_1');
		$('#innerWrapper-left .columns .items:nth-child(3)').addClass('active pos_2');
		$('#innerWrapper-right .columns .items:nth-child(1)').addClass('active pos_0');

	// Upon mutating the internal state of the widget we want to be able to retrieve the position of
	// any item:
	// twoColumnsObject.getItemPosition("itemA")
	// returns "right" or "left"
	}

	$('.items').on('click', function(e) {
		// temporary
		// if( e.ctrlKey ) {
		// 	$(this).toggleClass('selected')
		// }
		if(true ) {
			$(this).toggleClass('selected')
		}
	})

	//temporary
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        $('.buttons.button-left').trigger('click');
	    }
	});


	$('.buttons.button-left').on('click', function(e) {
		//select items on left column with selected class
		// $('#innerWrapper-left .columns .items.selected').addClass('falling');

		var numOfSelectedItems = $('#innerWrapper-left .columns .items.selected').length;
		$('#innerWrapper-left .columns .items.selected').each( function(index) {
			console.log( $(this) , 'delay: ', (numOfSelectedItems - index) );
			$(this).css({
				'transition-delay' : (numOfSelectedItems - index -1)*500+'ms'
			});
			$(this).addClass('falling');
			$(this).removeClass('active');


			$('#innerWrapper-right .columns .items:nth-child(2)').css({
				'animation-delay' : (numOfSelectedItems + index-1)*500+'ms'
			});
			$('#innerWrapper-right .columns .items:nth-child(2)').addClass('move_upwards_to_pos_1');

			$('#innerWrapper-right .columns .items:nth-child(3)').css({
				'animation-delay' : (numOfSelectedItems + index)*500+'ms'
			});
			$('#innerWrapper-right .columns .items:nth-child(3)').addClass('move_upwards_to_pos_2');

			$('#innerWrapper-right .columns .items:nth-child(4)').css({
				'animation-delay' : (numOfSelectedItems + index + 1)*500+'ms'
			});
			$('#innerWrapper-right .columns .items:nth-child(4)').addClass('move_upwards_to_pos_3');
		});

		repositionLeftColumn();
		
		//move them to the right column
		//remove them from left column
		//remove class selected 
	});

	function repositionLeftColumn() {
		$('#innerWrapper-left .columns .items.active').each( function(index) {
			console.log('we got an active item. index: ', index, $(this));
			$(this).removeClass('pos_0 pos_1 pos_2 pos_3');
			$(this).addClass('pos_'+index);


		});
	}

	$('.items').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
	    // your event handler
	    console.log(' removing')
	    $('.items.falling').hide();
	    $('.items.falling').removeClass('falling active selected pos_0 pos_1 pos_2 pos_3');
	    		
	});

	$('.buttons.button-right').on('click', function(e) {

	});
})();