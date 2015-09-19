var cambioCheck = false;

jQuery(document).ready(function(){
	
	jQuery ("#tituloTraducido, #tituloTraducidoCapitulo").keyup (function(){
		if (jQuery.trim(jQuery(this).val()) != ''){
			jQuery ("#codigoEmision").val ("");
			jQuery ("#codigoPrograma").val ("");
		}		
	});
	
	generaAutocomplete(jQuery('#codigoGenero'), jQuery('#descripcionGenero'), "autocompleteGenero.htm",'','');
    generaAutocomplete(jQuery('#codigoDistribuidora'), jQuery('#descripcionDistribuidora'), "autocompleteDistribuidora.htm",'','');
    generaAutocomplete(jQuery('#codigoProduccion'), jQuery('#descripcionProduccion'), "autocompleteProduccion.htm",'','');
	generaAutocomplete(jQuery('#idTitularSAP'),jQuery('#descTitularSAP'),"autocompleteProveedoresSap.htm", "", jQuery("#listaTitularesString"));
     
    datepicker('#fechaVigenciaDesde', '#fechaVigenciaHasta'); 
    
    jQuery('#botoneraFindDerechosProgramas #btnBuscar').click(function(event) {
        event.preventDefault();
        buscar();
        
        if (!cambioCheck && hasPerfilComercial()){
        	jQuery ("#radioBusquedaListadoDI").attr ("checked", false);
        	jQuery ("#radioBusquedaListadoDC").attr ("checked", true);
	        jQuery( "#radioBusquedaListado" ).buttonset ("refresh");
        }
    });
    
   
    jQuery('#botoneraFindDerechosProgramas #btnLimpiarCriterios').click(function(event) {
    	jQuery ("form").attr ("action", "initMenu.htm");
    	jQuery ("form").submit();
    });

    jQuery('#resultados').attr('style', 'display:none');
    
	ocultarCriteriosSeleccion();
	scrollALista();

	if (jQuery("#codigoEmision_hidden").val()!=""){
		buscarDerechos();
	}
	
	jQuery( "#radioTipoBusqueda" ).buttonset();
    jQuery( "#radioTipoBusqueda" ).find("label").unbind("mouseup");
    
    jQuery( "#radioBusquedaListado" ).buttonset();
	jQuery( "#radioBusquedaListado" ).find("label").unbind("mouseup");
	jQuery( "#radioBusquedaListado" ).change(function() {
		if (!cambioCheck){
			cambioCheck = true;
		}
		
		// Si además hay introducido algun valor de emision o programa, se busca.
		if ((jQuery.trim(jQuery("#codigoPrograma").val()) !="")|| 
			(jQuery.trim(jQuery("#codigoEmision").val()) !="") || 
			(jQuery.trim(jQuery("#codigoEmision_hidden").val()) !="")){
			
			buscarDerechos();
		}
	});
	
	jQuery('.icon-find').click(function(event) {
		abrirDialogBusquedaProveedores();
	});
});


function abrirDialogBusquedaProveedores(){
	var dialogTitular = jQuery("#busquedaProveedores").dialog({
		height : 600,
		width : 850,
		title : "Titulares y Cedentes",
		open: function( event, ui ) {
			jQuery('#busquedaProveedores #criteriosSeleccion').css('display', 'block');
		},
//		buttons : {
//			"Aceptar" : function() {
//				var derecho = fnGetSelectedValues("#busquedaProveedores #listadoProveedores");
//				if(derecho!=null && derecho.length>0){
//					jQuery("#idTitularSAP").val(derecho[0].codProveedor);
//					jQuery("#descTitularSAP").val(derecho[0].descProveedor);
//				}	
//				cerrarDialogBusquedaProveedores(dialogTitular);
//			},
//			"Cancelar" : function() {
//				cerrarDialogBusquedaProveedores(dialogTitular);
//			}
//		},
		close:function (){
			cerrarDialogBusquedaProveedores();
		}
	});

	dialogTitular.parent().appendTo(jQuery("form:first"));
	jQuery("#busquedaProveedores", window.parent.document).scrollTop(0);

}

//function cerrarDialogBusquedaProveedores(){
//    var oTable = jQuery('#listadoProveedores').dataTable();
//	oTable.fnDestroy();
//    jQuery('#busquedaProveedores input').val('');
//	jQuery('#listadoProveedores').css("display", "none");
//	jQuery("#busquedaProveedores").dialog("close");
//}

function ocultarCriteriosSeleccion(){
	jQuery('#criteriosSeleccion').slideUp(0);
	jQuery('#imagenAlternarCriterios').attr ("src", "./img/plus.png");
}

function scrollALista(){
	jQuery('html, body').animate({ scrollTop: jQuery("#resultados").offset().top }, 450);
}

function alternaCriteriosSeleccion(){
	
	jQuery('#criteriosSeleccion').slideToggle(500);
	var rutaImagen = jQuery('#imagenAlternarCriterios').attr ("src");
	if (rutaImagen.indexOf ('plus.jpg') != -1)
		jQuery('#imagenAlternarCriterios').attr ("src", "./img/minus.png");
	else
		jQuery('#imagenAlternarCriterios').attr ("src", "./img/plus.png");
}

function buscar(){
	
	jQuery("#codigoEmision_hidden").val('');
    jQuery("#codigoAdquisicion_hidden").val('');
    jQuery("#codigoAudio_hidden").val('');
    
	var comprobacionFiltros = comprobarFiltros();
	
	//No se ha introducido los filtros de búsqueda necesarios	
	if(comprobacionFiltros == -1){
		showWarning("Debe rellenar alguno de los siguientes campos:<br/>" +
				"&nbsp;&nbsp;- Título original. (mínimo " + MINIMO_CARACTERES_BUSQUEDA + " caracteres)<br/>" +
				"&nbsp;&nbsp;- Título traducido.(mínimo " + MINIMO_CARACTERES_BUSQUEDA + " caracteres)<br/>" +
				"&nbsp;&nbsp;- Ejercicio.(4 caracteres numéricos)<br/>" +
				"&nbsp;&nbsp;- Código de contrato.(mínimo " + MINIMO_CARACTERES_BUSQUEDA + " caracteres)<br/>" +
				"&nbsp;&nbsp;- Núm.Registro DOGMA. (caracteres numéricos)<br/>" +
				"&nbsp;&nbsp;- Inicio y Fin de Vigencia + Clase de Producción.<br/>" +
				"&nbsp;&nbsp;- Inicio y Fin de Vigencia + Distribuidora.<br/>" +
				"&nbsp;&nbsp;- Inicio y Fin de Vigencia + Proveedores.<br/>" +
				"&nbsp;&nbsp;- Código de Emisión. (12 caracteres)<br/>" +
				"&nbsp;&nbsp;- Código de Programa. (8 caracteres)");
		
	}
	//Búsqueda por codigo de emision o codigo programa
//	else if(comprobacionFiltros == 0){
//		buscarDerechos();
//	}
	//Búsqueda por titulo o codigo contrato
//	else if(comprobacionFiltros == 1){
		buscarProgramas();
//	}
}

/**
 * Comprueba los filtros introducidos en la pantalla de búsqueda
 * Devuelve:
 *			-1 si no se han introducido los filtros mínimos
 *			0  si la búsqueda debe ser por codigoEmision o codigoPrograma
 * 			1  si debe buscarse previamente en el listado de programas
 **/

function comprobarFiltros(){
	
	var tituloTraducido = jQuery.trim(jQuery("#tituloTraducido").val());
	var tituloTraducidoCapitulo = jQuery.trim(jQuery("#tituloTraducidoCapitulo").val());
	var codigoContrato = jQuery.trim(jQuery("#codigoContrato").val());
	var codigoEmision = jQuery.trim(jQuery("#codigoEmision").val());
	var codigoPrograma = jQuery.trim(jQuery("#codigoPrograma").val());
	var ejercicio = jQuery.trim(jQuery("#ejercicio").val());
	var numRegistroDOGMA = jQuery.trim(jQuery("#numRegistroDOGMA").val());
	var iniVigencia = jQuery.trim(jQuery("#fechaVigenciaDesde").val());
	var finVigencia = jQuery.trim(jQuery("#fechaVigenciaHasta").val());
	var claseProduccion = jQuery.trim(jQuery("#codigoProduccion").val());
	var distribuidora = jQuery.trim(jQuery("#codigoDistribuidora").val());
	var proveedores = jQuery.trim(jQuery("#idTitularSAP").val());
	
	if ((tituloTraducido==null || tituloTraducido=="") && 
		(tituloTraducidoCapitulo==null || tituloTraducidoCapitulo=="") && 
		(codigoContrato==null || codigoContrato=="") &&
		(numRegistroDOGMA==null || numRegistroDOGMA=="") &&
		(codigoEmision==null || codigoEmision=="") &&					
		(codigoPrograma==null || codigoPrograma=="") &&					
		(ejercicio==null || ejercicio=="")&&					
		(iniVigencia==null || iniVigencia=="" || finVigencia==null || finVigencia=="")){
		
		return -1;
	}else if((tituloTraducido!=null && tituloTraducido!="") ||
			 (tituloTraducidoCapitulo!=null && tituloTraducidoCapitulo!="") ||
			 (codigoContrato!=null && codigoContrato!="") ||
			 (numRegistroDOGMA!=null && numRegistroDOGMA!="") ||
			 (ejercicio!=null && ejercicio!="") ||
			 (iniVigencia!=null && iniVigencia!="" && finVigencia!=null && finVigencia!="")){
		
		if ((tituloTraducido.length >= MINIMO_CARACTERES_BUSQUEDA) ||
			(tituloTraducidoCapitulo.length >= MINIMO_CARACTERES_BUSQUEDA) || 
			(codigoContrato!=null && codigoContrato.length >= MINIMO_CARACTERES_BUSQUEDA) ||
			(numRegistroDOGMA!=null && numRegistroDOGMA!="" && !isNaN(numRegistroDOGMA)) ||
			(ejercicio!=null && ejercicio!="" && !isNaN(ejercicio)) || 
			(iniVigencia!=null && iniVigencia!="" && finVigencia!=null && finVigencia!="" && 
						((claseProduccion!=null && claseProduccion!="") || 
						 (distribuidora!=null && distribuidora!="") || 
						 (proveedores!=null && proveedores!=""))))
			return 1;
		else 
			return -1;
	}else if((codigoEmision!=null && codigoEmision!="") ||
			 (codigoPrograma!=null && codigoPrograma!="")){
		if (codigoEmision.length == 12 || codigoPrograma.length == 8)
			return 0;
		else
			return 1;
	}/*else if((tituloTraducido!=null && tituloTraducido!="") || 
			 (tituloTraducidoCapitulo!=null && tituloTraducidoCapitulo!="") || 
			 (codigoContrato!=null && codigoContrato!="")){
		return 1;
	}	*/
}

function buscarDerechos() {
	var codigoEmisionBuscar = "";
	var codigoProgramaBuscar = "";
	if (jQuery.trim(jQuery("#codigoEmision_hidden").val()) != "" && jQuery.trim(jQuery("#codigoEmision_hidden").val()).length == 12){
		codigoEmisionBuscar = jQuery.trim(jQuery("#codigoEmision_hidden").val()).toUpperCase();
	}else if (jQuery.trim(jQuery("#codigoEmision").val()) != "" && jQuery.trim(jQuery("#codigoEmision").val()).length == 12){
		codigoEmisionBuscar = jQuery.trim(jQuery("#codigoEmision").val()).toUpperCase();
	}
	if (jQuery.trim(jQuery("#codigoPrograma").val()) != "" && jQuery.trim(jQuery("#codigoPrograma").val()).length == 8){
		codigoProgramaBuscar = jQuery.trim(jQuery("#codigoPrograma").val()).toUpperCase();
	}
	var codigoAdquisicion = jQuery.trim(jQuery("#codigoAdquisicion_hidden").val());
	var codigoAudio = jQuery.trim(jQuery("#codigoAudio_hidden").val());
	var contradoDogma = jQuery.trim(jQuery("#contratoDogma_hidden").val());

	var entrada = {
			codigoEmision : codigoEmisionBuscar,
			codigoPrograma : codigoProgramaBuscar,
			idAdquisicion : codigoAdquisicion,
			codigoAudio : codigoAudio,
			contradoDogma : contradoDogma,
			formulario : jQuery("#findDerechos_detallePrograma"),
			buscarDerechos : true
	};
	completeDetallePrograma(entrada);
	
}

function hayBusquedaAmpliada(){
	var hayValores = false; 
    jQuery('#criteriosSeleccion input').each(function() {
    	if (jQuery(this).val() != '') hayValores = true;
    });
    return hayValores;
}

function obtenerListadoDerechosEmisionOComerciales (codigoEmision, codigoAdquisicion, codigoAudio, contratoDogma){

	var tipo =  jQuery("[name=radioListado]:checked").val();
	
	jQuery('[name=radioListado]').each (function(){
		jQuery (this.id).attr ("checked", false);
	});

	
	if (tipo=="DI")	{
		obtenerListaDerechos(codigoEmision, codigoAdquisicion, codigoAudio, contratoDogma);
	}else if (tipo=="DC")	{
		obtenerListaDerechosComerciales(codigoEmision, codigoAdquisicion, codigoAudio, contratoDogma);
	}
}

function obtenerListaDerechos(codigoEmision, codigoAdquisicion, codigoAudio, contratoDogma){
	
	var isBusquedaCapitulo = jQuery.trim(jQuery("#tituloTraducidoCapitulo").val())!="";
		
    objectDataTable.url = "findDerechos.htm";        	
    objectDataTable.columns = [
                               {"mDataProp" : "cabecera"},
                               {"sWidth" : '5%' ,"mDataProp" : "codigoDerecho"},
                               {"sWidth" : '5%',"mDataProp" : "descTipoDerecho"				,"sClass": 'alignCenter'},
                               {"sWidth" : '12%',"mDataProp" : "codigoImputacionSAPDerecho"	,"sClass": 'alignCenter'},
                               {"sWidth" : '10%',"mDataProp" : "grupoCadenas"				,"sClass": 'alignCenter'},
                               {"sWidth" : '8%' ,"mDataProp" : "fechaInicioVigencia"		,"sClass": 'alignCenter'},
                               {"sWidth" : '8%' ,"mDataProp" : "fechaFinVigencia"			,"sClass": 'alignCenter'},
                               {"sWidth" : '8%' ,"mDataProp" : "numPasesContratadosDesc"	,"sClass": 'alignCenter'},
                               {"sWidth" : '8%' ,"mDataProp" : "numPasesAdicionales"    	,"sClass": 'alignCenter'},
                               {"sWidth" : '5%' ,"mDataProp" : "numPasesEmitidos"       	,"sClass": 'alignCenter'},
                               {"sWidth" : '5%' ,"mDataProp" : "multidifusionEmisiones" 	,"sClass": 'alignCenter'},
                               {"sWidth" : '5%' ,"mDataProp" : "multidifusionDias"      	,"sClass": 'alignCenter'},
                               {"sWidth" : '3%' ,"mDataProp" : "ventanasNoVigencia"			,"sClass": 'alignCenter'},
                               {"sWidth" : '3%' ,"mDataProp" : "comercializacion"			,"sClass": 'alignCenter'},
                               {"sWidth" : '3%' ,"mDataProp" : "interactivos"				,"sClass": 'alignCenter'},
                               {"sWidth" : '5%' ,"mDataProp" : "tipoInteractivos"			,"sClass": 'alignCenter'},
                               {"sWidth" : '5%' ,"mDataProp" : "relacionHerencia"			,"sClass": 'alignCenter'}
                              ];
    
    objectDataTable.fnServerData = 
    	function(sSource, aoData, fnCallback) {
	        jQuery.ajax({	        	
	            dataType : "json",
	            url : sSource,
	            data : {
	                codigoEmision_hidden: codigoEmision,
	                codigoAdquisicion_hidden: codigoAdquisicion, 
	                codigoAudio_hidden: isBusquedaCapitulo?codigoAudio:null,
	                contratoDogma_hidden: contratoDogma
	            },
	            success : function(beans) {
	            	jQuery('#contenido').attr('style','display:block;margin-top:1px;font-size:11px');
	        	    jQuery('#resultados').attr('style', 'display:block');
	                jQuery('#tablaDerechos').attr('style', 'width:100%');
	                jQuery('#tablaDerechos').dataTable().fnSort([ [ 1, 'asc' ] ]);
	                // Sólo se ocultan los criterios de selección si no se ha rellenado ningún criterio
	                if (!hayBusquedaAmpliada())
	                	ocultarCriteriosSeleccion();
	                scrollALista();
	                fnCallback(beans);
	            }
	        });
		};	
	objectDataTable.fnDrawCallback = 
		function(oSettings, json) {
	    	//ContextMenu de un derecho
			jQuery('[name=filaDerecho]').contextMenu(
	    		getContextMenuDerecho,
	    		objectInicializeContextMenu
	        );
			
	    	//ContextMenu de la cabecera de un programa
	    	jQuery('[name="filaCabecera"]').contextMenu(
	    		getContextMenuPrograma,
	    		objectInicializeContextMenu
	    	);
	    	
	    	//ContextMenu de la cabecera de un capítulo
	    	jQuery('[name="filaCapitulo"]').contextMenu(
	    		getContextMenuCapitulo,
	    		objectInicializeContextMenu
	    	);
	    	
		};									
    
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
	        if (aoData.codigoDerecho!=""){
	        	
	        	var htmlDetalle = "<div name='filaDerecho' class='icon-detail' " +
	        	"codigoDerecho='" + aoData.codigoDerecho + "' codigoAudio='"+ aoData.codigoAudio +
	        	"' ambito='EI' tipo='" + aoData.codigoTipoDerecho + 
	        	"' contratodogma='" + contratoDogma + "' " +
	        	"></div>&nbsp;" + aoData.codigoDerecho;
	        }else{
	        	var htmlDetalle = "SIN DERECHOS";
	        }
		    
	        jQuery('td:eq(0)', nRow).html( htmlDetalle );
	        
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
	var oTable = jQuery('#tablaDerechos').myDataTable(objectDataTable);
	oTable.rowGrouping({bExpandableGrouping : true});
	oTable.find('th').attr("style","text-align:center");
	
	jQuery('#divListadoDerechoComerciales').css("display", "none");
	jQuery('#divListadoDerecho').css("display", "block");
}

function obtenerListaDerechosComerciales(codigoEmision, codigoAdquisicion, codigoAudio, contratoDogma){
	
	
	
    objectDataTable.url = "findDerechosComerciales.htm";        	
    objectDataTable.columns = [
                               {"mDataProp" : "cabecera"},
                               {"sWidth" : '20%',"mDataProp" : "codigoDerecho"},
                               {"sWidth" : '10%',"mDataProp" : "tipo"					,"sClass": 'alignCenter'},
                               {"sWidth" : '12%',"mDataProp" : "exclusividad"			,"sClass": 'alignCenter'},
                               {"sWidth" : '12%',"mDataProp" : "ventanasNoVigencia"		,"sClass": 'alignCenter'},
                               {"sWidth" : '32%',"mDataProp" : "territorios"			,"sClass": 'alignCenter'},
                               {"sWidth" : '12%',"mDataProp" : "idiomas"				,"sClass": 'alignCenter'}
                              ];
    objectDataTable.fnServerData = 
    	function(sSource, aoData, fnCallback) {
	        jQuery.ajax({	        	
	            dataType : "json",
	            url : sSource,
	            data : {
	                codigoEmision_hidden: codigoEmision,
	                codigoAdquisicion_hidden: codigoAdquisicion,
	                codigoAudio_hidden:  codigoAudio,
	                contratoDogma_hidden: contratoDogma
	            },
	            success : function(beans) {
	            	jQuery('#contenido').attr('style','display:block;margin-top:1px;font-size:11px');
	        	    jQuery('#resultados').attr('style', 'display:block');
	                jQuery('#tablaDerechosComerciales').attr('style', 'width:100%');
	                jQuery('#tablaDerechosComerciales').dataTable().fnSort([ [ 1, 'asc' ] ]);
	                // Sólo se ocultan los criterios de selección si no se ha rellenado ningún criterio
	                if (!hayBusquedaAmpliada())
	                	ocultarCriteriosSeleccion();
	                scrollALista();
	                fnCallback(beans);
	            }
	        });
		};	
	objectDataTable.fnDrawCallback = 
		function(oSettings, json) {
	    	//ContextMenu de un derecho
			jQuery('[name=filaDerechoComercial]').contextMenu(
	    		getContextMenuDerechoComercial,
	    		objectInicializeContextMenu
	        );
			
	    	//ContextMenu de la cabecera de un programa
	    	jQuery('[name="filaCabeceraComercial"]').contextMenu(
	    		getContextMenuProgramaComercial,
	    		objectInicializeContextMenu
	    	);
	    	
	    	//ContextMenu de la cabecera de un capítulo
	    	jQuery('[name="filaCapituloComercial"]').contextMenu(
	    		getContextMenuCapituloComercial,
	    		objectInicializeContextMenu
	    	);
	    	
		};									
    
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
	        if (aoData.codigoDerecho!=""){
		        var htmlDetalle = "<div name='filaDerechoComercial' class='icon-detail' " +
		        	"ambito='EC' " +
		        	"tipo='" + aoData.idTipo + "' " +
		        	"numeroCapitulo='" + aoData.numCapitulo + "' " +
//		        	"codigoAudio='"+data["codigoAudio"] + "' " +
		        	"contratodogma='" + contratoDogma + "' " +
		        	"codigoDerecho='" + aoData.codigoDerecho + "'></div>&nbsp;" + aoData.codigoDerecho; 
		        
	         }else{
	        	var htmlDetalle = "SIN DERECHOS";
	        }

			jQuery('td:eq(0)', nRow).html( htmlDetalle );
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
	var oTable = jQuery('#tablaDerechosComerciales').myDataTable(objectDataTable);
	oTable.rowGrouping({bExpandableGrouping : true});
	oTable.find('th').attr("style","text-align:center");
	
	jQuery('#divListadoDerecho').css("display", "none");
	jQuery('#divListadoDerechoComerciales').css("display", "block");
}
