function obtenerTotales(){
	jQuery.ajax({
		url: "loadTotales.htm",
		dataType: "json",
		data:{
			idCliente: jQuery("#idCliente").val(),
			idCuenta: jQuery("#idCuenta").val()
		},
		success: function(bean){
			jQuery("#totalEntregado").val(bean.totalEntregado);
			jQuery("#totalComprado").val(bean.totalComprado);
			jQuery("#resto").val(bean.resto);
			
			jQuery("#total_entregado").text(jQuery("#totalEntregado").val()+"€");
			jQuery("#total_comprado").text(jQuery("#totalComprado").val()+"€");
			jQuery("#total_resto").text(jQuery("#resto").val()+"€");
			jQuery("#total_tabla_entregas").text(jQuery("#totalEntregado").val()+"€");
			jQuery("#total_tabla_compras").text(jQuery("#totalComprado").val()+"€");
		}
	});
	
}

