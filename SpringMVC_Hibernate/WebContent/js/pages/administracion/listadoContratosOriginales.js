jQuery(document).ready(function(){
	jQuery('#asistenteContratos').click(function(event) {
		cargarContratos();
		
		jQuery("#listadoContratosOriginales").dialog({
			height : 630,
			width : 1300,
			title : "Asistente de selección de contrato original",
			buttons : {
				"Cancelar" : function() {
					jQuery(this).dialog("close");
				}
			},
			close:function (){
			    
			}
		});
	});
	jQuery("#listadoContratosOriginales", window.parent.document).scrollTop(0);
});

/**
 * LLamada AJAX para la carga de la tabla de contratos,
 */
function cargarContratos(){
	
	objectDataTable.url = "findContratosOriginales.htm";        	
	objectDataTable.columns = [ {"mDataProp" : "titulo"}, 
	         	                {"mDataProp" : "fechaContrato"}, 
	        	                {"mDataProp" : "registroDogma"},
	        	                {"mDataProp" : "registroHistorico"},
	        	                {"mDataProp" : "titulares"},
	        	                {"mDataProp" : "programas"},
	        	                {"mDataProp" : "activo", "mRender": changeCellClass}];
	
	objectDataTable.iDisplayLength=10;
	
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					codigosProgramas : jQuery ("#codigosProgramas_hidden").val().split(","),
					idContrato : jQuery ("#idContrato").val()
				},
				success : function(json) {
	                jQuery('#tablaContratosOriginales').attr('style', 'width:100%');
	                jQuery('#tablaContratosOriginales').dataTable().fnSort([ [ 1, 'asc' ] ]);
				    fnCallback(json);
				}
		    });
		};
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
	        
	        jQuery(nRow).bind({
	            click:
	            	function() {
	            		jQuery ("#numeroContratoPadre").val (aoData.idContrato);
	            		jQuery ("#adenda1").iCheck('check');
	            		jQuery ('#listadoContratosOriginales').dialog('close');
	            		if (aoData.registroDogma != "")
	            			jQuery ('#referenciaRegistroPadre').val(aoData.registroDogma);
	            		else
	            			jQuery ('#referenciaRegistroPadre').val(aoData.registroHistorico);
	            	},
	            mouseover:
	                function() {
	                    jQuery(this).removeClass();
	                    jQuery(this).addClass("resaltar");
	                },
	            mouseout:
	                function() {
	                    jQuery(this).removeClass();
		                jQuery(this).addClass(claseActual);
	                }
	        });
		};

	objectDataTable.bFilter = true;
	objectDataTable.bPaginate = true;
	
	var tablaContratosOriginales = jQuery('#tablaContratosOriginales').myDataTable(objectDataTable);
	
}

/**
 * Muestra check o aspa en funcion si tiene o no el tipo de plantilla definida
 */
function changeCellClass ( data, type, full ) {
	return ((data == 1)?"<div class='icon-OK'></div>":"<div class='icon-NOK'></div>");
}