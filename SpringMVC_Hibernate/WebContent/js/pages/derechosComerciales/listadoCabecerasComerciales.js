

function cargarTablaCabeceras(codAdquisicion, codAudio, formulario){
	/**
	 * LLamada AJAX para la carga de la tabla de cabeceras comerciales
	 */
	 objectDataTable.url = "loadCabecerasComerciales.htm";        	
	 objectDataTable.columns = [
	                            {"sWidth" : '3%',"mDataProp" : "idCabeceraComercial"},
	 							{"sWidth" : '10%',"mDataProp" : "fechaInicio"}, 
	        	                {"sWidth" : '10%',"mDataProp" : "fechaFin"},
//	         	                {"sWidth" : '10%',"mDataProp" : "comercializador"}, 
//	         	                {"sWidth" : '17%',"mDataProp" : "exclusividadComercializador"}, 
	         	                {"sWidth" : '45%',"mDataProp" : "territorios"},
	         	                {"sWidth" : '32%',"mDataProp" : "idiomas"} 
	 							];
	//objectDataTable.sScrollY = '290px';
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					codAdquisicion : codAdquisicion,
					codigoAudio_hidden : codAudio
				},
				success : function(json) {
					jQuery('#tablaCabeceras').attr('style', 'width:100%');
	                jQuery('#tablaCabeceras').dataTable().fnSort([ [ 0, 'asc' ] ]);
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
			            	if (formulario.selector!="#derechoForm"){
			                    claseActual = jQuery(this).attr('class');
			                    jQuery(this).removeClass("resaltar");
			                    jQuery(this).addClass("resaltar");
			            	}else{
			                    jQuery(this).addClass("cursor_hand");
			            	}
		                },
		            mouseout:
		                function() {
			            	if (formulario.selector!="#derechoForm"){
			                    jQuery(this).removeClass("resaltar");
			                    jQuery(this).addClass(claseActual);
			            	}else{
			                    jQuery(this).removeClass("cursor_hand");
			            	}
		                },
		            click: function(event){
		            	if (formulario.selector=="#derechoForm"){
			            	var estabaSeleccionado = jQuery(event.target.parentNode).hasClass('row_selected');
			            	jQuery(tablaCabeceras.fnSettings().aoData).each(function (){
			            		jQuery(this.nTr).removeClass('row_selected');
			        		});
			            	if (!estabaSeleccionado)
				            	jQuery(event.target.parentNode).addClass('row_selected');
		            	}else{
			            	jQuery("#idCabeceraComercial").val (aoData["idCabeceraComercial"]);
			            	formulario.submit();
		            	}
		            }
		            	
		        });        
			};

	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var tablaCabeceras = jQuery('#tablaCabeceras').myDataTable(objectDataTable);
}