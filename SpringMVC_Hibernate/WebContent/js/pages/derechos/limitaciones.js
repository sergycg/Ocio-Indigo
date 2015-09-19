var tipoForm = "";

jQuery(document).ready(function(){
	if (jQuery("#derechoCPIForm").val()!= undefined)
		tipoForm = "CPI";
	if (jQuery("#derechoTRNForm").val() != undefined)
		tipoForm = "TRN";
	if (jQuery("#derechoDISForm").val() != undefined)
		tipoForm = "DIS";
	if (jQuery("#derechoINTForm").val() != undefined)
		tipoForm = "INT";

	obtenerTablaLimitaciones();

	jQuery('#botonNuevaLimitacion').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion
		event.preventDefault();
		if (!jQuery("#" + this.form.id).valid()){
			jQuery("html, body").animate({ scrollTop: 0 }, "slow");
		}else{
			limpiarCamposLimitacion();
			cargarFormularioLimitacion("addLimitacion");
		}
	});
});

function limpiarCamposLimitacion(){
	var allFields = jQuery("#form_crearLimitacion input");
	allFields.val("");
	var allFields2 = jQuery("#form_crearLimitacion textarea");
	allFields2.val("");
}

function cargarFormularioLimitacion(accion){
	
	var validatorLimitaciones = validarFormulario("derecho" + tipoForm + "Form", "form_crearLimitacion");
	var editable = jQuery('#indEditable').val();
	
	// Si no es editable, no se pone botón Guardar
	if (editable=="false"){
	
		var create = jQuery("#form_crearLimitacion").dialog({
			height : 350,
			width : 560,
			title : "Limitaciones",
			buttons : {
				"Cancelar" : function() {
					limpiarCamposLimitacion();
					validatorLimitaciones.resetForm();
					jQuery(this).dialog("close");
				}
			},
			close:function (){
				validatorLimitaciones.resetForm();
			    limpiarCamposLimitacion();
			}
		});
	}else{
		var create = jQuery("#form_crearLimitacion").dialog({
			height : 350,
			width : 560,
			title : "Limitaciones",
			buttons : {
				"Guardar" : function() {
					jQuery("#action").val(accion);
	        		jQuery("#derecho" + tipoForm + "Form").submit();
				},
				"Cancelar" : function() {
					limpiarCamposLimitacion();
					validatorLimitaciones.resetForm();
					jQuery(this).dialog("close");
				}
			},
			close:function (){
				validatorLimitaciones.resetForm();
			    limpiarCamposLimitacion();
			}
		});
		
	}
	create.parent().appendTo(jQuery("form:first"));
	jQuery("#form_crearLimitacion", window.parent.document).scrollTop(0);
	autocompletarTipoEntidad();
}

function autocompletarTipoEntidad(){
	generaAutocomplete(jQuery('#codigoTELimitacion'),
			   jQuery('#descripcionTELimitacion'),
			   "autocompleteTipoEntidad.htm", 
			   "", 
			   "");
}

function obtenerTablaLimitaciones() {
	objectDataTable.url = "findLimitacionesByDerecho.htm";        	
	objectDataTable.columns = [ {"sWidth" : '15%',"mDataProp" : "idLimitacion"}, 
	         	                {"sWidth" : '40%',"mDataProp" : "descLimitacion"}, 
	         	                {"sWidth" : '15%',"mDataProp" : "tipoEntidad"},
	         	                {"sWidth" : '29%',"mDataProp" : "descEntidadLimitacion"},
	         	                {"sWidth" : '1%',"mDataProp" : "icono"}]; 
	//objectDataTable.sScrollY = '223px';

	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					idDerecho : jQuery("#idDerecho").val(),
					idTipoDerecho : jQuery("#codigoTipoDerecho").val(),
					idAmbitoDerecho : jQuery("#codigoAmbitoDerecho").val()
				},
				success : function(json) {
	               // jQuery('#tablaLimitaciones').attr('style', 'width:100%');
	                jQuery('#tablaLimitaciones').dataTable().fnSort([ [ 0, 'asc' ] ]);
				    fnCallback(json);
				}
		    });
		};

	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
	        var editable = jQuery('#indEditable').val();
	        
	        if (editable=="true"){
		        jQuery('td:eq(4)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
		        jQuery('td:eq(4)', nRow).bind({
		        	click:	
		        		function(){
			        		showModal("¿Está seguro que quiere eliminar la limitación " + aoData.idLimitacion + "?", borrarLimitacion, aoData.idLimitacion);
		        		}
		        	});
	        }
	        jQuery('td:lt(4)', nRow).click(function(event) {
	        	modificarLimitacion(aoData.idLimitacion);
	    	});
	        
	        jQuery(nRow).bind({
	            mouseenter:
	                function() {
	                    claseActual = jQuery(this).attr('class');
	                    jQuery(this).removeClass();
	                    jQuery(this).addClass("resaltar");
	                },
	            mouseleave:
	                function() {
	                    jQuery(this).removeClass();
	                    jQuery(this).addClass(claseActual);
	                }
	        });        
	        
		};

	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var tablaLimitaciones = jQuery('#tablaLimitaciones').myDataTable(objectDataTable);
	
}
function borrarLimitacion(id){

	var sUrl = "";
	if (tipoForm == "CPI")
		sUrl = "eliminarLimitacion.htm";
	else
		sUrl = "eliminarLimitacion" + tipoForm + ".htm";
	
	jQuery.ajax({
		url: sUrl,
		dataType: "json",
		data:{
			idLimitacion: id
		},
		success: function(json){
			obtenerTablaLimitaciones();
		}
	});
}

function modificarLimitacion(id){
	jQuery.ajax({
		url: "loadLimitacionById.htm",
		dataType: "json",
		data:{
			idLimitacion: id
		},
		success: function(bean){
			limpiarCamposLimitacion();
			jQuery("#descripcionLimitacion").val(bean.descLimitacion);
			jQuery("#descripcionEntidadLimitacion").val(bean.descEntidadLimitacion);
			jQuery("#codigoTELimitacion").val(bean.tipoEntidad);
			jQuery("#descripcionTELimitacion").val(bean.descTipoEntidad);
			jQuery("#codigoLimitacion").val(bean.idLimitacion);
			cargarFormularioLimitacion("updateLimitacion");
		}
	});
	
}
