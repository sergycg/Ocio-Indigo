
function asignarTipoContratacionDerecho (){
	jQuery("#codigoTipoContratacion_hidden").val(2);
}

jQuery(document).ready(function(){

	var validator = validarFormulario("derechoTRNForm");
	
	//Inicialización del campo fecha
	datepicker("#fechaInicioVigencia", "#fechaFinVigencia");

	//Inicialización del accordion
	initAccordion([0]);
	
	initButtonAddTerritorio();
	initButtonAddIdioma();
	initButtonAddProductos();
	
	/* Se fija la cabecera y el menú de la aplicación */
	fijarCabecera();
	
	/**
	 * Si se realiza un cambio en la pantalla general del derecho, se obliga a guardar los
	 * cambios antes de crear/modificar/borrar elementos del derecho
	 */
	comprobarCambiosGenerales("datosGeneralesDerecho", "derechoTRNForm");
	
	// Inicialización de la cabecera de datos del programa/capitulo
	var entrada = {
			codigoEmision : jQuery("#codigoEmision").val(),
			codigoPrograma : jQuery("#codigoPrograma").val(),
			idAdquisicion : jQuery("#idAdquisicion").val(),
			codigoAudio : jQuery("#codigoAudio_hidden").val(),
			contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
			formulario : jQuery("#derechoTRNForm")
	};
	completeDetallePrograma(entrada);
	
	// Si es el primer derecho que se crea, bloquear la edición del código de imputación SAP y código operativo.
//	if (jQuery("#cantidadDerechosComunicacionPublica").val() == 0){
//		jQuery ("#barraDatosGenerales").text (jQuery ("#barraDatosGenerales").text () + 
//											  " / ID Derecho: " + jQuery("#idDerecho").val());
//	}

	setInformacionBarraDatosGenerales();

	jQuery('#save').bind('click', function(event){
		event.preventDefault();
		var mensaje = "";
		if (!jQuery("#comercializacion").prop('checked') && 
			(jQuery("#idDerechoComercializacion").val() != null && jQuery("#idDerechoComercializacion").val() != "" && 
			jQuery("#idDerechoComercializacion").val() != "0")){
			mensaje = 'El Derecho con Ref. ' + jQuery("#idDerecho").val() + ' tiene asociado un Derecho de Comercialización.<br/>'+
					  '¿ Desea eliminar la relación con el Derecho de Comercialización ?';
			showModal (mensaje, borrarRelacionDerechoComercial, "SI", borrarRelacionDerechoComercial, "NO");
		}else{
			jQuery("#action").val ("save");
			jQuery("#derechoTRNForm").submit();
		}
	});

	jQuery('#btnBorrarDerecho').click(function(event) {
		event.preventDefault();
		var mensaje = "Ha seleccionado eliminar el derecho. ";
		var derechoComercial = jQuery("#idDerechoComercializacion").val();
		if (derechoComercial!=null && derechoComercial!=""){
			mensaje += "<br>-Va a eliminar un derecho que tiene un derecho comercial asociado. No se borrará el derecho comercial. ";
		}
		mensaje += "<br>Pulse Aceptar si desea continuar. ";
		showModal(mensaje,borrarDerecho,"");
	});

});

function borrarRelacionDerechoComercial(respuesta){
	if (respuesta == "NO"){
		jQuery('#comercializacion').iCheck("check");
	}
	jQuery("#action").val ("save");
	jQuery("#derechoTRNForm").submit();
}

function setInformacionBarraDatosGenerales(){
	if (jQuery("#idDerecho").val() != ""){
		jQuery ("#barraDatosGenerales").text (jQuery ("#barraDatosGenerales").text () + 
											  " / Ref. Derecho: " + jQuery("#idDerecho").val());
	}
	jQuery ("#barraDatosGenerales").text (jQuery ("#barraDatosGenerales").text () +
										  " / Ámbito: " + jQuery ("#descripcionAmbitoDerecho").val() +
										  " / Tipo: " + jQuery ("#descripcionTipoDerecho").val());

	if (jQuery('#idDerechoComercializacion').val()!=null && jQuery('#idDerechoComercializacion').val()!= ""){
		jQuery ("#barraDatosGenerales").html (jQuery ("#barraDatosGenerales").html() + 
				"&nbsp;&nbsp;&nbsp;<span id='resumenDerecho' title='Ver detalle del Derecho Comercial asociado'><img src='./img/icon_link-comercial_TIPO2.png' alt='Ver detalle del Derecho Comercial asociado'></img></span>");
		jQuery ("#resumenDerecho").bind("click", function(event){
			event.stopPropagation();	//Impide que se abra el accordion 
			jQuery.ajax({
		       dataType : "json",
		       url : "getDetailDerechoComercial.htm",
		       data : {
		            codigoDerecho : jQuery('#idDerechoComercializacion').val()
		        },
		        success : function(bean) {
		        	openDialogDerechoComercial(dialogConsulta, bean, "");
		        }
		    });
		});
	}

}

function borrarDerecho (){
	jQuery.ajax({	        	
        dataType : "json",
        url : "borrarDerechoTRN.htm",
        data : {
        	idDerecho: jQuery("#idDerecho").val()            
        },
        success : function(json) {
        	// volvemos al listado de derechos
        	jQuery('#cancel').click();	        	
        }
    });
	
}