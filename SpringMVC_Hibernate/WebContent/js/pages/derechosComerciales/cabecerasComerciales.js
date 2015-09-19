jQuery(document).ready(function(){
	initButtonNuevaCabecera();
	initButtonVolver();

	// Inicialización de la cabecera de datos del programa/capitulo
	var entrada = {
			idAdquisicion : jQuery("#idAdquisicion").val(),
			codigoAudio : jQuery("#codigoAudio_hidden").val(),
			contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
			formulario : jQuery("#cabeceraComercialForm")
	};
	completeDetallePrograma(entrada);

	// Datos de las cabeceras comerciales
	cargarTablaCabeceras(jQuery("#idAdquisicion").val(), jQuery("#codigoAudio_hidden").val(), jQuery("#cabeceraComercialForm"), false);
});

function initButtonNuevaCabecera(){
	jQuery('#nuevaCabecera').click(function(event) {
	    jQuery("#action").val("add");
	    jQuery("#cabeceraComercialForm").submit();
	});
}
function initButtonVolver(){
	jQuery('#cancel').click(function(event) {
		jQuery("#cabeceraComercialForm").attr ("action", "initFind.htm");	
	});
}
