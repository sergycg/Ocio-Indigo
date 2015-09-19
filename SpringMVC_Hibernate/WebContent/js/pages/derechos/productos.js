function initButtonAddProductos(){
	
	obtenerTablaProductos();
	jQuery('#botonProductosTRN').click(function(event) {
		event.preventDefault();
		cargarFormularioProductos();
	});
	jQuery('#addProductos').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion
		event.preventDefault();
		cargarFormularioProductos();
	});
	
	jQuery("#botonIncluirProductos").click(function (){
		jQuery("#productos option:selected").each(
				function(i, productoDer){
					var incluirProducto = true;
					// comprobamos que ya no esté incluido
					jQuery("#productosIncluidos option").each(function(j, productoIncl){
						if (jQuery(productoDer).val()==jQuery(productoIncl).val()){
							incluirProducto = false;
						}
					});
					if (incluirProducto){
						jQuery("#productosIncluidos").append(jQuery("<option></option>").val(jQuery(productoDer).val()).html(jQuery(productoDer).html()));
					}
				});
	});

	jQuery("#botonQuitarProductos").click(function (){
		jQuery("#productosIncluidos option:selected").remove();
	});
	
}

function inicializarProductos(open){
	jQuery("#productos").children().remove();
	jQuery("#productosIncluidos").children().remove();
	
	cargarProductos();

	jQuery("#productosIncluidos").children().remove();
	if (open){
		cargarProductosDelDerecho();
		
	}
	
}

function cargarProductosDelDerecho(){
	var ruta = "";
	
	//derecho comercial, cambia el idDerecho y la ruta
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		ruta = "findProductosByDerechoComercial.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idDerecho : jQuery("#idDerecho").val()
			},
			dataType: "json",
			success: function(data) {
			  jQuery.each(data.aaData, function () {
				    jQuery("#productosIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idProducto'])
		            			.html(this['descProducto']));
		      });
		}});
	}else{
		jQuery.ajax({
			url: getPrefijoUrl()+"findProductos.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
				jQuery.each(data.aaData, function () {
					jQuery("#productosIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idProducto'])
		            			.html(this['descProducto']));
				});
		}});
	}
	
	
}



function cargarProductos(){
	var ruta = "";
	
	ruta = "findProductos.htm";
	
	jQuery.ajax({
		url: ruta,
		type: "GET",
		dataType: "json",
		success: function(data) {
			jQuery("#productos").children().remove();
//		    jQuery("#productos").append(jQuery("<option selected></option>").val("").html("Seleccione uno..."));

			jQuery.each(data.aaData, function () {
			    jQuery("#productos")
	            	.append(jQuery("<option></option>")
	            			.val(this['idProducto'])
	            			.html(this['descProducto']));
	        });
	}});
}



function cargarFormularioProductos(){
	
	jQuery("#form_addProductos").dialog({
		width : 500,
		title : "Productos",
		open: function( event, ui ) {
			inicializarProductos(true);
		},
		buttons : {
			"Guardar" : function() {
				var idProductosIncluidos = [""];
			
				jQuery("#productosIncluidos option").each(
						function(i, item){
							idProductosIncluidos[i]=jQuery(item).val();		
						});
				
				guardarCaracteristicaProductos(idProductosIncluidos);
				jQuery(this).dialog("close");
			},
			"Cancelar" : function() {
				jQuery(this).dialog("close");
			}
		},
		close:function (){
		    
		}
	});
	jQuery("#form_addProductos", window.parent.document).scrollTop(0);	
}


function guardarCaracteristicaProductos(idProductosIncluidos){
	
	
	//Derecho Comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		ruta = "guardarProductosDerechoComercial.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {	idProductosIncluidos: idProductosIncluidos, 
					idDerecho:jQuery("#idDerecho").val()},
			dataType: "json",
			success: function(idDerecho) {
				if (idDerecho!="")
					jQuery("#idDerecho").val(idDerecho);			
				obtenerTablaProductos();
				
			}
		});
	}else{
		var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
		if (tipo_formulario == plantillas){
			param = {
					idProductosIncluidos : idProductosIncluidos, 
					idPlantilla: jQuery("#idPlantilla").val(),
					idPlantillaDerecho: jQuery("#idPlantillaDerecho").val(),
					codigoTipoDerecho: jQuery ("#codigoTipoDerecho").val(),
					codigoAmbitoDerecho: jQuery("#codigoAmbitoDerecho").val()
			};
		}

		jQuery.ajax({
			url: getPrefijoUrl()+"guardarProductos.htm",
			type: "GET",
			data: param,
			dataType: "json",
			success: function(id) {
				var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
				if (tipo_formulario == plantillas)
					jQuery("#idPlantillaDerecho").val(id);
				else
					jQuery("#idCaracteristica").val(id);
	
				obtenerTablaProductos();
			}
		});
	}
	
	
}

function obtenerTablaProductos() {
	
	//derecho comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
	    jQuery.ajax({
			dataType : "json",
			url : "findProductosByDerechoComercial.htm",
			data : {
				idDerecho : jQuery("#idDerecho").val()
			},
			success : function(json) {
				var cadena = "";
				jQuery.each(json.aaData, function (j, producto) {
					if (j==0){
						cadena = producto.descProducto;
					} else {
						cadena += ", " + producto.descProducto;
					}
				});
				jQuery("#listadoProductosDerecho").html(cadena);
			}
	    });
	}else{
		jQuery.ajax({
			url: getPrefijoUrl() + "findProductos.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
				var cadena = "";
				jQuery.each(data.aaData, function (j, producto) {
					if (j==0){
						cadena = producto.descProducto;
					} else {
						cadena += ", " + producto.descProducto;
					}
				});
				jQuery("#listadoProductosDerecho").html(cadena);
		}});		
	}
	

}


