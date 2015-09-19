var rutaInicial="";
var tipo_formulario = "";
var ambito = "";
var SEPARADOR_SISTEMAS_Y_MODOS = ":";
var SEPARADOR_DE_MODOS = ";";

function initButtonAddSistemaModo(){

	tipo_formulario = (jQuery('#tipoFormulario_hidden')!=undefined?jQuery('#tipoFormulario_hidden').val():"");

	obtenerTablaSistemas();
	
	if (tipo_formulario == plantillas){
		// PLANTILLAS
		jQuery ('#botonSistemasModosDCP').show();
		ambito = jQuery ('#codigoAmbitoDerecho').val();
		if (ambito == "EI"){
			controlBotonesSistemasModosDelDerechoCPI(ambito);
		}else{
			controlBotonesSistemasModosDelDerechoComercial(ambito);
		}
		jQuery('#botonSistemasModosDCP').click(function(event) {
			event.preventDefault();
			if (tipo_formulario == plantillas && 
				jQuery("#grupoCadenasDCP_EI").is(":visible") &&
				jQuery("#descripcionGrupoCadenas").val() == "")
				showError("Debe seleccionar un grupo de cadenas", '');
			else
				cargarFormularioSistemasModos();
		});
	}else{
		// DERECHOS
		//Derecho CPI o interactivos
		if (tipo_formulario == derecho_cpi || tipo_formulario == derecho_int){
			controlBotonesSistemasModosDelDerechoCPI();
		}else{	//derecho comercial
			controlBotonesSistemasModosDelDerechoComercial();
		}
		jQuery('#addSistemasTrans').click(function(event) {
			event.stopPropagation();	//Impide que se abra el accordion
			event.preventDefault();
			cargarFormularioSistemasModos();
		});
	}
	
	jQuery("#"+rutaInicial+"sistemasTransmision").change(function (){
		var idSistema = jQuery("#"+rutaInicial+"sistemasTransmision option:selected").val();
		var arraySitemas = [""];
		arraySitemas[0] = idSistema;
		cargarModosPorSistema(arraySitemas);
	});

}


function inicializarSistemasModos(open){
	jQuery("#"+rutaInicial+"modosDifusion").children().remove();
	jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos").children().remove();
	jQuery("#"+rutaInicial+"modosDifusionIncluidos").children().remove();
	cargarSistemas();

	jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos").children().remove();
	if (open){
		if (tipo_formulario == plantillas && ambito == "EC")
			cargarSistemasDelDerechoComercial();
		else{
			cargarSistemasDelDerecho();
			//Derecho CPI, Interactivos o Plantillas EI
			if (tipo_formulario == derecho_cpi || tipo_formulario == derecho_int || (tipo_formulario == plantillas && ambito == "EI")){
				cargarModosDelDerecho();
			}
		}
	}
}

function cargarSistemasDelDerechoComercial(){
	var ruta = "";
	
	// Plantillas
	if (tipo_formulario == plantillas){
		
		ruta = getPrefijoUrl() + "findSistemasModosDerComerc.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idPlantillaDerecho : jQuery("#idPlantillaDerecho").val()
			},
			dataType: "json",
			success: function(data) {
				jQuery.each(data.aaData, function (j, sistema) {
					id = sistema.idSistemaTransmision;
					if (sistema.idModos!=null && sistema.idModos!="")
					id += SEPARADOR_SISTEMAS_Y_MODOS + replaceAll(sistema.idModos,",",SEPARADOR_DE_MODOS);
					descripcion = sistema.descSistemaTransmision;
					if (sistema.descModos!=null && sistema.descModos!="")
					descripcion += ": " + sistema.descModos;
					
				    jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos").
			    	append(jQuery("<option></option>").val(id).html(descripcion));

		      });
		}});
	}
}
function cargarSistemasDelDerecho(){
	var ruta = "";
	
	// Plantillas
	if (tipo_formulario == plantillas){
		
		ruta = getPrefijoUrl() + "findSistemas.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idPlantillaDerecho : jQuery("#idPlantillaDerecho").val()
			},
			dataType: "json",
			success: function(data) {
			  jQuery.each(data.aaData, function () {
				    jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idSistemaTransmision'])
		            			.html(this['descSistemaTransmision']));
		      });
		}});
	}
	
	//Derecho CPI o interactivos
	if (tipo_formulario == derecho_cpi || tipo_formulario == derecho_int)
	{
		ruta = getPrefijoUrl() + "findSistemasByCaracteristica.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idCaracteristica : jQuery("#idCaracteristica").val()
			},
			dataType: "json",
			success: function(data) {
			  jQuery.each(data.aaData, function () {
				    jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idSistemaTransmision'])
		            			.html(this['descSistemaTransmision']));
		      });
		}});
	}
	
	//derecho comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		ruta = "findSistemasByDerechoComercial.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idDerecho : jQuery("#idDerecho").val()
			},
			dataType: "json",
			success: function(data) {
				
				var descripcion = "";
				var id = "";
				jQuery.each(data.aaData, function (j, sistema) {
					id = sistema.idSistemaTransmision;
					if (sistema.idModos!=null && sistema.idModos!="")
						id += SEPARADOR_SISTEMAS_Y_MODOS + replaceAll(sistema.idModos,",",SEPARADOR_DE_MODOS);
					descripcion = sistema.descSistemaTransmision;
					if (sistema.descModos!=null && sistema.descModos!="")
						descripcion += ": " + sistema.descModos;
					
				    jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos").
				    	append(jQuery("<option></option>").val(id).html(descripcion));
				});

		}});
	}
}

function cargarModosDelDerecho(){
	
	var ruta = "";
	
	// Plantillas
	if (tipo_formulario == plantillas){
		ruta = getPrefijoUrl() + "findModos.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idPlantillaDerecho : jQuery("#idPlantillaDerecho").val()
			},
			dataType: "json",
			success: function(data) {
				  jQuery.each(data.aaData, function () {
					    jQuery("#"+rutaInicial+"modosDifusionIncluidos")
			            	.append(jQuery("<option></option>")
			            			.val(this['idModoDifusion'])
			            			.html(this['descModoDifusion']));
			      });
		}});
	}
	//Derecho CPI o interactivos
	if (tipo_formulario == derecho_cpi || tipo_formulario == derecho_int)
	{
		ruta = getPrefijoUrl() + "findModosByCaracteristica.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idCaracteristica : jQuery("#idCaracteristica").val()
			},
			dataType: "json",
			success: function(data) {
				  jQuery.each(data.aaData, function () {
					    jQuery("#"+rutaInicial+"modosDifusionIncluidos")
			            	.append(jQuery("<option></option>")
			            			.val(this['idModoDifusion'])
			            			.html(this['descModoDifusion']));
			      });
		}});
	}
}

function cargarSistemas(){
	var ruta = "";
	
	ruta = "getSistemasTransmision.htm";
	
	jQuery.ajax({
		url: ruta,
		type: "GET",
		data: {activo:true},
		dataType: "json",
		success: function(data) {
			jQuery("#"+rutaInicial+"sistemasTransmision").children().remove();

			jQuery.each(data.aaData, function () {
			    jQuery("#"+rutaInicial+"sistemasTransmision")
	            	.append(jQuery("<option></option>")
	            			.val(this['idSistemaTransmision'])
	            			.html(this['descSistemaTransmision']));
	        });
	}});
}

function cargarModosPorSistema(idSistemas){
	var ruta = "";
	ruta = "getModosDifusionByIdSistema.htm";
	
	jQuery.ajax({
		url: ruta,
		type: "GET",
		dataType: "json",
		data : {
			idSistemasTransmision : idSistemas,
			activo:true
		},
		success: function(data) {
			jQuery("#"+rutaInicial+"modosDifusion").children().remove();
			jQuery.each(data, function () {
				
				//Derecho CPI, interactivos o Plantillas EI
				if (tipo_formulario == derecho_cpi || tipo_formulario == derecho_int ||	(tipo_formulario == plantillas && ambito == "EI")){

					jQuery("#"+rutaInicial+"modosDifusion").append(jQuery("<option selected></option>").val(this['idModoDifusion'])
	            																						.html(this['descModoDifusion']));
				}
				//derecho comercial o Plantillas EC
				if (jQuery("#derechoComercForm").val()!= undefined  || 
					(tipo_formulario == plantillas && ambito == "EC")){
					jQuery("#"+rutaInicial+"modosDifusion").append(jQuery("<option selected></option>").val(this['idModoDifusion'])
																										.html(this['descModoDifusion']).attr("idSistema", this["idSistemaTransmision"]).attr("descripcionModo", this['descModoDifusion']).attr("descripcionSistema", this['descSistemaTransmision']));
				}
	        });
	}});
}

function cargarFormularioSistemasModos(){
	var tipoFormulario = "";
	var ancho = 560;

	if (jQuery("#derechoComercForm").val()!= undefined || (tipo_formulario == plantillas && ambito == "EC")) ancho = 880;

	if (tipo_formulario == plantillas) tipoFormulario = "_" + ambito;
	else tipoFormulario = "";

	jQuery("#form_addSistemaModo" + tipoFormulario).dialog({
		width : ancho,
		title : "Sistemas de transmisión y modos",
		open: function( event, ui ) {
			inicializarSistemasModos(true);
		},
		buttons : {
			"Guardar" : function() {
				var idSistemasIncluidos = [""];
				var idsModosIncluidos = [""];
				jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos option").each(
						function(i, item){
							idSistemasIncluidos[i]=jQuery(item).val();		
						});

				//Derecho CPI, interactivos o Plantillas EI
				if (tipo_formulario == derecho_cpi || tipo_formulario == derecho_int ||	(tipo_formulario == plantillas && ambito == "EI")){
					jQuery("#"+rutaInicial+"modosDifusionIncluidos option").each(
						function(i, item){
							idsModosIncluidos[i]=jQuery(item).val();		
						});
					guardarCaracteristicaSistemasModosCPI(idSistemasIncluidos, idsModosIncluidos, tipo_formulario, ambito);
					
				//derecho comercial
				} else if (jQuery("#derechoComercForm").val()!= undefined || (tipo_formulario == plantillas && ambito == "EC")){
					guardarCaracteristicaSistemasModosComercial(idSistemasIncluidos);
				}
			},
			"Cancelar" : function() {
				jQuery(this).dialog("close");
			}
		}
	});
    jQuery("#form_addSistemaModo", window.parent.document).scrollTop(0);
	
}

function obtenerTablaSistemas() {
	var ruta = "";
	
	//plantillas
	if (tipo_formulario == plantillas){
		if (ambito == "EI"){
			ruta = getPrefijoUrl() + "findSistemas.htm";
			jQuery.ajax({
				url: ruta,
				type: "GET",
				data: {
					idPlantillaDerecho : jQuery("#idPlantillaDerecho").val()
				},
				dataType: "json",
				success: function(data) {
					var cadena = "";
					jQuery.each(data.aaData, function (j, sistema) {
						if (j==0){
							cadena = sistema.descSistemaTransmision;
						} else {
							cadena += ", " + sistema.descSistemaTransmision;
						}
					});
					jQuery("#listadoCaracteristicaSistemasTrans" + ambito).html(cadena);
			}});
		}else{
			ruta = "findSistemasByPlantillaDerecho.htm";
			jQuery.ajax({
				url: ruta,
				type: "GET",
				data: {
					idPlantillaDerecho : jQuery("#idPlantillaDerecho").val()
				},
				dataType: "json",
				success: function(data) {
					var cadena = "";
					jQuery.each(data.aaData, function (j, sistema) {
						if (j==0){
							cadena = "<b>" + sistema.descSistemaTransmision + "</b>";
							if (sistema.descModos!=null && sistema.descModos!="")
								cadena += ": " + sistema.descModos;
						} else {
							cadena += "<BR><b>" + sistema.descSistemaTransmision + "</b>";
							if (sistema.descModos!=null && sistema.descModos!="")
								cadena += ": " + sistema.descModos;
						}
					});
					jQuery("#listadoCaracteristicaSistemasTrans" + ambito).html(cadena);
			}});
		}
	}
	
	//derecho cpi ó Interactivos
	if (tipo_formulario == derecho_cpi || tipo_formulario == derecho_int)
	{
		ruta = getPrefijoUrl() + "findSistemasByCaracteristica.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idCaracteristica : jQuery("#idCaracteristica").val()
			},
			dataType: "json",
			success: function(data) {
				var cadena = "";
				jQuery.each(data.aaData, function (j, sistema) {
					if (j==0){
						cadena = sistema.descSistemaTransmision;
					} else {
						cadena += ", " + sistema.descSistemaTransmision;
					}
				});
				jQuery("#listadoCaracteristicaSistemasTrans").html(cadena);
		}});
	}
	
	//derecho comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		ruta = "findSistemasByDerechoComercial.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idDerecho : jQuery("#idDerecho").val()
			},
			dataType: "json",
			success: function(data) {
				var cadena = "";
				jQuery.each(data.aaData, function (j, sistema) {
					if (j==0){
						cadena = "<b>" + sistema.descSistemaTransmision + "</b>";
						if (sistema.descModos!=null && sistema.descModos!="")
							cadena += ": " + sistema.descModos;
					} else {
						cadena += "<BR><b>" + sistema.descSistemaTransmision + "</b>";
						if (sistema.descModos!=null && sistema.descModos!="")
							cadena += ": " + sistema.descModos;
					}
				});
				jQuery("#listadoCaracteristicaSistemasTrans").html(cadena);
		}});

	}
}

function obtenerTablaModos() {
	
	var ruta = "";
	
	// plantillas
	// Derecho EI
	//plantillas
	if (tipo_formulario == plantillas){
		if (ambito == "EI"){
			ruta = getPrefijoUrl() + "findModos.htm";
			jQuery.ajax({
				url: ruta,
				type: "GET",
				data: {
					idPlantillaDerecho : jQuery("#idPlantillaDerecho").val()
				},
				dataType: "json",
				success: function(data) {
					var cadena = "";
					jQuery.each(data.aaData, function (j, modo) {
						if (j==0){
							cadena = modo.descModoDifusion;
						} else {
							cadena += ", " + modo.descModoDifusion;
						}
					});
					jQuery("#listadoCaracteristicaModosDif").html(cadena);
			}});
		}else{
			
		}
	}
		
	//Derecho CPI ó Interactivos
	if (tipo_formulario == derecho_cpi || tipo_formulario == derecho_int)
	{
		ruta = getPrefijoUrl() + "findModosByCaracteristica.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {
				idCaracteristica : jQuery("#idCaracteristica").val()
			},
			dataType: "json",
			success: function(data) {
				var cadena = "";
				jQuery.each(data.aaData, function (j, modo) {
					if (j==0){
						cadena = modo.descModoDifusion;
					} else {
						cadena += ", " + modo.descModoDifusion;
					}
				});
				jQuery("#listadoCaracteristicaModosDif").html(cadena);
		}});

	}
}

/************************************************************************************/
/*		FUNCIONES DE SISTEMAS Y MODOS DEL DERECHO CPI 								*/
/************************************************************************************/

function controlBotonesSistemasModosDelDerechoCPI(ambito){
	rutaInicial="caracteristicas_";
	obtenerTablaModos();

	jQuery("#botonIncluirSistemaModo").click(function (){
		// incluimos el sistema de transmision
		var sistemaDer = jQuery("#"+rutaInicial+"sistemasTransmision option:selected");
		var incluirSistema = true;
		// comprobamos que ya no esté incluido
		jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos option").each(function(j, sistemaIncl){
			if (sistemaDer.val()==jQuery(sistemaIncl).val()){
				incluirSistema = false;
			}
		});
		if (incluirSistema){
			jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos").append(jQuery("<option></option>").val(sistemaDer.val()).html(sistemaDer.html()));
		}
		// incluimos los modos de difusion
		jQuery("#"+rutaInicial+"modosDifusion option:selected").each(
				function(i, modoDer){
					var incluirModo = true;
					// comprobamos que ya no esté incluido
					jQuery("#"+rutaInicial+"modosDifusionIncluidos option").each(function(j, modoIncl){
						if (jQuery(modoDer).val()==jQuery(modoIncl).val()){
							incluirModo = false;
						}
					});
					if (incluirModo){
						jQuery("#"+rutaInicial+"modosDifusionIncluidos").append(jQuery("<option></option>").val(jQuery(modoDer).val()).html(jQuery(modoDer).html()));
					}
				});
	});

	if (ambito != null && ambito != undefined){
		jQuery("#botonQuitarSistema_" + ambito).click(function (){
			jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos option:selected").remove();
		});
		jQuery("#botonQuitarModo_" + ambito).click(function (){
			jQuery("#"+rutaInicial+"modosDifusionIncluidos option:selected").remove();
		});
	}else{
		jQuery("#botonQuitarSistema").click(function (){
			jQuery("#"+rutaInicial+"sistemasTransmisionIncluidos option:selected").remove();
		});
		jQuery("#botonQuitarModo").click(function (){
			jQuery("#"+rutaInicial+"modosDifusionIncluidos option:selected").remove();
		});
	}
	
}

function guardarCaracteristicaSistemasModosCPI(idSistemasIncluidos, idsModosIncluidos, tipo_formulario, ambito){
	var ruta = "";
	var tipoFormulario = "";
	
	if (tipo_formulario == plantillas) tipoFormulario = "_" + ambito;
	else tipoFormulario = "";

	// Plantillas
	if (tipo_formulario != undefined && tipo_formulario == plantillas){
		ruta = "plantillaDerechos_guardarSistemaModoDerecho.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {	idSistemasIncluidos: idSistemasIncluidos, 
					idsModosIncluidos: idsModosIncluidos,				
					idPlantilla: jQuery("#idPlantilla").val(),
					idPlantillaDerecho: jQuery("#idPlantillaDerecho").val(),
					codigoTipoDerecho: jQuery ("#codigoTipoDerecho").val(),
					codigoAmbitoDerecho: jQuery("#codigoAmbitoDerecho").val()
				   },
			dataType: "json",
			success: function(id) {
				jQuery("#form_addSistemaModo" + tipoFormulario).dialog("close");
				if (id!="")
					jQuery("#idPlantillaDerecho").val(id);
				obtenerTablaSistemas();
				obtenerTablaModos();
			}
		});
	}
	
	//Derecho CPI o interactivos
	if (tipo_formulario != undefined && (tipo_formulario == derecho_cpi || tipo_formulario == derecho_int))
	{
		ruta = getPrefijoUrl() + "guardarSistemaModoDerecho.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {	idSistemasIncluidos: idSistemasIncluidos, 
					idsModosIncluidos: idsModosIncluidos, 
					idDerecho:jQuery("#idDerecho").val(), 
					idCaracteristica:jQuery("#idCaracteristica").val(),
					idDCPAsociado:jQuery("#idDerechoAsociadoInteractivos").val()},
			dataType: "json",
			success: function(idCaracteristica) {
				jQuery("#form_addSistemaModo" + tipoFormulario).dialog("close");
				if (idCaracteristica!="")
					jQuery("#idCaracteristica").val(idCaracteristica);			
				obtenerTablaSistemas();
				obtenerTablaModos();
			}
		});
	}
}

/************************************************************************************/
/*		FUNCIONES DE SISTEMAS Y MODOS DEL DERECHO COMERCIAL 						*/
/************************************************************************************/

function incluirModoAlDerechoComercial(idSistemaDer, desSistemaDer, idModoDer, desModoDer){
	var incluirModo = true;

	jQuery("#sistemasTransmisionIncluidos option").each(function(j, sistIncl){
		var idSistemaIncluido = obtenerSistema(jQuery(sistIncl).val());
		if (idSistemaDer==idSistemaIncluido){
			var idModosIncluidos = obtenerModos(jQuery(sistIncl).val());
			
			if (idModosIncluidos!=null && idModosIncluidos!=""){
				for (var i=0;i<idModosIncluidos.length;i++){
					
					// comprobamos que no esté incluido
					if (idModoDer==idModosIncluidos[i]){
						incluirModo = false;
						break;
					} 
				}
				if (incluirModo){
					jQuery(sistIncl).val(jQuery(sistIncl).val() + SEPARADOR_DE_MODOS + idModoDer);
					jQuery(sistIncl).html(jQuery(sistIncl).html() + ", "+  desModoDer);
					incluirModo = false;
				}
			} else {
				jQuery(sistIncl).val(jQuery(sistIncl).val()+ SEPARADOR_SISTEMAS_Y_MODOS + idModoDer);
				jQuery(sistIncl).html(jQuery(sistIncl).html() + ": "+  desModoDer);
				incluirModo = false;
			}
		} 
		
	});
	if (incluirModo){
		jQuery("#sistemasTransmisionIncluidos").append(jQuery("<option></option>").val(idSistemaDer + SEPARADOR_SISTEMAS_Y_MODOS + idModoDer).html(desSistemaDer + ": " + desModoDer));
	}
}

function incluirSistemaAlDerechoComercial(sistemaDer){
	var incluirSistema = true;
	var id_SistemaDer = jQuery(sistemaDer).val();
	var des_SistemaDer = jQuery(sistemaDer).html();
	
	// comprobamos que no esté incluido
	jQuery("#sistemasTransmisionIncluidos option").each(function(j, sistIncl){
		var id_SistemaIncluido = obtenerSistema(jQuery(sistIncl).val());
		if (id_SistemaDer==id_SistemaIncluido){
			incluirSistema = false;
		}
	});
	if (incluirSistema)
		jQuery("#sistemasTransmisionIncluidos").append(jQuery("<option></option>").val(id_SistemaDer).html(des_SistemaDer));
	
}

function controlBotonesSistemasModosDelDerechoComercial(){
	rutaInicial = "";
	
	var tipoFormulario = "";
	if (tipo_formulario == plantillas) tipoFormulario = "_" + ambito;
	else tipoFormulario = "";
	
	jQuery("#botonIncluirSistemaModo" + tipoFormulario).click(function (){
		
		// incluimos los modos de difusion con el sistema al que pertenecen
		jQuery("#modosDifusion option:selected").each(
			function(i, modoDer){
				var idSistemaDer = jQuery(modoDer).attr("idSistema");
				var idModoDer = jQuery(modoDer).val();
				var desModoDer = jQuery(modoDer).attr("descripcionModo");
				var desSistemaDer = jQuery(modoDer).attr("descripcionSistema");
				
				incluirModoAlDerechoComercial(idSistemaDer, desSistemaDer, idModoDer, desModoDer);
			});

		
		// En el caso que no haya modos para incluir pero se haya seleccionado algun sistema, se debe añadir solo el sistema
		var numModosSeleccionados = jQuery("#modosDifusion option:selected").length;
		if (numModosSeleccionados==0){
			jQuery("#sistemasTransmision option:selected").each(
				function(i, sistemaDer){
					incluirSistemaAlDerechoComercial(sistemaDer);
				});
		}
	});

	
	jQuery("#botonIncluirTodos" + tipoFormulario).click(function (){
		var idSistemasAIncluir = [""];
		jQuery("#sistemasTransmision option").each(
				function(i, item){
					idSistemasAIncluir[i]=jQuery(item).val();		
				});

		jQuery.ajax({
			url: "getModosDifusionByIdSistema.htm",
			type: "GET",
			dataType: "json",
			data : {
				idSistemasTransmision : idSistemasAIncluir,
				activo:true
			},
			success: function(data) {
				jQuery("#sistemasTransmisionIncluidos").children().remove();
				
				jQuery.each(data, function () {
					incluirModoAlDerechoComercial(this["idSistemaTransmision"], this['descSistemaTransmision'], this['idModoDifusion'], this['descModoDifusion']);
				});
				
				jQuery("#sistemasTransmision option").each(
					function(i, sistemaDer){
						incluirSistemaAlDerechoComercial(sistemaDer);
					});
		}});
		
	});

	jQuery("#botonQuitarSistema" + tipoFormulario).click(function (){
		jQuery("#sistemasTransmisionIncluidos option:selected").remove();
	});
	jQuery("#botonQuitarTodos" + tipoFormulario).click(function (){
		jQuery("#sistemasTransmisionIncluidos option").remove();
	});
}

function guardarCaracteristicaSistemasModosComercial(sistemasModosIncluidos){

	var tipoFormulario = "";
	
	if (tipo_formulario == plantillas) tipoFormulario = "_" + ambito;
	else tipoFormulario = "";

	// Plantillas
	if (tipo_formulario != undefined && tipo_formulario == plantillas){
		ruta = "plantillaDerechos_guardarSistemaModoDerechoComercial.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {	sistemasModosIncluidos: sistemasModosIncluidos, 
				idPlantilla: jQuery("#idPlantilla").val(),
				idPlantillaDerecho: jQuery("#idPlantillaDerecho").val(),
				codigoTipoDerecho: jQuery ("#codigoTipoDerecho").val(),
				codigoAmbitoDerecho: jQuery("#codigoAmbitoDerecho").val()
			   },
			dataType: "json",
			success: function(id) {
				jQuery("#form_addSistemaModo" + tipoFormulario).dialog("close");
				if (id!="")
					jQuery("#idPlantillaDerecho").val(id);
				obtenerTablaSistemas();
			}
		});
	}
	
	//Derecho Comercial
	if (jQuery("#derechoComercForm").val()!= undefined)
	{
		ruta = "guardarSistemaModoDerechoComercial.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {	
					sistemasModosIncluidos: sistemasModosIncluidos, 
					idDerecho:jQuery("#idDerecho").val()},
			dataType: "json",
			success: function(idDerecho) {
				jQuery("#form_addSistemaModo" + tipoFormulario).dialog("close");
				if (idDerecho!="")
					jQuery("#idDerecho").val(idDerecho);			
				obtenerTablaSistemas();
			}
		});
	}
}

function obtenerModos(cadena){
	var modos = "";
	var res = cadena.split(SEPARADOR_SISTEMAS_Y_MODOS);
	if (res!=null && res.length>1)
		modos = res[1];
	return modos.split(SEPARADOR_DE_MODOS);
}

function obtenerSistema(cadena){
	var sistema = "";
	var res = cadena.split(SEPARADOR_SISTEMAS_Y_MODOS);
	if (res!=null)
		sistema = res[0];
	return sistema;
}

