function initButtonAddModosDistribucion(){
	
	obtenerTablaModosDistribucion();

	var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
	
	if (tipo_formulario == plantillas){
		jQuery('#botonModosDIS').click(function(event) {
			event.preventDefault();
			cargarFormularioModosDistribucion();
		});
	}else{
		jQuery('#addModosDistribucion').click(function(event) {
			event.stopPropagation();	//Impide que se abra el accordion
			event.preventDefault();
			cargarFormularioModosDistribucion();
		});
	}
	
	jQuery("#botonIncluirModosDistribucion").click(function (){
		jQuery("#modosDistribucion option:selected").each(
				function(i, modoDistribucionDer){
					var incluirModoDistribucion = true;
					// comprobamos que ya no esté incluido
					jQuery("#modosDistribucionIncluidos option").each(function(j, modoDistribucionIncl){
						if (jQuery(modoDistribucionDer).val()==jQuery(modoDistribucionIncl).val()){
							incluirModoDistribucion = false;
						}
					});
					if (incluirModoDistribucion){
						jQuery("#modosDistribucionIncluidos").append(jQuery("<option></option>").val(jQuery(modoDistribucionDer).val()).html(jQuery(modoDistribucionDer).html()));
					}
				});
	});

	jQuery("#botonQuitarModosDistribucion").click(function (){
		jQuery("#modosDistribucionIncluidos option:selected").remove();
	});
	
}

function inicializarModosDistribucion(open){
	jQuery("#modosDistribucion").children().remove();
	jQuery("#modosDistribucionIncluidos").children().remove();
	
	cargarModosDistribucion();

	jQuery("#modosDistribucionIncluidos").children().remove();
	if (open){
		cargarModosDistribucionDelDerecho();
	}
}

function cargarModosDistribucionDelDerecho(){
	var ruta = "";
	
	//derecho comercial, cambia el idDerecho y la ruta
	if (jQuery("#derechoComercForm").val()!= undefined){
		jQuery.ajax({
			url: "findModosDistribucionByDerechoComercial.htm",
			type: "GET",
			data: {idDerecho : jQuery("#idDerecho").val()},
			dataType: "json",
			success: function(data) {
			  jQuery.each(data.aaData, function () {
				    jQuery("#modosDistribucionIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idModoDistribucion'])
		            			.html(this['descModoDistribucion']));
		      });
		}});
	}else{
		jQuery.ajax({
			url: getPrefijoUrl()+"findModosDistribucion.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
				jQuery.each(data.aaData, function () {
					jQuery("#modosDistribucionIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idModoDistribucion'])
		            			.html(this['descModoDistribucion']));
				});
		}});
	}
}

function cargarModosDistribucion(){
	var ruta = "";
	
	ruta = "findModosDistribucion.htm";
	
	jQuery.ajax({
		url: ruta,
		type: "GET",
		dataType: "json",
		success: function(data) {
			jQuery("#modosDistribucion").children().remove();
			jQuery.each(data.aaData, function () {
			    jQuery("#modosDistribucion")
	            	.append(jQuery("<option></option>")
	            			.val(this['idModoDistribucion'])
	            			.html(this['descModoDistribucion']));
	        });
	}});
}

function cargarFormularioModosDistribucion(){
	
	jQuery("#form_addModosDistribucion").dialog({
		width : 500,
		title : "Modos de distribución",
		open: function( event, ui ) {
			inicializarModosDistribucion(true);
		},
		buttons : {
			"Guardar" : function() {
				var idModosDistribucionIncluidos = [""];
				jQuery("#modosDistribucionIncluidos option").each(
						function(i, item){
							idModosDistribucionIncluidos[i]=jQuery(item).val();		
						});
				
				guardarCaracteristicaModosDistribucion(idModosDistribucionIncluidos);
				jQuery(this).dialog("close");
			},
			"Cancelar" : function() {
				jQuery(this).dialog("close");
			}
		},
		close:function (){
		    
		}
	});
	
	jQuery("#form_addModosDistribucion", window.parent.document).scrollTop(0);
}

function guardarCaracteristicaModosDistribucion(idModosDistribucionIncluidos){
	
	
	//Derecho Comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		ruta = "guardarModosDistribucionDerechoComercial.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {	idModosDistribucionIncluidos: idModosDistribucionIncluidos, 
					idDerecho:jQuery("#idDerecho").val()},
			dataType: "json",
			success: function(idDerecho) {
				if (idDerecho!="")
					jQuery("#idDerecho").val(idDerecho);			
				obtenerTablaModosDistribucion();
			}
		});
	}else{
		jQuery.ajax({
			url: getPrefijoUrl()+"guardarModosDistribucion.htm",
			type: "GET",
			data: getParametrosGuardarModosDistribucion(idModosDistribucionIncluidos),
			dataType: "json",
			success: function(id) {
				var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
				if (tipo_formulario == plantillas)
					jQuery("#idPlantillaDerecho").val(id);
				else
					jQuery("#idCaracteristica").val(id);

				obtenerTablaModosDistribucion();
			}
		});
	}
}

function obtenerTablaModosDistribucion() {
	
	//derecho comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
	    jQuery.ajax({
			dataType : "json",
			url : "findModosDistribucionByDerechoComercial.htm",
			data : {
				idDerecho : jQuery("#idDerecho").val()
			},
			success : function(json) {
				var cadena = "";
				jQuery.each(json.aaData, function (j, modo) {
					if (j==0){
						cadena = modo.descModoDistribucion;
					} else {
						cadena += ", " + modo.descModoDistribucion;
					}
				});
				jQuery("#listadoModosDeDistribucionDerecho").html(cadena);
			}
	    });
	}else{
		jQuery.ajax({
			url: getPrefijoUrl() + "findModosDistribucion.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
				var cadena = "";
				jQuery.each(data.aaData, function (j, modo) {
					if (j==0){
						cadena = modo.descModoDistribucion;
					} else {
						cadena += ", " + modo.descModoDistribucion;
					}
				});
				jQuery("#listadoModosDeDistribucionDerecho").html(cadena);
		}});		
	}
	
}
