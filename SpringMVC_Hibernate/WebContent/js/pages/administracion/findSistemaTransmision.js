jQuery(document).ready(function(){
	crearTablaSistemaTransmision();
});

function crearTablaSistemaTransmision()
{
	objectDataTable.url = "findSistemaTransmision.htm";        	
	objectDataTable.columns = [{"sWidth" : '10%', "mDataProp" : "idSistemaTransmision"},
	                           {"sWidth" : '89%',"mDataProp" : "descSistemaTransmision"},
	                           {"sWidth" : '1%',"mDataProp" : "icono"}];
    
    objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
    	
    	jQuery('td:eq(2)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
        jQuery('td:eq(2)', nRow).bind({
        	click:	
        		function(){
  	        		showModal("¿Está seguro que quiere eliminar el sistema de transmision " + aoData.idSistemaTransmision + "?", borrarSistema, aoData.idSistemaTransmision);
        		}
        	});
        
    	
		    //Se asocia el click a una fila, con el acceso a la pantalla de detalle
    	jQuery('td:lt(2)', nRow).bind( "click", {
		      id: aoData.idSistemaTransmision
		    }, function( event ) {
		    	jQuery('#idSistemaTransmision').val(event.data.id);
		    	jQuery('#findSistemaTransmision').submit();
		    });
		    
		    //Cambio de color de la fila al pasar el ratón
		    var claseActual = '';
		    jQuery(nRow).bind({
	        	mouseenter : function() {
	        	    claseActual = jQuery(this).attr('class');
	        	    jQuery(this).removeClass();
	        	    jQuery(this).addClass("resaltar");
	        	},
	        	mouseleave : function() {
	        	    jQuery(this).removeClass();
	        	    jQuery(this).addClass(claseActual);
	        	}
		    });
		};
				    
    var listadoSistemaTransmision = jQuery('#listadoSistemaTransmision').myDataTable(objectDataTable);	
}
function borrarSistema(id){
	
	
	
	jQuery.ajax({
		url: "deleteSistemaTransmision.htm",
		dataType: "json",
		data:{
			idSistema: id
		},
		success: function(json){
			crearTablaSistemaTransmision();
		}
	});
}
