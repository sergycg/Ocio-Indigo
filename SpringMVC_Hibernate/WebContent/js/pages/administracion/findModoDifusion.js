jQuery(document).ready(function(){
	crearTablaModoDifusion();
});
function crearTablaModoDifusion(){
	objectDataTable.url = "findModoDifusion.htm";        	
	objectDataTable.columns = [{"sWidth" : '10%', "mDataProp" : "idModoDifusion"},
	                           {"sWidth" : '89%',"mDataProp" : "descModoDifusion"},
	                           {"sWidth" : '1%',"mDataProp" : "icono"}];
    
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
    	
    	jQuery('td:eq(2)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
        jQuery('td:eq(2)', nRow).bind({
        	click:	
        		function(){
  	        		showModal("�Est� seguro que quiere eliminar el modo de difusi�n " + aoData.idModoDifusion + "?", borrarModo, aoData.idModoDifusion);
        		}
        	});
        
    	
		    //Se asocia el click a una fila, con el acceso a la pantalla de detalle
    	jQuery('td:lt(2)', nRow).bind( "click", {
		      id: aoData.idModoDifusion
		    }, function( event ) {
		      	jQuery('#idModoDifusion').val(event.data.id);
		    	jQuery('#findModoDifusion').submit();
		    });
		    
		    //Cambio de color de la fila al pasar el rat�n
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
				    
   var listadoModosDifusion = jQuery('#listadoModosDifusion').myDataTable(objectDataTable);
    	
}

function borrarModo(id){
	
	jQuery.ajax({
		url: "deleteModoDifusion.htm",
		dataType: "json",
		data:{
			idModo: id
		},
		success: function(json){
			crearTablaModoDifusion();
		}
	});
}