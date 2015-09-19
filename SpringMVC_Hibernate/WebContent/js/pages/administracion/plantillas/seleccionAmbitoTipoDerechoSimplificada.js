jQuery(document).ready(function(){
	resetForm();

	generaAutocomplete(jQuery('#codigoAmbitoDerecho'),
					  jQuery('#descripcionAmbitoDerecho'),
					  "autocompleteAmbitosDerechos.htm", 
					  "resetTipoDerecho();", 
					  "");
	
	generaAutocomplete(jQuery('#codigoTipoDerecho'),
					   jQuery('#descripcionTipoDerecho'),
					   "autocompleteTiposDerechos.htm", 
					   "", 
					   jQuery('#codigoAmbitoDerecho'));
	
	jQuery('#aceptar_tipoAmbito').click( function(event) {
		event.preventDefault();
		ocultarFormularios();
		var codigoTipoDerecho = jQuery('#codigoTipoDerecho').val();
        var codigoAmbitoDerecho = jQuery('#codigoAmbitoDerecho').val();
        
        if (codigoTipoDerecho == "" || codigoAmbitoDerecho == "")
        	showInfo ("Seleccione Ámbito y Tipo de Derecho", "");
        else{
        	initForm (codigoTipoDerecho, codigoAmbitoDerecho);
        }
		jQuery("#seleccionNuevoTipo").show ();
	});
	jQuery('#cancelar_tipoAmbito').click( function(event) {
        resetForm();
        ocultarFormularios();
        jQuery ("#seleccion").hide ();
        jQuery("#seleccionNuevoTipo").hide ();
	});
	

});

function resetTipoDerecho(){
	jQuery('#codigoTipoDerecho').val("");
	jQuery('#descripcionTipoDerecho').val("");
}

function resetForm(){
	jQuery('#codigoTipoDerecho').val("");
	jQuery('#descripcionTipoDerecho').val("");
	jQuery('#codigoAmbitoDerecho').val("");
	jQuery('#descripcionAmbitoDerecho').val("");
}