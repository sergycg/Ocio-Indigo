jQuery(document).ready(function(){
  
	jQuery("#activo").attr('readOnly',true).addClass('disabled');
	
	if (jQuery('#codProveedor').val()==''){
		jQuery("#codProveedor").removeAttr('readOnly').removeClass('readonly');
	}else{
		var proveedor = 
		{
			codigo : jQuery('#codProveedor').val().trim(),
			cif : jQuery('#cifProveedor').val().trim(),
			razonSocial : jQuery('#descProveedor').val().trim(),
			activo : jQuery ("#activo").val()
		};
		
		setDatosFormulario (proveedor);
	}
  
	jQuery('#btnVolver').click(function(event) {
		event.preventDefault();
		jQuery("#form_seleccionarProveedor").dialog("close");
	});
  
	jQuery('#btnLimpiarDatos').click(function(event) {
		event.preventDefault();
		
		jQuery("#codProveedor").val('');
		jQuery("#cifProveedor").val('');
		jQuery("#descProveedor").val('');
		
		jQuery("#codProveedor").attr('readonly', false).removeClass ('disabled');
		jQuery("#cifProveedor").attr('readonly', false).removeClass ('disabled');
		jQuery("#descProveedor").attr('readonly', false).removeClass ('disabled');
		
		jQuery ("#iconoActivoSAP").removeClass();
		jQuery ("#activo").val("0");
		jQuery ("#activoSGDR").val ("1");
		jQuery ("#activoSGDR").iCheck ("check");
	});

	jQuery('#save').click(function(event) {
		event.preventDefault();
		
		var codProveedor = "";
		var cifProveedor = "";
		var razonSocial = "";
		
		codProveedor = jQuery('#codProveedor').val().trim();
		cifProveedor = jQuery('#cifProveedor').val().trim();
		razonSocial = jQuery('#descProveedor').val().trim();

		if (codProveedor == "" && cifProveedor == "" && razonSocial == ""){
			showWarning("Rellene los datos del proveedor");
		}else{
			jQuery.ajax({
				url: "validaProveedor.htm",
				type: "GET",
				data:	{
							codProveedor  : jQuery("#codProveedor").val(),
							descProveedor : jQuery("#descProveedor").val(),
							cifProveedor : jQuery("#cifProveedor").val()
						},
				dataType: "json",
				success: function(listaProveedores) {
					if (listaProveedores != null){
						if (listaProveedores.aaData.length == 1){
							var proveedor = 
							{
								codigo : listaProveedores.aaData[0].codProveedor,
								razonSocial : listaProveedores.aaData[0].descProveedor,
								cif : listaProveedores.aaData[0].cifProveedor,
								activo : listaProveedores.aaData[0].activo
							};
							
							setDatosFormulario (proveedor);
							
							jQuery("#editProveedores").attr ("action", "saveProveedor.htm");
							jQuery("#editProveedores").submit();
						}else{
							abrirPopupSeleccionProveedor(listaProveedores, "GUARDAR");
						}
					}
				}
			});
		}
	});
  
  jQuery('#btnValidar').click(function(event) {
		event.preventDefault();
		
		var codProveedor = "";
		var cifProveedor = "";
		var razonSocial = "";
		
		codProveedor = jQuery('#codProveedor').val().trim();
		cifProveedor = jQuery('#cifProveedor').val().trim();
		razonSocial = jQuery('#descProveedor').val().trim();

		if (codProveedor == "" && cifProveedor == "" && razonSocial == ""){
			showWarning("Debe rellenar algún dato para validar el proveedor SAP");
		}else{
			jQuery.ajax({
				url: "validaProveedor.htm",
				type: "GET",
				data:	{
							codProveedor  : jQuery("#codProveedor").val(),
							descProveedor : jQuery("#descProveedor").val(),
							cifProveedor : jQuery("#cifProveedor").val()
						},
				dataType: "json",
				success: function(listaProveedores) {
					if (listaProveedores != null){
						if (listaProveedores.aaData.length == 1){
							var proveedor = 
							{
								codigo : listaProveedores.aaData[0].codProveedor,
								razonSocial : listaProveedores.aaData[0].descProveedor,
								cif : listaProveedores.aaData[0].cifProveedor,
								activo : listaProveedores.aaData[0].activo
							};
							
							setDatosFormulario (proveedor);
						}else{
							abrirPopupSeleccionProveedor(listaProveedores, "VALIDAR");
						}
					}
				}
			});
		}
	});
});

function setDatosFormulario (proveedor){
	jQuery("#codProveedor").val(proveedor.codigo);
	jQuery("#cifProveedor").val(proveedor.cif);
	jQuery("#descProveedor").val(proveedor.razonSocial);
	jQuery("#activo").val(proveedor.activo);
	
	if (proveedor.activo == 0) jQuery ("#iconoActivoSAP").addClass ("icon-NOK");
	else jQuery ("#iconoActivoSAP").addClass ("icon-OK");
	
	jQuery("#codProveedor").attr('readonly', true).addClass ('disabled');
	jQuery("#cifProveedor").attr('readonly', true).addClass ('disabled');
	jQuery("#descProveedor").attr('readonly', true).addClass ('disabled');
}

function abrirPopupSeleccionProveedor(listaProveedores, accion){
	var dialogProveedor = jQuery("#form_seleccionarProveedor").dialog({
		height : 500,
		width : 900,
		title : "Selección de proveedor",
		open:function(){
			cargarTablaProveedores(listaProveedores, accion);
		},
		close:function (){
		}
	});
}
/**
 * LLamada AJAX para la carga de la tabla de capítulos de programa,
 */
function cargarTablaProveedores(listaProveedores, accion) {
	
	jQuery('#tablaProveedores').css ("display", "");
	jQuery('#tablaProveedores').css ("width","98%");
 
	objectDataTable.columns = [ 
								{"sWidth" : '10%',"mDataProp" : "codProveedor"}, 
								{"sWidth" : '10%',"mDataProp" : "cifProveedor"}, 
								{"sWidth" : '75%',"mDataProp" : "descProveedor"},
								{"sWidth" : '5%',"mDataProp" : "activo", "mRender": changeCellClass}
							];
	objectDataTable.sScrollY = "250px";
	objectDataTable.bScrollCollapse = true;
	
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    fnCallback(listaProveedores);
		};
	
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
			var data = aoData;
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
		        		var proveedor = 
						{
							codigo : data["codProveedor"],
							razonSocial : data["descProveedor"],
							cif : data["cifProveedor"],
							activo : data["activo"]
						};
		        		setDatosFormulario(proveedor);

						jQuery("#form_seleccionarProveedor").dialog("close");
						
						if (accion != undefined && accion == "GUARDAR"){
							jQuery("#editProveedores").attr ("action", "saveProveedor.htm");
							jQuery("#editProveedores").submit();
						}
	                }
		        });
		};
	objectDataTable.bPaginate = false;
	var tablaCapitulos = jQuery('#tablaProveedores').myDataTable(objectDataTable);
	
}

/**
 * Muestra check o aspa en funcion si tiene o no el tipo de plantilla definida
 */
function changeCellClass ( data, type, full ) {
	return ((data == 1)?"<div class='icon-OK'></div>":"<div class='icon-NOK'></div>");
}