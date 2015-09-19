jQuery(document).ready(function(){
	
    obtenerBalance();

    jQuery('#resultados').attr('style', 'display:none');

});


function obtenerBalance(){
	
		
    objectDataTable.url = "findBalance.htm";        	
    objectDataTable.columns = [
                               {"sWidth" : '5%' ,"mDataProp" : "idCuenta"},
                               {"sWidth" : '5%' ,"mDataProp" : "idCliente"},
                               {"sWidth" : '20%',"mDataProp" : "nombre"		,"sClass": 'alignCenter'},
                               {"sWidth" : '25%',"mDataProp" : "apellidos"		,"sClass": 'alignCenter'},
                               {"sWidth" : '40%',"mDataProp" : "observacionesCliente"	,"sClass": 'alignCenter'},
                               {"sWidth" : '40%',"mDataProp" : "totalComprado"	,"sClass": 'alignCenter'},
                               {"sWidth" : '40%',"mDataProp" : "totalEntregado"	,"sClass": 'alignCenter'},
                               {"sWidth" : '40%',"mDataProp" : "resto"	,"sClass": 'alignCenter'},
                               ];
    
    objectDataTable.fnServerData = 
    	function(sSource, aoData, fnCallback) {
	        jQuery.ajax({	        	
	            dataType : "json",
	            url : sSource,
	            data : {
//	                nombre: "pepe",
//	                apellidos: "aa" 
//	                codigoAudio_hidden: isBusquedaCapitulo?codigoAudio:null,
//	                contratoDogma_hidden: contratoDogma
	            },
	            success : function(beans) {
	            	jQuery('#contenido').attr('style','display:block;margin-top:1px;font-size:11px');
	        	    jQuery('#resultados').attr('style', 'display:block');
	                jQuery('#tablaBalance').attr('style', 'width:100%');
	                jQuery('#tablaBalance').dataTable().fnSort([ [ 2, 'asc' ] ]);
	                fnCallback(beans);
	            }
	        });
		};	
	objectDataTable.fnDrawCallback = 
		function(oSettings, json) {
	    	//ContextMenu de un derecho
//			jQuery('[name=filaDerecho]').contextMenu(
//	    		getContextMenuDerecho,
//	    		objectInicializeContextMenu
//	        );
			
	    	//ContextMenu de la cabecera de un programa
//	    	jQuery('[name="filaCabecera"]').contextMenu(
//	    		getContextMenuPrograma,
//	    		objectInicializeContextMenu
//	    	);
	    	
	    	//ContextMenu de la cabecera de un capítulo
//	    	jQuery('[name="filaCapitulo"]').contextMenu(
//	    		getContextMenuCapitulo,
//	    		objectInicializeContextMenu
//	    	);
	    	
		};									
    
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
//	        if (aoData.codigoDerecho!=""){
//	        	
//	        	var htmlDetalle = "<div name='filaDerecho' class='icon-detail' " +
//	        	"codigoDerecho='" + aoData.codigoDerecho + "' codigoAudio='"+ aoData.codigoAudio +
//	        	"' ambito='EI' tipo='" + aoData.codigoTipoDerecho + 
//	        	"' contratodogma='" + contratoDogma + "' " +
//	        	"></div>&nbsp;" + aoData.codigoDerecho;
//	        }else{
//	        	var htmlDetalle = "SIN DERECHOS";
//	        }
//		    
//	        jQuery('td:eq(0)', nRow).html( htmlDetalle );
	        
//	        jQuery(nRow).bind({
//	            mouseenter:
//	                function() {
//	                    claseActual = jQuery(this).attr('class');
//	                    jQuery(this).removeClass();
//	                    jQuery(this).addClass("resaltar");
//	                },
//	            mouseleave:
//	                function() {
//	                    jQuery(this).removeClass();
//	                    jQuery(this).addClass(claseActual);
//	                },
//	            click:
//	            	function() {
//	            	editarCuentaCliente();
//	            	}
//	        });        
//	        
		};
	var oTable = jQuery('#tablaBalance').myDataTable(objectDataTable);
	
	jQuery('#divListadoBalance').css("display", "block");
}

