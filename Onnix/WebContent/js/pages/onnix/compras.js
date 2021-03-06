jQuery(document).ready(function(){
	jQuery("#fechaCompra").datepicker();
});

function cargarFormularioCompra(accion){
	
//	var validatorCompra = validarFormulario("cuentaClienteForm", "form_crearCompra");

	if (accion=="addCompra")
		jQuery("#fechaCompra").datepicker('setDate', 'today');

	var create = jQuery("#form_crearCompra").dialog({
		height : 350,
		width : 350,
		title : "Compra",
		buttons : {
			"Guardar" : function() {
				var mensaje = comprobarCompra();
				if (mensaje=="")
					guardarCompra();
				else{
					showError(mensaje);
				}
			},
			"Cancelar" : function() {
				limpiarCamposCompra();
//				validatorCompra.resetForm();
				jQuery(this).dialog("close");
			}
		},
		close:function (){
//			validatorCompra.resetForm();
			limpiarCamposCompra();
		}
	});
		
//	create.parent().appendTo(jQuery("form:first"));
//	jQuery("#form_crearLimitacion", window.parent.document).scrollTop(0);
//	autocompletarTipoEntidad();
}

function comprobarCompra(){
	var fecha = jQuery("#fechaCompra").val();
	var cantidad = jQuery("#precio").val();
	var objeto = jQuery("#descObjeto").val();

	if (cantidad!=null && cantidad!=""){
		cantidad = cantidad.toString().replace(/\,/g,'.');
		jQuery("#precio").val(cantidad);
	}
	if (fecha!=null && fecha!="" && cantidad!=null && cantidad!="" && objeto!=null && objeto!=""){
		if (!isNaN(cantidad))
			return "";
		else
			return "Los datos introducidos no son correctos";
	} else
		return "Debe rellenar todos los campos";
}

function limpiarCamposCompra(){
	var allFields = jQuery("#form_crearCompra input");
	allFields.val("");
}

function modificarCompra(id){
	jQuery.ajax({
		url: "loadCompraById.htm",
		dataType: "json",
		data:{
			idCompra: id
		},
		success: function(bean){
			limpiarCamposCompra();
			jQuery("#codigoCompra").val(bean.id);
//			jQuery("#descripcionLimitacion").val(bean.codObjeto);
			jQuery("#descObjeto").val(bean.descObjeto);
			jQuery("#fechaCompra").val(bean.fecha);
			jQuery("#precio").val(bean.precio);
			cargarFormularioCompra("updateCompra");
			obtenerTotales();
		}
	});
	
}

function guardarCompra(){
	jQuery.ajax({
		url: "addModifyCompra.htm",
		dataType: "json",
		data:{
			id: jQuery("#codigoCompra").val(),
			idCuenta: jQuery("#idCuenta").val(),
			descObjeto: jQuery("#descObjeto").val(),
			fecha: jQuery("#fechaCompra").val(),
			precio: jQuery("#precio").val()
		},
		success: function(bean){
			jQuery("#form_crearCompra").dialog("close");
			obtenerListaCompras();
			obtenerTotales();
		}
	});
	
}

function borrarCompra(idCompra){
	jQuery.ajax({
		url: "deleteCompra.htm",
		dataType: "json",
		data:{
			idCompra: idCompra
		},
		success: function(bean){
			obtenerListaCompras();
			obtenerTotales();
		}
	});
	
}

function changeFechaCompraCellClass(data, type, full){
	return "<span style='display:none'>"+data.substring(6) + "/" + data.substring(3,5) + "/" + data.substring(0,2) + "</span>" + data;
}


function obtenerListaCompras(){
	
	
    objectDataTable.url = "findCompras.htm";        	
    objectDataTable.columns = [
//                               {"sWidth" : '4%' ,"mDataProp" : "id"	,"sClass": 'alignCenter'},
                               {"sWidth" : '15%' ,"mDataProp" : "descObjeto"	,"sClass": 'alignCenter'},
                               {"sWidth" : '10%' ,"mDataProp" : "fecha"		,"sClass": 'alignCenter', "mRender": changeFechaCompraCellClass},
                               {"sWidth" : '10%' ,"mDataProp" : "precio"	,"sClass": 'alignCenter'},
                               {"sWidth" : '1%',"mDataProp" : "icono"}
                              ];
    
    objectDataTable.fnServerData = 
    	function(sSource, aoData, fnCallback) {
	        jQuery.ajax({	        	
	            dataType : "json",
	            url : sSource,
	            data : {
	                idCuenta: jQuery("#idCuenta").val()
	            },
	            success : function(beans) {
	                jQuery('#tablaCompras').dataTable().fnSort([ [ 1, 'desc' ] ]);
	                fnCallback(beans);
	            }
	        });
		};	
	objectDataTable.fnDrawCallback = 
		function(oSettings, json) {
	    	
		};									
    
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        jQuery('td:eq(3)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
	        jQuery('td:eq(3)', nRow).bind({
	        	click:	
	        		function(){
		        		showModal("�Est� seguro que quiere eliminar la compra " + aoData.id + "?", borrarCompra, aoData.id);
	        		}
	        	});
	        jQuery('td:lt(3)', nRow).click(function(event) {
	        	modificarCompra(aoData.id);
	    	});
	        var claseActual = '';
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
	        });        
	        
		};
		objectDataTable.bFilter=false;
		objectDataTable.sScrollY='160px';
		objectDataTable.bPaginate=false;
	var oTable = jQuery('#tablaCompras').myDataTable(objectDataTable);
}


