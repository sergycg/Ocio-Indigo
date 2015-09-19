var elementosComunes = ['plantillas', 'mensajes', 'mensaje', 'caracteristicasPlantilla'];
var arrayTiposDerechos = ['', 'DCP', '', 'TRN', 'DIS', 'PRI', 'INT'];

var elementosDCP = ['grupoCadenas', 'sistemasModos', 'botonSistemasModosDCP'];
var elementosDIS = ['botonModos','botonCanalesVenta','botonSoportes'];
var elementosTRN = ['botonProductos',''];
var elementosPRI_EI = [];
var elementosPRI_EC = [];
var validator = null;

jQuery(document).ready(function() {
	
	validator = validarFormulario("plantillaForm");
	
	jQuery("#seleccionNuevoTipo").hide();
	
	ocultarFormularios();
	
	if (jQuery("#idPlantilla").val() != undefined && jQuery("#idPlantilla").val() != ""){
		jQuery("#seleccion").fadeIn ("slow");
		jQuery ("#plantillas_definidas").fadeIn ("slow");
		cargarTablaPlantillaDerechos();
	}else{
		jQuery ("#seleccion").hide();
		jQuery ("#plantillas_definidas").hide();
	}
    
	/**
	 * BOTON: Nuevo tipo de derecho de plantilla
	 */
	jQuery('#seleccionNuevoTipo').click( function(event) {
		event.preventDefault();
		nuevoTipo();
	});
	
	jQuery('#cancel').click( function(event) {
		jQuery('#plantillaForm').submit();
	});

	jQuery(document).on("dialogclose", ".ui-dialog", function(event, ui) {
		if (jQuery("#idPlantilla").val() != undefined && jQuery("#idPlantilla").val() != "")
			cargarTablaPlantillaDerechos();
	});
});

function valida(){
	if( jQuery("#idPlantillaDerecho").val() != "" &&
			jQuery('#codigoTipoDerecho').val() == 1 &&
			jQuery('#codigoAmbitoDerecho').val() == "EI" &&
			!jQuery("#descripcionGrupoCadenas").valid()){
				showError( "Introduzca primero el grupo de cadenas");
				jQuery("#descripcionGrupoCadenas").focus();
				return false;
	}
	return true;
}

function ocultarFormularios(){
	jQuery.each(elementosComunes, function(i, val){jQuery ("[id^='" + val + "']").hide();});
	jQuery.each(elementosDCP, function(i, val){jQuery ("[id^='" + val + "']").hide();});
	jQuery.each(elementosDIS, function(i, val){jQuery ("[id^='" + val + "']").hide();});
	jQuery.each(elementosTRN, function(i, val){jQuery ("[id^='" + val + "']").hide();});
	jQuery.each(elementosPRI_EI, function(i, val){jQuery ("[id^='" + val + "']").hide();});
	jQuery.each(elementosPRI_EC, function(i, val){jQuery ("[id^='" + val + "']").hide();});
	jQuery('#codigoGrupoCadenas').val('');
	jQuery('#descripcionGrupoCadenas').val('');
	jQuery("#idPlantillaDerecho").val('');
}

/**
 * Muestra/Oculta los módulos del formulario en función 
 * del código y ámbito del derecho de plantilla
 * @param codigoTipoDerecho
 * @param codigoAmbitoDerecho
 */
function initForm (codigoTipoDerecho, codigoAmbitoDerecho){
	
	validator.resetForm();
	
	jQuery ("#" + elementosComunes[0] + arrayTiposDerechos[codigoTipoDerecho]).fadeIn ("slow");
	jQuery ("#" + elementosComunes[1] + arrayTiposDerechos[codigoTipoDerecho]).fadeIn ("slow");
	jQuery ("#" + elementosComunes[2] + arrayTiposDerechos[codigoTipoDerecho] + "_" + codigoAmbitoDerecho).fadeIn ("slow");
	jQuery ("#" + elementosComunes[3]).fadeIn ("slow");
	
	jQuery ("#plantillas_definidas").fadeIn ();
	jQuery ("#seleccion").hide ();
	
	// Tipos de derecho
	// 1 --> DCP
	// 3 --> TRN
	// 4 --> DIS
	// 5 --> PRI
	
	// Dependiendo del ámbito y tipo de derecho muestro un formulario distinto
	if (codigoTipoDerecho == 1){
		// Derecho DCP
		if (codigoAmbitoDerecho == "EI"){
			jQuery ("#" + elementosDCP[0] + arrayTiposDerechos[codigoTipoDerecho] + "_EI").show();
			jQuery ("#" + elementosDCP[1] + arrayTiposDerechos[codigoTipoDerecho] + "_EI").show();
			jQuery ("#" + elementosDCP[1] + arrayTiposDerechos[codigoTipoDerecho] + "_EC").hide();
						
		}else{
			jQuery ("#" + elementosDCP[0] + arrayTiposDerechos[codigoTipoDerecho] + "_EI").hide();
			jQuery ("#" + elementosDCP[1] + arrayTiposDerechos[codigoTipoDerecho] + "_EC").show();
			jQuery ("#" + elementosDCP[0] + arrayTiposDerechos[codigoTipoDerecho] + "_EC").show();
		}
		jQuery ("#" + elementosDCP[2] + arrayTiposDerechos[codigoTipoDerecho]).show();

		initButtonAddSistemaModo();
		initButtonAddGrupoCadenas();
		jQuery ("#listadoCaracteristicaSistemasTrans").html ('');
		jQuery ("#codigoGrupoCadenas").html ('');
		jQuery ("#descripcionGrupoCadenas").html ('');
		
	}else if (codigoTipoDerecho == 3){
		// Derecho TRN
		jQuery ("#" + elementosComunes[3] + arrayTiposDerechos[codigoTipoDerecho]).show();
		jQuery ("#" + elementosTRN[0] + arrayTiposDerechos[codigoTipoDerecho]).show();
		
		initButtonAddProductos();
		
		jQuery ("#listadoProductosDerecho").html ('');
	}else if (codigoTipoDerecho == 4){
		// Derecho DIS
		jQuery ("#" + elementosComunes[3] + arrayTiposDerechos[codigoTipoDerecho]).show();
		jQuery ("#" + elementosDIS[0] + arrayTiposDerechos[codigoTipoDerecho]).show();
		jQuery ("#" + elementosDIS[1] + arrayTiposDerechos[codigoTipoDerecho]).show();
		jQuery ("#" + elementosDIS[2] + arrayTiposDerechos[codigoTipoDerecho]).show();
	
		initButtonAddModosDistribucion();
		initButtonAddCanalesDeVenta();
		initButtonAddSoportes();
		jQuery ("#listadoModosDeDistribucionDerecho").html ('');
		jQuery ("#listadoCanalesDeVentaDerecho").html ('');
		jQuery ("#listadoSoportesDerecho").html ('');

	}else if (codigoTipoDerecho == 5){
		// Derecho PRI
		jQuery ("#plantillasPRI").show ();
	}else if (codigoTipoDerecho == 6){
		// Derecho INT, sólo EI
		jQuery ("#" + elementosDCP[0] + arrayTiposDerechos[codigoTipoDerecho] + "_EI").hide();
		jQuery ("#" + elementosDCP[1] + arrayTiposDerechos[1] + "_EI").show();
		jQuery ("#" + elementosDCP[1] + arrayTiposDerechos[1] + "_EC").hide();
		jQuery ("#" + elementosDCP[2] + arrayTiposDerechos[codigoTipoDerecho]).show();

		initButtonAddSistemaModo();
		initButtonAddGrupoCadenas();
		jQuery ("#listadoCaracteristicaSistemasTrans").html ('');
		jQuery ("#codigoGrupoCadenas").html ('');
		jQuery ("#descripcionGrupoCadenas").html ('');
		
	}
	
	initButtonAddTerritorio();
	initButtonAddIdioma();
	jQuery ("#listadoCaracteristicaTerritorios").html ('');
	jQuery ("#listadoCaracteristicaIdiomas").html ('');
}

function nuevoTipo(){
	ocultarFormularios();
	resetForm();
    jQuery("#seleccionNuevoTipo").hide ();
    jQuery ("#seleccion").show ();
	cargarTablaPlantillaDerechos();	
}