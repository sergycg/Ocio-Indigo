
function asignarTipoContratacionDerecho (){
	jQuery("#codigoTipoContratacion_hidden").val(2);
}

jQuery(document).ready(function(){

	var validator = validarFormulario("derechoINTForm");
	
	//Inicialización del campo fecha
	datepicker("#fechaInicioVigencia", "#fechaFinVigencia");

	//Inicialización del accordion
	initAccordion([0]);
	
	initButtonAddTerritorio();
	initButtonAddIdioma();
	initButtonAddSistemaModo();
	
	/* Se fija la cabecera y el menú de la aplicación */
	fijarCabecera();

	initCatchupSimultcast();
	
	/**
	 * Si se realiza un cambio en la pantalla general del derecho, se obliga a guardar los
	 * cambios antes de crear/modificar/borrar elementos del derecho
	 */
	comprobarCambiosGenerales("datosGeneralesDerecho", "derechoINTForm");
	
	// Inicialización de la cabecera de datos del programa/capitulo
	var entrada = {
			codigoEmision : jQuery("#codigoEmision").val(),
			codigoPrograma : jQuery("#codigoPrograma").val(),
			idAdquisicion : jQuery("#idAdquisicion").val(),
			codigoAudio : jQuery("#codigoAudio_hidden").val(),
			contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
			formulario : jQuery("#derechoINTForm")
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
		if (jQuery("input[name='tipoExclusividad']").is(':checked') == false){
			showWarning("Debe seleccionar la exclusividad");
		}else if (comprobarFormularioInteractivos()){
			var mensaje = "";
			if (!jQuery("#comercializacion").prop('checked') && 
				(jQuery("#idDerechoComercializacion").val() != null && jQuery("#idDerechoComercializacion").val() != "" && 
				jQuery("#idDerechoComercializacion").val() != "0")){
				mensaje = 'El Derecho con Ref. ' + jQuery("#idDerecho").val() + ' tiene asociado un Derecho de Comercialización.<br/>'+
						  '¿ Desea eliminar la relación con el Derecho de Comercialización ?';
				showModal (mensaje, borrarRelacionDerechoComercial, "SI", borrarRelacionDerechoComercial, "NO");
			}else{
				verificarCatchUpSimulcast();
			}
		}
	});

    jQuery("#nuevo").click(function() {
		validator.resetForm();
		jQuery("#action").val ("nuevo");
		jQuery("#derechoINTForm").submit();
	});
	
    jQuery("#cancel").click(function() {
		validator.resetForm();
		jQuery("#action").val ("cancel");
		jQuery("#derechoINTForm").submit();
	});

	jQuery('#btnBorrarDerecho').click(function(event) {
		event.preventDefault();
		var mensaje = "Ha seleccionado eliminar el derecho. ";
		var derechoComercial = jQuery("#idDerechoComercializacion").val();
		var idDerechoAsociadoInteractivos = jQuery('#idDerechoAsociadoInteractivos').val();
		if (derechoComercial!=null && derechoComercial!=""){
			mensaje += "<br>-Va a eliminar un derecho que tiene un derecho comercial asociado. No se borrará el derecho comercial. ";
		}
		if (idDerechoAsociadoInteractivos!=null && idDerechoAsociadoInteractivos!=""){
			mensaje += "<br>-Va a eliminar un derecho que está asociado a un derecho de comunicación pública. ";
		}
		mensaje += "<br>Pulse Aceptar si desea continuar. ";
		showModal(mensaje,borrarDerecho,"");
	});

});

function initCatchupSimultcast(){
	var idDCP = jQuery('#idDerechoAsociadoInteractivos').val();
	if (idDCP!=null && idDCP!=""){
		if ( jQuery("input[name='emisionPasesCatchUp']").is(':checked') == true ) {
			jQuery('#indCatchUp').iCheck("check");
		}
		
		if ( jQuery("input[name='emisionPasesSimultcast']").is(':checked') == true ) {
			jQuery('#indSimultcast').iCheck("check");
		}
	
		jQuery('#indCatchUp').on('ifUnchecked', function(event){
			jQuery("input[name='emisionPasesCatchUp']").attr('checked',false);
			jQuery ("#divNumDiasCatchUp").attr ("style", "display:none");
		});
		
		jQuery('#indCatchUp').on('ifChecked', function(event){
			if (jQuery("input[name='emisionPasesCatchUp']").value == 1)
				jQuery ("#divNumDiasCatchUp").attr ("style", "display:block");
			else
				jQuery ("#divNumDiasCatchUp").attr ("style", "display:none");
		});

		jQuery('#indSimultcast').on('ifUnchecked', function(event){
			jQuery("input[name='emisionPasesSimultcast']").attr('checked',false);
		});
		
		jQuery("input[name='emisionPasesCatchUp']").change(
		    function(){
		    	if (jQuery(this).is(':checked')) {
		    		jQuery('#indCatchUp').iCheck("check");
		    	}
		    	if (jQuery(this).is(':checked') && this.value == 1){
		        	jQuery ("#divNumDiasCatchUp").attr ("style", "display:block");
		        }else{
		        	jQuery ("#divNumDiasCatchUp").attr ("style", "display:none");
		        }
		    });
	
		jQuery("input[name='emisionPasesSimultcast']").change(
		    function(){
		        if (jQuery(this).is(':checked')) {
		    		jQuery('#indSimultcast').iCheck("check");
		        }
		    });
	}
}

function comprobarFormularioInteractivos(){
	var mensaje = "";
	var idDCP = jQuery('#idDerechoAsociadoInteractivos').val();
	if (idDCP!=null && idDCP!=""){
		if (jQuery('#indCatchUp').is(':checked')==true){
			if ( jQuery("input[name='emisionPasesCatchUp']").is(':checked') == false ) {
				mensaje += "-Ha seleccionado Catch Up, debe seleccionar la cantidad de pases a los que está asociado<br>";
			}
		}
		
		if (jQuery('#indSimultcast').is(':checked')==true){
			if ( jQuery("input[name='emisionPasesSimultcast']").is(':checked') == false ) {
				mensaje += "-Ha seleccionado Simultcast, debe seleccionar la cantidad de pases a los que está asociado<br>";
			}
		}
	}
	
	if (mensaje!=""){
		showWarning(mensaje);
		return false;
	}else{
		return true;
	}
}
function borrarRelacionDerechoComercial(respuesta){
	if (respuesta == "NO"){
		jQuery('#comercializacion').iCheck("check");
	}
	verificarCatchUpSimulcast();
}

function verificarCatchUpSimulcast(){
	var idDCP = jQuery('#idDerechoAsociadoInteractivos').val();
	if (idDCP!=null && idDCP!=""){
		
/*		var table = jQuery('#tablaPasesConsulta').dataTable();
		
		var aTrs = table.fnGetNodes();
		if (aTrs.length>0){
			var catchupTotal = table.fnGetData(0).catchUp;
			var simultcastTotal = table.fnGetData(0).simultcast;
			for ( var i=0 ; i<aTrs.length ; i++ )
			{
				if (catchupTotal!=table.fnGetData(i).catchUp)
					catchupTotal = "Ambos";
				if (simultcastTotal!=table.fnGetData(i).simultcast)
					simultcastTotal = "Ambos";
				if (catchupTotal=="Ambos" && simultcastTotal=="Ambos")
					break;
			}
        	var mensaje = "";
    		if(jQuery("input[name='emisionPasesCatchUp']:checked").val()!="1" && jQuery("input[name='emisionPasesCatchUp']:checked").val()!="2" && catchupTotal!="No"){
    			mensaje += "-No ha marcado la opción de Catch Up, todos los pases del derecho asociado dejarán de ser Catch Up.<br>";
    		}
    		if(jQuery("input[name='emisionPasesSimultcast']:checked").val()=="1" && simultcastTotal!="Sí"){
    			// if simultcast total != SI
    			mensaje += "-Ha seleccionado Simultcast para todos los pases, todos los pases del derecho asociado pasarán a ser Simultcast.<br>";
    		}else if(jQuery("input[name='emisionPasesSimultcast']:checked").val()!="1" && jQuery("input[name='emisionPasesSimultcast']:checked").val()!="2" && simultcastTotal!="No"){
    			// if simultcast total != NO
    			mensaje += "-No ha marcado la opción de Simultcast, todos los pases del derecho asociado dejarán de ser Simultcast.<br>";
    		}
    		
    		if (mensaje!=""){
    			mensaje += "¿Desea continuar?";
    			showModal(mensaje,comprobarCatchUpTodosPases,"");
    		}else{
    			comprobarCatchUpTodosPases();
    		}

		}		
*/		
		// llamada jquery para obtener el catch up total de todos los pases (Sí, No, Ambos) y simultcast total de todos los pases(Sí, No, Ambos)
		jQuery.ajax({	        	
	        dataType : "json",
	        url : "getMensajeComprobacionCatchupSimultcastTodosPases.htm",
	        data : {
	        	idDerechoCPI: 		idDCP,            
	        	catchUpChecked: 	jQuery("input[name='emisionPasesCatchUp']:checked").val(),            
	        	simultcastChecked: 	jQuery("input[name='emisionPasesSimultcast']:checked").val()            
	        },
	        success : function(json) {
	        	var mensaje = json.mensaje;
	        	/*
	    		if(jQuery("input[name='emisionPasesCatchUp']:checked").val()!="1" && jQuery("input[name='emisionPasesCatchUp']:checked").val()!="2" && json.catchupTodosPases!="No"){
	    			mensaje += "-No ha marcado la opción de Catch Up, todos los pases del derecho asociado dejarán de ser Catch Up.<br>";
	    		}
	    		if(jQuery("input[name='emisionPasesSimultcast']:checked").val()=="1" && json.simultcastTodosPases!="Sí"){
	    			// if simultcast total != SI
	    			mensaje += "-Ha seleccionado Simultcast para todos los pases, todos los pases del derecho asociado pasarán a ser Simultcast.<br>";
	    		}else if(jQuery("input[name='emisionPasesSimultcast']:checked").val()!="1" && jQuery("input[name='emisionPasesSimultcast']:checked").val()!="2" && json.simultcastTodosPases!="No"){
	    			// if simultcast total != NO
	    			mensaje += "-No ha marcado la opción de Simultcast, todos los pases del derecho asociado dejarán de ser Simultcast.<br>";
	    		}
	    		*/
	    		if (mensaje!=""){
	    			mensaje += "¿Desea continuar?";
	    			showModal(mensaje,comprobarCatchUpTodosPases,"");
	    		}else{
	    			comprobarCatchUpTodosPases();
	    		}
	        }
	    });
		
	} else {
		enviarFormulario();
	}
}

function comprobarCatchUpTodosPases(){
	if(jQuery("input[name='emisionPasesCatchUp']:checked").val()=="1" && (jQuery("#idDerecho").val() == null || jQuery("#idDerecho").val() == "")){
		openDialogCatchUpTodosPases();
	}else{
		enviarFormulario();
	}
}

function enviarFormulario(){
	jQuery("#action").val ("save");
	jQuery("#derechoINTForm").submit();
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
		jQuery('#resumenDerechoComercial').attr("style", "");
	}else{
		jQuery('#resumenDerechoComercial').attr('style','display:none');
		
	}

	if (jQuery('#idDerechoAsociadoInteractivos').val()!=null && jQuery('#idDerechoAsociadoInteractivos').val()!= ""){
		jQuery('#resumenDCP').attr("style", "");
	}else{
		jQuery('#resumenDCP').attr('style','display:none');
	}

	jQuery ("#resumenDerechoComercial").bind("click", function(event){
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

	jQuery ("#resumenDCP").bind("click", function(event){
		event.stopPropagation();	//Impide que se abra el accordion
		var idDerechoAsociadoInteractivos = jQuery('#idDerechoAsociadoInteractivos').val();
		var idTipoDerecho = ID_TIPO_DERECHO_CPI;
		jQuery.ajax({
	       dataType : "json",
	       url : "getDetailDerecho.htm",
	       data : {
	            codigoDerecho : idDerechoAsociadoInteractivos,
	            codigoTipoDerecho : idTipoDerecho
	        },
	        success : function(bean) {
	        	openDialogDerecho(dialogConsulta, bean, idTipoDerecho);
	        }
	    });
	});

//	if (jQuery('#idDerechoComercializacion').val()!=null && jQuery('#idDerechoComercializacion').val()!= ""){
//		jQuery ("#barraDatosGenerales").html (jQuery ("#barraDatosGenerales").html() + 
//				"&nbsp;&nbsp;&nbsp;<span id='resumenDerecho' title='Ver detalle del Derecho Comercial asociado'><img src='./img/icon_link-comercial_TIPO2.png' alt='Ver detalle del Derecho Comercial asociado'></img></span>");
//	}
//
//	if (jQuery('#idDerechoAsociadoInteractivos').val()!=null && jQuery('#idDerechoAsociadoInteractivos').val()!= ""){
//		jQuery ("#barraDatosGenerales").html (jQuery ("#barraDatosGenerales").html() + 
//				"&nbsp;&nbsp;&nbsp;<span id='resumenDCP' title='Ver detalle del Derecho Comunicación Pública asociado'><img src='./img/icon_link.png' alt='Ver detalle del Derecho Comunicación Pública asociado'></img></span>");
//	}
	
}

function borrarDerecho (){
	jQuery.ajax({	        	
        dataType : "json",
        url : "borrarDerechoINT.htm",
        data : {
        	idDerecho: jQuery("#idDerecho").val()            
        },
        success : function(json) {
        	// volvemos al listado de derechos
        	jQuery('#cancel').click();	        	
        }
    });
	
}


function openDialogCatchUpTodosPases() {

	var create = jQuery("#form_catchUpTodosPases").dialog({
		height : 270,
		width : 400,
		title : "Número de Días para Catch Up",
		buttons : {
			"Aceptar" : function() {
				var num_dias_catchup = jQuery("#catchUpTodosPases").val(); 
				if (num_dias_catchup!=null && num_dias_catchup!="")
					enviarFormulario();
				else 
					showWarning("Debe introducir el número de días");
			},
			"Cancelar" : function() {
				jQuery(this).dialog("close");
			}
		},
		close:function (){
			jQuery(this).dialog("close");
		}
	});
	create.parent().appendTo(jQuery("form:first"));
	jQuery("#form_catchUpTodosPases", window.parent.document).scrollTop(0);
}
