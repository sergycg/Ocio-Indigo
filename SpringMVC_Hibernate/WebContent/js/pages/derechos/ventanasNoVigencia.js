jQuery(document).ready(function(){
	
	obtenerTablaVentanas();
	
	jQuery('#botonNuevaVentana').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion
		event.preventDefault();
		if (!jQuery("#" + this.form.id).valid()){
			jQuery("html, body").animate({ scrollTop: 0 }, "slow");
		}else{
			limpiarCampos();
			cargarFormularioVentanas("addVentana");
		}
	});
});

function cargarFormularioVentanas(accion){
	
	var editable = jQuery('#indEditable').val();
	
	// Si no es editable, no se pone botón Guardar
	if (editable=="false"){
		var create = jQuery("#form_crearVentana").dialog({
			height : 410,
			width : 400,
			title : "Ventanas de no vigencia",
			open: function( event, ui ) {
			    datepicker("#fechaInicioVentanaNoVig", "#fechaFinVentanaNoVig");
			},
			buttons : {
				"Cancelar" : function() {
					limpiarCampos();
					jQuery(this).dialog("close");
				}
			},
			close:function (){
				limpiarCampos();
			}
		});
	}else{
		var create = jQuery("#form_crearVentana").dialog({
			height : 410,
			width : 400,
			title : "Ventanas de no vigencia",
			open: function( event, ui ) {
			    datepicker("#fechaInicioVentanaNoVig", "#fechaFinVentanaNoVig");
			},
			buttons : {
				"Guardar" : function() {
	        		if (jQuery("#derechoComercForm").val()!= undefined)
	        			crearModificarVentanaNoVig("derechoComercial_" +accion +".htm");
	        		else{
	        			crearModificarVentanaNoVig("derecho_" +accion +".htm");
	        		}
				},
				"Cancelar" : function() {
					limpiarCampos();
					jQuery(this).dialog("close");
				}
			},
			close:function (){
				limpiarCampos();
			}
		});
	}
	create.parent().appendTo(jQuery("form:first"));
	jQuery("#form_crearVentana", window.parent.document).scrollTop(0);
}

function crearModificarVentanaNoVig(sUrl){
	jQuery.ajax({
		dataType : "json",
		url : sUrl,
		data : {
			idVentana : jQuery("#codigoVentanaNoVig").val(),
			fechaInicio: jQuery("#fechaInicioVentanaNoVig").val(),
			fechaFin: jQuery("#fechaFinVentanaNoVig").val(),
			beneficiarios: jQuery("#beneficiariosVentanaNoVig").val(),
			codCapitulo: jQuery("#codigoCapitulo").val(),
			codAudio: jQuery("#codigoAudio_hidden").val(),
			codAdqui: jQuery("#idAdquisicion").val(),
			idDerecho: jQuery("#idDerecho").val(),
			idTipoDerecho: jQuery("#codigoTipoDerecho").val()
		},
		success : function(json) {
			jQuery("#form_crearVentana").dialog("close");
			obtenerTablaVentanas();
		}
	});
}

function limpiarCampos(){
	var allFields = jQuery("#form_crearVentana input");
	allFields.val("");
	var allFields2 = jQuery("#form_crearVentana textarea");
	allFields2.val("");
}


function obtenerTablaVentanas() {
	
	if (jQuery("#derechoComercForm").val()!= undefined)
		objectDataTable.url = "findVentanasNoVigenciaByDerechoComercial.htm";  
	else
		objectDataTable.url = "findVentanasNoVigenciaByDerecho.htm";

	objectDataTable.columns = [ {"sWidth" : '20%',"mDataProp" : "fechaInicio"},
	                            {"sWidth" : '20%',"mDataProp" : "fechaFin"}, 
	                            {"sWidth" : '59%',"mDataProp" : "beneficiarios"}, 
	         	                {"sWidth" : '1%',"mDataProp" : "icono"}]; 
	//objectDataTable.sScrollY = '223px';

	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					idDerecho : jQuery("#idDerecho").val(),
					idTipoDerecho : jQuery("#codigoTipoDerecho").val()
				},
				success : function(json) {
	                jQuery('#tablaVentanasNoVigenciaDerecho').dataTable().fnSort([ [ 0, 'asc' ] ]);
				    fnCallback(json);
				}
		    });
		};
	    		
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
	        var editable = jQuery('#indEditable').val();
	        
	        if (editable=="true"){
	        
		        jQuery('td:eq(3)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
		        jQuery('td:eq(3)', nRow).bind({
		        	click:	
		        		function(){
			        		showModal("¿Está seguro que quiere eliminar la ventana no vigencia " + aoData.idVentana + "?", borrarVentana, aoData.idVentana);
		        		}
		        	});
	        }
	        jQuery('td:lt(3)', nRow).click(function(event) {
	        	modificarVentana(aoData.idVentana);
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
	var tablaVentanasNoVigencia = jQuery('#tablaVentanasNoVigenciaDerecho').myDataTable(objectDataTable);
	
}

function borrarVentana(id){
	
	var url="";
	if (jQuery("#derechoComercForm").val()!= undefined)
		url="eliminarVentanaNoVigenciaComercial.htm";
	else
		url="eliminarVentanaNoVigencia.htm";
	
	jQuery.ajax({
		url: url,
		dataType: "json",
		data:{
			idVentana: id
		},
		success: function(json){
			obtenerTablaVentanas();
		}
	});
}

function modificarVentana(id){
	var url="";
	if (jQuery("#derechoComercForm").val()!= undefined)
		url="loadVentanaNoVigenciaByIdComercial.htm";
	else
		url="loadVentanaNoVigenciaById.htm";
	
	jQuery.ajax({
		url: url,
		dataType: "json",
		data:{
			idVentana: id
		},
		success: function(bean){
			limpiarCampos();
			jQuery("#fechaInicioVentanaNoVig").val(bean.fechaInicio);
			jQuery("#fechaFinVentanaNoVig").val(bean.fechaFin);
			jQuery("#beneficiariosVentanaNoVig").val(bean.beneficiarios);
			jQuery("#codigoVentanaNoVig").val(bean.idVentana);
			cargarFormularioVentanas("updateVentana");
		}
	});
	
}
