jQuery(document).ready(function(){

	validarFormulario("derechoCPIForm");
	
	//Inicialización del campo fecha
	datepicker("#fechaInicioVigencia", "#fechaFinVigencia");

	//Inicialización del accordion
	initAccordion([0]);
	
	//Inicialización de los autocomplete
	initAutocomplete();
	
	//Inicialización de los botones
	initButtonAddTerritorio();
	initButtonAddIdioma();
	initButtonAddSistemaModo();
	
	// Inicialización de la cabecera de datos del programa/capitulo
	var entrada = {
			codigoEmision : jQuery("#codigoEmision").val(),
			codigoPrograma : jQuery("#codigoPrograma").val(),
			idAdquisicion : jQuery("#idAdquisicion").val(),
			codigoAudio : jQuery("#codigoAudio_hidden").val(),
			contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
			formulario : jQuery("#derechoCPIForm")
	};
	completeDetallePrograma(entrada);
	
	/* Se fija la cabecera y el menú de la aplicación */
	fijarCabecera();

	
	// Inicialización según el tipo de producción (Ajena, Propia, Externa)
	//AJENA
	if (jQuery('#codClaseProduccion_hidden').val() != '00'){
		jQuery('#codigo_operativo_sap').attr('style','display:none');
	}else{
		jQuery('#codigo_operativo_sap').attr('style','display:block');

		// Convertir los 4 campos del código operativo SAP en campos obligatorios cuando el programa es de Ajenas.
		jQuery("#codigoImputacionSAP, " +
			   "#descripcionCadena, " +
			   "#descripcionBanda, " +
			   "#descripcionContenido, " +
			   "#descripcionSubgenero").addClass('required');
		
	}

	//Multidifusión
	if (jQuery('#numeroEmisiones').val() !=0 || jQuery('#numeroDias').val() != 0){
		jQuery("#multidifusion_derecho").iCheck('check');
	}else{
		jQuery("#multidifusion_derecho").iCheck('uncheck');
		jQuery('#numeroEmisiones,#numeroDias').val(0).attr('readonly', true).addClass ('disabled');		
	}
	jQuery('#multidifusion_derecho').on('ifChecked', function(event){
		jQuery('#numeroEmisiones, #numeroDias').removeAttr('readonly').removeClass('disabled');		
	});
	
	jQuery('#multidifusion_derecho').on('ifUnchecked', function(event){
		jQuery('#numeroEmisiones, #numeroDias').val(0).attr('readonly', true).addClass ('disabled');		
	});
	
	//Listado de cadenas del Grupo de cadenas
	jQuery('.icon-tv').click(function(event) {
		event.preventDefault();
		showInfo(jQuery('.icon-tv').attr('title'), 'Lista de cadenas');
	});
	getCadenasByAgrupacion();
	
	//Inicialización de la adquisición si ésta es pendiente
	if (jQuery("#codigoTipoContratacion").val() == ADQUISICION_PENDIENTE){
		if (jQuery ("#codTipoContrato").val() == ""){
			var mensaje = 'El programa en uso, ¿posee pases ilimitados?';
			jQuery("#codigoTipoContratacion_hidden").val(ADQUISICION_LIMITADA);
			showModal (mensaje, asignarTipoContratacionDerecho);			
		}else{
			if (jQuery("#codTipoContrato").val() == TTIPOCONT_DOMINIO_PUBLICO ||
				jQuery("#codTipoContrato").val() == TTIPOCONT_PASES_ILIMITADOS){
				jQuery("#codigoTipoContratacion_hidden").val(ADQUISICION_ILIMITADA);
			}else{
				jQuery("#codigoTipoContratacion_hidden").val(ADQUISICION_LIMITADA);
			}
		}
	}	
	
	// Si es el primer derecho que se crea, bloquear la edición del código de imputación SAP y código operativo.
	if (jQuery("#cantidadDerechosComunicacionPublica").val() == 0){
		jQuery("#codigoImputacionSAP," +
				"#descripcionCadena," +
				"#descripcionContenido," +
				"#descripcionBanda," +
				"#descripcionSubgenero").attr('readonly', true).addClass ('disabled');
		
//		jQuery ("#barraDatosGenerales").text (jQuery ("#barraDatosGenerales").text () + 
//											  " / ID Derecho: " + jQuery("#idDerecho").val());
	}

	// En la modificación de un derecho existente, deshabilitar la modificación del código de imputación SAP, la franja y el subgénero
	if (jQuery("#idDerecho").val() != ""){
		jQuery("#codigoImputacionSAP," +
			   "#descripcionBanda," +
			   "#descripcionSubgenero").attr('readonly', true).addClass ('disabled');
	}

	setInformacionBarraDatosGenerales();

	//Si no es el primer derecho, se permite modificar el código de imputación SAP (sólo en la creación). 
	//Si se detecta que se está cambiando, vaciar el código operativo para obligar a que se rellene.
	if (jQuery("#cantidadDerechosComunicacionPublica").val() > 0 && 
		(jQuery("#idDerecho").val() == 0 || jQuery("#idDerecho").val() == "")){
		
		jQuery("#codigoImputacionSAP").attr('readonly', false).removeClass ('disabled');
		
		jQuery("#codigoImputacionSAP").change(function(){
			jQuery("#descripcionCadena," +
				   "#descripcionContenido," +
				   "#descripcionBanda," +
				   "#descripcionSubgenero").attr('readonly', false).removeClass ('disabled').val("");
		});
	}
	
	jQuery('#resumenExcluidos').css('display','none');
	
	jQuery('#save').bind('click', function(event){
		event.preventDefault();
		var mensaje = "";
		jQuery("#alert-list li").each(function(indice,valor) {
			mensaje += "-" + valor.innerText + "<br>";
		});  
		if (mensaje!=""){
			mensaje += "¿Desea continuar?";
			showModal(mensaje, comprobarAsociacionesConOtrosDerechos, "", "", "");
		}else{
			comprobarAsociacionesConOtrosDerechos();
		}
	});

	
	jQuery('#btnBorrarDerecho').click(function(event) {
		event.preventDefault();
		var mensaje = "Ha seleccionado eliminar el derecho. ";
		var derechoComercial = jQuery("#idDerechoComercializacion").val();
		var derechoInteractivos = jQuery('#idDerechoAsociadoInteractivos').val();
		var numDerechosHijos = jQuery("#cantidadDerechosHijos").val();
		if (numDerechosHijos!=null && numDerechosHijos!="" && numDerechosHijos!="0"){
			mensaje += "<br>-Va a eliminar un derecho que tiene derechos hijos asociados. Se eliminará el derecho y todos sus hijos. ";
		} 
		if (derechoComercial!=null && derechoComercial!=""){
			mensaje += "<br>-Va a eliminar un derecho que tiene un derecho comercial asociado. No se borrará el derecho comercial. ";
		}
		if (derechoInteractivos!=null && derechoInteractivos!=""){
			mensaje += "<br>-Va a eliminar un derecho que tiene un derecho de interactivos asociado. No se borrará el derecho de interactivos. ";
		}
		mensaje += "<br>Pulse Aceptar si desea continuar. ";
		showModal(mensaje,borrarDerecho,"");

	});

	jQuery( "#carencia" ).change(function(){calculaPeriodoCarencia();});
	calculaPeriodoCarencia();
	
	
	jQuery("#descripcionGrupoCadenas").keyup(function(event){
		if (this.value == ''){
			jQuery('.icon-tv').css("display", "none");
			jQuery('.icon-tv').attr('title', '');
		}
	});

	// Si se realiza un cambio en la pantalla general del derecho, se obliga a guardar los
	// cambios antes de crear/modificar/borrar elementos del derecho	 
	comprobarCambiosGenerales("datosGeneralesDerecho", "derechoCPIForm");
	
});

function asignarTipoContratacionDerecho (){
	jQuery("#codigoTipoContratacion_hidden").val(2);
}

function save(){
	//Con esta funcion indicamos que se deberá cargar la 
	//tabla de herencia para seleccionar aquellos capitulos
	//sobre los que se desea heredar la modificación del derecho
	setCargarTablaHerencia();
	
	jQuery("#action").val ("save");
	jQuery("#derechoCPIForm").submit();
}


function comprobarAsociacionesConOtrosDerechos(){
	var mensaje = "";
	if (hayAsociacionConDerechoComercial()){
		mensaje = 'El Derecho con Ref. ' + jQuery("#idDerecho").val() + ' tiene asociado un Derecho de Comercialización.<br/>'+
				  '¿ Desea eliminar la relación con el Derecho de Comercialización ?';
		showModal (mensaje, borrarRelacionDerechoComercial, "SI", borrarRelacionDerechoComercial, "NO");
	}else {
		comprobarAsociacionConDerechoInteractivos();
	}
}

function comprobarAsociacionConDerechoInteractivos(){
	var mensaje = "";
	if (hayAsociacionConDerechoInteractivos()){
		mensaje = 'El Derecho con Ref. ' + jQuery("#idDerecho").val() + ' tiene asociado un Derecho de Interactivos.<br/>'+
				  '¿ Desea eliminar la relación con el Derecho de Interactivos ?';
		showModal (mensaje, borrarRelacionDerechoInteractivos, "SI", borrarRelacionDerechoInteractivos, "NO");
	}else{
		save();
	}
}

function hayAsociacionConDerechoInteractivos(){
	if (!jQuery("#interactivos").prop('checked') && 
		(jQuery("#idDerechoAsociadoInteractivos").val() != null && jQuery("#idDerechoAsociadoInteractivos").val() != "" && 
		jQuery("#idDerechoAsociadoInteractivos").val() != "0")){
		
		return true;
	}else{
		return false;
	}
}

function hayAsociacionConDerechoComercial(){
	if (!jQuery("#comercializacion").prop('checked') && 
		(jQuery("#idDerechoComercializacion").val() != null && jQuery("#idDerechoComercializacion").val() != "" && 
		jQuery("#idDerechoComercializacion").val() != "0")){
		
		return true;
	}else{
		return false;
	}
}

function borrarRelacionDerechoComercial(respuesta){
	if (respuesta == "NO"){
		jQuery('#comercializacion').iCheck("check");
	}
	comprobarAsociacionConDerechoInteractivos();
}

function borrarRelacionDerechoInteractivos(respuesta){
	if (respuesta == "NO"){
		jQuery('#interactivos').iCheck("check");
	}
	save();
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
		jQuery('#resumenDerecho').attr("style", "");
	}else{
		jQuery('#resumenDerecho').attr('style','display:none');
		
	}

	if (jQuery('#idDerechoAsociadoInteractivos').val()!=null && jQuery('#idDerechoAsociadoInteractivos').val()!= ""){
		jQuery('#resumenDerechoInteractivo').attr("style", "");
	}else{
		jQuery('#resumenDerechoInteractivo').attr('style','display:none');
	}

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

	jQuery ("#resumenDerechoInteractivo").bind("click", function(event){
		event.stopPropagation();	//Impide que se abra el accordion
		var idDerechoAsociadoInteractivos = jQuery('#idDerechoAsociadoInteractivos').val();
		var idTipoDerecho = ID_TIPO_DERECHO_INT;
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
}

function borrarDerecho (){
	jQuery.ajax({	        	
        dataType : "json",
        url : "borrarDerechoCPI.htm",
        data : {
        	idDerecho: jQuery("#idDerecho").val(),            
        	contratoDogma: jQuery("#contratoDogma_hidden").val()            
        },
        success : function(json) {
        	// volvemos al listado de derechos
        	jQuery('#cancel').click();	        	
        }
    });
	
}

function getCadenasByAgrupacion(){
	jQuery('.icon-tv').attr('title', '');
		
	if (jQuery("#codigoGrupoCadenas").val()!=""){
		jQuery.ajax({	        	
	        dataType : "text",
	        url : "getCadenasByAgrupacion.htm",
	        data : {
	            codGrupo: jQuery("#codigoGrupoCadenas").val()            
	        },
	        success : function(listaCadenas) {
	        	jQuery('.icon-tv').css('display','block').attr('title', listaCadenas);	        	
	        }
	    });
	}
}

function calculaPeriodoCarencia(carencia){
	var fechaEstrenoSalas = jQuery ("#fechaEstrenoSalas").val();
	if (fechaEstrenoSalas == null || fechaEstrenoSalas == "" || fechaEstrenoSalas == undefined)
		jQuery ("#resultadoAddCarencia").text ("");
	else{
		// Convertimos la fecha de estreno en salas de yyyy-mm-dd y le sumamos la carencia
		var fechaConvertir =  parseDate(fechaEstrenoSalas);
		var carenciaInt = 0;
		if (!isNaN(parseInt(jQuery('#carencia').val())))
			carenciaInt = parseInt(jQuery('#carencia').val(),10);
		else
			jQuery('#carencia').val("");
		var fechaConvertida = convertDate(DateAdd(fechaConvertir, "D", carenciaInt));
		jQuery ("#resultadoAddCarencia").text(fechaConvertida);
	}
}

function initAutocomplete(){
	generaAutocomplete(jQuery('#codigoCadena'),
			   jQuery('#descripcionCadena'),
			   "autocompleteCadenasDerecho.htm", 
			   "", 
			   "");
	generaAutocomplete(jQuery('#codigoBanda'),
			   jQuery('#descripcionBanda'),
			   "autocompleteBandas.htm", 
			   "", 
			   "");
	generaAutocomplete(jQuery('#codigoContenido'),
			   jQuery('#descripcionContenido'),
			   "autocompleteContenidos.htm", 
			   "", 
			   "");
	generaAutocomplete(jQuery('#codigoSubgenero'),
			   jQuery('#descripcionSubgenero'),
			   "autocompleteSubgeneros.htm", 
			   "", 
			   jQuery('#codigoContenido'));
	jQuery("#descripcionContenido").change(function(){
		jQuery("#codigoSubgenero, #descripcionSubgenero").val('');		
	});
	generaAutocomplete(jQuery('#codigoGrupoCadenas'),
			   jQuery('#descripcionGrupoCadenas'),
			   "autocompleteAgrupacionCadenas.htm", 
			   "getCadenasByAgrupacion()", 
			   jQuery('#codAreaProduccion_hidden'));
	generaAutocomplete(jQuery('#codigoContratoAsociado'),
			   jQuery('#descripcionContratoAsociado'),
			   "autocompleteContratosPrograma.htm", 
			   "", 
			   jQuery('#programaCapitulo_hidden'));
}