( function() {
	var temporary = true;

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

		$('#innerWrapper-left .columns').append('<div class="items" id="item-left-0"><p>Item A</p></div>');
		$('#innerWrapper-left .columns').append('<div class="items" id="item-left-1"><p>Item B</p></div>');
		$('#innerWrapper-left .columns').append('<div class="items" id="item-left-2"><p>Item C</p></div>');
		$('#innerWrapper-left .columns').append('<div class="items" id="item-left-3"><p>Item D</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items" id="item-right-0"><p>Item A</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items" id="item-right-1"><p>Item B</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items" id="item-right-2"><p>Item C</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items" id="item-right-3"><p>Item D</p></div>');		

		$('#innerWrapper-left .columns .items:nth-child(1)').addClass('active pos_0');
		$('#innerWrapper-left .columns .items:nth-child(2)').addClass('active pos_1');
		$('#innerWrapper-left .columns .items:nth-child(3)').addClass('active pos_2');
		$('#innerWrapper-right .columns .items:nth-child(4)').addClass('active pos_0');

		if(temporary) {
			$('.columns').css('border', '2px solid rebeccapurple');
			// $('#innerWrapper-left .columns .items:nth-child(4)').addClass('active pos_3');
			// $('#innerWrapper-right .columns .items:nth-child(1)').addClass('active pos_1');
			// $('#innerWrapper-right .columns .items:nth-child(2)').addClass('active pos_2');
			// $('#innerWrapper-right .columns .items:nth-child(3)').addClass('active pos_3');		
		}

	// Upon mutating the internal state of the widget we want to be able to retrieve the position of
	// any item:
	// twoColumnsObject.getItemPosition("itemA")
	// returns "right" or "left"
	}

	$('.items').on('click', function(e) {
		// temporary
		if( temporary ) {
			$(this).toggleClass('selected')
		}
		else {
			if( e.ctrlKey ) {
				$(this).toggleClass('selected')
			}	
		}
	})

	//temporary
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	if( !$('.buttons.button-left').hasClass('disabled') ) {
	        	$('.buttons.button-left').trigger('click');
	        }
	    }
	    if(e.which == 97) {
	        $('#innerWrapper-left .columns .items:nth-child(1)').trigger('click');
	    }
	    if(e.which == 98) {
	        $('#innerWrapper-left .columns .items:nth-child(2)').trigger('click');
	    }
	    if(e.which == 99) {
	        $('#innerWrapper-left .columns .items:nth-child(3)').trigger('click');
	    }
   	    if(e.which == 100) {
	        $('#innerWrapper-left .columns .items:nth-child(4)').trigger('click');
	    } 	    	    	    
	});


	$('.buttons.button-left').on('click', function(e) {
		console.log(' clicked on left button')
		//select items on left column with selected class
		// $('#innerWrapper-left .columns .items.selected').addClass('falling');
		
		var numOfSelectedItems = $('#innerWrapper-left .columns .items.selected').length;
		
		$('.buttons.button-left').addClass('disabled');	
		
		$('#innerWrapper-left .columns .items.selected').each( function(index) {
			// console.log( $(this) , 'delay: ', (numOfSelectedItems - index) );
			$(this).css({
				'transition-delay' : (numOfSelectedItems - index -1)*500+'ms'
			});
			$(this).addClass('falling');
			$(this).removeClass('active');

			//get which item is selected and target this item to be moved up

			// ind is index of moved element
			var _ind = $(this).index();
			console.log('this item: ', $(this).index() );
			// we need to move target item on right element with _ind index

			var _pos = $('#innerWrapper-right .columns .items.active').length;
			console.log("num of items on right: ", $('#innerWrapper-right .columns .items.active').length );



			$('#innerWrapper-right .columns .items:nth-child('+(_ind+1)+')').css({
				// 'animation-delay' : (numOfSelectedItems + index-1)*500+'ms'
			});

			// position is wrong
			console.log('moving to position: nth-child(', (_ind+1), ' pos: ', (_pos));
			$('#innerWrapper-right .columns .items:nth-child('+(_ind+1)+')').addClass('active move_upwards_to_pos_'+(_pos));
			// $('#innerWrapper-right .columns .items:nth-child('+(_ind+1)+')').removeClass('pos_0 pos_1 pos_2 pos_3');

			// $('#innerWrapper-right .columns .items:nth-child(2)').css({
			// 	'animation-delay' : (numOfSelectedItems + index-1)*500+'ms'
			// });
			// $('#innerWrapper-right .columns .items:nth-child(2)').addClass('move_upwards_to_pos_1');

			// $('#innerWrapper-right .columns .items:nth-child(3)').css({
			// 	'animation-delay' : (numOfSelectedItems + index)*500+'ms'
			// });
			// $('#innerWrapper-right .columns .items:nth-child(3)').addClass('move_upwards_to_pos_2');

			// $('#innerWrapper-right .columns .items:nth-child(4)').css({
			// 	'animation-delay' : (numOfSelectedItems + index + 1)*500+'ms'
			// });
			// $('#innerWrapper-right .columns .items:nth-child(4)').addClass('move_upwards_to_pos_3');
		});

		repositionLeftColumn();
		
		//move them to the right column
		//remove them from left column
		//remove class selected 
	});

	function repositionLeftColumn() {
		$('#innerWrapper-left .columns .items.active').each( function(index) {
			// console.log('we got an active item. index: ', index, $(this));
			$(this).removeClass('pos_0 pos_1 pos_2 pos_3');
			$(this).addClass('pos_'+index);
		});
	}

	$('.items').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
	    // your event handler
	    console.log(' removing')
	    $('.items.falling').hide();
	    $('.items.falling').removeClass('falling active selected pos_0 pos_1 pos_2 pos_3');
	    console.log('enabling buttons')
	    $('.buttons').removeClass('disabled');
	    		
	});

	$('.buttons.button-right').on('click', function(e) {

	});
})();