
function completeCabeceraComercial(idCabeceraComercial){
	
	jQuery.ajax({
	    dataType : "json",
	    url : "loadCabeceraComercialById.htm",
	    data : {
	    	idCabeceraComercial : idCabeceraComercial
	    },
	    success : function(bean) {
	    	if (bean == null){
	    		jQuery('#sinDetalleCabeceraComercial').css('display','block');
	    		jQuery('#detalleCabeceraComercial').css('display','none');
	    	}else{
	    		
	    		jQuery("#fechaInicio_detalle").text(bean.fechaInicio);
	    		jQuery("#fechaFin_detalle").text(bean.fechaFin);
	    		jQuery("#comercializador_detalle").text(bean.comercializador);
	    		jQuery("#porcentajeComercializador_detalle").text(bean.porcentajeComercializador);
	    		jQuery("#exclusividadComercializador_detalle").text(bean.exclusividadComercializador);
	    		jQuery("#beneficiarioFlatFee_detalle").text(bean.beneficiarioFlatFee);
		    	jQuery("#cantidadFlatFee_detalle").text(bean.cantidadFlatFee);
		    	jQuery('#comunidadTitulares_detalle').text(bean.comunidadTitulares);
	    		jQuery('#autorizarTitulares_detalle').text(bean.autorizarTitulares);
	    		jQuery("#titulares_detalle").text(bean.titulares);
		    	jQuery("#territorios_detalle").text(bean.territorios);
		    	jQuery("#idiomas_detalle").text(bean.idiomas);
	    	}
	    }
	});
}
