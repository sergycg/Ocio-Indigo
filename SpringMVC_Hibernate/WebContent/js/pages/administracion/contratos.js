var resp = true;
function noBorrarRef (){resp = false;}
function continuar (tipoRelacion){
	jQuery ("#adenda").val(tipoRelacion);
	jQuery ("#editContrato").attr ("action", "saveContrato.htm");
	jQuery ("#editContrato").submit();
}

jQuery(document).ready(function(){

	var validator = validarFormulario("editContrato");
	
	jQuery("#referenciaRegistroPadre").attr('readonly', true).addClass ('disabled');
	if (jQuery ("#numeroContratoPadre").val () != "")
		jQuery ("#tipoRelacion").val (jQuery ("#adenda").val());
	else
		jQuery ("#tipoRelacion").val ("");

	jQuery("#tipoRelacion").change(function(){
		if (this.value == "0" || this.value == "1"){
			jQuery ("#asistenteContratos").css ("display", "inline");
		}else{
			jQuery ("#asistenteContratos").css ("display", "none");
		}
	});
	
	//Inicialización del campo fecha
	jQuery( "#fechaContrato" ).datepicker({
		dateFormat: "dd/mm/yy",
		beforeShow:function(input) {
			jQuery('#ui-datepicker-div').css({
		            "z-index": 20
		    });
	    }
	});

	var currentYear = (new Date).getFullYear();
	jQuery ("#periodo").text("(2007-" + currentYear + ")");
	jQuery ("#ejercicio").rules( "add", {
		minlength: 4,
		min: 2007,
		max: currentYear
	});
	
	jQuery ("#save").click (function(e){
		e.preventDefault();
		if (checkRegistros()){
			var tipoRelacion = jQuery ("#tipoRelacion").val();
			
			var registroPadre = jQuery ("#referenciaRegistroPadre").val();

			if (tipoRelacion == "" && registroPadre != ""){
				showModal("Se borrará la referencia al contrato padre. ¿ Está seguro de continuar ? ",
						continuar, tipoRelacion, noBorrarRef, "");
			}else if (tipoRelacion != "" && registroPadre == ""){
				showInfo("Seleccione antes el contrato padre", "Seleccione contrato padre");
				jQuery("#adenda").val ("");
			}else{
				continuar(tipoRelacion);
			}
		}
	});

	// Inicializaciones
	// Inicializacion del acordeon de partes del derecho
	initAccordion([2]);
	initButtonNuevoTitular();
	initButtonNuevoPrograma();
	
});

function checkRegistros(){
	var ejercicio = jQuery ("#ejercicio").val();
	var numReg = jQuery ("#numeroRegistro").val();
	var numRegHist = jQuery("#numeroRegistroHistorico").val();
	
	if ((ejercicio == undefined || ejercicio == "") &&
		(numReg == undefined || numReg == "") &&
		(numRegHist == undefined || numRegHist == "")){
		showError ("Indique registro DOGMA o registro histórico");
		return false;
	}

	if ((ejercicio != undefined && ejercicio != "" && (numReg == undefined || numReg == ""))){
		showError ("Indique número de registro");
		return false;
	}
	
	if ((ejercicio == undefined || ejercicio == "") && numReg != undefined && numReg != ""){
		showError ("Indique ejercicio");
		return false;
	}

	return true;
}

function initButtonNuevoTitular(){
	jQuery('#nuevoTitular').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion 
		event.preventDefault();
		cargarFormularioAltaModificacionTitular("", jQuery("#idContrato").val());
	});
	obtenerTablaTitulares(jQuery("#idContrato").val());
}
function initButtonNuevoPrograma(){
	jQuery('#nuevoPrograma').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion 
		event.preventDefault();
		cargarFormularioPrograma(jQuery("#idContrato").val());
	});
	obtenerTablaProgramasContrato(jQuery("#idContrato").val());
}
