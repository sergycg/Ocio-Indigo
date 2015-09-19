/**
 * Abre una ventana modal en modo consulta con los campos
 * inicializados
 * 
 * @param programaBean
 *                bean con el que se completará los campos
 */
function openDialogDerecho(modo, bean, tipoDerecho) {
	var titulo = "Capítulo";
	if (bean.numeroCapitulo==0){
		titulo = "Cabecera";
	}
    
	var altura = jQuery(window).height() - 100;
	
	var dialogDerecho = {
        width : 1300,
        title : "Resumen Derecho de " + titulo + " de " + bean.desTipoDerechoLarga + " de Explotación Interna",
        bean : null,
        open : function() {
            inicializaFormDerecho(bean, tipoDerecho);
        },
        buttons : [ 
            {
                id : "cancelar",
                text : "Volver",
                click : function() {
                    jQuery("#form_derecho").dialog("close");
                }
            }
        ],
        close : function() {
            jQuery('#form_derecho input').val("");
        }
    };
    dialogDerecho.bean = bean;
    jQuery("#form_derecho").dialog(dialogDerecho);
    jQuery("#form_derecho", window.parent.document).scrollTop(0);
}

function openDialogDerechoComercial(modo, bean, numeroCapitulo) {
	
	var titulo = "Capítulo";
	if (numeroCapitulo=="0"){
		titulo = "Cabecera";
	}else if (numeroCapitulo == ""){
		if (bean.numCapitulo == "")
			titulo = "";
		else if (bean.numCapitulo == "0")
			titulo = "Cabecera";
		else
			titulo = "Capítulo";
	}

	var titleVentana = "";
	if (titulo != "")
		titleVentana = "Resumen Derecho de " + titulo + " de " + bean.desTipoDerechoLarga + " de Explotación Comercial";
	else
		titleVentana = "Resumen Derecho de " + bean.desTipoDerechoLarga + " de Explotación Comercial";	
	
	var dialogDerecho = {
        width : 1400,
        title : titleVentana,
        bean : null,
        open : function() {
            inicializaFormDerechoComercial(bean);
        },
        buttons : [ 
            {
                id : "cancelar",
                text : "Cancelar",
                click : function() {
                    jQuery("#form_derecho_comercial").dialog("close");
                }
            }
        ],
        close : function() {
            jQuery('#form_derecho_comercial input').val("");
        }
    };
    dialogDerecho.bean = bean;
    jQuery("#form_derecho_comercial").dialog(dialogDerecho);
    jQuery("#form_derecho_comercial", window.parent.document).scrollTop(0);
}

function inicializaFormDerecho(bean, tipoDerecho) {
	var entrada = {
			idAdquisicion : bean.codigoAdquisicion,
			codigoAudio : bean.codigoAudio,
			contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
			formulario : jQuery("#form_derecho")
	};
	completeDetallePrograma(entrada);

    jQuery('#form_derecho #codigoDerecho').text(bean.codigoDerecho);
    jQuery('#form_derecho #codSAP').text(bean.codigoImputacionSAPDerecho);
    jQuery('#form_derecho #fecIniVig').text(bean.fechaInicioVigencia);
    jQuery('#form_derecho #fecFinVig').text(bean.fechaFinVigencia);

	jQuery ("#form_derecho #divDerechoInteractivo").attr("style", "display:none");
	jQuery ("#form_derecho #divDerechos").attr("style", "display:none");
   	jQuery ("#form_derecho #pasesConsultaDetalle").attr("style", "display:none");
   	jQuery ("#form_derecho #pasesConsulta_sinDatos").attr("style", "display:none");
	jQuery ("#form_derecho #divCatchUp").attr("style", "display:none");
	jQuery ("#form_derecho #divSimultcast").attr("style", "display:none");

   	if (tipoDerecho != undefined && tipoDerecho == ID_TIPO_DERECHO_INT){ // Derecho Interactivo
   		jQuery ("#form_derecho #divDerechoInteractivo").attr("style", "display:block");
	    jQuery('#form_derecho #exclusividad').text(bean.exclusividadInt);
	    jQuery('#form_derecho #numMaxCapitulos').text(bean.numMaxCapitulosInt);
	    
	    if (bean.catchUp!=null && bean.catchUp!=""){
		    jQuery('#form_derecho #catchup').text(bean.catchUp);
		    jQuery('#form_derecho #numeroDiasCatchUp').text(bean.numDiasCatchUp);
			jQuery ("#form_derecho #divCatchUp").attr("style", "display:block");
	    }
	    if (bean.simultcast!=null && bean.simultcast!=""){
	    	jQuery('#form_derecho #simultcast').text(bean.simultcast);
			jQuery ("#divSimultcast").attr("style", "display:block");
	    }
	    
	}else if (tipoDerecho != undefined && tipoDerecho == ID_TIPO_DERECHO_CPI){ // Derecho Comunicacion Pública
		jQuery ("#form_derecho #divDerechos").attr("style", "display:block");
	    jQuery('#form_derecho #cadena').text(bean.grupoCadenas);
	    jQuery('#form_derecho #multiEmi').text(bean.multidifusionEmisiones);
	    jQuery('#form_derecho #multiNDias').text(bean.multidifusionDias);
   		obtenerTablaPasesDelDerechoDetalle(bean.codigoDerecho);
   	}
   	
    obtenerTablaVentanasNoVigencia(bean.codigoDerecho, tipoDerecho);
    obtenerDatosComerciales(bean.codigoDerecho);
}

function inicializaFormDerechoComercial(bean) {

	// Inicialización de la cabecera de datos del programa/capitulo
	var entrada = {
			idAdquisicion : bean.codigoAdqui,
			codigoAudio : bean.codigoAudio,
			contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
			formulario : jQuery("#form_derecho_comercial")
	};
	completeDetallePrograma(entrada);
		
	resetCamposOpcionalesDerechoComercial();

	jQuery('#form_derecho_comercial #codigoDerechoComercial').text(bean.codigoDerecho);
    jQuery('#form_derecho_comercial #tipoDerechoComercial').text(bean.desTipoDerecho);
    jQuery('#form_derecho_comercial #fechaIniVigenciaDerechoComercial').text(bean.fechaIniVigencia);
    jQuery('#form_derecho_comercial #fechaFinVigenciaDerechoComercial').text(bean.fechaFinVigencia);
	jQuery('#form_derecho_comercial #observacionesDerechoComercial').text(bean.observaciones);
	jQuery('#form_derecho_comercial #territoriosDerechoComercial').text(bean.territorios);
	jQuery('#form_derecho_comercial #idiomasDerechoComercial').text(bean.idiomas);
	jQuery('#form_derecho_comercial #soportesDerechoComercial').text(bean.soportes);
	jQuery('#form_derecho_comercial #sistemasTransmisionDerechoComercial').text(bean.sistemasTransmision);
	jQuery('#form_derecho_comercial #modosDifusionDerechoComercial').text(bean.modosDifusion);
	jQuery('#form_derecho_comercial #productosDerechoComercial').text(bean.productosAudioV);
	jQuery('#form_derecho_comercial #modosDistribucionDerechoComercial').text(bean.modosDistribucion);
	jQuery('#form_derecho_comercial #canalesVentaDerechoComercial').text(bean.canalesVenta);
    if (bean.observaciones!=null && bean.observaciones!=""){
    	jQuery('#divObservacionesDerechoComercial').attr('style', 'display:block');
    }
    if (bean.territorios!=null && bean.territorios!=""){
    	jQuery('#divTerritoriosDerechoComercial').attr('style', 'display:block');
    }
    if (bean.idiomas!=null && bean.idiomas!=""){
    	jQuery('#divIdiomasDerechoComercial').attr('style', 'display:block');
    }
    if (bean.soportes!=null && bean.soportes!=""){
    	jQuery('#divSoportesDerechoComercial').attr('style', 'display:block');
    }
    if ((bean.sistemasTransmision!=null && bean.sistemasTransmision!="") || (bean.modosDifusion!=null && bean.modosDifusion!="")){
    	jQuery('#divSistemasModosDerechoComercial').attr('style', 'display:block');
    }
    if (bean.productosAudioV!=null && bean.productosAudioV!=""){
    	jQuery('#divProductosDerechoComercial').attr('style', 'display:block');
    }
    if (bean.modosDistribucion!=null && bean.modosDistribucion!=""){
    	jQuery('#divModosDistribucionDerechoComercial').attr('style', 'display:block');
    }
    if (bean.canalesVenta!=null && bean.canalesVenta!=""){
    	jQuery('#divCanalesVentaDerechoComercial').attr('style', 'display:block');
    }

    obtenerTablaVentanasNoVigenciaDerechoComercial(bean.codigoDerecho);
}
function resetCamposOpcionalesDerechoComercial(){
	jQuery('#divObservacionesDerechoComercial').attr('style', 'display:none');
	jQuery('#divTerritoriosDerechoComercial').attr('style', 'display:none');
	jQuery('#divIdiomasDerechoComercial').attr('style', 'display:none');
	jQuery('#divSistemasModosDerechoComercial').attr('style', 'display:none');
	jQuery('#divSoportesDerechoComercial').attr('style', 'display:none');
	jQuery('#divProductosDerechoComercial').attr('style', 'display:none');
	jQuery('#divModosDistribucionDerechoComercial').attr('style', 'display:none');
	jQuery('#divCanalesVentaDerechoComercial').attr('style', 'display:none');
}

function obtenerDatosComerciales(cod_derecho){
	jQuery.ajax({
		dataType : "json",
		url : "findDatosComerciales.htm",
		data : {
			codDerecho : cod_derecho
		},
		success : function(bean) {
			if (bean==null){
	    	    jQuery('#datosComercializacion').attr('style', 'display:none');
			} else{
	    	    jQuery('#datosComercializacion').attr('style', 'display:block');
	    	    
				jQuery('#fecIniComercializacion').text(bean.fechaInicio);
				jQuery('#fecFinComercializacion').text(bean.fechaFin);
				jQuery('#territoriosComercializacion').text(bean.territorios);
				jQuery('#modosComercializacion').text(bean.modos);
				jQuery('#mediosComercializacion').text(bean.medios);
				jQuery('#sistemasComercializacion').text(bean.sistemas);
				jQuery('#idiomasComercializacion').text(bean.idioma);
				jQuery('#copropietariosComercializacion').text(bean.copropietarios);
			}
		}
	});
}


/**
 * LLamada AJAX para la carga de la tabla de programas,
 */
function obtenerTablaPasesDelDerechoDetalle(cod_derecho) {
	jQuery('#pasesConsulta_sinDatos').css('display', '');
	jQuery('#pasesConsultaDetalle').css('display', '');
	
	objectDataTable.url = "findPases.htm";        	
	objectDataTable.columns = [ {"sWidth" : '5%',"mDataProp" : "numeroPase"}, 
	         	                 {"sWidth" : '10%',"mDataProp" : "descEstadoPase"}, 
	        	                 {"sWidth" : '10%',"mDataProp" : "descTipoPase"},
	         	                 {"sWidth" : '20%',"mDataProp" : "descAmbito"}, 
	         	                 {"sWidth" : '20%',"mDataProp" : "descSistemaTransmision"}, 
	         	                 {"sWidth" : '20%',"mDataProp" : "descIdioma"}, 
	         	                 {"sWidth" : '5%',"mDataProp" : "multidifusion"}, 
	         	                 {"sWidth" : '5%',"mDataProp" : "multicanal"}, 
	         	                 {"sWidth" : '5%',"mDataProp" : "simultaneo"} ]; 
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					codigo : cod_derecho
				},
				success : function(json) {
					if (json.iTotalRecords==0){
				    	jQuery('#pasesConsultaDetalle').css('display', 'none');
					}else{
				    	jQuery('#pasesConsulta_sinDatos').css('display', 'none');
					}	 
	                
				    fnCallback(json);
				}
		    });
		};
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var tablaPasesConsultaDetalle = jQuery('#tablaPasesConsultaDetalle').myDataTable(objectDataTable);
	
}

/**
 * LLamada AJAX para la carga de la tabla de programas,
 */
function obtenerTablaVentanasNoVigencia(cod_derecho, tipoDerecho) {
	 objectDataTable.url = "findVentanasNoVigenciaByDerecho.htm";        	
	 objectDataTable.columns = [ {"sWidth" : '25%',"mDataProp" : "fechaInicio"}, 
	         	                {"sWidth" : '25%',"mDataProp" : "fechaFin"}, 
	         	                {"sWidth" : '50%',"mDataProp" : "beneficiarios"} ]; 
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					idDerecho : cod_derecho,
					idTipoDerecho: tipoDerecho
				},
				success : function(json) {
					if (json.iTotalRecords==0){
				    	jQuery('#ventanaNoVigencia').attr('style', 'display:none');
				    	jQuery('#ventanaNoVigencia_sinDatos').attr('style', 'display:block');
				    	
					}else{
				    	jQuery('#ventanaNoVigencia').attr('style', 'display:block');
				    	jQuery('#ventanaNoVigencia_sinDatos').attr('style', 'display:none');
					}	 					
				    fnCallback(json);
				}
		    });
		};
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var tablaVentanasNoVigencia = jQuery('#tablaVentanasNoVigencia').myDataTable(objectDataTable);
	
}

function obtenerTablaVentanasNoVigenciaDerechoComercial(cod_derecho) {
	 objectDataTable.url = "findVentanasNoVigenciaByDerechoComercial.htm";        	
	 objectDataTable.columns = [ {"sWidth" : '25%',"mDataProp" : "fechaInicio"}, 
	         	                {"sWidth" : '25%',"mDataProp" : "fechaFin"}, 
	         	                {"sWidth" : '50%',"mDataProp" : "beneficiarios"} ]; 

	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					idDerecho : cod_derecho
				},
				success : function(json) {
					if (json.iTotalRecords==0){
				    	jQuery('#divVentanasNoVigenciaDerechoComercial').attr('style', 'display:none');
				    	jQuery('#divVentanasNoVigenciaDerechoComercial_sinDatos').attr('style', 'display:block');				    	
					}else{
				    	jQuery('#divVentanasNoVigenciaDerechoComercial').attr('style', 'display:block');
				    	jQuery('#divVentanasNoVigenciaDerechoComercial_sinDatos').attr('style', 'display:none');
					}	                
				    fnCallback(json);
				}
		    });
		};
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var tablaVentanasNoVigenciaDerechoComercial = jQuery('#tablaVentanasNoVigenciaDerechoComercial').myDataTable(objectDataTable);
	
}

function iconDetailDrcho(codigoDerechoBuscar, codigoTipoDerecho) {
    jQuery.ajax({
        dataType : "json",
        url : "getDetailDerecho.htm",
       data : {
            codigoDerecho : codigoDerechoBuscar,
            codigoTipoDerecho : codigoTipoDerecho
        },
        success : function(bean) {
        	openDialogDerecho(dialogConsulta, bean, codigoTipoDerecho);
        }
    });
}

function iconDetailDrchoComercial(codigoDerechoBuscar, numeroCapitulo) {
    jQuery.ajax({
        dataType : "json",
        url : "getDetailDerechoComercial.htm",
       data : {
            codigoDerecho : codigoDerechoBuscar
        },
        success : function(bean) {
        	openDialogDerechoComercial(dialogConsulta, bean, numeroCapitulo);
        }
    });
}
