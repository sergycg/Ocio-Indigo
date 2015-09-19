jQuery(document).ready(function(){

	jQuery('#btnHerencia').click(function(event) {
		event.preventDefault();
		var mensaje = "";
		jQuery("#alert-list li").each(function(indice,valor) {
			mensaje += "-" + valor.innerText + "<br>";
		});  
		if (mensaje!=""){
			mensaje += "¿Desea continuar?";
			showModal(mensaje, cargarHerencia, "", "", "");
		}else{
			cargarHerencia();
		}
	});
	
	jQuery('#btnselectAll').click(function(event) {
		event.preventDefault();
		fnSelectAll("#tablaHerencia");
	});
	
	jQuery('#btndeSelectAll').click(function(event) {
		event.preventDefault();
		fnDeSelectAll("#tablaHerencia");
	});
	
	jQuery('#btnVolver').click(function(event) {
		event.preventDefault();
		jQuery("#form_Herencia").dialog("close");
		
	});
	
	jQuery('#btnAceptarHerencia').click(function(event) {
		event.preventDefault();
		var audioSeleccionado = [""];
		var inicioVigencia = [""];
		var finVigencia = [""];
		var capituloSeleccionado = [""];
		
		var cabecera =fnGetSelectedValues("#tablaHerencia");
		
		for (var i=0;i<cabecera.length;i++)	{			
			audioSeleccionado[i] = cabecera[i].codigoAudio;
			inicioVigencia[i] = cabecera[i].inicioVigencia;
			finVigencia[i] = cabecera[i].finVigencia;
			capituloSeleccionado[i] = cabecera[i].numeroCapitulo;
		}
		
		
		var ruta = "guardarDatosHerencia.htm";
		jQuery.ajax({
			url: ruta,
			type: "GET",
			data: {	audioSeleccionado: audioSeleccionado,
					idDerecho:jQuery("#idDerecho").val(),
					contratoDogma:jQuery("#contratoDogma_hidden").val()
					},
			dataType: "json",
			success: function(numeroCopias) {
				if (numeroCopias>0)
				{
					showInfo("Datos heredados correctamente, "+numeroCopias+" derecho(s) heredado(s)", "Correcto");
					cerrarDialogoHerencia();
				}
				else
					{
					showInfo("No se ha seleccionado capitulo", "Correcto");
					}
				
			}
		});
	});	
	
	//Tras un submit al guardar derecho o pase,
	// se levanta la pantalla de herencia automáticamente
	if (jQuery('#cargarHerencia').val() != null && 
		jQuery('#cargarHerencia').val() != "" &&
		jQuery('#cantidadDerechosHijos').val() > 0){
		cargarHerencia();
	}
});

function cargarHerencia() {
	
	var create = jQuery("#form_Herencia").dialog({
		height : 650,
		width : 1400,
		title : "Herencia",
		open : function() {
			cargarTablaHerencia();
		},
		close: function () {
			jQuery('#cargarHerencia').val(null);
			jQuery('#tablaHerencia tr.row_selected').removeClass('row_selected');			
		}
	});
	// display hand cursor on hover to let User know it's a clickable link
	jQuery('.data_grid tbody tr').hover(function() {
	    jQuery(this).css('cursor', 'pointer');
	}, function() {
	    jQuery(this).css('cursor', 'auto');
	});
	jQuery("#form_Herencia").dialog(create);
    jQuery("#form_Herencia", window.parent.document).scrollTop(0);
}

function cerrarDialogoHerencia ()
{
	jQuery("#form_Herencia").dialog("close");
}

/**
 * LLamada AJAX para la carga de la tabla de herencia,
 */
function cargarTablaHerencia() {
	
	 objectDataTable.url = "findHerencia.htm";        	
		
	 objectDataTable.columns = [ 
	                            {"sWidth" : '5%',"mDataProp" : "numeroCapitulo"}, 
	                            {"sWidth" : '15%',"mDataProp" : "tituloTraducido"}, 
	        	                {"sWidth" : '5%',"mDataProp" : "temporada"},
	        	                {"sWidth" : '5%',"mDataProp" : "ordenEmision"}, 
	        	                {"sWidth" : '5%',"mDataProp" : "inicioVigencia"}, //del capítulo
	        	                {"sWidth" : '5%',"mDataProp" : "finVigenciaAmpliada"}, //del capítulo
	        	                {"sWidth" : '5%',"mDataProp" : "finVigencia"}, //del capítulo
	        	                {"sWidth" : '5%',"mDataProp" : "codDerecho"} ,
	        	                {"sWidth" : '5%',"mDataProp" : "fechaInicioVigenciaDerecho"} ,
	        	                {"sWidth" : '5%',"mDataProp" : "fechaFinVigenciaDerecho"} ,
	        	                {"sWidth" : '5%',"mDataProp" : "grupoCadenas"} ,
	        	                {"sWidth" : '5%',"mDataProp" : "cantPasesCont"} ,
	        	                {"sWidth" : '5%',"mDataProp" : "cantPasesAdic"} ,
	        	                {"sWidth" : '5%',"mDataProp" : "cantPasesEmit"} ,
	        	                {"sWidth" : '5%',"mDataProp" : "multiDifDias"} ,
	        	                {"sWidth" : '5%',"mDataProp" : "multiDifEmisiones"} ,
	        	                {"sWidth" : '5%',"mDataProp" : "multicanal"} ,
	        	                {"sWidth" : '10%',"mDataProp" : "descSeleccionable"} ,
	        	                {"bVisible": false,  "mDataProp" : "codigoAudio"},
	        	                {"bVisible": false,  "mDataProp" : "codigoAdquisicion"}, 
	        	                {"bVisible": false,  "mDataProp" : "seleccionable"} 
	        	                ];
	
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					codDerecho : jQuery.trim(jQuery("#idDerecho").val()),
				    codigoEmision : jQuery.trim(jQuery("#codigoEmision").val().toUpperCase()),
				    fechaInicioVigenciaDerecho : jQuery("#fechaInicioVigencia").val(),
				    fechaFinVigenciaDerecho : jQuery("#fechaFinVigencia").val(),
				    soloHeredados : ((jQuery('#cargarHerencia').val()==1)?true:false)
				},
				success : function(json) {
				    fnCallback(json);
				}
		    });
		};
	
	objectDataTable.fnCreatedRow = 
		function(nRow, aoData, iDataIndex) {
			var seleccionable = aoData["seleccionable"];
		    var claseActual = '';
		    if (seleccionable!="0")	{
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
			        		
			        			if (jQuery(event.target.parentNode).hasClass('row_selected')) {
			        				jQuery(event.target.parentNode).removeClass('row_selected');
			        			}
			        			else{
			        				jQuery(event.target.parentNode).addClass('row_selected');
			        			}
			                }
				        });
		   } else {
		    	jQuery(nRow).addClass("fila_disabled");
		   }		    
		};
	objectDataTable.bPaginate = false;
	objectDataTable.sScrollY = "420px";
	var tablaHerencia = jQuery('#tablaHerencia').myDataTable(objectDataTable);
	
}

/**
 * LLamada AJAX para la carga de la tabla de herencia,
 */
function cargarTablaHerenciaSoloHeredados() {
	if (jQuery('#cantidadDerechosHijos').val() > 0){
		setCargarTablaHerenciaSoloHeredados();
		cargarHerencia();
	}
}

function setCargarTablaHerencia(){
	jQuery('#cargarHerencia').val(0);
}

function setCargarTablaHerenciaSoloHeredados(){
	jQuery('#cargarHerencia').val(1);
}