/**
 * Carga la tabla de administración de plantillas
 */
function crearTablaAdministracionPlantillas(){
	crearTablaPlantillas(true);
}

/**
 * Carga la tabla de plantillas
 * @param idAdministracion: true indica que es el formulario que muestra el listado en administración
 * 			   		 false/null es el mostrado en la aplicación de plantillas
 */
function crearTablaPlantillas(isAdministracion){
	objectDataTable.url = "findPlantillas.htm";        	
	objectDataTable.columns = [{"sWidth" : '3%', "mDataProp" : "idPlantilla"},
	                           {"sWidth" : '26%',"mDataProp" : "tituloPlantilla"},
	                           {"sWidth" : '10%',"mDataProp" : "int_ei", "mRender": changeCellClass},
	                           {"sWidth" : '10%',"mDataProp" : "dcp_ei", "mRender": changeCellClass},
	                           {"sWidth" : '10%',"mDataProp" : "dcp_ec", "mRender": changeCellClass},
	                           {"sWidth" : '10%',"mDataProp" : "trn_ei", "mRender": changeCellClass},
	                           {"sWidth" : '10%',"mDataProp" : "trn_ec", "mRender": changeCellClass},
	                           {"sWidth" : '10%',"mDataProp" : "dis_ei", "mRender": changeCellClass},
	                           {"sWidth" : '10%',"mDataProp" : "dis_ec", "mRender": changeCellClass},
//	                           {"sWidth" : '10%',"mDataProp" : "pri_ei", "mRender": changeCellClass},
//	                           {"sWidth" : '10%',"mDataProp" : "pri_ec", "mRender": changeCellClass},
	                           {"sWidth" : '1%',"mDataProp" : "icono", "bVisible" : isAdministracion==true}];
    
    objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
    	
    	if (isAdministracion==true){
	    	jQuery('td:eq(9)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
	        jQuery('td:eq(9)', nRow).bind({
	        	click:	
	        		function(){
	  	        		showModal("¿Está seguro que quiere eliminar la plantilla " + aoData.idPlantilla + "?", borrarPlantilla, aoData.idPlantilla);
	        		}
	        	});
    	}
		
	    var claseActual = '';
	    jQuery(nRow).bind({
	    	//Cambio de color de la fila al pasar el ratón
	    	mouseenter : function() {
        		if (isAdministracion==true){
        			claseActual = jQuery(this).attr('class');
        			jQuery(this).removeClass();
        			jQuery(this).addClass("resaltar");
        		}else{
        			jQuery(this).addClass("cursor_hand");
        		}
        	},
        	//Cambio de color de la fila al pasar el ratón
        	mouseleave : function() {
        		if (isAdministracion==true){
        			jQuery(this).removeClass();
        			jQuery(this).addClass(claseActual);
        		}else{
        			jQuery(this).removeClass("cursor_hand");
        		}
        	}
	     });
        jQuery('td:lt(9)', nRow).bind({
        	click: function(event) {
        		
        		if (isAdministracion==true){
        			//Con el click se accede a la pantalla detalle
        			jQuery('#idPlantilla').val(aoData.idPlantilla);
    		    	jQuery('#findPlantillas').submit();        			
        		}else{
        			//Con el click se marca una fila
        			var estabaSeleccionado = jQuery(event.target.parentNode).hasClass('row_selected');
	            	jQuery(listadoPlantillas.fnSettings().aoData).each(function (){
	            		jQuery(this.nTr).removeClass('row_selected');
	        		});
	            	if (!estabaSeleccionado){
		            	jQuery(event.target.parentNode).addClass('row_selected');
		            	jQuery('#idPlantilla').val(aoData.idPlantilla);
	            	}
        		}
        	}
	    });
		};
		
		objectDataTable.fnServerData = 
			function(sSource, aoData, fnCallback) {
			
			    jQuery.ajax({
					dataType : "json",
					url : sSource,
					data : {
					    activo : ((isAdministracion==true)?null:1)
					},
					success : function(json) {
					    fnCallback(json);
					}
			    });
			};

    var listadoPlantillas = jQuery('#listadoPlantillas').myDataTable(objectDataTable);	
}

/**
 * Borra una plantilla desde la administración de plantillas
 * @param id
 */
function borrarPlantilla(id){
	jQuery.ajax({
		url: "deletePlantilla.htm",
		dataType: "json",
		data:{
			idPlantilla: id
		},
		success: function(json){
			crearTablaPlantillas(true);
		}
	});
}

function resetCampos(){
	jQuery("#idPlantilla").val("");
}


/**
 * Muestra check o aspa en funcion si tiene o no el tipo de plantilla definida
 */
function changeCellClass ( data, type, full ) {
	return ((data == 1)?"<div class='icon-OK'></div>":"<div class='icon-NOK'></div>");
}  