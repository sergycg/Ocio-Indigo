jQuery(document).ready(function(){
	validarFormulario("editContrato","form_crearTitular");

	jQuery('#busquedaProveedores').css('display', 'none');
	
	jQuery('.icon-find').click(function(event) {
		var anchura = jQuery("#form_crearTitular").dialog("option", "width");
		var altura = jQuery("#form_crearTitular").dialog("option", "height");
		
		if (jQuery('#busquedaProveedores').css('display') == 'block'){
			jQuery("#form_crearTitular").dialog("option", "width", anchura - 300);
			jQuery("#form_crearTitular").dialog("option", "height", altura - 400);
		}else{
			jQuery("#form_crearTitular").dialog("option", "width", anchura + 300);
			jQuery("#form_crearTitular").dialog("option", "height", altura + 400);
		}

		jQuery("#form_crearTitular").dialog("option", "position", "center");
	});

});	

/**
 * LLamada AJAX para la carga de la tabla de titulares,
 */
function obtenerTablaTitulares(idContrato) {
	jQuery ("#porcentajeTitularidad").val(100);
	
	objectDataTable.url = "findTitularesCedentes.htm";        	
	objectDataTable.columns = [ {"sWidth" : '10%',"mDataProp" : "idTitularSAP"}, 
	         	                {"sWidth" : '70%',"mDataProp" : "descTitularSAP"}, 
	        	                {"sWidth" : '15%',"mDataProp" : "porcentajeParticipacion"},
	        	                {"sWidth" : '5%',"mDataProp" : "icono"}]; 
	//objectDataTable.sScrollY = '223px';
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					idContrato : idContrato
				},
				success : function(json) {
	                jQuery('#tablaTitulares').attr('style', 'width:100%');
	                jQuery('#tablaTitulares').dataTable().fnSort([ [ 1, 'asc' ] ]);
				    fnCallback(json);
				}
		    });
		};
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
	        
	        jQuery(nRow).bind({
	            mouseover:
	                function() {
//	                    claseActual = jQuery(this).attr('class');
	                    jQuery(this).removeClass();
	                    jQuery(this).addClass("resaltar");
	                },
	            mouseout:
	                function() {
	                    jQuery(this).removeClass();
		                    jQuery(this).addClass(claseActual);
	                }
	        });
	        jQuery('td:eq(3)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
	        jQuery('td:eq(3)', nRow).bind({
	        	click:	
	        		function(){
		        		var arrayParams = new Array( aoData.idTitularSAP, 
		        				jQuery("#idContrato").val());
		        		showModal("¿Está seguro que quiere eliminar el titular " + aoData.idTitularSAP + "?", 
	                			  borrarTitular, arrayParams);
	        		}
	        	});
	        jQuery('td:lt(3)', nRow).bind({
	            click:
	            	function() {
	            		cargarFormularioAltaModificacionTitular(aoData.idTitularSAP, jQuery("#idContrato").val());
	            }
	        });
	        
	        recalcularPorcentajeTitularidad(aoData);
		};

	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	
	var tablaTitulares = jQuery('#tablaTitulares').myDataTable(objectDataTable);
}

function recalcularPorcentajeTitularidad(data){
	var porcentajeTitular = data['porcentajeParticipacion'];
	jQuery ("#porcentajeTitularidad").val(jQuery ("#porcentajeTitularidad").val() - porcentajeTitular);
}

function cargarFormularioAltaModificacionTitular(idTitular, idContrato){
	var listaTitulares = jQuery('#tablaTitulares').dataTable().fnGetData();
	var listaTitularesString = "";
	var i = 0;
	if (listaTitulares.length > 0){
		if (idTitular == ""){
			for (i = 0; i < listaTitulares.length; i++){
				listaTitularesString += listaTitulares[i].idTitularSAP + ",";	
			}
			listaTitularesString = listaTitularesString.substring(0, listaTitularesString.length - 1);
		}else{
			for (i = 0; i < listaTitulares.length; i++){
				if (listaTitulares[i].idTitularSAP != idTitular)
					listaTitularesString += listaTitulares[i].idTitularSAP + ",";
			}
			listaTitularesString = listaTitularesString.substring(0, listaTitularesString.length - 1);
			jQuery('#titularesForm\\.idTitularSAP').val (idTitular);
		}
	}

	jQuery.ajax({
		url: "loadTitularById.htm",
		dataType: "json",
		data:{
			idTitularSAP: idTitular,
			idContrato: idContrato,
			listaIdTitularesSAP:  listaTitularesString
		},
		success: function(bean){
			jQuery('#titularesForm\\.idTitularSAP').val (bean.idTitularSAP);
			jQuery('#titularesForm\\.descTitularSAP').val (bean.descTitularSAP);
			if (bean.porcentajeParticipacion != null && bean.porcentajeParticipacion == 0)
				jQuery('#titularesForm\\.porcentajeParticipacion').val ("");
			else
				jQuery('#titularesForm\\.porcentajeParticipacion').val (bean.porcentajeParticipacion);

			cargarFormularioTitular(bean.idTitularSAP, bean.descTitularSAP, bean);
			
			jQuery("#listaTitularesString").val (listaTitularesString);
			generaAutocomplete(jQuery('#titularesForm\\.idTitularSAP'),jQuery('#titularesForm\\.descTitularSAP'),"autocompleteProveedoresSap.htm", "", jQuery("#listaTitularesString"));
		}
	});
}

function cargarFormularioTitular(idTitular, idContrato, bean){
	
	var validatorTitulares = validarFormulario("editContrato","form_crearTitular");
	var dialogTitular = jQuery("#form_crearTitular").dialog({
		height : 300,
		width : 700,
		title : "Titulares y Cedentes",
		open: function( event, ui ) {
			if (idTitular != ""){
				jQuery('#titularesForm\\.idTitularSAP').attr ("readonly", true).addClass('disabled');
				jQuery('#titularesForm\\.descTitularSAP').attr ("readonly", true).addClass('disabled');
				jQuery('#accionAltaModificacionTitulares').val("update");
			}else{
				jQuery('#titularesForm\\.idTitularSAP').attr ("readonly", false).removeClass('disabled');
				jQuery('#titularesForm\\.descTitularSAP').attr ("readonly", false).removeClass('disabled');
				jQuery('#accionAltaModificacionTitulares').val("add");
			}
		},
		buttons : {
			"Guardar" : function() {
				jQuery("#editContrato").attr ("action", "addTitular.htm");
				jQuery("#editContrato").submit();
			},
			"Cancelar" : function() {
				limpiarCamposTitular();
				validatorTitulares.resetForm();
				dialogTitular.dialog("close");
			}
		},
		close:function (){
		    limpiarCamposTitular();
			jQuery('#busquedaProveedores').css('display', 'none');
		}
	});

	dialogTitular.parent().appendTo(jQuery("form:first"));
	jQuery("#form_crearTitular", window.parent.document).scrollTop(0);
}

function borrarTitular(arrayParametros){
	var idContrato = jQuery("#idContrato").val();
	jQuery.ajax({
		url: "eliminarTitular.htm",
		dataType: "json",
		data:{
			idTitular: arrayParametros[0],
			idContrato: arrayParametros[1]
		},
		success: function(json){
			obtenerTablaTitulares(idContrato);
		}
	});
}

function limpiarCamposTitular(){
	var allInputs = jQuery("#form_crearTitular input");
	allInputs.val("");
}