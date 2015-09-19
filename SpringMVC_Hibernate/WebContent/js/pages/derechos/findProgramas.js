function buscarProgramas() {
    
    var valorTipoBusqueda = "";
    var selected = jQuery("#radioTipoBusqueda input[type='radio']:checked");
    if (selected.length > 0) valorTipoBusqueda = selected.val();

    jQuery.ajax({
		dataType : "json",
		url : "findProgramas.htm",
		data : {
		    tipoBusqueda : valorTipoBusqueda,
		    codigoEmision : jQuery.trim(jQuery("#codigoEmision").val().toUpperCase()),
		    codigoPrograma : jQuery.trim(jQuery("#codigoPrograma").val().toUpperCase()),
		    tituloTraducido : jQuery.trim(jQuery("#tituloTraducido").val().toUpperCase()),
		    codigoEmision : jQuery.trim(jQuery("#codigoEmision").val().toUpperCase()),
		    ejercicio : jQuery.trim(jQuery("#ejercicio").val()),
		    numRegistroDOGMA : jQuery.trim(jQuery("#numRegistroDOGMA").val()),
		    codigoPrograma : jQuery.trim(jQuery("#codigoPrograma").val().toUpperCase()),
		    tituloTraducidoCapitulo : jQuery.trim(jQuery("#tituloTraducidoCapitulo").val().toUpperCase()),
		    temporada : jQuery.trim(jQuery("#temporada").val().toUpperCase()),
		    fechaVigenciaDesde : jQuery("#fechaVigenciaDesde").val(),
		    fechaVigenciaHasta : jQuery("#fechaVigenciaHasta").val(),
		    codigoContrato : jQuery.trim(jQuery("#codigoContrato").val().toUpperCase()),
		    codigoProduccion : jQuery("#codigoProduccion").val().toUpperCase(),
		    codigoGenero : jQuery("#codigoGenero").val().toUpperCase(),
		    codigoDistribuidora : jQuery("#codigoDistribuidora").val().toUpperCase(),
		    descripcionDistribuidora : jQuery("#descripcionDistribuidora").val().toUpperCase(),
		    idTitularSAP : jQuery("#idTitularSAP").val().toUpperCase(),
		    descTitularSAP : jQuery("#descTitularSAP").val().toUpperCase(),
		    numRegistroHistoricoDOGMA : jQuery("#numRegistroHistoricoDOGMA").val().toUpperCase()
		},
		success : function(json) {
			if (json.iTotalRecords == 0){
				showWarning("No se encontró ningún programa para los criterios de búsqueda especificados");
			}else if (json.iTotalRecords>1){
				abrirDialogTablaProgramas(json);
			}else{
				jQuery("#codigoAudio_hidden").val(json.aaData[0].codAudio);
				jQuery("#contratoDogma_hidden").val(json.aaData[0].contratoDogma);
				buscarDerechos();
			}
		}
    });

//	var create = jQuery("#form_buscarPrograma").dialog({
//		height : 630,
//		width : 1300,
//		title : "Programas / Capítulos",
//		open : function() {
//			cargarTablaProgramas();
//		},
//	});
    
}

function abrirDialogTablaProgramas(json){
	var create = jQuery("#form_buscarPrograma").dialog({
		height : 630,
		width : 1300,
		title : "Programas / Capítulos",
		open : function() {
			cargarTablaProgramas(json);
		},
	});
}
/**
 * LLamada AJAX para la carga de la tabla de programas,
 */
function cargarTablaProgramas(json) {
	
    jQuery("#form_buscarPrograma", window.parent.document).scrollTop(0);

	objectDataTable.url = "findProgramas.htm";

	 objectDataTable.columns = [{"sWidth" : '1%',  "mDataProp" : "icono"}, 
	                            {"sWidth" : '10%', "mDataProp" : "tituloPrograma" },
	                            {"sWidth" : '3%',  "mDataProp" : "numeroCapitulo"}, 
	                            {"sWidth" : '10%', "mDataProp" : "tituloTraducido"}, 
	        	                {"sWidth" : '2%',  "mDataProp" : "temporada"},
	        	                {"sWidth" : '2%',  "mDataProp" : "totalCapitulos" ,"sClass": 'alignCenter'}, 
	        	                {"sWidth" : '5%',  "mDataProp" : "fechaInicioVig"},
	        	                {"sWidth" : '5%',  "mDataProp" : "fechaFinVig"},
	        	                {"sWidth" : '10%', "mDataProp" : "codigoEmision"}, 
	        	                {"sWidth" : '16%', "mDataProp" : "numPasesContratados_Consumidos"},
	        	                {"sWidth" : '2%',  "mDataProp" : "codigoContrato"}, 
	        	                {"sWidth" : '2%',  "mDataProp" : "anyoContrato", "sClass": 'alignCenter'}, 
	        	                {"sWidth" : '4%',  "mDataProp" : "descEstadoAdqui"}, 
	        	                {"sWidth" : '5%',  "mDataProp" : "descTipoContratacion"}, 
	        	                {"sWidth" : '25%', "mDataProp" : "descDistribuidora"}];

	objectDataTable.iDisplayLength = 10;
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
			fnCallback(json);
//		    var valorTipoBusqueda = "";
//		    var selected = jQuery("#radioTipoBusqueda input[type='radio']:checked");
//		    if (selected.length > 0) valorTipoBusqueda = selected.val();
//	
//		    jQuery.ajax({
//				dataType : "json",
//				url : sSource,
//				data : {
//				    tipoBusqueda : valorTipoBusqueda,
//				    codigoEmision : jQuery.trim(jQuery("#codigoEmision").val().toUpperCase()),
//				    codigoPrograma : jQuery.trim(jQuery("#codigoPrograma").val().toUpperCase()),
//				    tituloTraducido : jQuery.trim(jQuery("#tituloTraducido").val().toUpperCase()),
//				    codigoEmision : jQuery.trim(jQuery("#codigoEmision").val().toUpperCase()),
//				    ejercicio : jQuery.trim(jQuery("#ejercicio").val()),
//				    numRegistroDOGMA : jQuery.trim(jQuery("#numRegistroDOGMA").val()),
//				    codigoPrograma : jQuery.trim(jQuery("#codigoPrograma").val().toUpperCase()),
//				    tituloTraducidoCapitulo : jQuery.trim(jQuery("#tituloTraducidoCapitulo").val().toUpperCase()),
//				    temporada : jQuery.trim(jQuery("#temporada").val().toUpperCase()),
//				    fechaVigenciaDesde : jQuery("#fechaVigenciaDesde").val(),
//				    fechaVigenciaHasta : jQuery("#fechaVigenciaHasta").val(),
//				    codigoContrato : jQuery.trim(jQuery("#codigoContrato").val().toUpperCase()),
//				    codigoProduccion : jQuery("#codigoProduccion").val().toUpperCase(),
//				    codigoGenero : jQuery("#codigoGenero").val().toUpperCase(),
//				    codigoDistribuidora : jQuery("#codigoDistribuidora").val().toUpperCase(),
//				    descripcionDistribuidora : jQuery("#descripcionDistribuidora").val().toUpperCase(),
//				    idTitularSAP : jQuery("#idTitularSAP").val().toUpperCase(),
//				    descTitularSAP : jQuery("#descTitularSAP").val().toUpperCase(),
//				    numRegistroHistoricoDOGMA : jQuery("#numRegistroHistoricoDOGMA").val().toUpperCase()
//				},
//				success : function(json) {
//					if (json.iTotalRecords>1){
//						fnCallback(json);
//					}
//					else{
//						jQuery("#form_buscarPrograma").dialog("close");
//						buscarDerechos();
//					}
//				}
//		    });
		};
	
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
		    var claseActual = '';
		    var num_derechosCPI_cabecera = aoData.derechoComunicacionPublica;
		    var num_derechosCPI_capitulos = aoData.derechoComunicacionPublicaCap;
		    var num_capitulo = aoData.numeroCapitulo;
		   
		    if ((num_derechosCPI_cabecera==null || num_derechosCPI_cabecera=="") && (num_derechosCPI_capitulos==null || num_derechosCPI_capitulos==""))
		    	jQuery('td:eq(0)', nRow).append(jQuery("<div>").addClass( "icon-exclamacion" ).attr('title','Sin Derechos'));
		    
		    if (num_capitulo==""){ //es un programa
		    	jQuery(nRow).addClass("background_yellow");
		    }else{
		    	jQuery('td:eq(5)', nRow).text("");
		    }
		    
		    jQuery(nRow).bind({
	        	click : function() {
	        		jQuery("#codigoEmision_hidden").val(aoData.codigoEmision);
	    		    jQuery("#codigoAdquisicion_hidden").val(aoData.codAdqui);		    
	    		    jQuery("#codigoAudio_hidden").val(aoData.codAudio);
	    		    jQuery("#contratoDogma_hidden").val(aoData.contratoDogma);
	    			
	        	    jQuery('#form_buscarPrograma').dialog('close');
	        	    jQuery('#resultados').slideDown();
	        	    jQuery('#contenido').attr('style', 'display:none');
	        		
	        	    buscarDerechos();
	        	},
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
					
	//Si se ha buscado por título de capítulo, se muestra la columna Titulo programa.
	//Si se ha buscado por título de programa, se oculta
	objectDataTable.fnDrawCallback = 
		function(){		
			var isBusquedaCapitulo = jQuery.trim(jQuery("#tituloTraducidoCapitulo").val())!="";
			var isBusquedaPrograma = jQuery.trim(jQuery("#tituloTraducido").val())!="";
			if (isBusquedaCapitulo && !isBusquedaPrograma){ 
				jQuery('#form_buscarPrograma td:nth-child(2),#form_buscarPrograma th:nth-child(2)').show();
				jQuery('#form_buscarPrograma td:nth-child(3),#form_buscarPrograma th:nth-child(3)').show();
				jQuery('#form_buscarPrograma td:nth-child(6),#form_buscarPrograma th:nth-child(6)').hide();		
				jQuery('#form_buscarPrograma th:nth-child(2)').css('width','11%');
				jQuery('#form_buscarPrograma th:nth-child(3)').css('width','3%');
				jQuery('#form_buscarPrograma th:nth-child(4)').css('width','11%');
				jQuery('#form_buscarPrograma th:nth-child(6)').css('width','0%');
			}else if (isBusquedaCapitulo){ 
				jQuery('#form_buscarPrograma td:nth-child(2),#form_buscarPrograma th:nth-child(2)').show();
				jQuery('#form_buscarPrograma td:nth-child(3),#form_buscarPrograma th:nth-child(3)').show();
				jQuery('#form_buscarPrograma td:nth-child(6),#form_buscarPrograma th:nth-child(6)').show();		
				jQuery('#form_buscarPrograma th:nth-child(2)').css('width','10%');
				jQuery('#form_buscarPrograma th:nth-child(3)').css('width','3%');
				jQuery('#form_buscarPrograma th:nth-child(4)').css('width','10%');
				jQuery('#form_buscarPrograma th:nth-child(6)').css('width','2%');
			}else{
				jQuery('#form_buscarPrograma td:nth-child(2),#form_buscarPrograma th:nth-child(2)').hide();		
				jQuery('#form_buscarPrograma td:nth-child(3),#form_buscarPrograma th:nth-child(3)').hide();		
				jQuery('#form_buscarPrograma td:nth-child(6),#form_buscarPrograma th:nth-child(6)').show();		
				jQuery('#form_buscarPrograma th:nth-child(2)').css('width','0%');
				jQuery('#form_buscarPrograma th:nth-child(3)').css('width','0%');
				jQuery('#form_buscarPrograma th:nth-child(4)').css('width','23%');
				jQuery('#form_buscarPrograma th:nth-child(6)').css('width','2%');
			}
			
	};

	var tablaProgramas = jQuery('#tablaProgramas').myDataTable(objectDataTable);
}
