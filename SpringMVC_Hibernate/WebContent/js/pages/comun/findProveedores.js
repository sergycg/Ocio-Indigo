jQuery(document).ready(function(){
	
	if (jQuery("#findDerechos").val()== undefined){
		jQuery('.icon-find').click(function(event) {
			// Si ya estamos en un popup, hacemos display block de la parte de búsqueda,
			// si no abrimos un popup
			if (jQuery('#busquedaProveedores').css('display') == 'block'){
				jQuery('#busquedaProveedores').css('display', 'none');
			}else{
				jQuery('#busquedaProveedores').css('display', 'block');
			}
		});
	}
	
	jQuery('#busquedaProveedores #btnBuscar').click(function(event) {
	    event.preventDefault();
	    if ( jQuery.trim(jQuery("#busquedaProveedores #codProveedor").val()) == '' &&
	    	 jQuery.trim(jQuery("#busquedaProveedores #descProveedor").val()) == '' &&
	    	 jQuery.trim(jQuery("#busquedaProveedores #cif").val()) == ''){
	    	showWarning('Debe introducir un parámetro de búsqueda');
	    }else{
	        crearTablaProveedores();
	    }
	});
	
	jQuery('#busquedaProveedores #btnLimpiarCriterios').click(function(event) {
	    event.preventDefault();
	    jQuery('#busquedaProveedores input').val('');
	    
	    var oTable = jQuery('#busquedaProveedores #listadoProveedores').dataTable();
		oTable.fnDestroy();
		jQuery('#busquedaProveedores #listadoProveedores').css("display", "none");
		
	});
	
});

/**
 * Carga la tabla de proveedores
 */
function crearTablaProveedores(){

	jQuery('#busquedaProveedores #listadoProveedores').css('display', '');
	jQuery('#busquedaProveedores #listadoProveedores').css('width', '100%');
	objectDataTable.url = "findProveedores.htm";        	
	objectDataTable.columns = [{"sWidth" : '20%', "mDataProp" : "codProveedor"},
	                           {"sWidth" : '80%',"mDataProp" : "descProveedor"}
	                           //{"sWidth" : '5%',"mDataProp" : "cif"}	                           
	                           ];
    
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
        		if (jQuery("#findDerechos").val()!= undefined){
	        		// findDerechos
        			jQuery("#idTitularSAP").val(aoData.codProveedor);
					jQuery("#descTitularSAP").val(aoData.descProveedor);
        		}else{
            		//Con el click se selecciona el proveedor
            		jQuery('#titularesForm\\.idTitularSAP').val(aoData.codProveedor);
            		jQuery('#titularesForm\\.descTitularSAP').val(aoData.descProveedor);
        		}
				cerrarDialogBusquedaProveedores();
        	}
	    });
		};

		objectDataTable.fnServerData = 
			function(sSource, aoData, fnCallback) {
			   
			    jQuery.ajax({
					dataType : "json",
					url : sSource,
					data : {
						codProveedor : jQuery.trim(jQuery("#busquedaProveedores #codProveedor").val().toUpperCase()),
						descProveedor : jQuery.trim(jQuery("#busquedaProveedores #descProveedor").val().toUpperCase()),
						cif : jQuery.trim(jQuery("#busquedaProveedores #cif").val().toUpperCase())
					},
					success : function(json) {
					    fnCallback(json);
					}
			    });
			};
	objectDataTable.iDisplayLength = 7;
	var listadoProveedores = jQuery('#busquedaProveedores #listadoProveedores').myDataTable(objectDataTable);
	
}

function cerrarDialogBusquedaProveedores(){
    var oTable = jQuery('#listadoProveedores').dataTable();
	oTable.fnDestroy();
    jQuery('#busquedaProveedores input').val('');
	jQuery('#listadoProveedores').css("display", "none");
	jQuery("#busquedaProveedores").dialog("close");
}


