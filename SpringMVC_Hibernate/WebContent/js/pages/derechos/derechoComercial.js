jQuery(document).ready(function(){

	validarFormulario("derechoComercForm");
	
//	//Inicialización del campo fecha
	datepicker("#fechaInicioVigencia", "#fechaFinVigencia");

	// Inicializacion del acordeon de partes del derecho
	initAccordion([0]);

	/**
	 * Si se realiza un cambio en la pantalla general del derecho, se obliga a guardar los
	 * cambios antes de crear/modificar/borrar elementos del derecho
	 */
	comprobarCambiosGenerales("datosGeneralesDerechoComerc", "derechoComercForm");
	
	// Inicialización de la cabecera de datos del programa/capitulo
	var entrada = {
			codigoEmision : jQuery("#codigoEmision").val(),
			codigoPrograma : jQuery("#codigoPrograma").val(),
			idAdquisicion : jQuery("#idAdquisicion").val(),
			codigoAudio : jQuery("#codigoAudio_hidden").val(),
			contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
			formulario : jQuery("#derechoComercForm")
	};
	completeDetallePrograma(entrada);
	// Inicialización de la cabecera comercial
//	completeCabeceraComercial(jQuery("#idCabeceraComercial").val());
	
	/* Se fija la cabecera y el menú de la aplicación */
	fijarCabecera();
	

	initButtonNuevoComercializador();
	initButtonNuevaVentana();
	initButtonAddIdioma();
	initButtonAddTerritorio();	
	initButtonAddSistemaModo();
	initButtonAddSoportes();
	initButtonAddProductos();
	initButtonAddModosDistribucion();
	initButtonAddCanalesDeVenta();
	
	// Botón borrar:
	// Preguntar por el idDerecho asociado. Si no es nulo, alertar
	initButtonDelete();
	
	if (jQuery("#idDerecho").val() != ""){
		jQuery ("#barraDatosGenerales").html (jQuery ("#barraDatosGenerales").text () + 
											  " / Ref. Derecho: " + jQuery("#idDerecho").val());
	}
	jQuery ("#barraDatosGenerales").html (jQuery ("#barraDatosGenerales").text () +
										  " / Ámbito: " + jQuery ("#descripcionAmbitoDerecho").val() +
										  " / Tipo: " + jQuery ("#descripcionTipoDerecho").val());
	
	if (jQuery('#idDerechoAsociado').val()!=null && jQuery('#idDerechoAsociado').val()!= ""){
		jQuery ("#barraDatosGenerales").html (jQuery ("#barraDatosGenerales").html() + 
				"&nbsp;&nbsp;&nbsp;<span id='resumenDerecho' title='Ver detalle del Derecho Interno asociado'><img src='./img/icon_link.png'></img></span>");
		jQuery ("#resumenDerecho").bind("click", function(event){
			event.stopPropagation();	//Impide que se abra el accordion
			var idDerechoAsociado = jQuery('#idDerechoAsociado').val();
			var idTipoDerecho = jQuery ('#codigoTipoDerecho').val();
			jQuery.ajax({
		       dataType : "json",
		       url : "getDetailDerecho.htm",
		       data : {
		            codigoDerecho : idDerechoAsociado,
		            codigoTipoDerecho : idTipoDerecho
		        },
		        success : function(bean) {
		        	openDialogDerecho(dialogConsulta, bean, idTipoDerecho);
		        }
		    });
		});
	}

	generaAutocomplete(jQuery('#codigoContrato'),
			   jQuery('#descripcionContratoAsociado'),
			   "autocompleteContratosPrograma.htm", 
			   "contratoChange()", 
			   jQuery('#programaCapitulo_hidden'));
	
});

function contratoChange(){
	jQuery("#derechoComercForm button[name!='save'][name!='cancel'][name!='nuevo']")
	.unbind( "click" )
	.click(function(event) {
		event.preventDefault();
		showWarning('Se han realizado cambios en los datos generales, pulse Guardar');			
	});
	
	jQuery('table.table td')
		.unbind( "click" )
		.click(function(event) {
			event.preventDefault();
			showWarning('Se han realizado cambios en los datos generales, pulse Guardar');			
	});
}
function initButtonNuevoComercializador(){
	jQuery('#nuevoComercializador').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion 
		event.preventDefault();
		cargarFormularioAltaModificacionComercializador("", jQuery("#idDerecho").val());
	});
	obtenerTablaComercializadores(jQuery("#idDerecho").val());
}
function initButtonNuevaVentana(){
	jQuery('#nuevaVentana').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion 
	    event.preventDefault();
	    cargarFormularioAltaModificacionVentana("", jQuery("#idDerecho").val());
	});
	obtenerTablaVentanasComercializacion(jQuery("#idDerecho").val());
}
function initButtonDelete(){
	jQuery ("#btnBorrarDerecho").bind ("click", function(event){
		event.preventDefault();
		var mensaje = "";
		if (jQuery("#idDerechoAsociado").val() != null && jQuery("#idDerechoAsociado").val() != "" && 
			jQuery("#idDerechoAsociado").val() != "0"){
			mensaje = 'El Derecho Comercial está asociado a un Derecho Interno.<br/>';
		}
		mensaje += '¿ Está seguro que quiere eliminar el derecho ?';
		showModal (mensaje, borrarDerecho);
	});
}

function borrarDerecho(){
	jQuery ("#action").val ("borrar");
	jQuery ("#derechoComercForm").submit();
}