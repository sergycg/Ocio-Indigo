function validarFormularioPase(){
	var aDevolver = true;
	var idTipoPase = jQuery("#idTipoPaseForm").val();
	var mensajes = "";
	var expresionCantidad = /^[0-9]$/;
	var cantidad = jQuery("#cantidadPase").val();
	if ((cantidad != null) && (cantidad != "")){
		if (expresionCantidad.test(cantidad)){
			if (parseInt(cantidad) < parseInt('1')){
				 mensajes += "<br />* La cantidad de pases debe ser mayor que 0";
				 jQuery("#cantidadPase").addClass("error");
				 jQuery("#cantidadPase").css('border-color', 'red');
				 aDevolver =  false;
			}
			
		}
	}
	if ((idTipoPase == PASE_ADICIONAL) || (idTipoPase == PASE_OPCIONAL)){
		
		var expresionImporte = /^\d+(\,\d{0,2}){0,1}$/;
		var importe = jQuery("#importeForm").val();
		if ((importe != null) && (importe != "")){
			if (expresionImporte.test(importe)){
				 if (parseFloat(importe.replace(",", ".")) > parseFloat('0.0')){
					 var idDivisa = jQuery("#idDivisaForm").val();
					 if (idDivisa == NO_SELECCIONADO){
						 mensajes += "<br />* Si el importe es mayor que 0 debe seleccionar una divisa";
						 jQuery("#idDivisaForm").addClass("error");
						 jQuery("#idDivisaForm").css('border-color', 'red');
						 aDevolver =  false;
					 }
				 }
			 }
			 else{
				 mensajes += "<br />* El formato del importe es incorrecto. El formato debe ser XXXXX,XX";
				 jQuery("#importeForm").addClass("error");
				 jQuery("#importeForm").css('border-color', 'red');
				 aDevolver =  false;
			 }
		}
	}
	
	mostrarErrores("#form_crearPase", mensajes);
	 return aDevolver;
}

function limpiarOpcionesCombosPase(){
	jQuery('option', jQuery("#idTipoPaseForm")).remove();
	jQuery('option', jQuery("#idClasificacionAudioVisualForm")).remove();
	jQuery('option', jQuery("#idEspacioPlanificadoForm")).remove();
	jQuery('option', jQuery("#idPrimeraCadenaMulticanalEmisionForm")).remove();
	jQuery('option', jQuery("#idCadenaPrevistaEmisionForm")).remove();
	jQuery('option', jQuery("#idCanalForm")).remove();
	jQuery('option', jQuery("#idAmbitoTerritorialForm")).remove();
	jQuery('option', jQuery("#idSistemaTransmisionForm")).remove();
	jQuery('option', jQuery("#idIdiomaForm")).remove();
	jQuery('option', jQuery("#idDivisaForm")).remove();
}

function deshabilitarCamposFormularioPase(){
	jQuery("#cantidadPase").attr('disabled','disabled');
	jQuery("#idTipoPaseForm").attr('disabled','disabled');
	jQuery("#idClasificacionAudioVisualForm").attr('disabled','disabled');
	jQuery("#idEspacioPlanificadoForm").attr('disabled','disabled');
	jQuery("#idPrimeraCadenaMulticanalEmisionForm").attr('disabled','disabled');
	jQuery("#idCanalForm").attr('disabled','disabled');
	jQuery("#idCadenaPrevistaEmisionForm").attr('disabled','disabled');
	jQuery("#idDivisaForm").attr('disabled','disabled');
	
	jQuery("#isMultidifusionForm").prop('disabled', true);
	jQuery("#isSimultaneoForm").prop('disabled', true);
	jQuery("#isComercializableForm").prop('disabled', true);
	jQuery("#isMulticanalForm").prop('disabled', true);
	
	jQuery("#importeForm").attr('disabled','disabled');
	jQuery("#observacionesForm").attr('disabled','disabled');
}

function cargarCombosPase(){
	
	generaAutocomplete(jQuery('#idTipoPase'),jQuery('#descripcionTipoPase'),"autocompleteTiposPase.htm","","");
	
//	var tipoPase = jQuery("#idTipoPaseHid").val();
//	if ((tipoPase != null) && (tipoPase != "")){
//		jQuery("#idTipoPaseForm option[value='"+ tipoPase + "']").attr("selected","selected");
//		if (PASE_NORMAL == tipoPase){
//			jQuery("#valorPrecio").hide();
//		}
//	}
//	else{
//		jQuery("#idTipoPaseForm option[value='"+ PASE_NORMAL + "']").attr("selected","selected");
//		jQuery("#valorPrecio").hide(); // Como el valor por defecto del tipo de pase es N la divisa no se muestra
//	}
//	
//	var clasificacionAudiovisual = jQuery("#idClasificacionAudioVisualHid").val();
//	if ((clasificacionAudiovisual != null) && (clasificacionAudiovisual != "")){
//		jQuery("#idClasificacionAudioVisualForm option[value='"+ clasificacionAudiovisual + "']").attr("selected","selected");
//	}
//	
//	var espacioPlanificado = jQuery("#idEspacioPlanificadoHid").val();
//	if ((espacioPlanificado != null) && (espacioPlanificado != "")){
//		jQuery("#idEspacioPlanificadoForm option[value='"+ espacioPlanificado + "']").attr("selected","selected");
//	}
//	
//	var primeraCadenaEmision = jQuery("#idPrimeraCadenaMulticanalEmisionHid").val();
//	if ((primeraCadenaEmision != null) && (primeraCadenaEmision != "")){
//		jQuery("#idPrimeraCadenaMulticanalEmisionForm option[value='"+ primeraCadenaEmision + "']").attr("selected","selected");
//	}
//	
//	var canal = jQuery("#idCanalHid").val();
//	if ((canal != null) && (canal != "")){
//		jQuery("#idCanalForm option[value='"+ canal + "']").attr("selected","selected");
//	}
//	
//	var idCadenaPrevistaEmision = jQuery("#idCadenaPrevistaEmisionHid").val();
//	if ((idCadenaPrevistaEmision != null) && (idCadenaPrevistaEmision != "")){
//		jQuery("#idCadenaPrevistaEmisionForm option[value='"+ idCadenaPrevistaEmision + "']").attr("selected","selected");
//	}
//	
//	var divisa = jQuery("#idDivisaHid").val();
//	if ((divisa != null) && (divisa != "")){
//		jQuery("#idDivisaForm option[value='"+ divisa + "']").attr("selected","selected");
//	}
//	
//	var ambito = jQuery("#idAmbitoTerrtorialHid").val();
//	if ((ambito != null) && (ambito != "")){
//		jQuery("#idAmbitoTerritorialForm option[value='"+ ambito + "']").attr("selected","selected");
//	}
//	
//	var sistTransmision = jQuery("#idSistemaTransmisionHid").val();
//	if ((sistTransmision != null) && (sistTransmision != "")){
//		jQuery("#idSistemaTransmisionForm option[value='"+ sistTransmision + "']").attr("selected","selected");
//	}
//	
//	var idioma = jQuery("#idIdiomaHid").val();
//	if ((idioma != null) && (idioma != "")){
//		jQuery("#idIdiomaForm option[value='"+ idioma + "']").attr("selected","selected");
//	}
	
}

function mostrarImporte(){
	var tipoPase = jQuery("#idTipoPaseForm").find(':selected').val();
	if ((tipoPase == PASE_ADICIONAL) || (tipoPase == PASE_OPCIONAL)){
		jQuery("#valorPrecio").show();
	}
	else{
		jQuery("#valorPrecio").hide();
	}
}

function habilitarDeshabilitarMultidifusion(){
	var checkedMulticanal = jQuery("#isMulticanalForm").is(":checked");;
	if (checkedMulticanal){
		// Marcamos multidifusion y lo deshabilitamos
		jQuery("#isMultidifusionForm").attr("checked","checked");
		jQuery("#isMultidifusionHid").val(ACTIVO);;
		jQuery("#isMulticanalHid").val(ACTIVO);;
		jQuery("#isMultidifusionForm").prop('disabled', true);
		// Habilitamos la primera cadena de emision
		jQuery("#idPrimeraCadenaMulticanalEmisionForm").removeAttr('disabled');
	}
	else{
		// DesMarcamos multidifusion y Habilitamos la multidifusion
		jQuery("#isMultidifusionForm").removeAttr("checked");
		jQuery("#isMultidifusionHid").val(INACTIVO);
		jQuery("#isMulticanalHid").val(INACTIVO);
		jQuery("#isMultidifusionForm").prop('disabled', false);
		// Deshabilitamos la primera cadena de emision
		jQuery("#idPrimeraCadenaMulticanalEmisionForm").attr('disabled','disabled');
	}
}

/**
 * Funcion que carga el valor del check de multidifusion y la habilitación o no de la primera cadena
 * de emision en funcion del check de multicanal recuperado de BB.DD.
 */
function habilitarDeshabilitarMultidifusionLoad(){
	var checkedMulticanal = jQuery("#isMulticanalForm").is(":checked");;
	if (checkedMulticanal){
		// Marcamos multidifusion y lo deshabilitamos
		jQuery("#isMultidifusionForm").attr("checked","checked");
		jQuery("#isMultidifusionHid").val(ACTIVO);;
		jQuery("#isMulticanalHid").val(ACTIVO);;
		jQuery("#isMultidifusionForm").prop('disabled', true);
		// Habilitamos la primera cadena de emision
		jQuery("#idPrimeraCadenaMulticanalEmisionForm").removeAttr('disabled');
	}
}