$(function() {
	
	var currentDraggedObj = null;
	var draggableObjects = [];
	
	//logging function for user console
	var log = function(text){
		$('#consoleLog', window.parent.document).append($('<p>' + text + '</p>'));
		//scroll bottom in the console view
		var height = $('#consoleLog', window.parent.document)[0].scrollHeight;
        $('#consoleLog', window.parent.document).scrollTop(height);
	};
	
	$('img[draggable="true"]').each(function (){
	
	//bind dragstart event to each draggable image in the source frame
 		$( this ).bind('dragstart',function( event ){
 			event.originalEvent.dataTransfer.effectAllowed = 'move';
 			if(draggableObjects.length == 0){
 				draggableObjects.push($(this).attr('id'));
 			}
			//attache draggable ids to current event
 			event.originalEvent.dataTransfer.setData('Text', JSON.stringify(draggableObjects));
 			log('Drag event initiated for elements with IDS:'+JSON.stringify(draggableObjects));
			
 			//reset draggable ids 
 			draggableObjects.length = 0;
        });
 		
		//if CTRL is pressed then enable multi selection
 		$( this ).bind('click', function( event ) {
 		    if(event.ctrlKey){
 		    	draggableObjects.push($(this).attr('id'));
 		    	$(this).addClass('selected');
 		    	log('CTRL pressed in multiple selection: '+JSON.stringify(draggableObjects));
 		    	event.preventDefault();
 		    }
 		});
 	});
	
	//stop propagation of dragover event in order to manipulate the drop event
	$('#dropTarget').bind('dragover', function( event ){
		event.originalEvent.dataTransfer.dropEffect = 'move';
		event.preventDefault();
	});
 	
	$('#dropTarget').bind('drop', function( event ){
	
	    //get the list of draggable ids from the original event
		var droppedElements = $.parseJSON(event.originalEvent.dataTransfer.getData('Text'));
		
		//and drop each one of them in the dropzone of target iframe
		$.each(droppedElements, function(){
			$('#'+this, window.parent.draggSourceFrame.document).removeClass('selected');
			$('#dropTarget').append($('#'+this, window.parent.draggSourceFrame.document));
			log('Dropped element with ID:'+this);
		});
		
		//post request to static file sending dragged ids
		$.ajax({
			url: '../scripts/response.json',
			type: 'POST',
			crossDomain: false,
			dataType: 'json',
			data: {'objId' : droppedElements},
			contentType: 'application/json',
			
			//callback function on success of request
			success: function(response, textStatus, jqXHR){
				log('Server response is: ' + response.text + JSON.stringify(droppedElements));
			},
			
			//callback function for request error handling
            error: function(xhr, textStatus, errorThrown) {
                log('Server error response['+textStatus+']');
            }
			});
		
		event.preventDefault();
	});
	
	
});