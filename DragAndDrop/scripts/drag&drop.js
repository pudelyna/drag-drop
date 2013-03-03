$(function() {
	
	var currentDraggedObj = null;
	var draggableObjects = [];
	
	var log = function(text){
		$('#consoleLog', window.parent.document).append($('<p>' + text + '</p>'));
		var height = $('#consoleLog', window.parent.document)[0].scrollHeight;
        $('#consoleLog', window.parent.document).scrollTop(height);
	};
	
	$('img[draggable="true"]').each(function (){
 		$( this ).bind('dragstart',function( event ){
 			event.originalEvent.dataTransfer.effectAllowed = 'move';
 			if(draggableObjects.length == 0){
 				draggableObjects.push($(this).attr('id'));
 			}
 			event.originalEvent.dataTransfer.setData('Text', JSON.stringify(draggableObjects));
 			log('Drag event initiated for elements with IDS:'+JSON.stringify(draggableObjects));
 			
 			draggableObjects.length = 0;
        });
 		
 		$( this ).bind('click', function( event ) {
 		    if(event.ctrlKey){
 		    	draggableObjects.push($(this).attr('id'));
 		    	$(this).addClass('selected');
 		    	log('CTRL pressed in multiple selection: '+JSON.stringify(draggableObjects));
 		    	event.preventDefault();
 		    }
 		});
 	});
	
	
	$('#dropTarget').bind('dragover', function( event ){
		event.originalEvent.dataTransfer.dropEffect = 'move';
		event.preventDefault();
	});
 	
	$('#dropTarget').bind('drop', function( event ){
		var droppedElements = $.parseJSON(event.originalEvent.dataTransfer.getData('Text'));
		
		$.each(droppedElements, function(){
			$('#'+this, window.parent.draggSourceFrame.document).removeClass('selected');
			$('#dropTarget').append($('#'+this, window.parent.draggSourceFrame.document));
			log('Dropped element with ID:'+this);
		});
		
		$.ajax({
			url: '../scripts/response.json',
			type: 'POST',
			crossDomain: false,
			dataType: 'json',
			data: {'objId' : droppedElements},
			contentType: 'application/json',
			success: function(response, textStatus, jqXHR){
				log('Server response is: ' + response.text + JSON.stringify(droppedElements));
			},
            error: function(xhr, textStatus, errorThrown) {
                log('Server error response['+textStatus+']');
            }
			});
		
		event.preventDefault();
	});
	
	
});