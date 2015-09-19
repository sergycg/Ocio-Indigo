jQuery(document).ready(function(){
	
	var validator = validarFormulario("cabeceraComercialForm");
		
	//Inicialización del campo fecha
	datepicker("#fechaInicioVigencia", "#fechaFinVigencia");

	/**
	 * Si se realiza un cambio en la pantalla general del derecho, se obliga a guardar los
	 * cambios antes de crear/modificar/borrar elementos del derecho
	 */
	comprobarCambiosGenerales("datosGeneralesCabeceraComercial", "cabeceraComercialForm");
	
	jQuery('#cancel').click(function(event) {
		jQuery ("#cabeceraComercialForm").attr ("action", "findCabecerasComerciales.htm");
		jQuery ("#cabeceraComercialForm").submit();
	});
	
	// Inicializacion del acordeon
	initAccordion([0]);
	
	// Inicialización de la cabecera de datos del programa/capitulo
	var entrada = {
			idAdquisicion : jQuery("#idAdquisicion").val(),
			codigoAudio : jQuery("#codigoAudio_hidden").val(),
			contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
			formulario : jQuery("#cabeceraComercialForm")
	};
	completeDetallePrograma(entrada);
	
	/* Se fija la cabecera y el menú de la aplicación */
	fijarCabecera();

	// Si cambio la descripción y la dejo vacía, el id será vacío
	jQuery('#descripcionComercializador').change(function(){
		if (jQuery.trim(this.value) == '' || this.value == null || this.value == "undefined")
			jQuery('#comercializadoresForm\\.idTipoComercializador').val ('');
	});
	
	jQuery('#delete').click(function(event) {
		event.preventDefault();
		showModal("¿ Está seguro que quiere eliminar la cabecera comercial ?", borrarCabecera, "");
	});

	//Inicialización del campo fecha
	datepicker("#fechaInicio", "#fechaFin");

	initButtonNuevoComercializador();
//	initButtonNuevoTitular();
	initButtonNuevaVentana();
	initButtonAddIdioma();
	initButtonAddTerritorio();
	
//	jQuery('#porcentajeTitularidad').attr ("readonly", true).addClass('disabled');
});

function borrarCabecera (idCabecera){
	jQuery("#action").val("delete");
	jQuery("#cabeceraComercialForm").submit();
}

function initButtonNuevoTitular(){
	jQuery('#nuevoTitular').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion 
		event.preventDefault();
		cargarFormularioAltaModificacionTitular("", jQuery("#idCabeceraComercial").val());
	});
	obtenerTablaTitulares(jQuery("#idCabeceraComercial").val());
}
function initButtonNuevoComercializador(){
	jQuery('#nuevoComercializador').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion 
		event.preventDefault();
		cargarFormularioAltaModificacionComercializador("", jQuery("#idCabeceraComercial").val());
	});
	obtenerTablaComercializadores(jQuery("#idCabeceraComercial").val());
}
function initButtonNuevaVentana(){
	jQuery('#nuevaVentana').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion 
	    event.preventDefault();
		
	    
	    //showWarning('Se han realizado cambios en los datos generales, pulse Guardar');			

	    cargarFormularioAltaModificacionVentana("", jQuery("#idCabeceraComercial").val());
	});
	obtenerTablaVentanas(jQuery("#idCabeceraComercial").val());
}
