jQuery(document).ready(function(){
	crearTablaAgrupaciones();
});
function crearTablaAgrupaciones()
{
	objectDataTable.url = "findAgrupacion.htm";        	
	objectDataTable.columns = [{"sWidth" : '30%', "mDataProp" : "idAgrupacion"},
	                           {"sWidth" : '69%',"mDataProp" : "descAgrupacion"},
	                           {"sWidth" : '1%',"mDataProp" : "icono"}
	
	];
    
    objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
    	jQuery('td:eq(2)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
        jQuery('td:eq(2)', nRow).bind({
        	click:	
        		function(){
	        		showModal("¿Está seguro que quiere eliminar la agrupación " + aoData.idAgrupacion + "?", borrarAgrupacion, aoData.idAgrupacion);
        		}
        	});
    	
    	
		    //Se asocia el click a una fila, con el acceso a la pantalla de detalle
		    jQuery('td:lt(2)', nRow).bind( "click", {
		      id: aoData.idAgrupacion
		    }, function( event ) {
		    	jQuery('#idAgrupacion').val(event.data.id);
		    	jQuery('#findAgrupacion').submit();
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
		var listadoAgrupacion=  jQuery('#listadoAgrupacion').myDataTable(objectDataTable);	
   

}

function borrarAgrupacion(id){
	
	jQuery.ajax({
		url: "deleteAgrupacion.htm",
		dataType: "json",
		data:{
			idAgrupacion: id
		},
		success: function(json){
			crearTablaAgrupaciones();
		}
	});
}

