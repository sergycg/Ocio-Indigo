jQuery(document).ready(function(){
	
	var validator = validarFormulario("findDerechos", "form_ventanas_novigencia_programa");
	
	jQuery('#botonNuevaVentanaPrograma').click(function(event) {
		event.preventDefault();
		addModifyVentana("");
	});
	
	jQuery('#cancelVNVPrograma').click(function(event) {
		event.preventDefault();
		validator.resetForm();
		jQuery("#form_crearVentana_programa").fadeOut('slow');
	});
	
	
	jQuery('#saveVNVPrograma').click(function(event) {
		event.preventDefault();

		var fechaInicio = jQuery("#fechaInicioVentanaNoVig").val();
		var fechaFin = jQuery("#fechaFinVentanaNoVig").val();
		var beneficiarios = jQuery("#ventanaNoVigenciaForm\\.beneficiarios").val();
		var codAudio = jQuery("#codAudio_hidden").val();
		var codAdqui = jQuery("#codAdqui_hidden").val();
		var id = jQuery("#codigoVentanaNoVig").val();
		
		if (comprobarDatosVentana()){
			jQuery.ajax({
				url: "addModifyVentanaNoVigenciaPrograma.htm",
				dataType: "json",
				data:
					{
						fechaInicio : fechaInicio,
						fechaFin : fechaFin,
						beneficiarios : beneficiarios,
						codAudio : codAudio,
						codAdqui : codAdqui,
						idVentana : id
					},
				success: function(json){
//					validator.resetForm();
					obtenerTablaVentanas(jQuery("#codAudio_hidden").val(), jQuery("#codAdqui_hidden").val());
					jQuery("#form_crearVentana_programa").fadeOut('slow');
				}
			});
		}
	});
});

function iconVentanasNoVigenciaPrograma(codAudio, codAdqui){
	
	
	jQuery("#codAudio_hidden").val (codAudio);
	jQuery("#codAdqui_hidden").val (codAdqui);
	
	jQuery("#form_crearVentana_programa").hide();
	
//	jQuery("#fechaInicioVentanaNoVig").change(function(){
//		if (jQuery("#fechaInicioVentanaNoVig").val() != '' && jQuery("#fechaInicioVentanaNoVig").hasClass("error"))
//			jQuery("#fechaInicioVentanaNoVig").removeClass ("error");
//	});
//	jQuery("#fechaFinVentanaNoVig").change(function(){
//		if (jQuery("#fechaFinVentanaNoVig").val() != '' && jQuery("#fechaFinVentanaNoVig").hasClass("error"))
//			jQuery("#fechaFinVentanaNoVig").removeClass ("error");
//	});
//	
	// Botones ventanas de no vigencia del programa
	
	var dialogVentanas = jQuery("#form_ventanas_novigencia_programa").dialog({
        width : 1300,
        height : 710,
        title : 'Ventanas de no vigencia del programa',
        open : function() {
        	
        },
        buttons : [ 
            {
	            id : "cancelar",
	            text : "Volver",
	            click : function() {
	                jQuery("#form_ventanas_novigencia_programa").dialog("close");
	            }
            }
        ],
		open: function( event, ui ) {
			datepicker("#fechaInicioVentanaNoVig", "#fechaFinVentanaNoVig");
			jQuery("#limpiarFechaIni").bind ("click", function(){
				clearDatepicker('fechaInicioVentanaNoVig'); 
			});
			jQuery("#limpiarFechaFin").bind ("click", function(){
				clearDatepicker('fechaFinVentanaNoVig'); 
			});
			obtenerTablaVentanas(codAudio, codAdqui);
			
			var entrada = {
					idAdquisicion : codAdqui,
					codigoAudio : codAudio,
					contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
					formulario : jQuery("#form_ventanas_novigencia_programa")
			};
			completeDetallePrograma(entrada);
		},
        close : function() {
        }
    });
	dialogVentanas.parent().appendTo(jQuery("form:first"));
};

function obtenerTablaVentanas(codAudio, codAdqui) {
	
	objectDataTable.url = "findVentanasNoVigenciaByPrograma.htm";  
      	
	objectDataTable.columns = [ {"sWidth" : '15%',"mDataProp" : "fechaInicio"},
	                            {"sWidth" : '10%',"mDataProp" : "fechaFin"}, 
	                            {"sWidth" : '74%',"mDataProp" : "beneficiarios"}, 
	         	                {"sWidth" : '1%',"mDataProp" : "icono"}]; 

	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					codAudio : codAudio,
					codAdqui : codAdqui
				},
				success : function(json) {
	                jQuery('#tablaVentanasNoVigenciaPrograma').dataTable().fnSort([ [ 0, 'asc' ] ]);
				    fnCallback(json);
				}
		    });
		};
	    		
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
	        
	        jQuery('td:eq(3)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
	        jQuery('td:eq(3)', nRow).bind({
	        	click:	
	        		function(){
		        		showModal("¿ Está seguro que quiere eliminar la ventana de no " +
		        				"vigencia comprendida entre el " + aoData.fechaInicio + " y el " + 
		        				aoData.fechaFin +" ?", 
		        				borrarVentana, aoData.idVentana, "");
	        		}
	        	});
	        jQuery('td:lt(3)', nRow).click(function(event) {
	        	addModifyVentana(aoData.idVentana);
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

	objectDataTable.bLengthChange = false;
	objectDataTable.iDisplayLength = 5;
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = true;
	var tablaVentanasNoVigenciaPrograma = jQuery('#tablaVentanasNoVigenciaPrograma').myDataTable(objectDataTable);
	
}

function addModifyVentana(id){
	jQuery("#form_crearVentana_programa").fadeIn('slow');
	limpiarCampos();
	
	jQuery("#codigoVentanaNoVig").val(id);
	
	if (id != ""){
		jQuery.ajax({
			url: "loadVentanaNoVigenciaProgramaById.htm",
			dataType: "json",
			data:{idVentana:id},
			success: function(bean){
				jQuery("#fechaInicioVentanaNoVig").val(bean.fechaInicio);
				jQuery("#fechaFinVentanaNoVig").val(bean.fechaFin);
				jQuery("#ventanaNoVigenciaForm\\.beneficiarios").val(bean.beneficiarios);
			}
		});
	}
}

function comprobarDatosVentana(){
	if (jQuery("#fechaInicioVentanaNoVig").val() == "" ||
		jQuery("#fechaFinVentanaNoVig").val() == ""){
		
		if (jQuery("#fechaInicioVentanaNoVig").val() == "")
			jQuery("#fechaInicioVentanaNoVig").addClass("error");
		else
			jQuery("#fechaInicioVentanaNoVig").removeClass("error");
		
		if (jQuery("#fechaFinVentanaNoVig").val() == "")
			jQuery("#fechaFinVentanaNoVig").addClass("error");
		else
			jQuery("#fechaFinVentanaNoVig").removeClass("error");
		
		return false;
	}else{
		jQuery("#fechaInicioVentanaNoVig").removeClass("error");
		jQuery("#fechaFinVentanaNoVig").removeClass("error");
		return true;
	}
}

function borrarVentana(id){
	var validator = validarFormulario("findDerechos", "form_crearVentana_programa");
	jQuery.ajax({
		url: "deleteVentanaNoVigenciaPrograma.htm",
		dataType: "json",
		data:
			{idVentana : id},
		success: function(json){
			obtenerTablaVentanas(jQuery("#codAudio_hidden").val(), jQuery("#codAdqui_hidden").val());
			if (jQuery("#codigoVentanaNoVig").val() == id){
				jQuery("#form_crearVentana_programa").fadeOut('slow');
				validator.resetForm();
				limpiarCampos();
			}
		}
	});
}

function limpiarCampos(){
	var allFields = jQuery("#form_crearVentana_programa input");
	allFields.val("");
	var allFields2 = jQuery("#form_crearVentana_programa textarea");
	allFields2.val("");
}