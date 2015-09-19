var totalCapitulos = 0;

jQuery(document).ready(function(){

	jQuery ("#tituloTraducido").attr ("readonly", true).addClass('disabled');
	
	limpiarCamposPrograma();
	
	jQuery('#btnBuscarPrograma').click(function(event) {
	    event.preventDefault();
	    if ( jQuery.trim(jQuery("#codigoEmisionBuscar").val()) == '' &&
	    	 jQuery.trim(jQuery("#codigoProgramaBuscar").val()) == '' &&
	    	 jQuery.trim(jQuery("#tituloTraducidoBuscar").val()) == ''&&
	    	 jQuery.trim(jQuery("#tituloTraducidoCapituloBuscar").val()) == ''){
	    	showWarning('Debe introducir un parámetro de búsqueda');
	    }else{
	        crearTablaBusquedaProgramas();
	    }
	});
	
	jQuery('#btnLimpiarCriteriosPrograma').click(function(event) {
	    event.preventDefault();
	    jQuery('#form_crearProgramaContrato input').val('');
	    
	    var oTable = jQuery('#tablaBusquedaProgramas').dataTable();
		oTable.fnDestroy();
		jQuery('#tablaBusquedaProgramas').css("display", "none");
		
	});

	jQuery('#btnselectAll').click(function(event) {
		event.preventDefault();
		var table = jQuery("#tablaCapitulosPrograma").dataTable();
		table.fnSelectAllFilteredNodes();
	});
	
	jQuery('#btndeSelectAll').click(function(event) {
		event.preventDefault();
		fnDeSelectAll("#tablaCapitulosPrograma");
	});
	
	jQuery('#btnVolver').click(function(event) {
		event.preventDefault();
		jQuery("#form_seleccionarCapitulosPrograma").dialog("close");
	});

	jQuery('#btnAceptarSeleccionCapitulos').click(function(event) {
		event.preventDefault();
		
		var capituloSeleccionado = "";
		
		var cabecera =fnGetSelectedValues("#tablaCapitulosPrograma");
		
		for (var i=0;i<cabecera.length;i++)	{			
			capituloSeleccionado+= cabecera[i].numeroCapitulo + "|";
		}
		if (capituloSeleccionado == ""){
			showWarning("No ha seleccionado capítulos para asociar al contrato.");
		}else{ 
			capituloSeleccionado = capituloSeleccionado.substring (0, capituloSeleccionado.length - 1);
			jQuery ("#listaCapitulosPrograma").val (capituloSeleccionado);
		    
			jQuery ("#editContrato").attr ("action", "addProgramaContrato.htm");
			jQuery ("#editContrato").submit();
	
			jQuery("#form_seleccionarCapitulosPrograma").dialog("close");
			jQuery("#form_crearProgramaContrato").dialog("close");
		}
	});
	
	
});	

jQuery.fn.dataTableExt.oApi.fnSelectAllFilteredNodes = function ( oSettings )
{
    var anRows = [];
    for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )
    {
        var nRow = oSettings.aoData[ oSettings.aiDisplay[i] ].nTr;
        anRows.push( nRow );
        nRow.setAttribute ("class", nRow.getAttribute("class") + " row_selected ");
    }
    return anRows;
};
 

/**
 * Carga la tabla de búsqueda de programas para asociar a un contrato
 */
function crearTablaBusquedaProgramas(){
	jQuery('#tablaBusquedaProgramas').css ("display", "");
	jQuery('#tablaBusquedaProgramas').css ("width","100%");

	objectDataTable.url = "findProgramasDesdeContrato.htm";        	
	objectDataTable.columns = 	[ 
	                            {"sWidth" : '40%',"mDataProp" : "tituloPrograma" },
	        	                {"sWidth" : '5%',"mDataProp" : "temporada"},
	        	                {"sWidth" : '5%',"mDataProp" : "totalCapitulos","sClass": 'alignCenter'}, 
	        	                {"sWidth" : '5%',"mDataProp" : "fechaInicioVig"},
	        	                {"sWidth" : '5%',"mDataProp" : "fechaFinVig"},
	        	                {"sWidth" : '10%',"mDataProp" : "codigoEmision"}, 
	        	                {"sWidth" : '15%',"mDataProp" : "numPasesContratados_Consumidos"},
	        	                {"sWidth" : '15%',"mDataProp" : "codigoContrato"} 
	        	                ];
	
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    var valorTipoBusqueda = "APROXIMADA";
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
				    tipoBusqueda : valorTipoBusqueda,
				    codigoPrograma : jQuery.trim(jQuery("#codigoProgramaBuscar").val().toUpperCase()),
				    codigoEmision : jQuery.trim(jQuery("#codigoEmisionBuscar").val().toUpperCase()),
				    tituloTraducido : jQuery.trim(jQuery("#tituloTraducidoBuscar").val().toUpperCase()),
				    areasProduccion : "P|E"
				},
				success : function(json) {
				    fnCallback(json);
				}
		    });
		};
	
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
		    var claseActual = '';
		    var data = aoData;
		    
		    jQuery(nRow).bind({
	        	click : function() {
	        		// Abrir popup de selección de capítulos de programa, en caso de que haya más de un capítulo
	        		obtenerCapitulosPrograma(data.codigoPrograma, data.codAdqui, data.codAudio, data.contratoDogma);
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
	
	var tablaProgramas = jQuery('#tablaBusquedaProgramas').myDataTable(objectDataTable);
}

function obtenerCapitulosPrograma(codigoPrograma, codAdqui, codAudio, idContrato) {
	jQuery.ajax({
		async:   false,
		dataType : "json",
		url : "findCapitulosPrograma.htm",
		data : {
			codigoPrograma : codigoPrograma,
	        codAdqui : codAdqui,
	        codAudio : codAudio,
	        idContrato : idContrato
	    },
	    success : function(bean) {
			jQuery ("#codigoPrograma").val (codigoPrograma);
    		jQuery ("#codAdqui").val (codAdqui);
    		jQuery ("#codAudio").val (codAudio);
    		jQuery ("#contratoDogmaProgCap_hidden").val (idContrato);
	    	if (bean.totalCapitulos == 0 || bean.totalCapitulos == 1){
    		    jQuery ("#editContrato").attr ("action", "addProgramaContrato.htm");
				jQuery ("#editContrato").submit();
    		}else{
    			abrirPopupSeleccionCapitulos(codigoPrograma, codAdqui, codAudio, idContrato);
    		}
	    }
	});
}

function abrirPopupSeleccionCapitulos(codigoPrograma, codAdqui, codAudio, idContrato){
	var dialogCapitulos = jQuery("#form_seleccionarCapitulosPrograma").dialog({
		height : 500,
		width : 900,
		title : "Selección de capítulos de programa",
		open:function(){
			cargarTablaCapitulosPrograma(codigoPrograma, codAdqui, codAudio, idContrato);
		},
		close:function (){
		}
	});
}
/**
 * LLamada AJAX para la carga de la tabla de capítulos de programa,
 */
function cargarTablaCapitulosPrograma(codigoPrograma, codAdqui, codAudio, idContrato) {
	
	jQuery('#tablaCapitulosPrograma').css ("display", "");
	jQuery('#tablaCapitulosPrograma').css ("width","98%");
 
	objectDataTable.url = "findListaCapitulosPrograma.htm";        	
	objectDataTable.columns = [ 
								{"sWidth" : '5%',"mDataProp" : "numeroCapitulo"}, 
								{"sWidth" : '80%',"mDataProp" : "tituloTraducido"}, 
								{"sWidth" : '5%',"mDataProp" : "temporada"},
								{"sWidth" : '5%',"mDataProp" : "fechaInicioVig"}, //del capítulo
								{"sWidth" : '5%',"mDataProp" : "fechaFinVig"} //del capítulo
							];
	objectDataTable.sScrollY = "250px";
	objectDataTable.bScrollCollapse = true;
	
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					codigoPrograma : codigoPrograma,
					codAdqui : codAdqui,
					codAudio : codAudio
//					idContrato : idContrato
				},
				success : function(json) {
				    fnCallback(json);
				}
		    });
		};
	
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
		    var claseActual = '';
		    jQuery(nRow).bind({
		    	mouseenter:
	                function() {
	            		jQuery(this).removeClass("cursor_hand");
	                    jQuery(this).addClass("cursor_hand");
	                },
	            mouseleave:
	                function() {
	                    jQuery(this).removeClass("cursor_hand");
	                },
	        	click:
		           	function(event) {
	        			if (jQuery(event.target.parentNode).hasClass('row_selected'))
	        				jQuery(event.target.parentNode).removeClass('row_selected');
	        			else
	        				jQuery(event.target.parentNode).addClass('row_selected');
	                }
		        });
		};
	objectDataTable.bPaginate = false;
	var tablaCapitulos = jQuery('#tablaCapitulosPrograma').myDataTable(objectDataTable);
	
}
function cargarFormularioPrograma(idContrato){
	
	var dialogPrograma = jQuery("#form_crearProgramaContrato").dialog({
		height : 700,
		width : 1100,
		title : "Búsqueda de programas",
		buttons : {
			"Cancelar" : function() {
				limpiarCamposPrograma();
				dialogPrograma.dialog("close");
			}
		},
		open:function(){
			limpiarCamposPrograma();
		    jQuery('#form_crearProgramaContrato input').val('');
		    var oTable = jQuery('#tablaBusquedaProgramas').dataTable();
			oTable.fnDestroy();
			jQuery('#tablaBusquedaProgramas').css("display", "none");
		},
		close:function (){
		    limpiarCamposPrograma();
		    jQuery('#form_crearProgramaContrato input').val('');
		    var oTable = jQuery('#tablaBusquedaProgramas').dataTable();
			oTable.fnDestroy();
			jQuery('#tablaBusquedaProgramas').css("display", "none");
		}
	});

	dialogPrograma.parent().appendTo(jQuery("form:first"));
	jQuery("#form_crearProgramaContrato", window.parent.document).scrollTop(0);
}

/**
 * LLamada AJAX para la carga de la tabla de programas de un contrato,
 */
function obtenerTablaProgramasContrato(idContrato) {
	
	
	 objectDataTable.url = "findProgramasContrato.htm";        	
	 objectDataTable.columns = [
	                            {"mDataProp" : "cabecera"},
								{"mDataProp" : "numeroCapitulo"}, 
								{"mDataProp" : "tituloTraducido"}, 
								{"mDataProp" : "temporada"},
								{"mDataProp" : "fechaInicioVig"}, //del capítulo
								{"mDataProp" : "fechaFinVig"}, //del capítulo
	        	                {"sWidth" : '5%',"mDataProp" : "icono","sClass": 'alignRight'}
	        	               ];
	
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
				    idContrato : idContrato
				},
				success : function(json) {
				    fnCallback(json);
				}
		    });
		};
	
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
		    var claseActual = '';
		    var data = aoData;
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
		    jQuery('td:lt(7)', nRow).css( 'cursor', 'default' );
		};
	
	objectDataTable.fnDrawCallback = 
		function( oSettings ) {
			jQuery('[name=iconoBorrarProgramaContrato]').click (function(event){
				event.stopPropagation();
				event.preventDefault();
				
				var codigoPrograma = this.attributes["programa"].value;
				var codigoContrato = this.attributes["contrato"].value;
				
				borrarProgramaContrato(codigoPrograma, codigoContrato);
			});
			
			if ( oSettings.aiDisplay.length == 0 )
            {
                return;
            }
             
//            var nTrs = jQuery('#tablaProgramas tbody tr');
//            for ( var i=0 ; i<nTrs.length ; i++ ){
//            	if (nTrs[i].childNodes[0] != undefined && nTrs[i].childNodes[0].childNodes[1] != undefined){
//	            	var posicionIcono = nTrs[i].childNodes[0].childNodes[1].innerHTML.indexOf ("iconoBorrarProgramaContrato");
//	            	if (posicionIcono != -1){
//	            		var posicionNumCapitulos = nTrs[i].childNodes[0].childNodes[1].innerHTML.indexOf ("totcapitulos");
//	            		var inicio = posicionNumCapitulos + "totcapitulos='".length;
//	            		var fin = posicionNumCapitulos + "totcapitulos='".length + 2;
//	            		var numCapitulos = 
//	            			nTrs[i].childNodes[0].childNodes[1].innerHTML.substring (inicio, fin);
//	            		if (numCapitulos.substring (0,1) == "0")
//	            			if (nTrs[i].firstChild.attributes[0] == "class")
//	            				nTrs[i].firstChild.attributes[0] == "";
//	            	}
//            	}
//            }
		};
		
	var oTable = jQuery('#tablaProgramas').myDataTable(objectDataTable);
	oTable.rowGrouping({
		bExpandableGrouping : true
	});
	
}

function borrarProgramaContrato (codigoPrograma, codigoContrato){
	var arrayParams = new Array(codigoPrograma, codigoContrato);
	showModal("¿Está seguro que quiere eliminar el programa " + codigoPrograma + "?", borrarPrograma, arrayParams);
}

function borrarPrograma (arrayParametros){
	jQuery.ajax({
		url: "eliminarPrograma.htm",
		dataType: "json",
		data:{
			codigoPrograma: arrayParametros[0],
			idContrato: arrayParametros[1]
		},
		success: function(json){
			obtenerTablaProgramasContrato(arrayParametros[1]);
		}
	});
}

function limpiarCamposPrograma(){
	var allInputs = jQuery("#form_crearProgramaContrato input");
	allInputs.val("");
}