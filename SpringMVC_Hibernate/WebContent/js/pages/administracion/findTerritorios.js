jQuery(document).ready(function(){
	 crearTablaListadoTerritorios ();
});


function crearTablaListadoTerritorios ()
{
	objectDataTable.url = "findTerritorios.htm";        	
	objectDataTable.columns = [{"sWidth" : '10%', "mDataProp" : "idTerritorio"},
	                           {"sWidth" : '89%',"mDataProp" : "descTerritorio"},
	                           {"sWidth" : '1%',"mDataProp" : "icono"}];
  
  objectDataTable.fnCreatedRow = function(nRow, aoData, iDataIndex) {
	
  	jQuery('td:eq(2)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
      jQuery('td:eq(2)', nRow).bind({
      	click:	
      		function(){
	        		showModal("¿Está seguro que quiere eliminar el territorio " + aoData.idTerritorio + "?", borrarTerritorio, aoData.idTerritorio);
      		}
      	});
      
  	//Se asocia el click a una fila, con el acceso a la pantalla de detalle
  	jQuery('td:lt(2)', nRow).bind( "click", {
		      id: aoData.idTerritorio
		    }, function( event ) {
		    	jQuery('#idTerritorio').val(event.data.id);
		    	jQuery('#findTerritorios').submit();
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
				    
  var listadoTerritorios = jQuery('#listadoTerritorios').myDataTable(objectDataTable);
  
}

function borrarTerritorio(id){
	
	jQuery.ajax({
		url: "deleteTerritorio.htm",
		dataType: "json",
		data:{
			idTerritorio: id
		},
		success: function(json){
			crearTablaListadoTerritorios();
		}
	});
}

