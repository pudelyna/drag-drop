$(function() {
	
	var currentDraggedObj = null;
	var draggableObjects = [];
	
	//logging function for user console
	var log = function(text){
	
		//JQuery selector to get console div with id 'consoleLog' in the context of the parent window
		$('#consoleLog', window.parent.document).append($('<p>' + text + '</p>'));
		
		//scroll bottom in the console view
		var height = $('#consoleLog', window.parent.document)[0].scrollHeight;
        $('#consoleLog', window.parent.document).scrollTop(height);
		
	};
	
	//JQuery tag name + attribute value selector
	$('img[draggable="true"]').each(function (){
	
	   //manipulate dragstart event for each draggable image in the source frame
 		$( this ).bind('dragstart',function( event ){
		
			//the user can only MOVE the objects, but not copy them
 			event.originalEvent.dataTransfer.effectAllowed = 'move';
			
			//if dragg starts and there is no multiselection add just the current id to the draggableObjects array
 			if(draggableObjects.length == 0){
 				draggableObjects.push($(this).attr('id'));
 			}
			
			//attach draggable ids to current event
 			event.originalEvent.dataTransfer.setData('Text', JSON.stringify(draggableObjects));
 			log('Drag event initiated for elements with IDS:'+JSON.stringify(draggableObjects));
			
 			//reset draggable ids 
 			draggableObjects.length = 0;
			
        });
 		
		//if CTRL is pressed then enable multi selection and marg objects in the GUI as selected
 		$( this ).bind('click', function( event ) {
		
 		    if(event.ctrlKey){
 		    	draggableObjects.push($(this).attr('id'));
 		    	$(this).addClass('selected');
				
 		    	log('CTRL pressed in multiple selection: '+JSON.stringify(draggableObjects));
				
				//prevent default behaviour for click event
 		    	event.preventDefault();
 		    }
			
 		});
 	});
	
	//stop propagation of dragover event in order to manipulate the drop event
	$('#dropTarget').bind('dragover', function( event ){
	
	    //target area will only accept a move for dragged objects
		event.originalEvent.dataTransfer.dropEffect = 'move';
		event.preventDefault();
		
	});
 	
	//manipulate the drop event
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