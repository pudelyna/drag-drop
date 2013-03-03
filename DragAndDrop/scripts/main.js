$(function() {
	 $("#dropTargetFrame").load(function () {
         var $this = $(this);
         $this.find("body").bind('dragover', function( event ){

//      		event.originalEvent.dataTransfer.dropEffect = 'move';
      		console.log("dragover")
//      		event.stopPropagation();
      		event.preventDefault();
      		return false;
      	});
     });
	 
	
})