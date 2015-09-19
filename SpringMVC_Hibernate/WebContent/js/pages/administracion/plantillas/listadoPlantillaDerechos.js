
function editarPlantilla (idPlantillaDerecho, codigoTipoDerecho, codigoAmbitoDerecho){
	ocultarFormularios();
	
	jQuery('#idPlantillaDerecho').val(idPlantillaDerecho);
	jQuery('#codigoTipoDerecho').val(codigoTipoDerecho);
	jQuery('#codigoAmbitoDerecho').val(codigoAmbitoDerecho);			    		
	initForm(codigoTipoDerecho, codigoAmbitoDerecho);
	jQuery("#seleccionNuevoTipo").show ();	
	
	jQuery("html, body").animate({ scrollTop: 0 }, "slow");
}

function cargarTablaPlantillaDerechos(idPlantilla){
	/**
	 * LLamada AJAX para la carga de la tabla de Derechos de Plantilla
	 */
	 objectDataTable.url = "findPlantillaDerechos.htm";        	
	 objectDataTable.columns = [
	                            {"sWidth" : '29%',"mDataProp" : "cabecera"},
	 							{"sWidth" : '70%',"mDataProp" : "caracteristicas"},
	 							{"bVisible" : false,"mDataProp" : "idPlantillaDerecho"},
	 							{"bVisible" : false,"mDataProp" : "codigoTipoDerecho"},
	 							{"bVisible" : false,"mDataProp" : "codigoAmbitoDerecho"}
	 							];
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					idPlantilla : jQuery('#idPlantilla').val()
				},
				success : function(json) {
					jQuery('#tablaPlantillaDerechos').attr('style', 'width:100%');
	                jQuery('#tablaPlantillaDerechos').dataTable().fnSort([ [ 0, 'asc' ] ]);
					fnCallback(json);
				}
		    });
		};
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
	        
	        jQuery(nRow).bind({
	            mouseover:
	                function() {
		            	claseActual = jQuery(this).attr('class');
		                jQuery(this).removeClass("resaltar");
		                jQuery(this).addClass("resaltar");
	                },
	            mouseout:
	                function() {
		            	jQuery(this).removeClass("resaltar");
		                jQuery(this).addClass(claseActual);			            	
	                }
	            	
	        });
	        jQuery(nRow).css('cursor', 'default');
		};

	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	
	objectDataTable.fnDrawCallback = function( oSettings ) {
		jQuery(".icon-delete").bind(
	    	"click", 
	    		function(event){
		        		showModal("¿Está seguro que quiere eliminar el derecho de plantilla " + 
		        				jQuery(this).attr('idPlantillaDerecho') + "?", borrarPlantillaDerechos, jQuery(this).attr('idPlantillaDerecho'));
	    		}
	    	);
	};
	var tablaCabeceras = jQuery('#tablaPlantillaDerechos').myDataTable(objectDataTable).rowGrouping();
	jQuery ("#plantillas_definidas").show();
}


function borrarPlantillaDerechos(id){
	jQuery.ajax({
		url: "deletePlantillaDerechos.htm",
		dataType: "json",
		data:{
			idPlantillaDerecho: id
		},
		success: function(json){
			nuevoTipo();			
		}
	});
}