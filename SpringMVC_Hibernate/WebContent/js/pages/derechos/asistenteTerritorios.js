jQuery(document).ready(function(){
			 
	jQuery('#asistenteTerritorios').click(function(event) {
		cargarTerritorios();
		jQuery("#form_asistenteTerritorios #asistente_grupoCadenas").children().remove();
		
		jQuery("#form_asistenteTerritorios").dialog({
			height : 550,
			width : 600,
			title : "Asistente de selección de grupo de cadenas por territorios",
			buttons : {
				"Guardar" : function() {
					
					if (jQuery("#form_asistenteTerritorios #asistente_grupoCadenas option:selected").size() != 1){
						showWarning("Debe elegir un grupo de cadenas");
					}else{
						jQuery('#codigoGrupoCadenas').val(jQuery("#form_asistenteTerritorios #asistente_grupoCadenas option:selected").val());
						jQuery('#descripcionGrupoCadenas').val(jQuery("#form_asistenteTerritorios #asistente_grupoCadenas option:selected").html());
						getCadenasByAgrupacion();
						jQuery(this).dialog("close");
					}
					
				},
				"Cancelar" : function() {
					
					jQuery(this).dialog("close");
				}
			},
			close:function (){
				jQuery("#asistente_territorios").children().remove();
				jQuery("#form_asistenteTerritorios #asistente_grupoCadenas").children().remove();			    
			}
		});
	});
	jQuery("#form_asistenteTerritorios", window.parent.document).scrollTop(0);
});

function cargarTerritorios(){
	var filtro = {
			continentes: [""],
			paises: [""],
			regiones: [""],
			provincias: [""]
	};
	jQuery.ajax({
		url: "getTerritorios.htm",
		type: "GET",
		global : false,
		data: filtro,
		dataType: "json",
		success: function(data) {
			jQuery("#asistente_territorios").children().remove();
			jQuery.each(data, function () {
			    jQuery("#asistente_territorios")
	            	.append(jQuery("<option></option>")
	            			.val(this['idTerritorio'])
	            			.html(this['descTerritorio']));
	        });
			if (jQuery("#asistente_territorios option").length == 0 ||
				jQuery("#asistente_territorios option").length == 1)
				jQuery("#asistente_territorios").attr("size",2);
			else
				jQuery("#asistente_territorios").attr("size",jQuery("#asistente_territorios option").length);
	}});
	jQuery("#asistente_territorios").bind( "change", cargarGrupoCadenaByTerritorio);
}


function cargarGrupoCadenaByTerritorio(){
	var territorios = [""];
	jQuery("#asistente_territorios option:selected").each(
			function(i, item){
				territorios[i]=jQuery(item).val();		
			});
	
	
	jQuery.ajax({
		url: "getAgrupacionByTerritorios.htm",
		type: "GET",
		global : false,
		data: {territorios: territorios,
			   codAreaProduccion: jQuery('#codAreaProduccion_hidden').val()
			   },
		dataType: "json",
		success: function(data) {
			jQuery("#form_asistenteTerritorios #asistente_grupoCadenas").children().remove();
			jQuery.each(data, function () {
			    jQuery("#form_asistenteTerritorios #asistente_grupoCadenas")
	            	.append(jQuery("<option>")
	            			.val(this.value)
	            			.html(this.text));
	        });
			if (jQuery("#form_asistenteTerritorios #asistente_grupoCadenas option").length == 0 ||
				jQuery("#form_asistenteTerritorios #asistente_grupoCadenas option").length == 1)
				jQuery("#form_asistenteTerritorios #asistente_grupoCadenas").
					attr("size",2);
			else
				jQuery("#form_asistenteTerritorios #asistente_grupoCadenas").
					attr("size",jQuery("#form_asistenteTerritorios #asistente_grupoCadenas option").length);
	}});
}

