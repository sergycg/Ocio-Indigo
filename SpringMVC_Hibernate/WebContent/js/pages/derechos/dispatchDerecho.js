jQuery(document).ready(function(){
	
	var validator = validarFormulario("derechoForm");

	jQuery('#cabecerasComerciales').attr('style','display:none');
	
	generaAutocomplete(jQuery('#codigoAmbitoDerecho'),
					  jQuery('#descripcionAmbitoDerecho'),
					  "autocompleteAmbitosDerechos.htm", 
					  "resetTipoDerecho();", 
					  "");
	
	generaAutocomplete(jQuery('#codigoTipoDerecho'),
					   jQuery('#descripcionTipoDerecho'),
					   "autocompleteTiposDerechos.htm", 
					   "dispatch();", 
					   jQuery('#codigoAmbitoDerecho'));
	
	jQuery('#aceptar').click( function(event) {
        event.preventDefault();
        if (jQuery("#derechoForm").valid()){
			jQuery("#idCabeceraComercial").val("");
			jQuery("#idDerechoComercializacion").val("");
			jQuery("#idDerechoAsociadoInteractivos").val("");
			if(jQuery('#codigoAmbitoDerecho').val() == 'EC'){
//				var cabecera = fnGetSelected("#tablaCabeceras");
//				if (fnNumFilas("#tablaCabeceras")==0){
//					showWarning("No existe ninguna Cabecera Comercial.");
//				}else if(cabecera==null || cabecera.length==0){
//					showWarning("No se ha selecionado ninguna Cabecera Comercial. Para seleccionar una pinche sobre la fila que desee.");
//				}else {
//					jQuery("#idCabeceraComercial").val (cabecera[0].childNodes[0].innerText);
					if(jQuery('#codigoTipoDerecho').val() == '1' || 
					   jQuery('#codigoTipoDerecho').val() == '3' ||
					   jQuery('#codigoTipoDerecho').val() == '4'){
						if (fnNumFilas("#tablaDerechosComercializacion")>0){
							var derecho = fnGetSelectedValues("#tablaDerechosComercializacion");
							if(derecho==null || derecho.length==0){
								showModal("No ha seleccionado ningun DCP interno para relacionar. ¿Desea Continuar?",enviarFormulario,"");
							}
							else{
								jQuery("#idDerechoComercializacion").val(derecho[0].codigoDerecho);
								jQuery('#codigoTipoDerecho').val(derecho[0].codigoTipoDerecho);
								enviarFormulario();
							}
						}else{
							enviarFormulario();
						}
					}else{
						enviarFormulario();
					}
//				}
			}else if(jQuery('#codigoAmbitoDerecho').val() == 'EI' && jQuery('#codigoTipoDerecho').val() == '6'){
				if (fnNumFilas("#tablaDerechosInteractivos")>0){
					var derecho = fnGetSelected("#tablaDerechosInteractivos");
					if(derecho==null || derecho.length==0){
						showModal("No ha seleccionado ningun DCP interno para relacionar. ¿Desea Continuar?",enviarFormulario,"");
					}
					else{
//						abrirFormularioOpcionesInteractivos(derecho[0].childNodes[0].innerText);
						jQuery("#idDerechoAsociadoInteractivos").val(derecho[0].childNodes[0].innerText);
						enviarFormulario();
					}
				}else{
					enviarFormulario();
				}				
			}else{
				enviarFormulario();
			}
    	}
		
	} );	
});


function enviarFormulario(){
	var formulario = jQuery("#derechoForm");
	formulario.submit();
}

function resetTipoDerecho(){
	jQuery('#codigoTipoDerecho').val("");
	jQuery('#descripcionTipoDerecho').val("");
	jQuery('#derechosComercializacion').attr('style','display:none');
	jQuery('#cabecerasComerciales').attr('style','display:none');
	
}
function dispatch(){
	
//	var formulario = jQuery("#derechoForm");
	
	jQuery('#derechosComercializacion, #cabecerasComerciales, #derechosInteractivos').attr('style','display:none');

	if(jQuery('#codigoAmbitoDerecho').val() == 'EC'){
		if(jQuery('#codigoTipoDerecho').val() == '1' || 
		   jQuery('#codigoTipoDerecho').val() == '3' ||
		   jQuery('#codigoTipoDerecho').val() == '4'){
			obtenerListaDerechosDeComercializacion(jQuery("#codigoAudio_hidden").val());
		}
//		jQuery('#cabecerasComerciales').attr('style','display:block');
//		cargarTablaCabeceras(jQuery("#idAdquisicion").val(), jQuery("#codigoAudio_hidden").val(), formulario);
	}else if(jQuery('#codigoAmbitoDerecho').val() == 'EI'){
		if(jQuery('#codigoTipoDerecho').val() == '6'){
			obtenerListaDerechosInteractivos(jQuery("#codigoAudio_hidden").val());
		}
	}
}

/************ SACAR A OTRO FICHERO ********************/
function obtenerListaDerechosDeComercializacion(cod_Audio){

    objectDataTable.url = "findDerechosComercializacion.htm";        	
    objectDataTable.columns = [
                               {"sWidth" : '3%',"mDataProp" : "codigoDerecho"},
                               {"sWidth" : '9%',"mDataProp" : "descTipoDerecho"},
                               {"sWidth" : '10%',"mDataProp" : "codigoImputacionSAPDerecho"},
                               {"sWidth" : '10%',"mDataProp" : "grupoCadenas"},
                               {"sWidth" : '8%',"mDataProp" : "fechaInicioVigencia"},
                               {"sWidth" : '8%',"mDataProp" : "fechaFinVigencia"},
                               {"sWidth" : '8%',"mDataProp" : "numPasesContratados"},
                               {"sWidth" : '8%',"mDataProp" : "numPasesAdicionales"},
                               {"sWidth" : '7%',"mDataProp" : "numPasesEmitidos"},
                               {"sWidth" : '7%',"mDataProp" : "multidifusionEmisiones"},
                               {"sWidth" : '7%',"mDataProp" : "multidifusionDias"},
                               {"sWidth" : '5%',"mDataProp" : "ventanasNoVigencia"},
                               {"sWidth" : '5%',"mDataProp" : "comercializacion"},
                               {"sWidth" : '5%',"mDataProp" : "codigoDerechoComercial"}
                              ];
    objectDataTable.fnServerData = 
    	function(sSource, aoData, fnCallback) {
	        jQuery.ajax({	        	
	            dataType : "json",
	            url : sSource,
	            data : {
	            	codAudio: cod_Audio,
	            	idTipoDerecho: jQuery('#codigoTipoDerecho').val()
	            },
	            success : function(beans) {
	                if (beans.aaData.length == 0){
	            		jQuery('#derechosComercializacion').attr('style','display:none');		
	            	}else{
	            		jQuery('#derechosComercializacion').attr('style','display:block');		
	            	}
	                jQuery('#tablaDerechosComercializacion').attr('style', 'width:100%');
	                jQuery('#tablaDerechosComercializacion').dataTable().fnSort([ [ 0, 'asc' ] ]);
	                fnCallback(beans);
	            }
	        });
		};	
    
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var codigoDerechoComercial = aoData["codigoDerechoComercial"];
	        var deshabilitar = true;
	        if (codigoDerechoComercial == null || codigoDerechoComercial == "undefined" ||
        		codigoDerechoComercial == undefined || codigoDerechoComercial == "")
	        	deshabilitar = false;
			var claseActual = '';
	        
	        if (!deshabilitar){
	        	jQuery(nRow).bind({
		        	mouseenter:
		                function() {
		            		jQuery(this).removeClass("cursor_hand");
		                    jQuery(this).addClass("cursor_hand");
		                },
		            mouseleave:
		                function() {
		                    jQuery(this).removeClass("cursor_hand");
		                },
		            click:
		            	function(event) {
			            	var estabaSeleccionado = jQuery(event.target.parentNode).hasClass('row_selected');
			            	jQuery(oTable.fnSettings().aoData).each(function (){
			            		jQuery(this.nTr).removeClass('row_selected');
			        		});
			            	if (!estabaSeleccionado)
			            		jQuery(event.target.parentNode).addClass('row_selected');
	                }
	        	});
	        }else{
	        	jQuery(nRow).addClass("fila_disabled");
	        }        
		};
	
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var oTable = jQuery('#tablaDerechosComercializacion').myDataTable(objectDataTable);
	oTable.find('th').attr("style","text-align:center");
}

function obtenerListaDerechosInteractivos(cod_Audio){

    objectDataTable.url = "findDerechosInteractivos.htm";        	
    objectDataTable.columns = [
                               {"sWidth" : '3%',"mDataProp" : "codigoDerecho"},
                               {"sWidth" : '9%',"mDataProp" : "descTipoDerecho"},
                               {"sWidth" : '10%',"mDataProp" : "codigoImputacionSAPDerecho"},
                               {"sWidth" : '10%',"mDataProp" : "grupoCadenas"},
                               {"sWidth" : '8%',"mDataProp" : "fechaInicioVigencia"},
                               {"sWidth" : '8%',"mDataProp" : "fechaFinVigencia"},
                               {"sWidth" : '8%',"mDataProp" : "numPasesContratados"},
                               {"sWidth" : '8%',"mDataProp" : "numPasesAdicionales"},
                               {"sWidth" : '7%',"mDataProp" : "numPasesEmitidos"},
                               {"sWidth" : '7%',"mDataProp" : "multidifusionEmisiones"},
                               {"sWidth" : '7%',"mDataProp" : "multidifusionDias"},
                               {"sWidth" : '5%',"mDataProp" : "ventanasNoVigencia"},
                               {"sWidth" : '5%',"mDataProp" : "comercializacion"},
                               {"sWidth" : '5%',"mDataProp" : "codigoDerechoComercial"}
                              ];

    
    objectDataTable.fnServerData = 
    	function(sSource, aoData, fnCallback) {
	        jQuery.ajax({	        	
	            dataType : "json",
	            url : sSource,
	            data : {
	            	codAudio: cod_Audio,
	            	idTipoDerecho: jQuery('#codigoTipoDerecho').val()
	            },
	            success : function(beans) {
	                if (beans.aaData.length == 0){
	            		jQuery('#derechosInteractivos').attr('style','display:none');		
	            	}else{
	            		jQuery('#derechosInteractivos').attr('style','display:block');		
	            	}
	                jQuery('#tablaDerechosInteractivos').attr('style', 'width:100%');
	                jQuery('#tablaDerechosInteractivos').dataTable().fnSort([ [ 0, 'asc' ] ]);
	                fnCallback(beans);
	            }
	        });
		};	
    
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var codigoDerechoInteractivo = aoData["codigoDerechoInteractivos"];
	        var deshabilitar = true;
	        if (codigoDerechoInteractivo == null || codigoDerechoInteractivo == "undefined" ||
	        		codigoDerechoInteractivo == undefined || codigoDerechoInteractivo == "")
	        	deshabilitar = false;
			var claseActual = '';
	        
	        if (!deshabilitar){
	        	jQuery(nRow).bind({
		        	mouseenter:
		                function() {
		            		jQuery(this).removeClass("cursor_hand");
		                    jQuery(this).addClass("cursor_hand");
		                },
		            mouseleave:
		                function() {
		                    jQuery(this).removeClass("cursor_hand");
		                },
		            click:
		            	function(event) {
			            	var estabaSeleccionado = jQuery(event.target.parentNode).hasClass('row_selected');
			            	jQuery(oTable.fnSettings().aoData).each(function (){
			            		jQuery(this.nTr).removeClass('row_selected');
			        		});
			            	if (!estabaSeleccionado)
			            		jQuery(event.target.parentNode).addClass('row_selected');
	                }
	        	});
	        }else{
	        	jQuery(nRow).addClass("fila_disabled");
	        }        
		};
	
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var oTable = jQuery('#tablaDerechosInteractivos').myDataTable(objectDataTable);
	oTable.find('th').attr("style","text-align:center");
}

