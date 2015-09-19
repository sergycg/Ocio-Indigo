function initButtonAddIdioma(){
	obtenerTablaIdiomas();
	
	jQuery('#addIdioma').click(function(event) {
		event.preventDefault();
		if (tipo_formulario == plantillas && 
			jQuery("#grupoCadenasDCP_EI").is(":visible") &&
			jQuery("#descripcionGrupoCadenas").val() == "")
			showError("Debe seleccionar un grupo de cadenas", '');
		else
			cargarFormularioIdioma();
	});
	
	jQuery("#botonIncluirIdioma").click(function (){
		jQuery("#caracteristicas_idiomasDerecho option:selected").each(
				function(i, idiomasDer){
					var incluir = true;
					// comprobamos que ya no esté incluido
					jQuery("#caracteristicas_idiomasIncluidos option").each(function(j, idiomasIncl){
						if (jQuery(idiomasDer).val()==jQuery(idiomasIncl).val()){
							incluir = false;
						}
					});
					if (incluir){
						jQuery("#caracteristicas_idiomasIncluidos").append(jQuery("<option></option>").val(jQuery(idiomasDer).val()).html(jQuery(idiomasDer).html()));
					}
				});
	});

	jQuery("#botonQuitarIdioma").click(function (){
		jQuery("#caracteristicas_idiomasIncluidos option:selected").remove();
	});
	
}

function inicializarIdiomas(open){
	
	cargarIdiomas();

	jQuery("#caracteristicas_idiomasIncluidos").children().remove();
	if (open){
		jQuery.ajax({
			url: getPrefijoUrl()+"findIdiomas.htm",
			type: "GET",
			data: getIdBusquedaCaracteristicas(),
			dataType: "json",
			success: function(data) {
			  jQuery.each(data.aaData, function () {
				    jQuery("#caracteristicas_idiomasIncluidos")
		            	.append(jQuery("<option></option>")
		            			.val(this['idIdioma'])
		            			.html(this['descIdioma']));
		        });
		}});
	}
}

function cargarIdiomas(){
	jQuery.ajax({
		url: "getIdiomas.htm",
		type: "GET",
		dataType: "json",
		success: function(data) {
			jQuery("#caracteristicas_idiomasDerecho").children().remove();
		  jQuery.each(data, function () {
			    jQuery("#caracteristicas_idiomasDerecho")
	            	.append(jQuery("<option></option>")
	            			.val(this['idIdioma'])
	            			.html(this['descIdioma']));
	        });
	}});
}


function cargarFormularioIdioma(){
	
	jQuery("#form_addIdioma").dialog({
		height : 380,
		width : 650,
		title : "Idiomas",
		open: function( event, ui ) {
			inicializarIdiomas(true);
		},
		buttons : {
			"Guardar" : function() {
				var idIdiomasIncluidos = [""];
				jQuery("#caracteristicas_idiomasIncluidos option").each(
						function(i, item){
							idIdiomasIncluidos[i]=jQuery(item).val();		
						});
				guardarCaracteristicaIdiomas(idIdiomasIncluidos);
				jQuery(this).dialog("close");
			},
			"Cancelar" : function() {
				jQuery(this).dialog("close");
			}
		},
		close:function (){
		    
		}
	});
	
	jQuery("#form_addIdioma", window.parent.document).scrollTop(0);
	
}


function guardarCaracteristicaIdiomas(idIdiomasIncluidos){
	jQuery.ajax({
		url: getPrefijoUrl()+"guardarIdioma.htm",
		type: "GET",
		data: getParametrosGuardarIdiomas(idIdiomasIncluidos),
		dataType: "json",
		success: function(id) {
			var tipo_formulario = (jQuery('#tipoFormulario_hidden')!=undefined?jQuery('#tipoFormulario_hidden').val():"");
			if (id != ""){
				if (tipo_formulario == plantillas)
					jQuery("#idPlantillaDerecho").val(id);
				else
					jQuery("#idCaracteristica").val(id);
			}
			obtenerTablaIdiomas();
		}
	});
}

function obtenerTablaIdiomas() {
	jQuery.ajax({
		url: getPrefijoUrl()+"findIdiomas.htm",
		type: "GET",
		data: getIdBusquedaCaracteristicas(),
		dataType: "json",
		success: function(data) {
			var cadena = "";
			jQuery.each(data.aaData, function (j, idioma) {
				if (j==0){
					cadena = idioma.descIdioma;
				} else {
					cadena += ", " + idioma.descIdioma;
				}
			});
			jQuery("#listadoCaracteristicaIdiomas").html(cadena);
	}});
}