function initButtonAddGrupoCadenas(){
	
	//Si hay idPlantillaDerecho, se obtiene su grupo de cadenas
	if (jQuery('#idPlantillaDerecho').val() != ''){
		jQuery.ajax({
			url: getPrefijoUrl()+"getGrupoCadenas.htm",
			type: "GET",
			data:{
					idPlantillaDerecho: jQuery("#idPlantillaDerecho").val()
				},
			success: function(codigoGrupoCadenas) {
				jQuery("#codigoGrupoCadenas").val(codigoGrupoCadenas);
				autocompleteGrupoCadenas();
			}
		});
	}else{
		autocompleteGrupoCadenas();
	}
		
	jQuery('#confirmar').click(function(event) {
		event.preventDefault();
		jQuery("#confirmar").removeClass('border_error');
		
		if (jQuery('#codigoGrupoCadenas').val() == '')
			showError("Debe seleccionar un grupo de cadenas", '');
		
		jQuery.ajax({
			url: getPrefijoUrl()+"guardarGrupoCadenas.htm",
			type: "GET",
			data:{
					grupoCadenas: jQuery("#codigoGrupoCadenas").val(), 
					idPlantilla: jQuery("#idPlantilla").val(),
					idPlantillaDerecho: jQuery("#idPlantillaDerecho").val(),
					codigoTipoDerecho: jQuery ("#codigoTipoDerecho").val(),
					codigoAmbitoDerecho: jQuery("#codigoAmbitoDerecho").val()
				},
			dataType: "json",
			success: function(id) {
				jQuery("#idPlantillaDerecho").val(id);
				cargarTablaPlantillaDerechos(jQuery("#idPlantilla").val());
			}
		});
	});
	

	jQuery('#codigoGrupoCadenas').change(function(){
		jQuery("#confirmar").addClass('border_error');
	});
}

function autocompleteGrupoCadenas(){
	generaAutocomplete(
		   jQuery('#codigoGrupoCadenas'),
		   jQuery('#descripcionGrupoCadenas'),
		   "autocompleteAgrupacionCadenas.htm", 
		   "",
		   jQuery('#codAreaProduccion_hidden'));
}