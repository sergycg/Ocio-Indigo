jQuery(document).ready(function(){
	jQuery('#busquedaProveedores #btnBuscar').click(function(event) {
	    event.preventDefault();
	    
	    if (!comprobarCamposBusqueda()){
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
	
	jQuery('#listadoProveedores').css("display", "none");
});
/**
 * Carga la tabla de proveedores
 */
function crearTablaProveedores(){
	jQuery('#listadoProveedores').css ("display", "");
	jQuery('#listadoProveedores').css ("width","100%");

	objectDataTable.url = "findProveedores.htm";        	
	objectDataTable.columns = [{"sWidth" : '10%', "mDataProp" : "codProveedor"},
	                           {"sWidth" : '65%',"mDataProp" : "descProveedor"},
	                           {"sWidth" : '10%',"mDataProp" : "cifProveedor"},
	                           {"sWidth" : '10%',"mDataProp" : "activo", "mRender": changeCellClass},
	                           {"sWidth" : '4%',"mDataProp" : "activoSGDR", "mRender": changeCellClass},
	                           {"sWidth" : '1%',"mDataProp" : "icono"}
	                           ];
    
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
				    codProveedor: jQuery('#codProveedor').val(),
				    descProveedor: jQuery('#descProveedor').val(),
				    cif: jQuery('#cif').val()
				},
				success : function(json) {
					if (json != ""){
						jQuery('#listadoProveedores').css("display", "block");
					}else{
						jQuery('#listadoProveedores').css("display", "none");
					}
					
					jQuery('#listadoProveedores').attr('style', 'width:100%');
				    fnCallback(json);
				}
		    });
		};
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
		    var data = aoData;
		    if (data.codProveedor.substring (0,1) != "*" && data.codProveedor.substring (0,1) != "#"){
		    	jQuery('td:eq(5)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
		        jQuery('td:eq(5)', nRow).bind({click:	
	        		function(){
	  	        		showModal("¿Está seguro que quiere eliminar el proveedor " + aoData.codProveedor + "?", borrarProveedor, aoData.codProveedor);
	        		}
	        	});
		        jQuery('td:lt(5)', nRow).bind({
		        	click: function(event) {
		        		//Con el click se accede a la pantalla detalle
		        		jQuery('#codProveedor').val(aoData.codProveedor);
		    		    jQuery('#busquedaProveedores').submit();        			
		        	}
			    });
		    }
	        var claseActual = '';
		    jQuery(nRow).bind({
		    	//Cambio de color de la fila al pasar el ratón
		    	mouseenter : function() {
	        		claseActual = jQuery(this).attr('class');
	        		jQuery(this).removeClass();
	        		jQuery(this).addClass("resaltar");
	        		
	        		if (data.codProveedor.substring (0,1) == "*" || data.codProveedor.substring (0,1) == "#")
	        			jQuery (this).attr("style", "cursor:default");
	        	},
	        	//Cambio de color de la fila al pasar el ratón
	        	mouseleave : function() {
	        		jQuery(this).removeClass();
	        		jQuery(this).addClass(claseActual);        		
	        	}
		     });
		};

    var listadoProveedores = jQuery('#listadoProveedores').myDataTable(objectDataTable);	
}

function changeCellClass(data, type, full){
	return ((data == 1)?"<div class='icon-OK'></div>":"<div class='icon-NOK'></div>");
}

function borrarProveedor(id){
	jQuery.ajax({
		url: "deleteProveedores.htm",
		dataType: "json",
		data:{
			codProveedor : id
		},
		success: function(json){
			crearTablaProveedores();
		}
	});
}

function comprobarCamposBusqueda(){
    if (jQuery.trim(jQuery("#busquedaProveedores #codProveedor").val()) == '' &&
    	jQuery.trim(jQuery("#busquedaProveedores #descProveedor").val()) == '' &&
    	jQuery.trim(jQuery("#busquedaProveedores #cif").val()) == '')
    	return false;
   	else
   		return true;
}