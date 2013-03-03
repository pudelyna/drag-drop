$(function() {
	
	console.log("loaded:"+$('#dropTarget').attr('id'))
	
	$('#dropTarget').on('dragover', function( event ){
		event.originalEvent.dataTransfer.dropEffect = 'move';
		console.log("dragover")
		event.stopPropagation();
		event.preventDefault();
		return false;
	});
	
	$('#dropTarget').bind('drop', function( event ){
		var droppedElements = $.parseJSON(event.originalEvent.dataTransfer.getData('Text'));
		
		$.each(droppedElements, function(){
			$('#'+this, window.parent.draggSourceFrame.document).removeClass('selected');
			$('#dropTarget').append($('#'+this, window.parent.draggSourceFrame.document));
			console.log('Dropped element with ID:'+this);
		});
		
		$.ajax({
			url: 'response.json',
			type: 'POST',
			crossDomain: false,
			dataType: 'json',
			data: {'objId' : droppedElements},
			contentType: 'application/json',
			success: function(response, textStatus, jqXHR){
				console.log('Server response is: ' + response.text + JSON.stringify(droppedElements));
			},
            error: function(xhr, textStatus, errorThrown) {
                console.log('ERROR['+xtextStatus+']');
            }
			});
		
		event.preventDefault();
	});
	
	
})