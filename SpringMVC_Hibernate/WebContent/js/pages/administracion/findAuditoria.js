jQuery(document).ready(function(){
	
	validarFormulario("findAuditoriaForm");
	
	//Botón de búsqueda
	jQuery('#btnBuscar').click(function(event) {
        event.preventDefault();
        
        if ((jQuery('#codigo').val() != null && jQuery('#codigo').val() != "") ||
        	(jQuery(this.form).valid())){
        	cargarAuditoria();
        }
    });
    //Limpiar criterios
	jQuery('#btnLimpiarCriterios').click(function(event) {
        // Limpia criterios, tabla y oculta tabla
        event.preventDefault();
        jQuery('#findAuditoriaForm input').val('');
		var oTable = jQuery('#listadoAuditoria').dataTable();
		oTable.fnDestroy();
		jQuery('#listadoAuditoria').css("display", "none");

	});
	//Fechas
	datepicker('#fechaDesde', '#fechaHasta');
	
	jQuery('#listadoAuditoria').css("display", "none");

	//Autocomplete 
	jQuery( "#tipoDato" ).autocomplete({
	     source: "autocompleteAuditoriaTipoDato.htm"+jQuery("#tipoDato").val().trim()
	});
	jQuery( "#codigoUniversal" ).autocomplete({
	     source: "autocompleteAuditoriaCodigoUniversal.htm"+jQuery("#codigoUniversal").val().trim()
	});
	      
});


function cargarAuditoria(){
	objectDataTable.url = "findAuditoria.htm";        	
	
	objectDataTable.columns = [{"sWidth" : '10%',"mDataProp" : "tipoDato"},
	                           {"sWidth" : '5%',"mDataProp" : "codigo"},
	                           {"sWidth" : '5%',"mDataProp" : "accion"},
	                           {"sWidth" : '10%',"mDataProp" : "fecha"},
	                           {"sWidth" : '5%',"mDataProp" : "codigoUniversal"},
	                           {"sWidth" : '10%',"mDataProp" : "nombreApellidos"},
	                           {"sWidth" : '55%',"mDataProp" : "datos"}	
	];
    
    objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
		    //Cambio de color de la fila al pasar el ratón
		    var claseActual = '';
		    jQuery(nRow).bind({
	        	mouseenter : function() {
	        	    claseActual = jQuery(this).attr('class');
	        	    jQuery(this).removeClass();
	        	    jQuery(this).addClass("resaltar");
	        	},
	        	mouseleave : function() {
	        	    jQuery(this).removeClass();
	        	    jQuery(this).addClass(claseActual);
	        	}
		    });
		};
		
		objectDataTable.fnServerData = 
			function(sSource, aoData, fnCallback) {
			    
			    jQuery.ajax({
					dataType : "json",
					url : sSource,
					data : {
					    tipoDato: jQuery('#tipoDato').val(),
					    codigo: jQuery('#codigo').val(),
					    accion: jQuery('#accion').val(),
					    fechaDesde: jQuery('#fechaDesde').val(),
					    fechaHasta: jQuery('#fechaHasta').val(),
					    codigoUniversal: jQuery('#codigoUniversal').val()
					},
					success : function(json) {
						if (json != "")
							jQuery('#listadoAuditoria').css("display", "block");
						else
							jQuery('#listadoAuditoria').css("display", "none");
						 jQuery('#listadoAuditoria').attr('style', 'width:100%');
					    fnCallback(json);
					}
			    });
			};
			
	var listadoAgrupacion=  jQuery('#listadoAuditoria').myDataTable(objectDataTable);	
}
