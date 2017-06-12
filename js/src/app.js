( function() {

// We want to be able to initialize the widget to determine the initial state
	function TwoColumns(name) {
		this.name = name;

		function getItemPosition(item) {
			return item.position;
		}
	}

	var twoColumnsObject = new TwoColumns({
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
			text: "Item C",
			position: "right"
		},
	});

	init();

	function init() {
		console.log(TwoColumns.getItemPosition('itemA'))
		if ( twoColumnsObject ) {
			console.log(twoColumnsObject )	
			for ( var i=0; i<twoColumnsObject.length; i++ ) {
				console.log(twoColumnsObject[i])
			}
		}

	// Upon mutating the internal state of the widget we want to be able to retrieve the position of
	// any item:
	// twoColumnsObject.getItemPosition("itemA")
	// returns "right" or "left"
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