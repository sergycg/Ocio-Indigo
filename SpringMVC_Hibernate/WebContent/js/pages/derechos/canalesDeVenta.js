function initButtonAddCanalesDeVenta(){
	
	obtenerTablaCanalesDeVenta();
	
	var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
	
	if (tipo_formulario == plantillas){
		jQuery('#botonCanalesVentaDIS').click(function(event) {
			event.preventDefault();
			cargarFormularioCanalesDeVenta();
		});
	}else{
		jQuery('#addCanalesDeVenta').click(function(event) {
			event.stopPropagation();	//Impide que se abra el accordion
			event.preventDefault();
			cargarFormularioCanalesDeVenta();
		});
	}
	
	jQuery("#botonIncluirCanalesDeVenta").click(function (){
		jQuery("#canalesDeVenta option:selected").each(
				function(i, canalDeVentaDer){
					var incluirCanalDeVenta = true;
					// comprobamos que ya no esté incluido
					jQuery("#canalesDeVentaIncluidos option").each(function(j, canalDeVentaIncl){
						if (jQuery(canalDeVentaDer).val()==jQuery(canalDeVentaIncl).val()){
							incluirCanalDeVenta = false;
						}
					});
					if (incluirCanalDeVenta){
						jQuery("#canalesDeVentaIncluidos").append(jQuery("<option></option>").val(jQuery(canalDeVentaDer).val()).html(jQuery(canalDeVentaDer).html()));
					}
				});
		
	});

	jQuery("#botonQuitarCanalesDeVenta").click(function (){
		jQuery("#canalesDeVentaIncluidos option:selected").remove();
	});
	
}

function inicializarCanalesDeVenta(open){
	jQuery("#canalesDeVenta").children().remove();
	jQuery("#canalesDeVentaIncluidos").children().remove();
	
	cargarCanalesDeVenta();

	jQuery("#canalesDeVentaIncluidos").children().remove();
	if (open){
		cargarCanalesDeVentaDelDerecho();
		
	}
}

function cargarCanalesDeVentaDelDerecho(){
	var ruta = "";
	
	//derecho comercial, cambia el idDerecho y la ruta
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		ruta = "findCanalesDeVentaByDerechoComercial.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idDerecho : jQuery("#idDerecho").val()
			},
			dataType: "json",
			success: function(data) {
			  jQuery.each(data.aaData, function () {
				    jQuery("#canalesDeVentaIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idCanalDeVenta'])
		            			.html(this['descCanalDeVenta']));
		      });
		}});
	}else{
		jQuery.ajax({
			url: getPrefijoUrl()+"findCanalesDeVenta.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
				jQuery.each(data.aaData, function () {
					jQuery("#canalesDeVentaIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idCanalDeVenta'])
		            			.html(this['descCanalDeVenta']));
				});
		}});
	}

}

function cargarCanalesDeVenta(){
	var ruta = "";
	ruta = "findCanalesDeVenta.htm";
	
	jQuery.ajax({
		url: ruta,
		type: "GET",
		dataType: "json",
		success: function(data) {
			jQuery("#canalesDeVenta").children().remove();
			jQuery.each(data.aaData, function () {
			    jQuery("#canalesDeVenta")
	            	.append(jQuery("<option></option>")
	            			.val(this['idCanalDeVenta'])
	            			.html(this['descCanalDeVenta']));
	        });
	}});
}



function cargarFormularioCanalesDeVenta(){
	
	jQuery("#form_addCanalesDeVenta").dialog({
		width : 500,
		title : "Canales de venta",
		open: function( event, ui ) {
			inicializarCanalesDeVenta(true);
		},
		buttons : {
			"Guardar" : function() {
				var idCanalesDeVentaIncluidos = [""];
			
				jQuery("#canalesDeVentaIncluidos option").each(
						function(i, item){
							idCanalesDeVentaIncluidos[i]=jQuery(item).val();		
						});
				
				guardarCaracteristicaCanalesDeVenta(idCanalesDeVentaIncluidos);
				jQuery(this).dialog("close");
			},
			"Cancelar" : function() {
				jQuery(this).dialog("close");
			}
		},
		close:function (){
		    
		}
	});
    jQuery("#form_addCanalesDeVenta", window.parent.document).scrollTop(0);

	
}


function guardarCaracteristicaCanalesDeVenta(idCanalesDeVentaIncluidos){
	
	
	//Derecho Comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		ruta = "guardarCanalesDeVentaDerechoComercial.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {	idCanalesDeVentaIncluidos: idCanalesDeVentaIncluidos, 
					idDerecho:jQuery("#idDerecho").val()},
			dataType: "json",
			success: function(idDerecho) {
				if (idDerecho!="")
					jQuery("#idDerecho").val(idDerecho);			
				obtenerTablaCanalesDeVenta();
				
			}
		});
	}else{
		var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
		if (tipo_formulario == plantillas){
			param = {
					idCanalesDeVentaIncluidos: idCanalesDeVentaIncluidos, 
					idPlantilla: jQuery("#idPlantilla").val(),
					idPlantillaDerecho: jQuery("#idPlantillaDerecho").val(),
					codigoTipoDerecho: jQuery ("#codigoTipoDerecho").val(),
					codigoAmbitoDerecho: jQuery("#codigoAmbitoDerecho").val()
			};
		}else{
			param = {
					idCanalesDeVentaIncluidos : idCanalesDeVentaIncluidos, 
					idDerecho 				  : jQuery("#idDerecho").val(),
					idCaracteristica 		  : jQuery("#idCaracteristica").val()
			};
		}
			
		jQuery.ajax({
			url: getPrefijoUrl()+"guardarCanalesDeVenta.htm",
			type: "GET",
			data: param,
			dataType: "json",
			success: function(id) {
				var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
				if (tipo_formulario == plantillas)
					jQuery("#idPlantillaDerecho").val(id);
				else
					jQuery("#idCaracteristica").val(id);	
				obtenerTablaCanalesDeVenta();
			}
		});
	}
	
	
}

function obtenerTablaCanalesDeVenta() {
	
	//derecho comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
	    jQuery.ajax({
			dataType : "json",
			url : "findCanalesDeVentaByDerechoComercial.htm",
			data : {
				idDerecho : jQuery("#idDerecho").val()
			},
			success : function(json) {
				var cadena = "";
				jQuery.each(json.aaData, function (j, canal) {
					if (j==0){
						cadena = canal.descCanalDeVenta;
					} else {
						cadena += ", " + canal.descCanalDeVenta;
					}
				});
				jQuery("#listadoCanalesDeVentaDerecho").html(cadena);
			}
	    });
	}else{
		jQuery.ajax({
			url: getPrefijoUrl() + "findCanalesDeVenta.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
				var cadena = "";
				jQuery.each(data.aaData, function (j, canal) {
					if (j==0){
						cadena = canal.descCanalDeVenta;
					} else {
						cadena += ", " + canal.descCanalDeVenta;
					}
				});
				jQuery("#listadoCanalesDeVentaDerecho").html(cadena);
		}});		
	}
	
}


