function initButtonAddProductos(){
	obtenerTablaProductos();
	
	jQuery('#addProductos').click(function(event) {
		event.preventDefault();
		cargarFormularioProductos();
	});
	
	jQuery("#botonIncluirProductos").click(function (){
		jQuery("#productos option:selected").each(
			function(i, productosDer){
				var incluir = true;
				// comprobamos que ya no esté incluido
				jQuery("#productosIncluidos option").each(function(j, productosIncl){
					if (jQuery(productosDer).val()==jQuery(productosIncl).val()){
						incluir = false;
					}
				});
				if (incluir){
					jQuery("#productosIncluidos").append(jQuery("<option></option>").val(jQuery(productosDer).val()).html(jQuery(productosDer).html()));
				}
			});
	});

	jQuery("#botonQuitarProductos").click(function (){
		jQuery("#productosIncluidos option:selected").remove();
	});
	
}

function inicializarProductos(open){
	
	cargarProductos();

	jQuery("#productosIncluidos").children().remove();
	if (open){
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
	jQuery.ajax({
		url: "getProductos.htm",
		type: "GET",
		dataType: "json",
		success: function(data) {
			jQuery("#productos").children().remove();
			jQuery.each(data, function () {
			    var idProducto = this['idProducto'];
			    var descProducto = this['descProducto'];
			    
				jQuery("#productos").append(
			    		jQuery("<option></option>")
			    		.val(idProducto)
			    		.html(descProducto));
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
	jQuery.ajax({
		url: getPrefijoUrl()+"guardarProductos.htm",
		type: "GET",
		data: getParametrosGuardarProductos(idProductosIncluidos),
		dataType: "json",
		success: function(idCaracteristica) {
			if (idCaracteristica!="")
				jQuery("#idCaracteristica").val(idCaracteristica);	
			obtenerTablaProductos();
		}
	});
}

function obtenerTablaProductos() {
	
	jQuery.ajax({
		url: getPrefijoUrl()+"findProductos.htm",
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

