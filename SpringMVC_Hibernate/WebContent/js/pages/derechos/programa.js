var marginTopMenu = 0;
var marginTopDatosDerecho = 0;

jQuery(document).ready(function(){
	jQuery(".icon-ficha-tecnica").click (function(event){
		event.preventDefault();
		var idAdquisicion = "";
		if (jQuery("#idAdquisicion").val()!=undefined && jQuery("#idAdquisicion").val()!="undefined" && jQuery("#idAdquisicion").val()!=null && jQuery("#idAdquisicion").val()!="")
			idAdquisicion = jQuery("#idAdquisicion").val();
		else idAdquisicion = jQuery("#codigoAdquisicion_hidden").val();
		iconDetailFichaTecnica(jQuery("#codigoAudio_hidden").val(), idAdquisicion, jQuery("#contratoDogma_hidden").val());
    });
	jQuery(".icon-detailContrato").click (function(event){
		event.preventDefault();
		openDialogInfoDetalladaContratacion(jQuery(this).attr("codPrograma_InfoDetalladaContratacion"), jQuery(this).attr("numCapitulo_InfoDetalladaContratacion"));
    });
});
/**
 * @param entrada.codigoEmision
 * 		  entrada.codigoPrograma
 *        entrada.idAdquisicion
 *        entrada.codigoAudio
 *        entrada.formulario -> jQuery('#idFormulario') donde se encuentran los campos a rellenar
 *        entrada.buscarDerechos : true si se deben buscar derechos aposteriori 
 *        						   false si no se deben buscar derechos
 * 
 */
function completeDetallePrograma(entrada){
	
	jQuery.ajax({
	    dataType : "json",
	    url : "getResumenFichaTecnica.htm",
	    data : {
	    	codEmision : entrada.codigoEmision,
	    	codAdqui : entrada.idAdquisicion,
	    	codAudio : entrada.codigoAudio,
	    	contradoDogma : entrada.contradoDogma,
	    	codigoPrograma : entrada.codigoPrograma
	    },
	    success : function(bean) {
	    	
	    	populateProgramaFichaTecnica(bean, entrada.formulario);
	    	if (entrada.buscarDerechos == true)
	    		obtenerListadoDerechosEmisionOComerciales(bean.codigoEmision, bean.codAdqui, bean.codAudio, entrada.contradoDogma);
	    }
	});
}

function populateProgramaFichaTecnica(bean, formulario){
	formulario.find("#tituloOriginalFichaTecnica_detalle").text(bean.tituloPrograma);
    formulario.find("#codigoEmisionFichaTecnica_detalle").text(bean.codigoEmision);
    formulario.find("#codigoProgramaFichaTecnica_detalle").text(bean.codigoPrograma);
    formulario.find("#codigoContratoFichaTecnica_detalle").text(bean.codigoContrato);
    formulario.find("#anyoContratoFichaTecnica_detalle").text(bean.anyoContrato);
    formulario.find("#temporadaFichaTecnica_detalle").text(bean.temporada);
    formulario.find("#fechaInicioVigFichaTecnica_detalle").text(bean.fechaInicioVig);
    formulario.find("#fechaFinVigFichaTecnica_detalle").text(bean.fechaFinVig);
    formulario.find("#descEstadoAdquiFichaTecnica_detalle").text(bean.descEstadoAdqui);
    formulario.find("#areaProduccionFichaTecnica_detalle").text(bean.areaProduccion);
    formulario.find("#descClaseProduccionFichaTecnica_detalle").text(bean.descClaseProduccion);
    formulario.find("#descGeneroFichaTecnica_detalle").text(bean.descGenero);
    formulario.find("#descDistribuidoraFichaTecnica_detalle").text(bean.descDistribuidora);
    formulario.find("#descTipoContratacionFichaTecnica_detalle").text(bean.descTipoContratacion);
    
    if (bean.numeroCapitulo != 0){
    	formulario.find("#detalleCapituloFichaTecnica").css ("display", "block");
        formulario.find("#numeroCapituloResumenFichaTecnica_detalle").text (bean.numeroCapitulo);
    	formulario.find("#tituloOriginalResumenFichaTecnica_detalle").text(bean.tituloOriginal);
        formulario.find("#tituloTraducidoResumenFichaTecnica_detalle").text(bean.tituloTraducido);

        jQuery("#menu_navegacion").css ("margin-top", "263px");
    	jQuery(".datosDerecho").css ("margin-top", "302px");
	    
    	marginTopMenu = 263;
    	marginTopDatosDerecho = 302;
    }else{
    	formulario.find("#detalleCapituloFichaTecnica").css ("display", "none");
        formulario.find("#numeroCapituloResumenFichaTecnica_detalle").text ("");
    	formulario.find("#tituloOriginalResumenFichaTecnica_detalle").text("");
        formulario.find("#tituloTraducidoResumenFichaTecnica_detalle").text("");

        jQuery("#menu_navegacion").css ("margin-top", "243px");
    	jQuery(".datosDerecho").css ("margin-top", "281px");

    	marginTopMenu = 243;
    	marginTopDatosDerecho = 281;
    }  
    if (jQuery.trim(bean.descTipoContrato) == "" || bean.descTipoContrato == null){
    	formulario.find ("#tipoContrato").css("display", "none");
    	jQuery("#menu_navegacion").css ("margin-top", (marginTopMenu - 15) + "px");
    	jQuery(".datosDerecho").css ("margin-top", (marginTopDatosDerecho - 15) + "px");
    }else{
    	formulario.find ("#tipoContrato").css("display", "block");
    	formulario.find("#descTipoContratoFichaTecnica_detalle").text (bean.descTipoContrato);
    	jQuery("#menu_navegacion").css ("margin-top", (marginTopMenu + 15) + "px");
    	jQuery(".datosDerecho").css ("margin-top", (marginTopDatosDerecho + 15) + "px");
    }
    
    if (jQuery.trim(bean.informacionContrato) == "" || bean.informacionContrato == null){
    	formulario.find ("#datosContrato").css("display", "none");
    	jQuery("#menu_navegacion").css ("margin-top", (marginTopMenu - 15) + "px");
    	jQuery(".datosDerecho").css ("margin-top", (marginTopDatosDerecho - 15) + "px");
    }else{
    	formulario.find ("#datosContrato").css("display", "block");
    	formulario.find("#datosContrato_detalle").text (bean.informacionContrato);
    	jQuery("#menu_navegacion").css ("margin-top", (marginTopMenu + 15) + "px");
    	jQuery(".datosDerecho").css ("margin-top", (marginTopDatosDerecho + 15) + "px");
    }
    
    
    formulario.find("#iconInfoDetalladaContratacion").attr("numCapitulo_InfoDetalladaContratacion", bean.numeroCapitulo);
    formulario.find("#iconInfoDetalladaContratacion").attr("codPrograma_InfoDetalladaContratacion", bean.codigoPrograma);
    formulario.find("#iconInfoDetalladaContratacion").attr("contratoDogma_InfoDetalladaContratacion", bean.contratoDogma);
    jQuery("#codigoEmision_hidden").val(bean.codigoEmision);
    jQuery("#codigoAdquisicion_hidden").val(bean.codAdqui);
    jQuery("#codAreaProduccion_hidden").val(bean.codAreaProduccion);
//    jQuery("#codigoAudio_hidden").val(bean.codAudio);

}

function openDialogInfoDetalladaContratacion(codPrograma, numCap){
	var dialogContratos = {
		height : 700,
		width : 1200,
		title : "Contratos",
		open: function( event, ui ) {
//			jQuery("#multiEmi").text("ppp");
			cargarInfoContratos(codPrograma, numCap);
		},
		close:function (){
		}
	};
	jQuery("#infoDetalladaContratos").dialog(dialogContratos);
//	dialogContratos.parent().appendTo(jQuery("form:first"));
	jQuery("#infoDetalladaContratos", window.parent.document).scrollTop(0);

}

function cargarInfoContratos(codPrograma, numCap){
	
	jQuery('#listadoInfoContratos').css ("display", "");
	jQuery('#listadoInfoContratos').css ("width","100%");

	objectDataTable.url = "findInfoContratosProgCap.htm";        	
	objectDataTable.columns = [{"sWidth" : '15%', "mDataProp" : "titulo"},
	                           {"sWidth" : '5%',"mDataProp" : "fechaContrato"},
	                           {"sWidth" : '15%',"mDataProp" : "registroDogma"},
	                           {"sWidth" : '15%',"mDataProp" : "registroHistorico"},
	                           {"sWidth" : '25%',"mDataProp" : "titulares"},
	                           {"sWidth" : '25%',"mDataProp" : "programas"}];
	    
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
				    codigoPrograma: codPrograma,
				    numeroCapitulo: numCap,
				    contratoDogma: jQuery("#contratoDogma_hidden").val()
				},
				success : function(bean) {
					cargarInfoContratoOriginal(bean.aaDataOriginal);
				    fnCallback(bean);
				}
		    });
		};
		

	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	jQuery('#listadoInfoContratos').myDataTable(objectDataTable);
}

function cargarInfoContratoOriginal(contrato){
	if (contrato==null || contrato==undefined || contrato=="undefined"){
		jQuery("#datosContratoAsociado").css("display", "none");
		jQuery("#contratoAsociadoSinDatos").css("display", "block");
	}else{
		jQuery("#datosContratoAsociado").css("display", "block");
		jQuery("#contratoAsociadoSinDatos").css("display", "none");
		jQuery("#infoContratoTitulo").text(contrato.titulo);
		jQuery("#infoContratoFecha").text(contrato.fechaContrato);
		jQuery("#infoContratoRegistroDogma").text(contrato.registroDogma);
		jQuery("#infoContratoRegistroHistorico").text(contrato.registroHistorico);
		jQuery("#infoContratoTitulares").text(contrato.titulares);
		jQuery("#infoContratoProgramas").text(contrato.programas);
	}
}