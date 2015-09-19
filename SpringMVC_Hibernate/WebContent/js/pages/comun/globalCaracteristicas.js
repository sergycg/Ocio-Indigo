/**
 * Devuelve un prefijo con el fin de construir la url correcta (dependiendo del tipo de formulario que sea)
 */
function getPrefijoUrl(){
	var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
	var prefijo = "";
	
	if (tipo_formulario == derecho_comercial){
		prefijo = "derechoComercial_";
	} else if (tipo_formulario == derecho_cpi){
		prefijo = "derecho_";
	} else if (tipo_formulario == derecho_trn){
		prefijo = "derechoTRN_";
	} else if (tipo_formulario == derecho_dis){
		prefijo = "derechoDIS_";
	} else if (tipo_formulario == derecho_int){
		prefijo = "derechoINT_";
	} else if (tipo_formulario == plantillas){
		prefijo = "plantillaDerechos_";
	}
	return prefijo;
}

/**
 * Devuelve el identificador por el que hay que buscar las caracteristicas del derecho 
 * o de la cabecera comercial (dependiendo del tipo de formulario que sea)
 */
function getIdBusquedaCaracteristicas(){
	var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
	
	var param={};
	if (tipo_formulario==derecho_comercial){
		param = {
				idDerechoComercial: jQuery("#idDerecho").val()
		};
	} else if (tipo_formulario==derecho_cpi || 
			   tipo_formulario == derecho_trn || 
			   tipo_formulario == derecho_dis || 
			   tipo_formulario == derecho_int){
		param = {
				idCaracteristica: jQuery("#idCaracteristica").val()
		};
	} else if (tipo_formulario == plantillas){
		param = {
				idPlantillaDerecho: jQuery("#idPlantillaDerecho").val()
		};
	}
	return param;
}

/**
 * Devuelve los parametros necesarios para guardar las caracteristicas de idiomas del derecho 
 * o de la cabecera comercial (dependiendo del tipo de formulario que sea)
 */
function getParametrosGuardarIdiomas(idIdiomasIncluidos){
	var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
	var param={};
	if (tipo_formulario==derecho_comercial){
		param = {
				idiomasIncluidos: idIdiomasIncluidos,
				idDerechoComercial: jQuery("#idDerecho").val()
		};
	} else if (tipo_formulario == derecho_cpi || 
			   tipo_formulario == derecho_trn ||
			   tipo_formulario == derecho_dis ||
			   tipo_formulario == derecho_int){
		param = {
				idiomasIncluidos: idIdiomasIncluidos, 
				idDerecho: jQuery("#idDerecho").val(), 
				idCaracteristica: jQuery("#idCaracteristica").val()
		};
	} else if (tipo_formulario == plantillas){
		param = {
				idiomasIncluidos: idIdiomasIncluidos, 
				idPlantilla: jQuery("#idPlantilla").val(),
				idPlantillaDerecho: jQuery("#idPlantillaDerecho").val(),
				codigoTipoDerecho: jQuery ("#codigoTipoDerecho").val(),
				codigoAmbitoDerecho: jQuery("#codigoAmbitoDerecho").val()
		};
	}

	return param;
}

/**
 * Devuelve los parametros necesarios para guardar las caracteristicas de productos del derecho 
 */
function getParametrosGuardarProductos(idProductosIncluidos){
	var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
	var param={};
	if (tipo_formulario == derecho_cpi || 
		tipo_formulario == derecho_trn ||
		tipo_formulario == derecho_dis){
		param = {
			productosIncluidos: idProductosIncluidos, 
			idDerecho: jQuery("#idDerecho").val(), 
			idCaracteristica: jQuery("#idCaracteristica").val()
		};
	}
	return param;
}

/**
 * Devuelve los parametros necesarios para guardar las caracteristicas de productos del derecho 
 */
function getParametrosGuardarModosDistribucion(idModosDistribucionIncluidos){
	var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
	var param={};
	if (tipo_formulario == derecho_cpi || 
		tipo_formulario == derecho_trn ||
		tipo_formulario == derecho_dis){
		param = {
			idModosDistribucionIncluidos: idModosDistribucionIncluidos, 
			idDerecho: jQuery("#idDerecho").val(), 
			idCaracteristica: jQuery("#idCaracteristica").val()
		};
	}else if (tipo_formulario == plantillas){
		param = {
				idModosDistribucionIncluidos: idModosDistribucionIncluidos, 
				idPlantilla: jQuery("#idPlantilla").val(),
				idPlantillaDerecho: jQuery("#idPlantillaDerecho").val(),
				codigoTipoDerecho: jQuery ("#codigoTipoDerecho").val(),
				codigoAmbitoDerecho: jQuery("#codigoAmbitoDerecho").val()
			};
	}
	return param;
}

/**
 * Devuelve los parametros necesarios para guardar las caracteristicas de territorios del derecho 
 * o de la cabecera comercial (dependiendo del tipo de formulario que sea)
 */
function getParametrosGuardarTerritorios(idTerritoriosIncluidos, territorio_total){
	var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
	var param={};
	if (tipo_formulario==derecho_comercial){
		param = {
				territoriosIncluidos: idTerritoriosIncluidos,
				isTerritorioTotal:territorio_total,
				idDerechoComercial: jQuery("#idDerecho").val()
		};
	} else if (tipo_formulario == derecho_cpi || 
			   tipo_formulario == derecho_trn ||
			   tipo_formulario == derecho_dis ||
			   tipo_formulario == derecho_int){
		param = {
				territoriosIncluidos: idTerritoriosIncluidos, 
				isTerritorioTotal:territorio_total,
				idDerecho: jQuery("#idDerecho").val(), 
				idCaracteristica: jQuery("#idCaracteristica").val()
		};
	} else if (tipo_formulario == plantillas){
		param = {
			territoriosIncluidos: idTerritoriosIncluidos, 
			isTerritorioTotal:territorio_total,
			idPlantilla: jQuery("#idPlantilla").val(),
			idPlantillaDerecho: jQuery("#idPlantillaDerecho").val(),
			codigoTipoDerecho: jQuery ("#codigoTipoDerecho").val(),
			codigoAmbitoDerecho: jQuery("#codigoAmbitoDerecho").val()
		};
	}
	return param;
}