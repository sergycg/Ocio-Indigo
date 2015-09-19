jQuery(document).ready(function(){
	//Botón de búsqueda
	jQuery('#btnBuscarContrato').click(function(event) {
        event.preventDefault();
       	cargarContratos();
    });
    //Limpiar criterios
	jQuery('#btnLimpiarCriteriosContrato').click(function(event) {
        // Limpia criterios, tabla y oculta tabla
		jQuery ("form").attr ("action", "initBusquedaContratos.htm");
    	jQuery ("form").submit();

//		event.preventDefault();
//        jQuery('#findContratos input').val('');
//		var oTable = jQuery('#listadoContratos').dataTable();
//		oTable.fnDestroy();
//		jQuery('#listadoContratos').css("display", "none");
//		jQuery('#botonesListado').css("display", "none");
    });

	generaAutocomplete(jQuery('#titularesForm\\.idTitularSAP'),jQuery('#titularesForm\\.descTitularSAP'),"autocompleteProveedoresSap.htm", "", "");
	generaAutocomplete(jQuery('#pendienteCerrarAcuerdo'),jQuery('#descPendienteCerrarAcuerdo'),"autocompleteSiNo.htm", "", "");
	
	jQuery('#listadoContratos').css("display", "none");
	jQuery('#botonesListado').css("display", "none");
	
	if (hayCriteriosRellenos()){
		cargarContratos();
	}
	
	jQuery('#iconoBuscarProveedores').click(function(event) {
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
		close:function (){
			cerrarDialogBusquedaProveedores();
		}
	});

	dialogTitular.parent().appendTo(jQuery("form:first"));
	jQuery("#busquedaProveedores", window.parent.document).scrollTop(0);

}

function cerrarDialogBusquedaProveedores(){
    var oTable = jQuery('#listadoProveedores').dataTable();
	oTable.fnDestroy();
    jQuery('#busquedaProveedores input').val('');
	jQuery('#listadoProveedores').css("display", "none");
	jQuery("#busquedaProveedores").dialog("close");
}

//function camposRellenos(){
//	jQuery("#findContratos").find(':input').each(function() {
//        var elemento= this;
//        if (elemento.val() != "" && elemento.val() != null && elemento.val() != undefined);
//	});
//}

function cargarContratos(){
    if (!hayCriteriosRellenos())
    	showWarning("Introduzca algún criterio de búsqueda");
    else{
    	jQuery('#listadoContratos').css ("display", "");
    	jQuery('#listadoContratos').css ("width","100%");

    	objectDataTable.url = "findContratos.htm";        	
		objectDataTable.columns = [{"mDataProp" : "titulo"},
		                           {"mDataProp" : "fechaContrato"},
		                           {"mDataProp" : "registroDogma"},
		                           {"mDataProp" : "registroHistorico"},
		                           {"mDataProp" : "titulares"},
		                           {"mDataProp" : "programas"},
							       {"mDataProp" : "adenda", "mRender": changeCellClass},
							       {"mDataProp" : "numRegistro"}];
	    
		objectDataTable.fnServerData = 
			function(sSource, aoData, fnCallback) {
			    jQuery.ajax({
					dataType : "json",
					url : sSource,
					data : {
					    ejercicio: jQuery('#ejercicio').val(),
					    numeroRegistro: jQuery('#numeroRegistro').val(),
					    numeroRegistroHistorico: jQuery('#numeroRegistroHistorico').val(),
					    titulo: jQuery('#titulo').val(),
					    idTitular: jQuery ('#titularesForm\\.idTitularSAP').val(),
					    codigoPrograma: jQuery ('#codigoPrograma').val(),
					    codigoEmision: jQuery ('#codigoEmision').val(),
					    tituloPrograma: jQuery ('#tituloPrograma').val(),
					    pendienteCerrarAcuerdo: jQuery ("#pendienteCerrarAcuerdo").val()
					},
					success : function(json) {
						if (json != ""){
							jQuery('#listadoContratos').css("display", "block");
							jQuery('#botonesListado').css("display", "block");
						}else{
							jQuery('#listadoContratos').css("display", "none");
							jQuery('#botonesListado').css("display", "none");
						}
						
						jQuery('#listadoContratos').attr('style', 'width:100%');
					    fnCallback(json);
					}
			    });
			};
			
		objectDataTable.fnCreatedRow = 
			function(nRow, aoData, iDataIndex) {
	    	
	    	var claseActual = '';
		    jQuery(nRow).bind({
		    	//Cambio de color de la fila al pasar el ratón
		    	mouseenter : function() {
	        		claseActual = jQuery(this).attr('class');
	        		jQuery(this).removeClass();
	        		jQuery(this).addClass("resaltar");
	        	},
	        	//Cambio de color de la fila al pasar el ratón
	        	mouseleave : function() {
	        		jQuery(this).removeClass();
	        		jQuery(this).addClass(claseActual);
	        	}
		     });
	        jQuery('td', nRow).bind({
	        	click: function(event) {
	        		
	        		//Con el click se accede a la pantalla detalle
	        		jQuery('#idContrato').val(aoData.idContrato);
	    		    jQuery('#findContratos').submit();       			
	        		
	        	}
		    });
		};
			
	    var listadoContratos = jQuery('#listadoContratos').myDataTable(objectDataTable);
    }
};

function resetCampos(){
	jQuery("#idContrato").val("");
}
function changeCellClass(data, type, full){
	return ((data == 1)?"<div style='width:100% !important' class='icon-OK-center'></div>":"<div style='width:100% !important'></div>");
}

function hayCriteriosRellenos(){
	var ejercicio = jQuery('#ejercicio').val();
    var numeroRegistro = jQuery('#numeroRegistro').val();
    var numeroRegistroHistorico = jQuery('#numeroRegistroHistorico').val();
    var titulo = jQuery('#titulo').val();
    var idTitular = jQuery ('#titularesForm\\.idTitularSAP').val();
    var codigoPrograma = jQuery ('#codigoPrograma').val();
	var codigoEmision = jQuery ('#codigoEmision').val();
	var tituloPrograma = jQuery ('#tituloPrograma').val();
	var pendienteCerrarAcuerdo = jQuery ('#pendienteCerrarAcuerdo').val();
    
    if (ejercicio == "" && 
    	numeroRegistro == "" && 
    	numeroRegistroHistorico == "" && 
    	titulo == "" && 
    	idTitular == "" && 
    	codigoPrograma == "" &&
    	codigoEmision == "" &&
    	tituloPrograma == "" &&
    	pendienteCerrarAcuerdo == "")
    	return false;
   	else 
   		return true;
}
