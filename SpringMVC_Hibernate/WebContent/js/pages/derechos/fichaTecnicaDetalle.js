
function iconDetailFichaTecnica(codAudio, codAdqui, contratoDogma) {

	jQuery.ajax({
        dataType : "json",
        url : "getFichaTecnica.htm",
        data : {
	    	codAdqui : codAdqui,
	    	codAudio : codAudio,
	    	contratoDogma : contratoDogma
        },
        success : function(bean) {
            if (bean == null){
            	showWarning ("No existe ficha técnica para el capítulo/programa seleccionado");
            }else{
	        	openDialogFichaTecnica(bean);
	        	getFestivales(bean.codAudio);
	        	getParticipantes(bean.codAudio);
            }
        }
    });
}

function openDialogFichaTecnica(fichaTecnica) {
    var dialogCabecera = {
        width : 1400,
        title : (fichaTecnica.numeroCapitulo == 0)?'Ficha Técnica (CABECERA PROGRAMA)':'Ficha Técnica (CAPÍTULO)',
        open : function() {
        	inicializaFichaTecnica(fichaTecnica);
        },
        buttons : [ 
            {
                id : "cancelar",
                text : "Volver",
                click : function() {
                    jQuery("#form_fichaTecnica").dialog("close");
                }
            }
        ],
        close : function() {
            //jQuery('#form_fichaTecnica span').text("");
        }
    };
    jQuery("#form_fichaTecnica :input").attr("disabled", true);
    jQuery("#form_fichaTecnica").dialog(dialogCabecera);
    jQuery("#form_fichaTecnica", window.parent.document).scrollTop(0);

}

function inicializaFichaTecnica(fichaTecnica) {
	// Inicialización de la cabecera de datos del programa/capitulo
	var entrada = {
			idAdquisicion : fichaTecnica.codAdqui,
			codigoAudio : fichaTecnica.codAudio,
			contradoDogma : jQuery.trim(jQuery("#contratoDogma_hidden").val()),
			formulario : jQuery("#form_fichaTecnica")
	};
	completeDetallePrograma(entrada);
	
    jQuery('#form_fichaTecnica #tipoProduccion').text(fichaTecnica.tipoProduccion);
	jQuery('#form_fichaTecnica #anyoProduccion').text(fichaTecnica.anyoProduccion);
	jQuery('#form_fichaTecnica #numCapitulos').text(fichaTecnica.numCapitulos);
	jQuery('#form_fichaTecnica #numPasesContratados_Consumidos').text(fichaTecnica.numPasesContratados_Consumidos);
//	jQuery('#form_fichaTecnica #numPasesConsumidos').text(fichaTecnica.numPasesConsumidos);

	jQuery('#form_fichaTecnica #soporte').text(fichaTecnica.soporte);
	jQuery('#form_fichaTecnica #paisOrigen').text(fichaTecnica.paisOrigen);
	jQuery('#form_fichaTecnica #idiomaOrigen').text(fichaTecnica.idioma);
	
	if (fichaTecnica.derechoComunicacionPublica > 0) jQuery('#form_fichaTecnica #derechoComunicacionPublica').text('SI');
	else jQuery('#form_fichaTecnica #derechoComunicacionPublica').text('NO');
	if (fichaTecnica.derechoReproduccion > 0) jQuery('#form_fichaTecnica #derechoReproduccion').text('SI');
	else jQuery('#form_fichaTecnica #derechoReproduccion').text('NO');
	if (fichaTecnica.derechoTransformacion > 0) jQuery('#form_fichaTecnica #derechoTransformacion').text('SI');
	else jQuery('#form_fichaTecnica #derechoTransformacion').text('NO');
	if (fichaTecnica.derechoDistribucion > 0) jQuery('#form_fichaTecnica #derechoDistribucion').text('SI');
	else jQuery('#form_fichaTecnica #derechoDistribucion').text('NO');

//	if (fichaTecnica.validado == 1)	jQuery('#form_fichaTecnica #validado').text('SI');
//	else jQuery('#form_fichaTecnica #validado').text('NO');
	jQuery('#form_fichaTecnica #validado').text(fichaTecnica.audioValidado);
	if (fichaTecnica.autorizaDoblaje == 1)	jQuery('#form_fichaTecnica #autorizaDoblaje').text('SI');
	else jQuery('#form_fichaTecnica #autorizaDoblaje').text('NO');
	if (fichaTecnica.emisionParcial == 1) jQuery('#form_fichaTecnica #emisionParcial').text('SI');
	else jQuery('#form_fichaTecnica #emisionParcial').text('NO');
	
	jQuery('#form_fichaTecnica #observaciones').text(fichaTecnica.observaciones);
	jQuery('#form_fichaTecnica #sinopsisMedia').text(fichaTecnica.sinopsisMedia);
	
	// CONTENIDOS
	jQuery('#form_fichaTecnica #guion').text(fichaTecnica.guion);
	jQuery('#form_fichaTecnica #musica').text(fichaTecnica.musica);
	jQuery('#form_fichaTecnica #letra').text(fichaTecnica.letra);
	jQuery('#form_fichaTecnica #fragmentos').text(fichaTecnica.fragmentos);
	jQuery('#form_fichaTecnica #fotos').text(fichaTecnica.fotos);
	jQuery('#form_fichaTecnica #doblajes').text(fichaTecnica.doblajes);
	
	// COMERCIALIZABLES
	if (fichaTecnica.guionComercializable == 1)	jQuery('#form_fichaTecnica #guionComercializable').text('SI');
	else jQuery('#form_fichaTecnica #guionComercializable').text('NO');
	if (fichaTecnica.musicaComercializable == 1)	jQuery('#form_fichaTecnica #musicaComercializable').text('SI');
	else jQuery('#form_fichaTecnica #musicaComercializable').text('NO');
	if (fichaTecnica.letraComercializable == 1)	jQuery('#form_fichaTecnica #letraComercializable').text('SI');
	else jQuery('#form_fichaTecnica #letraComercializable').text('NO');
	if (fichaTecnica.fragmentosComercializable == 1)	jQuery('#form_fichaTecnica #fragmentosComercializable').text('SI');
	else jQuery('#form_fichaTecnica #fragmentosComercializable').text('NO');
	if (fichaTecnica.fotosComercializable == 1)	jQuery('#form_fichaTecnica #fotosComercializable').text('SI');
	else jQuery('#form_fichaTecnica #fotosComercializable').text('NO');
	if (fichaTecnica.doblajesComercializable == 1)	jQuery('#form_fichaTecnica #doblajesComercializable').text('SI');
	else jQuery('#form_fichaTecnica #doblajesComercializable').text('NO');

	jQuery('#form_fichaTecnica #fechaEstrenoSalasString').text(fichaTecnica.fechaEstrenoSalasString);
	jQuery('#form_fichaTecnica #fechaEstrenoVideoString').text(fichaTecnica.fechaEstrenoVideoString);
	jQuery('#form_fichaTecnica #fechaEstrenoTelevisionString').text(fichaTecnica.fechaEstrenoTelevisionString);
	jQuery('#form_fichaTecnica #modoEstrenoTelevision').text(fichaTecnica.modoEstrenoTelevision);
}


function getFestivales(codAudio){
	
	objectDataTable.url = "getFichaTecnicaFestivales.htm";        	
	objectDataTable.columns = [{"sWidth" : '45%', "mDataProp" : "descPremio"},
	                           {"sWidth" : '45%',"mDataProp" : "descFestival"},
	                           {"sWidth" : '10%',"mDataProp" : "indOtorgado"}];
        
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
				    codAudio : codAudio
				},
				success : function(json) {
					if (json == null || json.aaData == null || json.aaData.length == 0){
						 jQuery('#premiosYFestivales').css('display','none');
					}else{
						 jQuery('#premiosYFestivales').css('display','block');
					}
					fnCallback(json);
				}
		    });
		};
	
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
    jQuery('#tablaPremiosYFestivales').myDataTable(objectDataTable);
}


function getParticipantes(codAudio){
	
	objectDataTable.url = "getFichaTecnicaParticipantes.htm";        	
	objectDataTable.columns = [{"sWidth" : '50%', "mDataProp" : "nombreParticipante"},
	                           {"sWidth" : '50%', "mDataProp" : "descProfesion"}];
	
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					codAudio : codAudio
				},
				success : function(json) {
					if (json == null || json.aaData == null || json.aaData.length == 0){
						jQuery('#participantes').css('display','none');
					}else{
						jQuery('#participantes').css('display','block');
					}
				    fnCallback(json);
				}
		    });
		};
	
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var tablaPasesConsulta = jQuery('#tablaParticipantes').myDataTable(objectDataTable);
}