jQuery(document).ready(function(){
	/**
	 * Si se realiza un cambio en la pantalla general del derecho, se obliga a guardar los
	 * cambios antes de crear/modificar/borrar elementos del derecho
	 */
	comprobarCambiosGenerales("ventanasComercializacion", "formButtonNuevaVentana");
	
    //Inicialización del campo fecha
	datepicker("#ventanasForm\\.fechaInicio", "#ventanasForm\\.fechaFin");
	limpiarCamposVentana();

	generaAutocomplete(jQuery('#beneficiarioFlatFee'),
			jQuery('#descProveedorSAP'),
			"autocompleteProveedoresSapContrato.htm", 
			"cambiaEstadoCantidad()", 
			jQuery ('#codigoContrato'));

	if (jQuery("#numTitularesContrato").val() =='0'){
		jQuery ("#cantidadFlatFee").attr("readonly", true).addClass ("disabled");
		jQuery ("#descProveedorSAP").attr("readonly", true).addClass ("disabled");
	}
});	

/**
 * LLamada AJAX para la carga de la tabla de titulares,
 */
function obtenerTablaVentanasComercializacion(id) {
	objectDataTable.url = "findVentanasComercializacion.htm";        	
	objectDataTable.columns = [ 
	                            {"mDataProp" : "cabecera"},
	                            {"sWidth" : '70%',"mDataProp" : "beneficiario"},
	                            {"sWidth" : '30%',"mDataProp" : "porcentajeBeneficiario"}
	                          ]; 
	// objectDataTable.sScrollY = '223px';
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					idDerechoComercial : id
				},
				success : function(json) {
//	                jQuery('#tablaVentanasComercializacion').attr('style', 'width:100%');
	                jQuery('#tablaVentanasComercializacion')
	                	.dataTable()
	                	.fnSort([ 
	                	          [ 2, 'asc' ]
	                	        ]);
				    fnCallback(json);
				}
		    });
		};
	objectDataTable.fnDrawCallback = 
		function(oSettings, json) {
	    	var contextMenuCabecera =[
   		        {
   		            'Eliminar':{ 
   		                onclick:function(menuItem,menu) {
   		                	var idVentana = this.attributes["value"].value;
   		                	//var idVentana = this.childNodes[0].value;
   		                    var textoEliminar = this.childNodes[0].value;
   		                    var arrayParams = new Array( idVentana, jQuery("#idDerecho").val());
   		                    showModal("¿Desea eliminar la ventana comprendida entre " + 
   		                    		textoEliminar + "?", borrarVentanaComercializacion, arrayParams);   		                	
  		                }, 
   		                title:'Eliminar Ventana'
   		            },
   		            'Editar':{
	   		        	onclick:function(menuItem,menu) {
	   		        		var idVentana = this.attributes["value"].value;
//	   		        		var idVentana = this.childNodes[0].value;
	   		        		cargarFormularioAltaModificacionVentana(idVentana,jQuery("#idDerecho").val());
	   		               }, 
	 		                title:'Editar Ventana'
	   		            }
   		        },
   		    
   		        jQuery.contextMenu.separator,
   		        {
   		            'Cerrar':{title:'Cerrar'} 
   		        }
   	        ];
		        
    		jQuery('[name=filaCabecera]').contextMenu(
	    		contextMenuCabecera,
	    		objectInicializeContextMenu
	    	);
		    	
			};	
			
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	
	var tablaVentanasComercializacion = jQuery('#tablaVentanasComercializacion').myDataTable(objectDataTable);
	tablaVentanasComercializacion.rowGrouping({bExpandableGrouping : true});
}

/**
 * LLamada AJAX para la carga de los beneficiarios de una ventana, en modo ALTA
 */
var oldValue = 0;
function obtenerBeneficiariosVentanas(idContrato, idVentana, accion) {
	var htmlBeneficiarios = '';
	if (accion == "ALTA"){
		jQuery.ajax({
    		dataType : "json",
			type: "GET",
    		url : "findBeneficiariosVentanasAlta.htm",
    		data : {
    		    idContrato : idContrato
    		},
    		success: function(data) {
    			jQuery.each(data, function () {
    				var divcg = jQuery('<div>');
				    var spanBenef = jQuery('<span>').html(this['descTitularSAP'] + "&nbsp;&nbsp;");
				    var inputHidden = jQuery('<input>').attr({
				    	type: 'hidden',
						value: this['idTitularSAP'],
						name: 'idPorcentajeSAP'
					});
				    var inputText = jQuery('<input>').attr({
				        type: 'text',
				        value: '',
				        name: 'porcentajeBeneficiario',
				        id: 'porcentaje_' + this['idTitularSAP'],
				    });
				    
				    divcg.addClass('campo_gigante').append(spanBenef).append(inputHidden).append(inputText);
				    jQuery("#beneficiarios").append (divcg);
				    
//    				htmlBeneficiarios += 
//    				'<div class="campo_gigante">' +
//			    		'<span>' + this['descTitularSAP'] +
//			    			'&nbsp;&nbsp;</span>' +
//			    			'<input type="hidden" name="idPorcentajeSAP" value="' + 
//			    			this['idTitularSAP'] + '" />' +
//			    			'<input type="text" value=""' +
//			    			'class="input-mini" name="porcentajeBeneficiario" id="porcentaje_' + 
//			    			this['idTitularSAP'] + '"></input>' +
//		    		 '</div>';
    			});
				comunBeneficiarios();
    		}
		});
	}else{
		var idDerecho = jQuery ("#idDerecho").val();
		
		jQuery.ajax({
			dataType : "json",
			type: "GET",
			url : "findBeneficiariosVentanasModif.htm",
			data : {
				idContrato : idContrato, 
			    idVentana : idVentana
			},
			success: function(data) {
				jQuery.each(data, function () {
				    var divcg = jQuery('<div>');
				    var spanBenef = jQuery('<span>').html(this['beneficiario'] + "&nbsp;&nbsp;");
				    var inputHidden = jQuery('<input>').attr({
				    	type: 'hidden',
						value: this['idBeneficiario'] + "," + this['porcentajeBeneficiario'],
						name: 'idPorcentajeSAP'
					});
				    var inputText = jQuery('<input>').attr({
				        type: 'text',
				        value: this['porcentajeBeneficiario'],
				        name: 'porcentajeBeneficiario',
				        id: 'porcentaje_' + this['idBeneficiario'],
				    });
				    
				    divcg.addClass('campo_gigante').append(spanBenef).append(inputHidden).append(inputText);
				    jQuery("#beneficiarios").append (divcg);

				    
//				    htmlBeneficiarios +=
//				    	'<div class="campo_gigante">' +
//				    		'<span>' + this['beneficiario'] +
//				    			'&nbsp;&nbsp;</span>' +
//				    			'<input type="hidden" name="idPorcentajeSAP" value="' + 
//				    			this['idBeneficiario'] + "," + this['porcentajeBeneficiario'] + '" />' +
//				    			'<input type="text" value="' + this['porcentajeBeneficiario'] + '"' +
//				    			' onChange="alert()" class="input-mini" name="porcentajeBeneficiario" id="porcentaje_' + 
//				    			this['idBeneficiario'] + '"></input>' +
//			    		 '</div>';
				});
				comunBeneficiarios();
				jQuery('#idVentanaHidden').val (idVentana);
			}
		});
	}
}

function comunBeneficiarios(){
	jQuery('#beneficiarios').attr('style', 'display:block');

	jQuery("input[name='porcentajeBeneficiario']").addClass ('input-mini');
	jQuery("input[name='porcentajeBeneficiario']").mask ("99.99");

	jQuery("input[name='porcentajeBeneficiario']").focus(function() {
		oldValue = jQuery(this).val();
    });
	
	jQuery("input[name='porcentajeBeneficiario']").change(function() {
		cambiarValorHidden (jQuery(this));
    });

	//recalcularPorcentajeRTVE();
}

function recalcularPorcentajeRTVE(){
	// Coger todos los name "idPorcentajeSAP", sumarlos y restarlos a 100
	var porcentajes = jQuery("input[name='porcentajeBeneficiario'");
	var suma = 0;
	jQuery.each (porcentajes, function(){
		var porcentaje = 0;
		if (jQuery(this).val() == '' || jQuery(this).val() == 'undefined' ||
			jQuery(this).val() == null || jQuery(this).val() == undefined)
			porcentaje = 0;
		else
			porcentaje = jQuery(this).val().replace(/\,/g,'.');
		porcentaje = parseFloat (porcentaje);
		suma += porcentaje;
	});
	jQuery("#ventanasForm\\.porcentajeRtve").val(100 - suma);
}
function cambiarValorHidden (obj){
	// Recalcular porcentaje de beneficio RTVE
	// Si una vez recalculado el porcentaje de RTVE sale negativo, se visualiza un mensaje y no se le deja continuar
	var porcentajes = jQuery("input[name='porcentajeBeneficiario'");
	var suma = 0;
	jQuery.each (porcentajes, function(){
		var porcentaje = 0;
		if (jQuery(this).val() == '' || jQuery(this).val() == 'undefined' ||
			jQuery(this).val() == null || jQuery(this).val() == undefined)
			porcentaje = 0;
		else
			porcentaje = jQuery(this).val().replace(/\,/g,'.');
		porcentaje = parseFloat (porcentaje);
		suma += porcentaje;
	});
	
	var resta = 100 - suma; 
	
	var inputHidden = jQuery(obj).prev()[0];
	if (resta < 0){
		jQuery(obj).val(oldValue);
		showWarning("El valor indicado excede el total del 100%");
		inputHidden.value = inputHidden.value.split(",")[0] + "," + oldValue;
	}else{
		inputHidden.value = inputHidden.value.split(",")[0] + "," + jQuery(obj).val();
		//jQuery("#ventanasForm\\.porcentajeRtve").val(resta);
	}
		
}

function cargarFormularioAltaModificacionVentana(idVentana, idDerechoComercial){
	jQuery.ajax({
		url: "loadVentanaComercializacionById.htm",
		dataType: "json",
		data:{
			idVentana: idVentana,
//			idDerechoComercial: idDerechoComercial
		},
		success: function(bean){
			jQuery('#ventanasForm\\.fechaInicio').val (bean.fechaInicio);
			jQuery('#ventanasForm\\.fechaFin').val (bean.fechaFin);
//			if (bean.porcentajeRtve != null && bean.porcentajeRtve == 0)
//				jQuery('#ventanasForm\\.porcentajeRtve').val ("");
//			else
//				jQuery('#ventanasForm\\.porcentajeRtve').val (bean.porcentajeRtve);
			jQuery('#ventanasForm\\.beneficiariosString').val ('');
			jQuery('#ventanasForm\\.idVentanaHidden').val (idVentana);
			cargarFormularioVentanaComercializacion(bean);
		}
	});
}

function cargarFormularioVentanaComercializacion(bean){
	var validatorVentanas = validarFormulario("derechoComercForm","form_crearVentanaComercializacion");
	
	var dialogVentana = jQuery("#form_crearVentanaComercializacion").dialog({
		height : 450,
		width : 630	,
		title : "Ventana de Comercialización",
		open: function( event, ui ) {
			if (bean.idVentana != ""){
			    jQuery('#accionAltaModificacionVentanas').val("update");
			    obtenerBeneficiariosVentanas(jQuery("#codigoContrato").val(), bean.idVentana, "MODIF");
			}else{
			    jQuery('#accionAltaModificacionVentanas').val("add");
			    obtenerBeneficiariosVentanas(jQuery("#codigoContrato").val(), "", "ALTA");
			}
		},
		buttons : {
			"Guardar" : function() {
				cargarBeneficiarios_Guardar();
				jQuery("#action").val ("addModifyVentanasComercializacion");
				jQuery("#derechoComercForm").submit();
			},
			"Cancelar" : function() {
				limpiarCamposVentana();
				validatorVentanas.resetForm();
				dialogVentana.dialog("close");
			}
		},
		close:function (){
		    limpiarCamposVentana();
		}
	});

	dialogVentana.parent().appendTo(jQuery("form:first"));
	
}

function cargarBeneficiarios_Guardar(){
	var beneficiariosString = "";
	jQuery("[name='idPorcentajeSAP']").each(
			function(i, item){
				if (item.value.match(/,$/) == null){
					if (jQuery.trim(jQuery ("#porcentaje_" + item.value.split(",")[0]).val()) != "")
						beneficiariosString+=item.value + "|";
						//beneficiariosString+=jQuery(item).val() + "," + jQuery.trim(jQuery ("#porcentaje_" + item.value).val()) + "|";
				}
			});
	if (beneficiariosString != "")
		beneficiariosString = beneficiariosString.substring(0, beneficiariosString.length - 1); 
	
	jQuery("#ventanasForm\\.beneficiariosString").val(beneficiariosString);
}

function borrarVentanaComercializacion(arrayParametros){
	var idDerecho = jQuery("#idDerecho").val();
	jQuery.ajax({
		url: "eliminarVentanaComercializacion.htm",
		dataType: "json",
		data:{
			idVentana: arrayParametros[0],
			idDerechoComercial: arrayParametros[1]
		},
		success: function(json){
			obtenerTablaVentanasComercializacion(idDerecho);
		}
	});
}

function limpiarCamposVentana(){
	var allInputs = jQuery("#form_crearVentanaComercializacion input");
	allInputs.val("");
	jQuery("#beneficiarios > .campo_gigante").remove();
}

function cambiaEstadoCantidad(){
	var beneficiario = jQuery('#descProveedorSAP').val();
	if (beneficiario == undefined || beneficiario == "")
		jQuery ("#cantidadFlatFee").attr ("readonly", true).addClass ("disabled");
	else
		jQuery ("#cantidadFlatFee").attr ("readonly", false).removeClass ("disabled");
}