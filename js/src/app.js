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
			if( !$('.buttons').hasClass('disabled') ) {
				$(this).toggleClass('selected')
			}
		}
		else {
			if( !$('.buttons').hasClass('disabled') ) {
				if( e.ctrlKey ) {
					$(this).toggleClass('selected')
				}
			}	
		} 
	})

	//temporary
	$(document).keypress(function(e) {
		console.log(e)
	    if(e.which == 13) {
	    	// if( !$('.buttons').hasClass('disabled') ) {
	     //    	$('.buttons').trigger('click');
	     //    }
	    }	    	    
	    else if(e.which == 97) {
	        $('#innerWrapper-left .columns .items:nth-child(1)').trigger('click');
	    }
	    else if(e.which == 98) {
	        $('#innerWrapper-left .columns .items:nth-child(2)').trigger('click');
	    }
	    else if(e.which == 99) {
	        $('#innerWrapper-left .columns .items:nth-child(3)').trigger('click');
	    }
   	    else if(e.which == 100) {
	        $('#innerWrapper-left .columns .items:nth-child(4)').trigger('click');
	    } 	 
	    else {}   	    	    
	});

	$(document).keydown(function(e) {
	    switch(e.which) {
	        case 37: // left
    	    	if( !$('.buttons').hasClass('disabled') ) {
	        		$('.buttons.button-right').trigger('click');
	      	  }
	        break;

	        case 38: // up
	        break;

	        case 39: // right
    	    	if( !$('.buttons').hasClass('disabled') ) {
	        		$('.buttons.button-left').trigger('click');
	      	  }
	        break;

	        case 40: // down
	        break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});	


	$('.buttons.button-left').on('click', function(e) {
		console.log(' clicked on left button')
		//select items on left column with selected class
		var numOfSelectedItems = $('#innerWrapper-left .columns .items.selected').length;
		// console.log('numOfSelectedItems: ', numOfSelectedItems);
		if( numOfSelectedItems == 0 ) {
			return;
		}
		$('.buttons').addClass('disabled');	
		
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
			// console.log('this item: ', $(this).index() );
			// we need to move target item on right element with _ind index

			var _pos = $('#innerWrapper-right .columns .items.active').length;
			// console.log("num of items on right: ", $('#innerWrapper-right .columns .items.active').length );

			$('#innerWrapper-right .columns .items:nth-child('+(_ind+1)+')').css({
				// 'animation-delay' : (numOfSelectedItems + index-1)*500+'ms'
			});
			// console.log('moving to position: nth-child(', (_ind+1), ' pos: ', (_pos));
			$('#innerWrapper-right .columns .items:nth-child('+(_ind+1)+')').addClass('active move_upwards_to_pos_'+(_pos));
		});

		repositionLeftColumn();
	});

	function repositionLeftColumn() {
		console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
		console.log("Active items on left: ", $('#innerWrapper-left .columns .items.active'))

		// $('#innerWrapper-left .columns .items.active').each( function(index) {
		// 	console.log('we got an active item. index: ', index, $(this), 'adding class: pos_'+index);
		// 	$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
		// 	$(this).addClass('pos_'+index);
		// });
		var posCount = 0;

		if( $('#innerWrapper-left .columns .items.active').hasClass('pos_0') ) {
			// remains unchanged;
			// $('#innerWrapper-left .columns .items.active.pos_0').removeClass('pos_0').addClass('pos_'+posCount);
			posCount++;
		}
		if( $('#innerWrapper-left .columns .items.active').hasClass('pos_1') ) {
			$('#innerWrapper-left .columns .items.active.pos_1').removeClass('pos_1').addClass('pos_'+posCount);
			posCount++;
		}
		if( $('#innerWrapper-left .columns .items.active').hasClass('pos_2') ) {
			$('#innerWrapper-left .columns .items.active.pos_2').removeClass('pos_2').addClass('pos_'+posCount);
			posCount++;
		}
		if( $('#innerWrapper-left .columns .items.active').hasClass('pos_3') ) {
			$('#innerWrapper-left .columns .items.active.pos_3').removeClass('pos_3').addClass('pos_'+posCount);
			posCount++;
		}		



		// $('#innerWrapper-left .columns .items.active').each( function(index) {
		// 	console.log('item on left: ', $(this));
		// 	if( $(this).hasClass('pos_0')) {
		// 		console.log(' has class pos_0')
		// 		$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
		// 		$(this).addClass('pos_'+posCount);
		// 		posCount++;
		// 	}
		// 	else if( $(this).hasClass('pos_1')) {
		// 		console.log(' has class ppos_1')
		// 		$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
		// 		$(this).addClass('pos_'+posCount);
		// 		posCount++;
		// 	}
		// 	else if( $(this).hasClass('pos_2')) {
		// 		console.log(' has class ppos_2')
		// 		$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
		// 		$(this).addClass('pos_'+posCount);
		// 		posCount++;
		// 	}
		// 	else if( $(this).hasClass('pos_3')) {
		// 		console.log(' has class ppos_3')
		// 		$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
		// 		$(this).addClass('pos_'+posCount);
		// 		posCount++;
		// 	}
		// 	else {
		// 		console.log('unexpected value');
		// 	}									
		// });

	}

	$('.items').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
	    // experimental
	    $('.items.falling').removeClass('falling active selected pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
	    // console.log('enabling buttons')
	    $('.buttons').removeClass('disabled');


		$('#innerWrapper-left .columns .items.active').each( function(index) 
		{
		    if( $(this).hasClass('move_upwards_to_pos_0') )
		    {
				$(this).removeClass('move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+0);
		    }
		    else if( $(this).hasClass('move_upwards_to_pos_1') )
		    {
				$(this).removeClass('move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+1);
		    }
		    else if( $(this).hasClass('move_upwards_to_pos_2') )
		    {
				$(this).removeClass('move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+2);
		    }
		    else if( $(this).hasClass('move_upwards_to_pos_3') )
		    {
				$(this).removeClass('move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+3);
		    }
		    else {}
		});

		$('#innerWrapper-right .columns .items.active').each( function(index) 
		{
		    if( $(this).hasClass('move_upwards_to_pos_0') )
		    {
				$(this).removeClass('move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+0);
		    }
		    else if( $(this).hasClass('move_upwards_to_pos_1') )
		    {
				$(this).removeClass('move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+1);
		    }
		    else if( $(this).hasClass('move_upwards_to_pos_2') )
		    {
				$(this).removeClass('move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+2);
		    }
		    else if( $(this).hasClass('move_upwards_to_pos_3') )
		    {
				$(this).removeClass('move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+3);
		    }
		    else {}
		});
	    		
	});

	$('.buttons.button-right').on('click', function(e) {
		//select items on left column with selected class
		var numOfSelectedItems = $('#innerWrapper-right .columns .items.selected').length;
		if( numOfSelectedItems == 0 ) {
			return;
		}
		$('.buttons').addClass('disabled');	
		
		$('#innerWrapper-right .columns .items.selected').each( function(index) {
			// console.log( $(this) , 'delay: ', (numOfSelectedItems - index) );
			$(this).css({
				'transition-delay' : (numOfSelectedItems - index -1)*500+'ms'
			});

			$(this).addClass('falling');
			$(this).removeClass('active');

			//get which item is selected and target this item to be moved up

			// ind is index of moved element
			var _ind = $(this).index();
			// we need to move target item on right element with _ind index

			var _pos = $('#innerWrapper-left .columns .items.active').length;
			// console.log("num of items on left: ", $('#innerWrapper-left .columns .items.active').length );

			$('#innerWrapper-left .columns .items:nth-child('+(_ind+1)+')').css({
				// 'animation-delay' : (numOfSelectedItems + index-1)*500+'ms'
			});
			// console.log('moving to position: nth-child(', (_ind+1), ' pos: ', (_pos));
			$('#innerWrapper-left .columns .items:nth-child('+(_ind+1)+')').addClass('active move_upwards_to_pos_'+(_pos));
		});

		repositionRightColumn();	

	});

	function repositionRightColumn() {
		// $('#innerWrapper-right .columns .items.active').each( function(index) {
		// 	// console.log('we got an active item. index: ', index, $(this));
		// 	$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
		// 	$(this).addClass('pos_'+index);
		// });
		var posCount = 0;
		$('#innerWrapper-left .columns .items.active').each( function(index) {
			if( $(this).hasClass('pos_0')) {
				console.log(' has class pos_0')
				$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+posCount);
				posCount++;
			}
			else if( $(this).hasClass('pos_1')) {
				console.log(' has class ppos_1')
				$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+posCount);
				posCount++;
			}
			else if( $(this).hasClass('pos_2')) {
				console.log(' has class ppos_2')
				$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+posCount);
				posCount++;
			}
			else if( $(this).hasClass('pos_3')) {
				console.log(' has class ppos_3')
				$(this).removeClass('pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
				$(this).addClass('pos_'+posCount);
				posCount++;
			}
			else {
				console.log('unexpected value');
			}									
		});
	}

})();