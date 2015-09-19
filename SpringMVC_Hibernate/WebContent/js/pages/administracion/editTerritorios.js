var URL_CONTINENTES = "getContinentes.htm";
var URL_PAISES = "getPaisesAdmin.htm";
var URL_REGIONES = "getRegionesAdmin.htm";
var URL_PROVINCIAS = "getProvinciasAdmin.htm";

var funcion_cargarResumenContinentes = function cargarResumenContinentes(id_select, campo_output){
	var param = {idContinentes: getSeleccionados(id_select)};
	var cadena = "";
	jQuery.ajax({
		url: URL_PAISES,
		type: "GET",
		data: param,
		dataType: "json",
		success: function(data) {
			var padre = "default";
			jQuery.each(data.excluidos, function (i, item) {
				if (padre!=item.codigoPadre){
					padre = item.codigoPadre;
					if (i!=0){
						cadena += ") <br>";
					}
					
					cadena += "<b>" + item.descripcionPadre + "</b> (" + item.descripcion;
				} else {
					cadena += ", " + item.descripcion;
				}
					
		    });
			if (padre!="default")
				cadena += ")";
			jQuery(campo_output).html(cadena);
		}
	});
};

var funcion_cargarResumenPaises = function cargarResumenPaises(id_select, campo_output){
	var cadena = "";
	jQuery(id_select+" option:selected").each(
			function(i, item){
				if (i==0){
					cadena = jQuery(item).html();
				} else {
					cadena += ", " + jQuery(item).html();
				}
			});
	jQuery(campo_output).html(cadena);
};

var funcion_cargarResumenRegionesProvincias = function cargarResumenRegionesProvincias(id_select, campo_output){
	var cadena = "";
	var padre = "default";
	jQuery(id_select+" option:selected").each(
			function(i, item){
				if (padre!=getOptgroupLabel(item) && i!=0){
					cadena += " (" + padre + ")";
				}
				padre = getOptgroupLabel(item);
				if (i==0){
					cadena = jQuery(item).html();
				} else {
					cadena += ", " + jQuery(item).html();
				}
			});
	if (padre!="default")
		cadena += " (" + padre + ")";
	jQuery(campo_output).html(cadena);
};

jQuery(document).ready(function() {

	inicializarCombos();
	inicializarCheck();
	addControlCheck();
	establecerDatosTerritorioSeleccionado();
	addControlContinentes();
	addControlPaises();
	addControlRegiones();
	addControlProvincias();
	addControlBotonSave();
	
});


function addControlContinentes(){
	jQuery("#continentes").change(function (){
		var idContinentes = getSeleccionados("#continentes");
		var idPaisesInc = getSeleccionados("#paisesInc");
		var idPaisesExc = getSeleccionados("#paisesExc");
		var idRegionesInc = getSeleccionados("#regionesInc");
		var idRegionesExc = getSeleccionados("#regionesExc");
		var idProvinciasInc = getSeleccionados("#provinciasInc");
		var idProvinciasExc = getSeleccionados("#provinciasExc");
		
		cargarPaises(idContinentes, idPaisesInc, idPaisesExc, idRegionesInc, idRegionesExc, idProvinciasInc, idProvinciasExc);
		
		funcion_cargarResumenContinentes("#continentes","#resumenContinentes");
	});
}

function addControlPaises(){
	jQuery("#paisesInc").change(function (){
		var idContinentes = getSeleccionados("#continentes");
		var idPaisesInc = getSeleccionados("#paisesInc");
		var idPaisesExc = getSeleccionados("#paisesExc");
		var idRegionesInc = getSeleccionados("#regionesInc");
		var idRegionesExc = getSeleccionados("#regionesExc");
		var idProvinciasInc = getSeleccionados("#provinciasInc");
		var idProvinciasExc = getSeleccionados("#provinciasExc");

		cargarRegiones(idContinentes, idPaisesInc, idPaisesExc, idRegionesInc, idRegionesExc, idProvinciasInc, idProvinciasExc);

		funcion_cargarResumenPaises("#paisesInc","#resumenPaisesInc");
	}); 
	
	jQuery("#paisesExc").change(function (){
		
		var idContinentes = getSeleccionados("#continentes");
		var idPaisesInc = getSeleccionados("#paisesInc");
		var idPaisesExc = getSeleccionados("#paisesExc");
		var idRegionesInc = getSeleccionados("#regionesInc");
		var idRegionesExc = getSeleccionados("#regionesExc");
		var idProvinciasInc = getSeleccionados("#provinciasInc");
		var idProvinciasExc = getSeleccionados("#provinciasExc");

		cargarRegiones(idContinentes, idPaisesInc, idPaisesExc, idRegionesInc, idRegionesExc, idProvinciasInc, idProvinciasExc);

		funcion_cargarResumenPaises("#paisesExc","#resumenPaisesExc");
	});
	
}
function addControlRegiones(){
	jQuery("#regionesInc").change(function (){
		var idContinentes = getSeleccionados("#continentes");
		var idPaisesInc = getSeleccionados("#paisesInc");
		var idPaisesExc = getSeleccionados("#paisesExc");
		var idRegionesInc = getSeleccionados("#regionesInc");
		var idRegionesExc = getSeleccionados("#regionesExc");
		var idProvinciasInc = getSeleccionados("#provinciasInc");
		var idProvinciasExc = getSeleccionados("#provinciasExc");

		cargarProvincias(idContinentes, idPaisesInc, idPaisesExc, idRegionesInc, idRegionesExc, idProvinciasInc, idProvinciasExc);

		funcion_cargarResumenRegionesProvincias("#regionesInc","#resumenRegionesInc");
	});
	
	jQuery("#regionesExc").change(function (){
		
		var idContinentes = getSeleccionados("#continentes");
		var idPaisesInc = getSeleccionados("#paisesInc");
		var idPaisesExc = getSeleccionados("#paisesExc");
		var idRegionesInc = getSeleccionados("#regionesInc");
		var idRegionesExc = getSeleccionados("#regionesExc");
		var idProvinciasInc = getSeleccionados("#provinciasInc");
		var idProvinciasExc = getSeleccionados("#provinciasExc");


		cargarProvincias(idContinentes, idPaisesInc, idPaisesExc, idRegionesInc, idRegionesExc, idProvinciasInc, idProvinciasExc);
		funcion_cargarResumenRegionesProvincias("#regionesExc","#resumenRegionesExc");

	});
}

function addControlProvincias(){
	jQuery("#provinciasInc").change(function (){

		funcion_cargarResumenRegionesProvincias("#provinciasInc","#resumenProvinciasInc");
	});
	
	jQuery("#provinciasExc").change(function (){

		funcion_cargarResumenRegionesProvincias("#provinciasExc","#resumenProvinciasExc");
	});
}

function addControlCheck(){
	jQuery('#checkExcluidos').on('ifChecked', function(event){
		jQuery("#paisesExc").multiselect('enable');
		jQuery("#regionesExc").multiselect('enable');
		jQuery("#provinciasExc").multiselect('enable');
		jQuery('#resumenExcluidos').css('display','block');
		
	});
	jQuery('#checkExcluidos').on('ifUnchecked', function(event){
		jQuery("#paisesExc").multiselect('disable');
		jQuery("#regionesExc").multiselect('disable');
		jQuery("#provinciasExc").multiselect('disable');
		jQuery('#resumenExcluidos').css('display','none');
	});

}
function inicializarCheck(){
	jQuery('#checkExcluidos').iCheck('uncheck');
	jQuery("#paisesExc").multiselect('disable');
	jQuery("#regionesExc").multiselect('disable');
	jQuery("#provinciasExc").multiselect('disable');

}

function addControlBotonSave(){
	jQuery('#save').click(function(event) {
		var mensajeValidacion = validarTerritorio(); 
		if (mensajeValidacion != ""){
			event.preventDefault();
			showWarning (mensajeValidacion);
		} else {
			jQuery("#continentesSeleccionados").val(getSeleccionados("#continentes"));
			jQuery("#paisesIncSeleccionados").val(getSeleccionados("#paisesInc"));
			jQuery("#regionesIncSeleccionados").val(getSeleccionados("#regionesInc"));
			jQuery("#provinciasIncSeleccionados").val(getSeleccionados("#provinciasInc"));

			jQuery("#paisesExcSeleccionados").val(getSeleccionados("#paisesExc"));
			jQuery("#regionesExcSeleccionados").val(getSeleccionados("#regionesExc"));
			jQuery("#provinciasExcSeleccionados").val(getSeleccionados("#provinciasExc"));

			jQuery("#editTerritorios").submit((function( event ) {}));
		}
	});
}


function cargarContinentes(idTerritorios, ids_selected){
	jQuery.ajax({
		url: URL_CONTINENTES,
		type: "GET",
		data: {idTerritorios: idTerritorios},
		dataType: "json",
		success: function(data) {
			jQuery("#continentes").children().remove();
			jQuery("#continentes").scrollTop(); //subimos el scroll arriba del todo
			jQuery.each(data, function () {
				if (estaSeleccionado(this['idContinente'], ids_selected)){
					jQuery("#continentes").append(jQuery("<option selected></option>").val(this['idContinente']).html(this['descContinente']));
				}else{
					jQuery("#continentes").append(jQuery("<option></option>").val(this['idContinente']).html(this['descContinente']));
				}
	        });
			jQuery("#continentes").multiselect("refresh");
			funcion_cargarResumenContinentes("#continentes","#resumenContinentes");
	}});
}

function cargarPaises(idContinentes, ids_paisesInclSelected, ids_paisesExclSelected, ids_regionesInclSelected, ids_regionesExclSelected, ids_provinciasInclSelected, ids_provinciasExclSelected){
	
	var param = {idContinentes: idContinentes};
	
	jQuery.ajax({
		url: URL_PAISES,
		type: "GET",
		data: param,
		dataType: "json",
		success: function(data) {
			deleteSelect("#paisesInc");
			createSelect(data.incluidos, "#paisesInc", ids_paisesInclSelected);
			funcion_cargarResumenPaises("#paisesInc", "#resumenPaisesInc");
			deleteSelect("#paisesExc");
			createSelect(data.excluidos, "#paisesExc", ids_paisesExclSelected);
			funcion_cargarResumenPaises("#paisesExc", "#resumenPaisesExc");
			cargarRegiones(getSeleccionados("#continentes"), getSeleccionados("#paisesInc"), getSeleccionados("#paisesExc"), ids_regionesInclSelected, ids_regionesExclSelected, ids_provinciasInclSelected, ids_provinciasExclSelected);
		}
	});

	
}

function cargarRegiones(idContinentes, idPaisesInc, idPaisesExc, ids_regionesInclSelected, ids_regionesExclSelected, ids_provinciasInclSelected, ids_provinciasExclSelected){
	var param = {idContinentes: idContinentes,
				idPaisesInc: idPaisesInc,
				idPaisesExc: idPaisesExc};
	
	jQuery.ajax({
		url: URL_REGIONES,
		type: "GET",
		data: param,
		dataType: "json",
		success: function(data) {
			deleteSelect("#regionesInc");
			createSelect(data.incluidos, "#regionesInc", ids_regionesInclSelected);
			funcion_cargarResumenRegionesProvincias("#regionesInc", "#resumenRegionesInc");
			deleteSelect("#regionesExc");
			createSelect(data.excluidos, "#regionesExc", ids_regionesExclSelected);
			funcion_cargarResumenRegionesProvincias("#regionesExc", "#resumenRegionesExc");
			cargarProvincias(getSeleccionados("#continentes"), getSeleccionados("#paisesInc"), getSeleccionados("#paisesExc"), getSeleccionados("#regionesInc"), getSeleccionados("#regionesExc"), ids_provinciasInclSelected, ids_provinciasExclSelected);
		}
	});
	
}

function cargarProvincias(idContinentes, idPaisesInc, idPaisesExc, idRegionesInc, idRegionesExc, ids_provinciasInclSelected, ids_provinciasExclSelected){
	var param = {idContinentes: idContinentes,
				idPaisesInc: idPaisesInc,
				idPaisesExc: idPaisesExc,
				idRegionesInc: idRegionesInc,
				idRegionesExc: idRegionesExc};

	jQuery.ajax({
		url: URL_PROVINCIAS,
		type: "GET",
		data: param,
		dataType: "json",
		success: function(data) {
			deleteSelect("#provinciasInc");
			createSelect(data.incluidos, "#provinciasInc", ids_provinciasInclSelected);
			funcion_cargarResumenRegionesProvincias("#provinciasInc", "#resumenProvinciasInc");
			deleteSelect("#provinciasExc");
			createSelect(data.excluidos, "#provinciasExc", ids_provinciasExclSelected);
			funcion_cargarResumenRegionesProvincias("#provinciasExc", "#resumenProvinciasExc");
		}
	});
	
}


function inicializarCombos(){
	jQuery("#continentes").multiselect({
		checkAllText: jQuery("#seleccionarTodo").val(),
		uncheckAllText: jQuery("#deseleccionarTodo").val(),
		minWidth: '355',
		selectedList: 5,
		selectableOptgroup: false,
		noneSelectedText: jQuery("#ningunContinenteSeleccionado").val(),
		click: function (event,ui){
//			addOrRemovePaisesToExclude (ui);
		}
//		},
//		checkAll: function (event, ui){
//			addOrRemovePaisesToExclude (ui);
//		},
//		uncheckAll: function (event, ui){
//			addOrRemovePaisesToExclude (ui);
//		}
	}).multiselectfilter({
		label: "Filtro: ",
		placeholder: ""
	});
	
	jQuery("#paisesInc").multiselect({
//		checkAllText: jQuery("#seleccionarTodo").val(),
//		uncheckAllText: jQuery("#deseleccionarTodo").val(),
		minWidth: '355',
		selectedList: 5,
		noneSelectedText: jQuery("#ningunPaisSeleccionado").val(),
		selectableOptgroup: false,
		click: function (event,ui){
//			addOrRemoveRegionesToExclude (ui);
		}
	}).multiselectfilter({
		label: "Filtro: ",
		placeholder: ""
	});

	jQuery("#regionesInc").multiselect({
//		checkAllText: jQuery("#seleccionarTodo").val(),
//		uncheckAllText: jQuery("#deseleccionarTodo").val(),
		minWidth: '226',
		selectedList: 3,
		noneSelectedText: jQuery("#ningunaRegionSeleccionada").val(),
		selectableOptgroup: false,
		click: function (event,ui){
//			addOrRemoveProvinciasToExclude (ui);
		}
	}).multiselectfilter({
		label: "Filtro: ",
		placeholder: ""
	});
	
	jQuery("#provinciasInc").multiselect({
//		checkAllText: jQuery("#seleccionarTodo").val(),
//		uncheckAllText: jQuery("#deseleccionarTodo").val(),
		minWidth: '225',
		selectedList: 3,
		noneSelectedText: jQuery("#ningunaProvinciaSeleccionada").val(),
		selectableOptgroup: false
	}).multiselectfilter({
		label: "Filtro: ",
		placeholder: ""
	});

	jQuery("#paisesExc").multiselect({
//		checkAllText: jQuery("#seleccionarTodo").val(),
//		uncheckAllText: jQuery("#deseleccionarTodo").val(),
		minWidth: '355',
		selectedList: 5,
		noneSelectedText: jQuery("#ningunPaisExcluido").val(),
		selectableOptgroup: false,
		click: function (event,ui){
//			addOrRemoveRegionesToExclude (ui, true);
		}
	}).multiselectfilter({
		label: "Filtro: ",
		placeholder: ""
	});

	jQuery("#regionesExc").multiselect({
//		checkAllText: jQuery("#seleccionarTodo").val(),
//		uncheckAllText: jQuery("#deseleccionarTodo").val(),
		minWidth: '226',
		selectedList: 3,
		noneSelectedText: jQuery("#ningunaRegionExcluida").val(),
		selectableOptgroup: false,
		click: function (event,ui){
//			addOrRemoveProvinciasToExclude (ui, true);
		}
	}).multiselectfilter({
		label: "Filtro: ",
		placeholder: ""
	});
	
	jQuery("#provinciasExc").multiselect({
//		checkAllText: jQuery("#seleccionarTodo").val(),
//		uncheckAllText: jQuery("#deseleccionarTodo").val(),
		minWidth: '225',
		selectedList: 3,
		noneSelectedText: jQuery("#ningunaProvinciaExcluida").val(),
		selectableOptgroup: false
	}).multiselectfilter({
		label: "Filtro: ",
		placeholder: ""
	});

	jQuery (".ui-multiselect-all").hide();
	jQuery (".ui-multiselect-none").hide();

}

function establecerDatosTerritorioSeleccionado(){
	var esNuevo = jQuery("#indNuevo").val();
	var idContinentesSeleccionados = [""];
	var idPaisesIncSeleccionados = [""];
	var idPaisesExcSeleccionados = [""];
	var idRegionesIncSeleccionados = [""];
	var idRegionesExcSeleccionados = [""];
	var idProvinciasIncSeleccionados = [""];
	var idProvinciasExcSeleccionados = [""];
	
	if (esNuevo=="false"){
		idContinentesSeleccionados = jQuery("#continentesSeleccionados").val().split(",");
		idPaisesIncSeleccionados = jQuery("#paisesIncSeleccionados").val().split(",");
		idPaisesExcSeleccionados = jQuery("#paisesExcSeleccionados").val().split(",");
		idRegionesIncSeleccionados = jQuery("#regionesIncSeleccionados").val().split(",");
		idRegionesExcSeleccionados = jQuery("#regionesExcSeleccionados").val().split(",");
		idProvinciasIncSeleccionados = jQuery("#provinciasIncSeleccionados").val().split(",");
		idProvinciasExcSeleccionados = jQuery("#provinciasExcSeleccionados").val().split(",");
		if ((idPaisesExcSeleccionados!=null && idPaisesExcSeleccionados!="")
			|| (idRegionesExcSeleccionados!=null && idRegionesExcSeleccionados!="")
			|| (idProvinciasExcSeleccionados!=null && idProvinciasExcSeleccionados!="")) {
			
			jQuery('#checkExcluidos').iCheck('check');
			jQuery("#paisesExc").multiselect('enable');
			jQuery("#regionesExc").multiselect('enable');
			jQuery("#provinciasExc").multiselect('enable');
		} else {
			jQuery('#checkExcluidos').iCheck('uncheck');
			jQuery("#paisesExc").multiselect('disable');
			jQuery("#regionesExc").multiselect('disable');
			jQuery("#provinciasExc").multiselect('disable');
		}

	}
	cargarContinentes([""], idContinentesSeleccionados);
	cargarPaises(idContinentesSeleccionados, idPaisesIncSeleccionados, idPaisesExcSeleccionados, idRegionesIncSeleccionados, idRegionesExcSeleccionados, idProvinciasIncSeleccionados, idProvinciasExcSeleccionados);

}


function deleteSelect(campo_output){
	jQuery(campo_output).children().remove();
	jQuery(campo_output).scrollTop(); //subimos el scroll arriba del todo
}

function createSelect(data, campo_output, ids_selected){
	var padre = "default";
	var optgroup = null;
	jQuery.each(data, function () {
		if (padre!=this['codigoPadre']){
			padre = this['codigoPadre'];
			
			optgroup = jQuery('<optgroup>');
			optgroup.attr('label',this['descripcionPadre']);
			jQuery(campo_output).append(optgroup);
		}
		if (estaSeleccionado(this['codigo'], ids_selected)){
			optgroup.append(jQuery("<option selected></option>").val(this['codigo']).html(this['descripcion']));
		}else{
			optgroup.append(jQuery("<option></option>").val(this['codigo']).html(this['descripcion']));
		}
			
    });
	jQuery(campo_output).multiselect("refresh");
}

function getSeleccionados(id_select){
	var ids = [""];
	jQuery(id_select+" option:selected").each(
			function(i, item){
				ids[i]=jQuery(item).val();		
			});
	return ids;
}

function estaSeleccionado(id, array_ids){
	var selected = false;
	if (array_ids!=null && array_ids!=""){
		for(var i=0;i<array_ids.length;i++){
			if (id==array_ids[i]){
				selected = true;
				break;
			}
	    }
	}
	return selected;
}

function getOptgroupLabel(item)
{
    return jQuery(item).closest('optgroup').prop('label');
}

function validarTerritorio(){
	var error = "";
	var descripcion = jQuery("#descTerritorio").val();
	var idTerritorio = jQuery("#idTerritorio").val();
	var idTerritorioTotal = jQuery("#idTerritorioTotal").val();
	if (idTerritorio==idTerritorioTotal){
		error = "No se permite modificar el Territorio Total";
	}else if (descripcion==null || descripcion==""){
		error = "El nombre de territorio no puede estar vacío";
	}else{
		var noSeleccionados = false;
		
		noSeleccionados = (jQuery("#continentes").val () == null &&
			jQuery("#paisesInc").val () == null &&
			jQuery("#paisesExc").val () == null &&
			jQuery("#regionesInc").val () == null &&
			jQuery("#regionesExc").val () == null &&
			jQuery("#provinciasInc").val () == null &&
			jQuery("#provinciasExc").val () == null);
		
		if (noSeleccionados){
			error = "No ha seleccionado ningún continente, país, región o provincia para formar parte del territorio";
		}
	}
	return error;
}