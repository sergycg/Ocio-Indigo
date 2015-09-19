function initButtonAddSoportes(){

	obtenerTablaSoportes();
	
	var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
	
	if (tipo_formulario == plantillas){
		jQuery('#botonSoportesDIS').click(function(event) {
			event.preventDefault();
			cargarFormularioSoportes();
		});
	}else{
		jQuery('#addSoportes').click(function(event) {
			event.stopPropagation();	//Impide que se abra el accordion
			event.preventDefault();
			cargarFormularioSoportes();
		});
	}
	
	jQuery("#botonIncluirSoportes").click(function (){
		jQuery("#soportes option:selected").each(
			function(i, soporteDer){
				var incluirSoporte = true;
				// comprobamos que ya no esté incluido
				jQuery("#soportesIncluidos option").each(function(j, soporteIncl){
					if (jQuery(soporteDer).val()==jQuery(soporteIncl).val()){
						incluirSoporte = false;
					}
				});
				if (incluirSoporte){
					jQuery("#soportesIncluidos").append(jQuery("<option></option>").val(jQuery(soporteDer).val()).html(jQuery(soporteDer).html()));
				}
			});
		
	});

	jQuery("#botonQuitarSoportes").click(function (){
		jQuery("#soportesIncluidos option:selected").remove();
	});
	
}

function inicializarSoportes(open){
	jQuery("#soportes").children().remove();
	jQuery("#soportesIncluidos").children().remove();
	
	cargarSoportes();

	jQuery("#soportesIncluidos").children().remove();
	if (open){
		cargarSoportesDelDerecho();
	}
}

function cargarSoportesDelDerecho(){
	
	//derecho comercial, cambia el idDerecho y la ruta
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		jQuery.ajax({
			url: "findSoportesByDerechoComercial.htm",
			type: "GET",
			data: {
				idDerecho : jQuery("#idDerecho").val()
			},
			dataType: "json",
			success: function(data) {
			  jQuery.each(data.aaData, function () {
				    jQuery("#soportesIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idSoporte'])
		            			.html(this['descSoporte']));
		      });
		}});
	}else{
		jQuery.ajax({
			url: getPrefijoUrl()+"findSoportes.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
				jQuery.each(data.aaData, function () {
					jQuery("#soportesIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idSoporte'])
		            			.html(this['descSoporte']));
				});
		}});
	}
	
}

function cargarSoportes(){

	jQuery.ajax({
		url: "findSoportes.htm",
		type: "GET",
		dataType: "json",
		success: function(data) {
			jQuery("#soportes").children().remove();
			jQuery.each(data.aaData, function () {
			    jQuery("#soportes")
	            	.append(jQuery("<option></option>")
	            			.val(this['idSoporte'])
	            			.html(this['descSoporte']));
	        });
	}});
}


function cargarFormularioSoportes(){
	
	jQuery("#form_addSoportes").dialog({
		width : 500,
		title : "Soportes",
		open: function( event, ui ) {
			inicializarSoportes(true);
		},
		buttons : {
			"Guardar" : function() {
				var idSoportesIncluidos = [""];
				
				jQuery("#soportesIncluidos option").each(
						function(i, item){
							idSoportesIncluidos[i]=jQuery(item).val();		
						});
				
				guardarCaracteristicaSoportes(idSoportesIncluidos);
				jQuery(this).dialog("close");
			},
			"Cancelar" : function() {
				jQuery(this).dialog("close");
			}
		},
		close:function (){
		    
		}
	});
	jQuery("#form_addSoportes", window.parent.document).scrollTop(0);
}


function guardarCaracteristicaSoportes(idSoportesIncluidos){
	
	//Derecho Comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		jQuery.ajax({
			url: "guardarSoportesDerechoComercial.htm",
			type: "GET",
			data: {	idSoportesIncluidos: idSoportesIncluidos, 
					idDerecho:jQuery("#idDerecho").val()},
			dataType: "json",
			success: function(idDerecho) {
				if (idDerecho!="")
					jQuery("#idDerecho").val(idDerecho);			
				obtenerTablaSoportes();
			}
		});
	}else{
		var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
		if (tipo_formulario == plantillas){
			param = {
					idSoportesIncluidos : idSoportesIncluidos, 
					idPlantilla: jQuery("#idPlantilla").val(),
					idPlantillaDerecho: jQuery("#idPlantillaDerecho").val(),
					codigoTipoDerecho: jQuery ("#codigoTipoDerecho").val(),
					codigoAmbitoDerecho: jQuery("#codigoAmbitoDerecho").val()
			};
		}else{
			param = {	
					idSoportesIncluidos : idSoportesIncluidos, 
					idDerecho 			: jQuery("#idDerecho").val(),
					idCaracteristica 	: jQuery("#idCaracteristica").val()
			};
		}

		jQuery.ajax({
			url: getPrefijoUrl()+"guardarSoportes.htm",
			type: "GET",
			data: param,
			dataType: "json",
			success: function(id) {
				var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
				if (tipo_formulario == plantillas)
					jQuery("#idPlantillaDerecho").val(id);
				else
					jQuery("#idCaracteristica").val(id);
	
				obtenerTablaSoportes();
			}
		});
	}
}

function obtenerTablaSoportes() {
	
	//derecho comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
	    jQuery.ajax({
			dataType : "json",
			url : "findSoportesByDerechoComercial.htm",
			data : {
				idDerecho : jQuery("#idDerecho").val()
			},
			success : function(json) {
				var cadena = "";
				jQuery.each(json.aaData, function (j, soporte) {
					if (j==0){
						cadena = soporte.descSoporte;
					} else {
						cadena += ", " + soporte.descSoporte;
					}
				});
				jQuery("#listadoSoportesDerecho").html(cadena);
			}
	    });
	}else{
		jQuery.ajax({
			url: getPrefijoUrl() + "findSoportes.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
				var cadena = "";
				jQuery.each(data.aaData, function (j, soporte) {
					if (j==0){
						cadena = soporte.descSoporte;
					} else {
						cadena += ", " + soporte.descSoporte;
					}
				});
				jQuery("#listadoSoportesDerecho").html(cadena);
		}});		
	}
}