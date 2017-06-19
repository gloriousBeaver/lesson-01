( function() {
	var temporary = true;
    var twoColumnsObject;

	function TwoColumns(obj) {
		this.itemA = obj.itemA;
		this.itemB = obj.itemB;
		this.itemC = obj.itemC;
		this.itemD = obj.itemD;

		TwoColumns.prototype.getItemText = function(item) {
			return obj[''+item].text;
		}

		TwoColumns.prototype.setItemPosition = function(item, position) {
			obj[''+item].position = position;
		}

		TwoColumns.prototype.getItemPosition = function(item) {
			return obj[''+item].position;
		}
	}

	$(document).keydown(function(e) {
	    switch(e.which) {
	        case 37: // left
    	    	if( !$('.buttons').hasClass('disabled') ) {
	        		$('.buttons.button-right').trigger('click');
	      	  }
	        break;

	        case 38: // up
	        	console.log(TwoColumns.prototype.getItemPosition('itemA'));
        		console.log(TwoColumns.prototype.getItemPosition('itemB'));
    			console.log(TwoColumns.prototype.getItemPosition('itemC'));
				console.log(TwoColumns.prototype.getItemPosition('itemD'));
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

	init();

	function init() {
		twoColumnsObject = new TwoColumns({
			itemA: {
				text: "Item A",
				position: "left"
			},
			itemB: {
				text: "Item B",
				position: "left"
			},
			itemC: {
				text: "Item C",
				position: "left"
			},
			itemD: {
				text: "Item D",
				position: "right"
			},
		});

		$('#innerWrapper-left .columns').append('<div class="items" id="itemA"><p>'+TwoColumns.prototype.getItemText('itemA')+'</p></div>');
		$('#innerWrapper-left .columns').append('<div class="items" id="itemB"><p>'+TwoColumns.prototype.getItemText('itemB')+'</p></div>');
		$('#innerWrapper-left .columns').append('<div class="items" id="itemC"><p>'+TwoColumns.prototype.getItemText('itemC')+'</p></div>');
		$('#innerWrapper-left .columns').append('<div class="items" id="itemD"><p>'+TwoColumns.prototype.getItemText('itemD')+'</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items" id="itemA-right"><p>'+TwoColumns.prototype.getItemText('itemA')+'</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items" id="itemB-right"><p>'+TwoColumns.prototype.getItemText('itemB')+'</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items" id="itemC-right"><p>'+TwoColumns.prototype.getItemText('itemC')+'</p></div>');
		$('#innerWrapper-right .columns').append('<div class="items" id="itemD-right"><p>'+TwoColumns.prototype.getItemText('itemD')+'</p></div>');

		setActiveItems();

		if(temporary) {
			$('.columns').css('border', '2px solid rebeccapurple');		
		}
	}

	function setActiveItems() {
		var leftCount = 0;
		var rightCount = 0;
		if( TwoColumns.prototype.getItemPosition('itemA') == 'left' ) {
			$('#innerWrapper-left .columns .items:nth-child(1)').addClass('active pos_'+leftCount);
			leftCount++;
		}
		else {
			$('#innerWrapper-right .columns .items:nth-child(1)').addClass('active pos_'+rightCount);
			rightCount++;
		}

		if( TwoColumns.prototype.getItemPosition('itemB') == 'left' ) {
			$('#innerWrapper-left .columns .items:nth-child(2)').addClass('active pos_'+leftCount);
			leftCount++;
		}
		else {
			$('#innerWrapper-right .columns .items:nth-child(2)').addClass('active pos_'+rightCount);
			rightCount++;
		}

		if( TwoColumns.prototype.getItemPosition('itemC') == 'left' ) {
			$('#innerWrapper-left .columns .items:nth-child(3)').addClass('active pos_'+leftCount);
			leftCount++;
		}
		else {
			$('#innerWrapper-right .columns .items:nth-child(3)').addClass('active pos_'+rightCount);
			rightCount++;
		}

		if( TwoColumns.prototype.getItemPosition('itemD') == 'left' ) {
			$('#innerWrapper-left .columns .items:nth-child(4)').addClass('active pos_'+leftCount);
			leftCount++;
		}
		else {
			$('#innerWrapper-right .columns .items:nth-child(4)').addClass('active pos_'+rightCount);
			rightCount++;
		}							
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
	
	$('.buttons.button-left').on('click', function(e) {
		//select items on left column with selected class
		var numOfSelectedItems = $('#innerWrapper-left .columns .items.selected').length;
		if( numOfSelectedItems == 0 ) {
			return;
		}
		$('.buttons').addClass('disabled');	
		
		$('#innerWrapper-left .columns .items.selected').each( function(index) {
			var _trimmedId = $(this).attr('id').substring(0, 5);
			console.log(' _trimmedId: ', _trimmedId)
			TwoColumns.prototype.setItemPosition(_trimmedId, 'right');

			$(this).css({
				'transition-delay' : (numOfSelectedItems - index -1)*500+'ms'
			});
			$(this).addClass('falling');
			$(this).removeClass('active');

			//get which item is selected and target this item to be moved up
			// ind is index of moved element
			var _ind = $(this).index();
			// we need to move target item on right element with _ind index
			var _pos = $('#innerWrapper-right .columns .items.active').length;

			$('#innerWrapper-right .columns .items:nth-child('+(_ind+1)+')').css({
				'animation-delay' : (numOfSelectedItems + index-1)*500+'ms'
			});
			$('#innerWrapper-right .columns .items:nth-child('+(_ind+1)+')').addClass('active move_upwards_to_pos_'+(_pos));
		});

		repositionLeftColumn();
	});

	function repositionLeftColumn() {
		var posCount = 0;

		if( $('#innerWrapper-left .columns .items.active').hasClass('pos_0') ) {
			// remains unchanged;
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
	}

	$('.items').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
	    // experimental
	    $('.items.falling').removeClass('falling active selected pos_0 pos_1 pos_2 pos_3 move_upwards_to_pos_0 move_upwards_to_pos_1 move_upwards_to_pos_2 move_upwards_to_pos_3');
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

			var _trimmedId = $(this).attr('id').substring(0, 5);
			TwoColumns.prototype.setItemPosition( _trimmedId, 'left');

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

			$('#innerWrapper-left .columns .items:nth-child('+(_ind+1)+')').css({
				'animation-delay' : (numOfSelectedItems + index-1)*500+'ms'
			});
			$('#innerWrapper-left .columns .items:nth-child('+(_ind+1)+')').addClass('active move_upwards_to_pos_'+(_pos));
		});
		repositionRightColumn();	
	});

	function repositionRightColumn() {
		var posCount = 0;

		if( $('#innerWrapper-right .columns .items.active').hasClass('pos_0') ) {
			// remains unchanged;
			posCount++;
		}
		if( $('#innerWrapper-right .columns .items.active').hasClass('pos_1') ) {
			$('#innerWrapper-right .columns .items.active.pos_1').removeClass('pos_1').addClass('pos_'+posCount);
			posCount++;
		}
		if( $('#innerWrapper-right .columns .items.active').hasClass('pos_2') ) {
			$('#innerWrapper-right .columns .items.active.pos_2').removeClass('pos_2').addClass('pos_'+posCount);
			posCount++;
		}
		if( $('#innerWrapper-right .columns .items.active').hasClass('pos_3') ) {
			$('#innerWrapper-right .columns .items.active.pos_3').removeClass('pos_3').addClass('pos_'+posCount);
			posCount++;
		}
	}

})();