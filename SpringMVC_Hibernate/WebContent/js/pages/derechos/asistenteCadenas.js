jQuery(document).ready(function(){
	jQuery('#asistenteCadenas').click(function(event) {
		cargarCadenas();
		jQuery("#form_asistenteCadenas #asistente_grupoCadenas").children().remove();
		
		jQuery("#form_asistenteCadenas").dialog({
			height : 550,
			width : 600,
			title : "Asistente de selección de grupo de cadenas",
			buttons : {
				"Guardar" : function() {
					if (jQuery("#form_asistenteCadenas #asistente_grupoCadenas option:selected").size() != 1){
						showWarning("Debe elegir un grupo de cadenas");
					}else{
						jQuery('#codigoGrupoCadenas').val(jQuery("#form_asistenteCadenas #asistente_grupoCadenas option:selected").val());
						jQuery('#descripcionGrupoCadenas').val(jQuery("#form_asistenteCadenas #asistente_grupoCadenas option:selected").html());
						getCadenasByAgrupacion();
						jQuery(this).dialog("close");
					}
					
				},
				"Cancelar" : function() {
					jQuery(this).dialog("close");
				}
			},
			close:function (){
				jQuery("#asistente_cadenas").children().remove();
				jQuery("#form_asistenteCadenas #asistente_grupoCadenas").children().remove();			    
			}
		});
	});
	jQuery("#form_asistenteCadenas", window.parent.document).scrollTop(0);
});

function cargarCadenas(){
	
	jQuery.ajax({
		url: "autocompleteCadena.htm",
		type: "GET",
		global : false,
		data: {
			params: jQuery('#codAreaProduccion_hidden').val()
		},
		dataType: "json",
		success: function(data) {
			jQuery("#asistente_cadenas").children().remove();
			jQuery.each(data, function () {
			    jQuery("#asistente_cadenas")
	            	.append(jQuery("<option>")
	            			.val(this.value)
	            			.html(this.text));
	        });
			if (jQuery("#asistente_cadenas option").length == 0 ||
				jQuery("#asistente_cadenas option").length == 1)
				jQuery("#asistente_cadenas").attr("size",2);
			else
				jQuery("#asistente_cadenas").attr("size",jQuery("#asistente_cadenas option").length);

	}});
	jQuery("#asistente_cadenas").bind( "change", cargarGrupoCadena);
		
}


function cargarGrupoCadena(){
	
	var cadenas = [""];
	jQuery("#asistente_cadenas option:selected").each(
			function(i, item){
				cadenas[i]=jQuery(item).val();		
			});
	
	jQuery.ajax({
		url: "getAgrupacionByCadenas.htm",
		type: "GET",
		global : false,
		data: {cadenas: cadenas,
			   codAreaProduccion: jQuery('#codAreaProduccion_hidden').val()
			   },
		dataType: "json",
		success: function(data) {
			jQuery("#form_asistenteCadenas #asistente_grupoCadenas").children().remove();
			jQuery.each(data, function () {
			    jQuery("#form_asistenteCadenas #asistente_grupoCadenas")
	            	.append(jQuery("<option>")
	            			.val(this.value)
	            			.html(this.text));
	        });
			if (jQuery("#form_asistenteCadenas #asistente_grupoCadenas option").length == 0 ||
				jQuery("#form_asistenteCadenas #asistente_grupoCadenas option").length == 1)
				jQuery("#form_asistenteCadenas #asistente_grupoCadenas").attr("size",2);
			else
				jQuery("#form_asistenteCadenas #asistente_grupoCadenas").
					attr("size",jQuery("#form_asistenteCadenas #asistente_grupoCadenas option").length);

	}});
}

