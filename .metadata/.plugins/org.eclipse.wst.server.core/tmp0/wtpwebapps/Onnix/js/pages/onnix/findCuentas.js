jQuery(document).ready(function(){
	
//	generaAutocomplete(jQuery('#idTitularSAP'),jQuery('#descTitularSAP'),"autocompleteProveedoresSap.htm", "", jQuery("#listaTitularesString"));
//     
//    datepicker('#fechaVigenciaDesde', '#fechaVigenciaHasta'); 
	jQuery("#indActiva").iCheck("check");
	
    jQuery('#botoneraFindCuentasClientes #btnBuscar').click(function(event) {
        event.preventDefault();
        buscar();
    });
    
   
    jQuery('#botoneraFindCuentasClientes #btnLimpiarCriterios').click(function(event) {
    	jQuery ("form").attr ("action", "initMenuCuentas.htm");
    	jQuery ("form").submit();
    });

    jQuery('#resultados').attr('style', 'display:none');
    
	scrollALista();

});


function scrollALista(){
	jQuery('html, body').animate({ scrollTop: jQuery("#resultados").offset().top }, 450);
}


function buscar(){
	obtenerListaCuentas();
}


function obtenerListaCuentas(){
	
		
    objectDataTable.url = "findCuentas.htm";        	
    objectDataTable.columns = [
                               {"mDataProp" : "cabecera"},
                               {"sWidth" : '5%' ,"mDataProp" : "idCuenta"},
                               {"sWidth" : '20%' ,"mDataProp" : "nombre"		,"sClass": 'alignCenter'},
                               {"sWidth" : '25%',"mDataProp" : "apellidos"		,"sClass": 'alignCenter'},
                               {"sWidth" : '40%',"mDataProp" : "observacionesCliente"	,"sClass": 'alignCenter'},
                               {"sWidth" : '10%',"mDataProp" : "descEstado"			,"sClass": 'alignCenter'}
                              ];
    
    objectDataTable.fnServerData = 
    	function(sSource, aoData, fnCallback) {
	        jQuery.ajax({	        	
	            dataType : "json",
	            url : sSource,
	            data : {
	                nombre: jQuery("#nombre").val(),
	                apellidos:  jQuery("#apellidos").val(),
	                telefono: jQuery("#telefono").val(),
	                codigoPostal: jQuery("#codigoPostal").val(),
	                indActiva: (jQuery("#indActiva").prop('checked')==true?1:0)
	            },
	            success : function(beans) {
	            	jQuery('#contenido').attr('style','display:block;margin-top:1px;font-size:11px');
	        	    jQuery('#resultados').attr('style', 'display:block');
	                jQuery('#tablaCuentas').attr('style', 'width:100%');
//	                jQuery('#tablaCuentas').dataTable().fnSort([ [ 1, 'asc' ] ]);
	                scrollALista();
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
	                },
	            click:
	            	function() {
	            		editarCuentaCliente(aoData["idCliente"], aoData["idCuenta"]);
	            	}
	        });        
	        
		};
	var oTable = jQuery('#tablaCuentas').myDataTable(objectDataTable);
	oTable.rowGrouping({bExpandableGrouping : true,
						asExpandedGroups: [""]});
	oTable.find('th').attr("style","text-align:center");
	
	jQuery('#divListadoCuentas').css("display", "block");
}

function editarCuentaCliente(id_cliente, id_cuenta){
	jQuery("#action").val("loadCuentaCliente");
//    jQuery('#idDerecho_hidden').val(this.attributes["codigoDerecho"].value);
//    jQuery('#codigoAmbitoDerecho_hidden').val(this.attributes["ambito"].value);
//    jQuery('#codigoTipoDerecho_hidden').val(this.attributes["tipo"].value);
//    jQuery('#contratoDogma_hidden').val(this.attributes["contratodogma"].value);
	jQuery('#idCuenta_hidden').val(id_cuenta);
	jQuery('#idCliente_hidden').val(id_cliente);
	jQuery("#findCuentasClientes").submit();	
}

