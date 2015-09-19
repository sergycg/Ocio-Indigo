jQuery(document).ready(function(){
	validarFormulario("derechoComercForm","form_crearComercializador");

	/**
	 * Si se realiza un cambio en la pantalla general del derecho, se obliga a guardar los
	 * cambios antes de crear/modificar/borrar elementos del derecho
	 */
	comprobarCambiosGenerales("comercializadores", "formButtonNuevoComercializador");
	
	jQuery('#comercializadoresForm\\.descProveedorSAP').change (function(){
		setRazonSocial();
	});
	jQuery('#comercializadoresForm\\.exclusividad').on('ifChecked', function(event){
		jQuery('#comercializadoresForm\\.exclusividad').val("1");
	});
	jQuery('#comercializadoresForm\\.exclusividad').on('ifUnchecked', function(event){
		jQuery('#comercializadoresForm\\.exclusividad').val("0");
	});

});	

/**
 * LLamada AJAX para la carga de la tabla de Comercializadores,
 */
function obtenerTablaComercializadores(idDerecho) {
//	jQuery ("#porcentajeidad").val(100);
	
	objectDataTable.url = "findComercializadores.htm";        	
	objectDataTable.columns = [ //{"sWidth" : '5%',"mDataProp" : "idComercializador"},
	                            {"sWidth" : '20%',"mDataProp" : "descComercializador"},
	                            {"sWidth" : '20%',"mDataProp" : "proveedorSAP"},
	                            {"sWidth" : '35%',"mDataProp" : "razonSocial"},
	         	                {"sWidth" : '10%',"mDataProp" : "porcentaje"}, 
	        	                {"sWidth" : '10%',"mDataProp" : "exclusividad"},
	        	                {"sWidth" : '5%',"mDataProp" : "icono"}]; 
	//objectDataTable.sScrollY = '223px';
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					idDerechoComercial : idDerecho
				},
				success : function(json) {
	                jQuery('#tablaComercializadores').attr('style', 'width:100%');
	                jQuery('#tablaComercializadores').dataTable().fnSort([ [ 1, 'asc' ] ]);
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
//	                    claseActual = jQuery(this).attr('class');
	                    jQuery(this).removeClass();
	                    jQuery(this).addClass("resaltar");
	                },
	            mouseout:
	                function() {
	                    jQuery(this).removeClass();
		                    jQuery(this).addClass(claseActual);
	                }
	        });
	        jQuery('td:eq(5)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
	        jQuery('td:eq(5)', nRow).bind({
	        	click:	
	        		function(){
		        		var arrayParams = new Array( aoData.idComercializador);
		        		showModal("¿Está seguro de que quiere eliminar el comercializador?", 
	                			  borrarComercializador, arrayParams);
	        		}
	        	});
	        jQuery('td:lt(5)', nRow).bind({
	            click:
	            	function() {
	            		cargarFormularioAltaModificacionComercializador(aoData.idComercializador, jQuery("#idDerecho").val());
	            }
	        });
	        
//	        recalcularporcentaje(aoData);
		};

	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	
	var tablaComercializadores = jQuery('#tablaComercializadores').myDataTable(objectDataTable);
}

function recalcularporcentaje(data){
	var porcentaje = data['porcentajeParticipacion'];
	jQuery ("#porcentaje").val(jQuery ("#porcentaje").val() - porcentaje);
}

function cargarFormularioAltaModificacionComercializador(idComercializador, idDerechoComercial){
	jQuery.ajax({
		url: "loadComercializadorById.htm",
		dataType: "json",
		data:{
			idComercializador: idComercializador,
			idDerechoComercial: idDerechoComercial,
		},
		success: function(bean){
			cargarFormularioComercializador(bean.idComercializador, bean);
		}
	});
}

function cargarFormularioComercializador(id, bean){
	var validatorComercializadores = validarFormulario("derechoComercForm","form_crearComercializador");
	var dialogComercializador = jQuery("#form_crearComercializador").dialog({
		height : 300,
		width : 515,
		title : "Comercializador",
		open: function( event, ui ) {
			if (id != ""){
				jQuery('#comercializadoresForm\\.tipo').attr ("readonly", true).addClass('disabled');
				jQuery('#comercializadoresForm\\.desctipo').attr ("readonly", true).addClass('disabled');
				jQuery('#accionAltaModificacionComercializadores').val("update");

				jQuery("#comercializadoresForm\\.idComercializador").val (id);
				jQuery("#comercializadoresForm\\.tipo").val (bean.tipo);
				jQuery("#comercializadoresForm\\.proveedorSAP").val (bean.proveedorSAP);
				jQuery("#comercializadoresForm\\.razonSocial").val (bean.razonSocial);
				jQuery("#comercializadoresForm\\.porcentaje").val (bean.porcentaje);
				
				if (bean.exclusividad == "1")
					jQuery('#comercializadoresForm\\.exclusividad').iCheck('enable').iCheck('check');
				else
					jQuery('#comercializadoresForm\\.exclusividad').iCheck('enable').iCheck('uncheck');

				jQuery("#comercializadoresForm\\.exclusividad").val (bean.exclusividad);
				
			}else{
				limpiarCamposComercializador();
				jQuery('#comercializadoresForm\\.tipo').attr ("readonly", false).removeClass('disabled');
				jQuery('#comercializadoresForm\\.descTipo').attr ("readonly", false).removeClass('disabled');
				jQuery('#accionAltaModificacionComercializadores').val("add");
			}
			
			generaAutocomplete(jQuery('#comercializadoresForm\\.tipo'),
					   jQuery('#comercializadoresForm\\.descTipo'),
					   "autocompleteComercializador.htm", 
					   "cambiaEstadoTitularRazonSocial()",
					   "");

			generaAutocomplete(jQuery('#comercializadoresForm\\.proveedorSAP'),
						jQuery('#comercializadoresForm\\.descProveedorSAP'),
						"autocompleteProveedoresSapContrato.htm", 
						"setRazonSocial()", 
						jQuery ('#codigoContrato'));

//			if (jQuery('#comercializadoresForm\\.tipo') != undefined && jQuery('#comercializadoresForm\\.tipo').val() == 'C'){
//				jQuery('#comercializadoresForm\\.descProveedorSAP').attr ("readonly", false).removeClass('disabled').addClass('required');
//			}else{
//				jQuery('#comercializadoresForm\\.descProveedorSAP').attr ("readonly", true).addClass('disabled').removeClass('required');
//			}
//			if (jQuery('#comercializadoresForm\\.tipo').val() == 'D'){
//				jQuery('#comercializadoresForm\\.razonSocial').attr ("readonly", false).removeClass('disabled').addClass('required');
//			}else{
//				jQuery('#comercializadoresForm\\.razonSocial').attr ("readonly", true).addClass('disabled').removeClass('required');
//			}
//			validarFormulario("cabeceraComercialForm","form_crearComercializador");
		},
		buttons : {
			"Guardar" : function() {
				if (jQuery('#comercializadoresForm\\.tipo').val() == 'C' && 
					jQuery('#comercializadoresForm\\.descProveedorSAP').val() == '')
					showError ("Debe indicar Titular/Proveedor");
				else{
					if (jQuery('#comercializadoresForm\\.tipo').val() == 'D' && 
						jQuery('#comercializadoresForm\\.razonSocial').val() == '')
						showError ("Debe indicar Razón Social");
					else{
						jQuery("#derechoComercForm").attr ("action", "addComercializador.htm");
						jQuery("#derechoComercForm").submit();
					}
				}
			},
			"Cancelar" : function() {
				limpiarCamposComercializador();
				validatorComercializadores.resetForm();
				dialogComercializador.dialog("close");
			}
		},
		close:function (){
		    limpiarCamposComercializador();
		}
	});

	dialogComercializador.parent().appendTo(jQuery("form:first"));
	jQuery("#form_crearComercializador", window.parent.document).scrollTop(0);
	
	cambiaEstadoTitularRazonSocial(bean);
	
}

function borrarComercializador(arrayParametros){
	var idCabecera = jQuery("#idDerecho").val();
	jQuery.ajax({
		url: "eliminarComercializador.htm",
		dataType: "json",
		data:{
			idComercializador: arrayParametros[0]
		},
		success: function(json){
			obtenerTablaComercializadores(idCabecera);
		}
	});
}

function limpiarCamposComercializador(){
	var allInputs = jQuery("#form_crearComercializador input");
	allInputs.val("");
}

function setRazonSocial(){
	if (jQuery('#comercializadoresForm\\.descProveedorSAP').val() == ''){
		jQuery('#comercializadoresForm\\.razonSocial').val ('');
		jQuery('#comercializadoresForm\\.razonSocial').attr ("readonly", false).removeClass('disabled');
	}else{
		jQuery('#comercializadoresForm\\.razonSocial').val (jQuery('#comercializadoresForm\\.descProveedorSAP').val());
		jQuery('#comercializadoresForm\\.razonSocial').attr ("readonly", true).addClass('disabled');
	}
}

function cambiaEstadoTitularRazonSocial(obj){
	var tipo = '';
	if (obj != null && obj != undefined)
		tipo = obj.tipo;
	else
		tipo = jQuery('#comercializadoresForm\\.tipo').val();
	
	if (tipo == 'C'){
		jQuery('#comercializadoresForm\\.descProveedorSAP').attr ("readonly", false).removeClass('disabled');
		jQuery('#comercializadoresForm\\.razonSocial').attr ("readonly", true).addClass('disabled');
	}else{
		if (tipo == 'D'){
			jQuery('#comercializadoresForm\\.descProveedorSAP').attr ("readonly", true).addClass('disabled');
			jQuery('#comercializadoresForm\\.razonSocial').attr ("readonly", false).removeClass('disabled');
		}else{
			if (tipo == 'A')
				jQuery('#comercializadoresForm\\.razonSocial').val("RTVE");
			jQuery('#comercializadoresForm\\.descProveedorSAP').attr ("readonly", true).addClass('disabled');
			jQuery('#comercializadoresForm\\.razonSocial').attr ("readonly", true).addClass('disabled');
		}
	}
}