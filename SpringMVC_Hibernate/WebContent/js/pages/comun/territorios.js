var territorio_total = false;
var tipo_formulario = jQuery('#tipoFormulario_hidden').val();
//var cargar_categorias = true;

function initButtonAddTerritorio(){
	
	obtenerTablaTerritorios();
	
	jQuery('#addTerritorio').click(function(event) {
		event.preventDefault();
		
		var tipo_formulario = (jQuery('#tipoFormulario_hidden')!=undefined?jQuery('#tipoFormulario_hidden').val():"");
		if (tipo_formulario == plantillas && 
			jQuery("#grupoCadenasDCP_EI").is(":visible") &&
			jQuery("#descripcionGrupoCadenas").val() == "")
			showError("Debe seleccionar un grupo de cadenas", '');
		else
			cargarFormularioTerritorio();
	});
	
	jQuery("#caracteristicas_territorios").bind( "change", {param1:true},changeTerritorio);
	
	
	jQuery("#caracteristicas_continentes").change(function (){
		cargarTerritoriosCaracteristicas();
		
		var idContinentes = [""];
		jQuery("#caracteristicas_continentes option:selected").each(
				function(i, item){
					idContinentes[i]=jQuery(item).val();		
				});

		cargarPaises([""], idContinentes);
		cargarRegiones([""], idContinentes, [""]);
		cargarProvincias([""], idContinentes, [""], [""]);
		
		
	});
	
	jQuery("#caracteristicas_paises").change(function (){
		cargarTerritoriosCaracteristicas();

		var idContinentes = [""];
		jQuery("#caracteristicas_continentes option:selected").each(
				function(i, item){
					idContinentes[i]=jQuery(item).val();		
				});
		var idPaises = [""];
		jQuery("#caracteristicas_paises option:selected").each(
				function(i, item){
					idPaises[i]=jQuery(item).val();		
				});

		cargarRegiones([""], idContinentes, idPaises);
		cargarProvincias([""], idContinentes, idPaises, [""]);
	
	});
	
	jQuery("#caracteristicas_regiones").change(function (){
		cargarTerritoriosCaracteristicas();

		var idContinentes = [""];
		jQuery("#caracteristicas_continentes option:selected").each(
				function(i, item){
					idContinentes[i]=jQuery(item).val();		
				});
		var idPaises = [""];
		jQuery("#caracteristicas_paises option:selected").each(
				function(i, item){
					idPaises[i]=jQuery(item).val();		
				});
		var idRegiones = [""];
		jQuery("#caracteristicas_regiones option:selected").each(
				function(i, item){
					idRegiones[i]=jQuery(item).val();		
				});
		cargarProvincias([""], idContinentes, idPaises, idRegiones);
	
	});
	
	jQuery("#caracteristicas_provincias").change(function (){
		cargarTerritoriosCaracteristicas();
	});
	
	
	jQuery('#selectTerritorios').on('ifChecked', function(event){
//		cargar_categorias = true;
		territorio_total = false;
		inicializarListadosInformativosTerritorio();

		jQuery('#selectCategorias').iCheck('uncheck');
		jQuery('#territorioTotal').iCheck('uncheck');
		jQuery("#caracteristicas_territorios").unbind('change');
		jQuery("#caracteristicas_territorios").change({param1:true},changeTerritorio);
		jQuery("#caracteristicas_continentes").prop('disabled','disabled').val([]);
		jQuery("#caracteristicas_paises").prop('disabled','disabled').val([]);
		jQuery("#caracteristicas_regiones").prop('disabled','disabled').val([]);
		jQuery("#caracteristicas_provincias").prop('disabled','disabled').val([]);
		jQuery("#caracteristicas_territorios").prop('disabled',false);
		cargarTerritoriosCaracteristicas();
	});
	
	jQuery('#selectCategorias').on('ifChecked', function(event){
//		cargar_categorias = false;
		territorio_total = false;
		inicializarListadosInformativosTerritorio();

		jQuery('#selectTerritorios').iCheck('uncheck');
		jQuery('#territorioTotal').iCheck('uncheck');
		jQuery("#caracteristicas_territorios").unbind('change');
		jQuery("#caracteristicas_territorios").change({param1:false},changeTerritorio);
		//jQuery("#caracteristicas_territorios").prop('disabled','disabled').val([]);
		jQuery("#caracteristicas_continentes").prop('disabled',false);
		jQuery("#caracteristicas_paises").prop('disabled',false);
		jQuery("#caracteristicas_regiones").prop('disabled',false);
		jQuery("#caracteristicas_provincias").prop('disabled',false);
		jQuery("#caracteristicas_territorios").prop('disabled',false);
		
		var idTerritorios = [""];
		cargarContinentes(idTerritorios);
		cargarPaises(idTerritorios, [""]);
		cargarRegiones(idTerritorios, [""], [""]);
		cargarProvincias(idTerritorios, [""], [""], [""]);
		
		
	});

	jQuery('#territorioTotal').on('ifChecked', function(event){
		inicializarListadosInformativosTerritorio();
		inicializarListadosInformativosDerecho();
		jQuery('#selectCategorias').iCheck('uncheck');
		jQuery('#selectTerritorios').iCheck('uncheck');
		jQuery("#caracteristicas_territorios").prop('disabled','disabled').val([]);
		jQuery("#caracteristicas_continentes").prop('disabled','disabled').val([]);
		jQuery("#caracteristicas_paises").prop('disabled','disabled').val([]);
		jQuery("#caracteristicas_regiones").prop('disabled','disabled').val([]);
		jQuery("#caracteristicas_provincias").prop('disabled','disabled').val([]);
		jQuery("#territoriosIncluidos").children().remove();
		jQuery("#territoriosIncluidos").prop('disabled','disabled').val([]);
		jQuery("#botonIncluirTerritorio").prop('disabled','disabled');
		jQuery("#botonQuitarTerritorio").prop('disabled','disabled');
		territorio_total = true;
	});
	
	jQuery('#territorioTotal').on('ifUnchecked', function(event){
		territorio_total = false;
		jQuery("#selectTerritorios").iCheck ('check');
		jQuery("#caracteristicas_territorios").prop('disabled',false);
		jQuery("#territoriosIncluidos").prop('disabled',false);
		jQuery("#botonIncluirTerritorio").prop('disabled',false);
		jQuery("#botonQuitarTerritorio").prop('disabled',false);
	});

	jQuery('#selectTerritorios').on('ifUnchecked', function(event){
//		cargar_categorias = false;
		jQuery("#caracteristicas_territorios").unbind('change');
		jQuery("#caracteristicas_territorios").change({param1:false},changeTerritorio);
	});

	jQuery("#botonIncluirTerritorio").click(function (){
		jQuery("#caracteristicas_territorios option:selected").each(
				function(i, territoriosDer){
					var incluir = true;
					// comprobamos que ya no esté incluido
					jQuery("#territoriosIncluidos option").each(function(j, territoriosIncl){
						if (jQuery(territoriosDer).val()==jQuery(territoriosIncl).val()){
							incluir = false;
						}
					});
					if (incluir){
						jQuery("#territoriosIncluidos").append(jQuery("<option></option>").val(jQuery(territoriosDer).val()).html(jQuery(territoriosDer).html()));
						actualizarListadosInformativosDerecho();
					}
				});
	});

	jQuery("#botonQuitarTerritorio").click(function (){
		jQuery("#territoriosIncluidos option:selected").remove();
		actualizarListadosInformativosDerecho();
	});
	
}

function inicializarListadosInformativosTerritorio(){
	jQuery("#listadoExcluidosTerritorio").children().remove();
}

function inicializarListadosInformativosDerecho(){
	jQuery("#listadoExcluidosDerecho").children().remove();
	jQuery("#listadoIncluidosDerecho").children().remove();
}

function actualizarListadosInformativosDerecho(){
	inicializarListadosInformativosDerecho();
	var idTerritorios = [""];
	jQuery("#territoriosIncluidos option").each(
			function(i, item){
				idTerritorios[i]=jQuery(item).val();		
	});
	cargarExcluidosIncluidosTerritorios(idTerritorios, "listadoExcluidosDerecho", "listadoIncluidosDerecho", false);
}

function inicializarTerritorios(open){
	
	cargarTerritoriosCaracteristicas();
	var idTerritorios = [""];
	cargarContinentes(idTerritorios);
	cargarPaises(idTerritorios, [""]);
	cargarRegiones(idTerritorios, [""], [""]);
	cargarProvincias(idTerritorios, [""], [""], [""]);

	jQuery('#selectCategorias').iCheck('uncheck');
	jQuery('#territorioTotal').iCheck('uncheck');
	jQuery('#selectTerritorios').iCheck('check');
	jQuery("#caracteristicas_continentes").prop('disabled','disabled');
	jQuery("#caracteristicas_paises").prop('disabled','disabled');
	jQuery("#caracteristicas_regiones").prop('disabled','disabled');
	jQuery("#caracteristicas_provincias").prop('disabled','disabled');
	
	jQuery("#territoriosIncluidos").children().remove();
	if (open){
		jQuery.ajax({
			url: getPrefijoUrl()+"findTerritorios.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
			  jQuery.each(data.aaData, function () {
				    jQuery("#territoriosIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idTerritorio'])
		            			.html(this['descTerritorio']));
		        });
				actualizarListadosInformativosDerecho();
		}});
	}
}

function cargarTerritoriosCaracteristicas(){
	
	var idContinentes = [""];
	jQuery("#caracteristicas_continentes option:selected").each(
			function(i, item){
				idContinentes[i]=jQuery(item).val();		
			});
	var idPaises = [""];
	jQuery("#caracteristicas_paises option:selected").each(
			function(i, item){
				idPaises[i]=jQuery(item).val();		
			});
	var idRegiones = [""];
	jQuery("#caracteristicas_regiones option:selected").each(
			function(i, item){
				idRegiones[i]=jQuery(item).val();		
			});
	var idProvincias = [""];
	jQuery("#caracteristicas_provincias option:selected").each(
			function(i, item){
				idProvincias[i]=jQuery(item).val();		
			});
	var filtro = {
			continentes: idContinentes,
			paises: idPaises,
			regiones: idRegiones,
			provincias: idProvincias
	};
	
	jQuery.ajax({
		url: "getTerritorios.htm",
		type: "GET",
		data: filtro,
		dataType: "json",
		success: function(data) {
			jQuery("#caracteristicas_territorios").children().remove();
			inicializarListadosInformativosTerritorio();
			jQuery.each(data, function () {
			    jQuery("#caracteristicas_territorios")
	            	.append(jQuery("<option></option>")
	            			.val(this['idTerritorio'])
	            			.html(this['descTerritorio']));
	        });
	}});
}
function cargarContinentes(idTerritorios){
	jQuery.ajax({
		url: "getContinentes.htm",
		type: "GET",
		data: {idTerritorios: idTerritorios},
		dataType: "json",
		success: function(data) {
			jQuery("#caracteristicas_continentes").children().remove();
			jQuery("#caracteristicas_continentes").scrollTop(); //subimos el scroll arriba del todo
			jQuery.each(data, function () {
	            jQuery("#caracteristicas_continentes")
	            	.append(jQuery("<option></option>")
	            			.val(this['idContinente'])
	            			.html(this['descContinente']));
	        });
	}});
}
function cargarPaises(idTerritorios, idContinentes){
	
	jQuery.ajax({
		url: "getPaisesIncluidos.htm",
		type: "GET",
		data: {idTerritorios: idTerritorios,
			   idContinentes: idContinentes},
		dataType: "json",
		success: function(data) {
			jQuery("#caracteristicas_paises").children().remove();
			jQuery("#caracteristicas_paises").scrollTop(); //subimos el scroll arriba del todo
			jQuery.each(data, function () {
	            jQuery("#caracteristicas_paises")
	            	.append(jQuery("<option></option>")
	            			.val(this['idPais'])
	            			.html(this['descPais']));
	        });
	}});
	
}
function cargarRegiones(idTerritorios, idContinentes, idPaises){
	jQuery.ajax({
		url: "getRegionesIncluidas.htm",
		type: "GET",
		data: {idTerritorios: idTerritorios,
				idContinentes: idContinentes,
				idPaises: idPaises},
		dataType: "json",
		success: function(data) {
			jQuery("#caracteristicas_regiones").children().remove();
			jQuery("#caracteristicas_regiones").scrollTop(); //subimos el scroll arriba del todo
			jQuery.each(data, function () {
	            jQuery("#caracteristicas_regiones")
	            	.append(jQuery("<option></option>")
	            			.val(this['idRegion'])
	            			.html(this['descRegion']));
	        });
	}});
}
function cargarProvincias(idTerritorios, idContinentes, idPaises, idRegiones){
	jQuery.ajax({
		url: "getProvinciasIncluidas.htm",
		type: "GET",
		data: {idTerritorios: idTerritorios,
			idContinentes: idContinentes,
			idPaises: idPaises,
			idRegiones: idRegiones},
		dataType: "json",
		success: function(data) {
			jQuery("#caracteristicas_provincias").children().remove();
			jQuery("#caracteristicas_provincias").scrollTop(); //subimos el scroll arriba del todo
			jQuery.each(data, function () {
	            jQuery("#caracteristicas_provincias")
	            	.append(jQuery("<option></option>")
	            			.val(this['idProvincia'])
	            			.html(this['descProvincia']));
	        });
	}});
}
function cargarExcluidosIncluidosTerritorios(idTerritorios, output_excluidos, output_incluidos, cargarCategorias){
	jQuery.ajax({
		url: "getExcluidosIncluidosTerritorios.htm",
		type: "GET",
		data: {idTerritorios: idTerritorios},
		dataType: "json",
		success: function(data) {
			
			var paisesE = data.paisesE;
			var regionesE = data.regionesE;
			var provinciasE = data.provinciasE;
			var continentesI = data.continentesI;
			var paisesI = data.paisesI;
			var regionesI = data.regionesI;
			var provinciasI = data.provinciasI;
			
			// Componemos la lista de excluidos(segun el campo que le indiquemos en "output_excluidos" compondrá la lista de excluidos de los  
			// territorios seleccionados o la lista de excluidos de los territorios del derecho) y la pintamos en la pagina
			createListaExcluidos(output_excluidos, paisesE, regionesE, provinciasE);
			// Componemos la lista de incluidos para la lista del contenido simpificado de los teritorios del derecho y la pintamos en la pagina
			createListaContenidoSimplificado(output_incluidos, continentesI, paisesI, regionesI, provinciasI);
			
			if (cargarCategorias){ // si se seleccionan territorios tenemos que cargar los continentes, paises, regiones y provincias que tengan incluidas esos territorios
				jQuery("#caracteristicas_continentes").children().remove();
				jQuery.each(continentesI, function (i, continente) {
		            jQuery("#caracteristicas_continentes")
	            	.append(jQuery("<option></option>")
	            			.val(continente.idContinente)
	            			.html(continente.descContinente));
		        });

				jQuery("#caracteristicas_paises").children().remove();
				jQuery.each(paisesI, function (i, pais) {
		            jQuery("#caracteristicas_paises")
	            	.append(jQuery("<option></option>")
	            			.val(pais.idPais)
	            			.html(pais.descPais));
		        });

				jQuery("#caracteristicas_regiones").children().remove();
				jQuery.each(regionesI, function (i, region) {
		            jQuery("#caracteristicas_regiones")
	            	.append(jQuery("<option></option>")
	            			.val(region.idRegion)
	            			.html(region.descRegion));
		        });

				jQuery("#caracteristicas_provincias").children().remove();
				jQuery.each(provinciasI, function (i, provincia) {
		            jQuery("#caracteristicas_provincias")
	            	.append(jQuery("<option></option>")
	            			.val(provincia.idProvincia)
	            			.html(provincia.descProvincia));
		        });
			}
	}});
}
function cargarFormularioTerritorio(){
	
	jQuery("#form_addTerritorio").dialog({
		height : 700,
		width : 1370,
		title : "Territorios",
		open: function( event, ui ) {
			inicializarTerritorios(true);
		},
		buttons : {
			"Guardar" : function() {
				guardarCaracteristicaTerritorios();
				jQuery(this).dialog("close");
			},
			"Cancelar" : function() {
				jQuery(this).dialog("close");
			}
		},
		close:function (){
		    
		}
	});
	jQuery("#form_addTerritorio", window.parent.document).scrollTop(0);
}

function guardarCaracteristicaTerritorios(){
	var idTerritoriosIncluidos = [""];
	if (!territorio_total){
		jQuery("#territoriosIncluidos option").each(
				function(i, item){
					idTerritoriosIncluidos[i]=jQuery(item).val();		
		});
	}
	
	jQuery.ajax({
		url: getPrefijoUrl()+"guardarTerritorio.htm",
		type: "GET",
		data: getParametrosGuardarTerritorios(idTerritoriosIncluidos, territorio_total),
		dataType: "json",
		success: function(id) {
			var tipo_formulario = (jQuery('#tipoFormulario_hidden')!=undefined?jQuery('#tipoFormulario_hidden').val():"");
			if (id != ""){
				if (tipo_formulario == plantillas)
					jQuery("#idPlantillaDerecho").val(id);
				else
					jQuery("#idCaracteristica").val(id);
			}
			obtenerTablaTerritorios();
		}
	});
}

function changeTerritorio(event){
	var idTerritorios = [""];
	jQuery("#caracteristicas_territorios option:selected").each(
			function(i, item){
				idTerritorios[i]=jQuery(item).val();		
			});
	if (event.data.param1){
		cargarExcluidosIncluidosTerritorios(idTerritorios, "listadoExcluidosTerritorio", null, true);
//		cargarContinentes(idTerritorios);
//		cargarPaises(idTerritorios);
//		cargarRegiones(idTerritorios);
//		cargarProvincias(idTerritorios);
	} else {
		cargarExcluidosIncluidosTerritorios(idTerritorios, "listadoExcluidosTerritorio", null, false);
	}
}


function obtenerTablaTerritorios() {
	
	jQuery.ajax({
		url: getPrefijoUrl()+"findTerritorios.htm",
		type: "GET",
		data: getIdBusquedaCaracteristicas(),
		dataType: "json",
		success: function(data) {
			var cadena = "";
			jQuery.each(data.aaData, function (j, territorio) {
				if (j==0){
					cadena = territorio.descTerritorio;
				} else {
					cadena += ", " + territorio.descTerritorio;
				}
			});
			jQuery("#listadoCaracteristicaTerritorios").html(cadena);
	}});
	
}

function createListaContenidoSimplificado(output_incluidos, continentesI, paisesI, regionesI, provinciasI){
	if (output_incluidos!=null && output_incluidos!=""){
		jQuery("#"+output_incluidos).children().remove();
		var incluidos = jQuery("#"+output_incluidos);
		jQuery.each(continentesI, function (j, continente) {
			if (j==0){
				var nuevoDivContinente = jQuery('<div class="tituloCategorias">Continentes</div>');
				incluidos.append(nuevoDivContinente);
			}
			incluidos.append(createNuevoContinente(continente, output_incluidos+"_idIncluido"));
        });
		jQuery.each(paisesI, function (j, pais) {
			if (j==0){
				var nuevoDivPais = jQuery('<div class="tituloCategorias">Países</div>');
				incluidos.append(nuevoDivPais);
			}
			incluidos.append(createNuevoPais(pais, output_incluidos+"_idIncluido"));
        });
		jQuery.each(regionesI, function (k, region) {
			if (k==0){
				var nuevoDivRegion = jQuery('<div class="tituloCategorias">Regiones</div>');
				incluidos.append(nuevoDivRegion);
			}
			incluidos.append(createNuevaRegion(region, output_incluidos+"_idIncluido"));
        });
		jQuery.each(provinciasI, function (l, provincia) {
			if (l==0){
				var nuevoDivProvincia = jQuery('<div class="tituloCategorias">Provincias</div>');
				incluidos.append(nuevoDivProvincia);
			}
			incluidos.append(createNuevaProvincia(provincia, output_incluidos+"_idIncluido"));
        });
	}
}
function createListaExcluidos(output_excluidos, paisesE, regionesE, provinciasE){
	if (output_excluidos!=null && output_excluidos!=""){
		jQuery("#"+output_excluidos).children().remove();
		var exluidos = jQuery("#"+output_excluidos);
		jQuery.each(paisesE, function (j, pais) {
			if (j==0){
				var nuevoDivPais = jQuery('<div class="tituloCategorias">Países</div>');
				exluidos.append(nuevoDivPais);
			}
			exluidos.append(createNuevoPais(pais, output_excluidos+"_idExcluido"));
        });
		jQuery.each(regionesE, function (k, region) {
			if (k==0){
				var nuevoDivRegion = jQuery('<div class="tituloCategorias">Regiones</div>');
				exluidos.append(nuevoDivRegion);
			}
			exluidos.append(createNuevaRegion(region, output_excluidos+"_idExcluido"));
        });
		jQuery.each(provinciasE, function (l, provincia) {
			if (l==0){
				var nuevoDivProvincia = jQuery('<div class="tituloCategorias">Provincias</div>');
				exluidos.append(nuevoDivProvincia);
			}
			exluidos.append(createNuevaProvincia(provincia, output_excluidos+"_idExcluido"));
        });
	};
}

function createNuevaProvincia(provincia, atributo){
	var nuevoProvincia = jQuery('<li>');
	nuevoProvincia.attr(atributo, provincia.idProvincia);
	nuevoProvincia.append(provincia.descProvincia);
	return nuevoProvincia;
}
function createNuevaRegion(region, atributo){
	var nuevoRegion = jQuery('<li>');
	nuevoRegion.attr(atributo, region.idRegion);
	nuevoRegion.append(region.descRegion);
	return nuevoRegion;
}
function createNuevoPais(pais, atributo){
	var nuevoPais = jQuery('<li>');
	nuevoPais.attr(atributo, pais.idPais);
	nuevoPais.append(pais.descPais);
	return nuevoPais;
}
function createNuevoContinente(continente, atributo){
	var nuevoContinente = jQuery('<li>');
	nuevoContinente.attr(atributo, continente.idContinente);
	nuevoContinente.append(continente.descContinente);
	return nuevoContinente;
}

