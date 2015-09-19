jQuery(document).ready(function(){
	
	jQuery('#paseForm\\.importe').mask('00.000,00', {maxlength: true});
	
	jQuery('#nuevoPase').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion 
		event.preventDefault();
		if (!jQuery("#" + this.form.id).valid()){
			jQuery("html, body").animate({ scrollTop: 0 }, "slow");
		}else{
			jQuery("#numeroPaseDiv").hide();
			jQuery("#numeroPasePase").text('');
			jQuery("#estadoPasePase").text('');
			jQuery("#separador").hide();
			cargarFormularioAltaModificacionPase("");
		}
	});
	if (jQuery("#tipoFormulario_hidden").val()== derecho_int){
		obtenerTablaPasesDelDerecho(jQuery("#idDerechoAsociadoInteractivos").val());
	}else{
		obtenerTablaPasesDelDerecho(jQuery("#idDerecho").val());
	}
});

function inicializaCheckboxes(){
	/*CHECKBOXES*/
	jQuery('#form_crearPase input:checkbox').iCheck('enable').iCheck('uncheck');
	
	jQuery('#paseForm\\.multicanal').on('ifChecked', function(event){
		habilitarDeshabilitarMulticanal('ON');
	});
	jQuery('#paseForm\\.multicanal').on('ifUnchecked', function(event){
		habilitarDeshabilitarMulticanal('OFF');
	});
	
}

function cargarFormularioAltaModificacionPase(id){
	jQuery.ajax({
		url: "loadPaseById.htm",
		dataType: "json",
		data:{
			idPase: id
		},
		success: function(bean){
			inicializaCheckboxes();
			
			jQuery('#descripcionClasificacionAudioVisualPase').val('');
			jQuery('#descripcionEspacioPlanificadoPase').val('');
			jQuery('#descripcionCanalPase').val('');
			jQuery('#paseForm\\.descAmbitoTerritorial').val('');
			jQuery('#paseForm\\.descSistemaTransmision').val('');
			jQuery('#paseForm\\.descIdioma').val('');
			jQuery('#descripcionDivisaPase').val('');
			jQuery('#paseForm\\.descripcionPrimeraCadenaMulticanalEmision').val('');
			jQuery('#descripcionCadenaPrevEmisionPase').val('');

			jQuery('#paseForm\\.idClasificacionAudioVisual').val(bean.idClasificacionAudioVisual);
			jQuery('#paseForm\\.idEspacioPlanificado').val(bean.idEspacioPlanificado);
			jQuery('#paseForm\\.idCanal').val(bean.idCanal);
			jQuery('#paseForm\\.idAmbitoTerritorial').val(bean.idAmbitoTerritorial);
			jQuery('#paseForm\\.idSistemaTransmision').val(bean.idSistemaTransmision);
			jQuery('#paseForm\\.idIdioma').val(bean.idIdioma);
			jQuery('#paseForm\\.idDivisa').val(bean.idDivisa);
			jQuery('#paseForm\\.idTipoPase').val(bean.idTipoPase);
			
			jQuery('#descripcionDivisaPase').val(bean.descDivisa);
			jQuery('#paseForm\\.descripcionTipoPase').val(bean.descTipoPase);
			jQuery('#paseForm\\.importe').val(bean.importe);
			jQuery("#paseForm\\.observaciones").val(bean.observaciones);

			// Espacio real siempre de lectura. Da lo mismo el modo en que entremos
//			jQuery('#paseForm\\.idEspacioReal').attr ("readonly", true);
//			jQuery('#paseForm\\.idEspacioReal').addClass('disabled');
			
			jQuery("#descripcionEspacioRealPase").text (bean.descripcionEspacioReal);
			jQuery("#fechaConsumo").text (bean.fechaConsumo);
			jQuery("#listaEmisiones").text (bean.emisiones);

			/*COMBOS*/
			generaAutocomplete(jQuery('#paseForm\\.idClasificacionAudioVisual'),jQuery('#descripcionClasificacionAudioVisualPase'),"autocompleteClasificacionAudiovisual.htm","", "");
			generaAutocomplete(jQuery('#paseForm\\.idEspacioPlanificado'),jQuery('#descripcionEspacioPlanificadoPase'),"autocompleteEspacioPlanificado.htm","", "");
			generaAutocomplete(jQuery('#paseForm\\.idCanal'),jQuery('#descripcionCanalPase'),"autocompleteCanal.htm","", "");
			generaAutocomplete(jQuery('#paseForm\\.idAmbitoTerritorial'),jQuery('#paseForm\\.descAmbitoTerritorial'),"autocompleteAmbitoTerritorial.htm","", "");
			generaAutocomplete(jQuery('#paseForm\\.idSistemaTransmision'),jQuery('#paseForm\\.descSistemaTransmision'),"autocompleteSistemasTransmision.htm","", "");
			generaAutocomplete(jQuery('#paseForm\\.idIdioma'),jQuery('#paseForm\\.descIdioma'),"autocompleteIdioma.htm","", "");
			generaAutocomplete(jQuery('#paseForm\\.idDivisa'),jQuery('#descripcionDivisaPase'),"autocompleteDivisa.htm","", "");
			
			jQuery('#paseForm\\.idPrimeraCadenaMulticanalEmision').val(bean.idPrimeraCadenaMulticanalEmision);
			jQuery('#paseForm\\.idCadenaPrevEmision').val(bean.idCadenaPrevEmision);

			generaAutocomplete(jQuery('#paseForm\\.idPrimeraCadenaMulticanalEmision'),jQuery('#paseForm\\.descripcionPrimeraCadenaMulticanalEmision'), 
					"autocompleteCadena.htm","", "");
			generaAutocomplete(jQuery('#paseForm\\.idCadenaPrevEmision'),jQuery('#descripcionCadenaPrevEmisionPase'),"autocompleteCadena.htm",
					"", "");
			
			if (id == null || id == "undefined" || id == ""){
				limpiarCamposPase();

				jQuery("#cantidadDiv").show();

				jQuery("#paseForm\\.cantidad").val (1);
				jQuery("#importeDivisa").hide();
				jQuery('#paseForm\\.descripcionPrimeraCadenaMulticanalEmision').attr ("readonly", true);
				jQuery('#paseForm\\.descripcionPrimeraCadenaMulticanalEmision').addClass('disabled');

				jQuery ("#filtroTiposPase").val("*-" + jQuery("#codAreaProduccion_hidden").val());

				cargarFormularioPases("addPase", "");
			}else{
				jQuery("#numeroPasePase").text(bean.numeroPase);
				jQuery("#estadoPasePase").text(bean.descEstado);
				jQuery("#paseForm\\.idPase").val(bean.idPase);
				
				jQuery("#cantidadDiv").hide();
				jQuery("#numeroPaseDiv").show();
				jQuery("#separador").show();

				/*CHECKBOXES*/
				if (bean.multidifusion == '1' && bean.idEstado == PASE_INCLUIDO){
					jQuery("#paseForm\\.multidifusion").iCheck('disable');
					jQuery("#paseForm\\.simultaneo").iCheck('check');
					jQuery("#paseForm\\.simultaneo").iCheck('disable');
				}else{
					jQuery("#paseForm\\.multidifusion").iCheck('enable');
					jQuery("#paseForm\\.simultaneo").iCheck('uncheck');
					jQuery("#paseForm\\.simultaneo").iCheck('enable');
				}
				
				//si clase de producción es propia, camulti = 1 y estado del pase Libre, se muestra ON y deshabilitado
				var claseProduccion = "";
				claseProduccion = bean.codigoEmision.substring(4, 5);
				if (bean.multidifusion == '1' && bean.idEstado == PASE_LIBRE && claseProduccion == TIPO_PRODUCCION_PROPIA){
					jQuery("#paseForm\\.multicanal").iCheck('check');
					jQuery("#paseForm\\.multicanal").iCheck('disable');
				}else{
					jQuery("#paseForm\\.multicanal").iCheck('uncheck');
					jQuery("#paseForm\\.multicanal").iCheck('enable');
				}
				
				if ((bean.multidifusion == '1' && bean.idEstado == PASE_LIBRE && claseProduccion == TIPO_PRODUCCION_PROPIA) ||
					(bean.multicanal == null || bean.idEstado > 0))	{
					jQuery('#paseForm\\.idPrimeraCadenaMulticanalEmision').attr ("readonly", true);
					jQuery('#paseForm\\.idPrimeraCadenaMulticanalEmision').addClass('disabled');
					jQuery('#paseForm\\.descripcionPrimeraCadenaMulticanalEmision').attr ("readonly", true);
					jQuery('#paseForm\\.descripcionPrimeraCadenaMulticanalEmision').addClass('disabled');
				}else {      
					jQuery('#paseForm\\.idPrimeraCadenaMulticanalEmision').removeAttr ("readonly");
					jQuery('#paseForm\\.idPrimeraCadenaMulticanalEmision').removeClass('disabled');
					jQuery('#paseForm\\.descripcionPrimeraCadenaMulticanalEmision').removeAttr ("readonly");
					jQuery('#paseForm\\.descripcionPrimeraCadenaMulticanalEmision').addClass('disabled');
				}
				
				var derechoComercializable = jQuery ("#comercializacion").val();
				if (derechoComercializable){
					jQuery("#paseForm\\.comercializable").iCheck('uncheck');
					jQuery("#paseForm\\.comercializable").iCheck('disable');
				}
				if (bean.multidifusion == '1'){
					jQuery("#paseForm\\.multidifusion").iCheck('check');
				}else{
					jQuery("#paseForm\\.multidifusion").iCheck('uncheck');
				}
				if (bean.simultaneidad == '1'){
					jQuery("#paseForm\\.simultaneidad").iCheck('check');
				}else{
					jQuery("#paseForm\\.simultaneidad").iCheck('uncheck');
				}
				if (bean.multicanal == '1'){
					jQuery("#paseForm\\.multicanal").iCheck('check');
				}else{
					jQuery("#paseForm\\.multicanal").iCheck('uncheck');
				}
				if (bean.comercializable == '1'){
					jQuery("#paseForm\\.comercializable").iCheck('check');
				}else{
					jQuery("#paseForm\\.comercializable").iCheck('uncheck');
				}
				
				
				if ((bean.idTipoPase == PASE_ADICIONAL || bean.idTipoPase == PASE_OPCIONAL) && !bean.soloLectura){
					jQuery("#importeDivisa").css ("display", "block");
				}else{
					jQuery("#importeDivisa").css ("display", "none");
				}
					
				/*
				 * Combo de tipo de pase:
				- Modificación de Pase con un tipo de pase activo asociado: Cargar los tipos activos
				- Modificación de Pase con un tipo de pase inactivo asociado: Cargar los tipos activos y el tipo inactivo 
				  que tiene asociado
				 */
				
				if (jQuery ("#filtroTiposPase").val() == "" || jQuery ("#filtroTiposPase").val() == null ||
					jQuery ("#filtroTiposPase").val() == undefined || jQuery ("#filtroTiposPase").val() == "undefined"){
					jQuery ("#filtroTiposPase").val("*-" + jQuery("#codAreaProduccion_hidden").val());
					//(bean.idTipoPase + "-" + jQuery("#codAreaProduccion_hidden").val());
				}

				// Deshabilitar campos
				if (bean.soloLectura){
					jQuery("input[dependiente='estadoPase']").attr ("readonly", true).addClass('disabled');
					jQuery("#form_crearPase checkbox").iCheck ('disable');
				}
				
				jQuery("#paseForm\\.simultcast").val(bean.simultcast);
				jQuery("#paseForm\\.numDiasCatchUp").val(bean.catchUp);

				cargarFormularioPases("updatePase", bean.idEstado);
			}
			// Como el filtro de tipos de pase se hace más arriba, esta línea es común al alta y la modificación, pero hay que ponerla
			// una vez se ha cargado el valor del filtro de tipos de pase
			generaAutocomplete(jQuery('#paseForm\\.idTipoPase'),jQuery('#paseForm\\.descripcionTipoPase'),"autocompleteTiposPase.htm", 
					"mostrarImporte_y_Divisa()", jQuery ("#filtroTiposPase"));
			

			
			if (jQuery("#tipoFormulario_hidden").val()== derecho_int){
				
				// Interactivos
				if ((bean.simultcast != null && bean.simultcast != 0 && (jQuery("input[name='emisionPasesSimultcast']:checked").val()=="1" || jQuery("input[name='emisionPasesSimultcast']:checked").val()=="2")) 
					|| (jQuery("input[name='emisionPasesSimultcast']:checked").val()=="1")){
					
					jQuery("#check_simultcast").iCheck('check');
					jQuery("#paseForm\\.simultcast").val("1");
					if ( jQuery("input[name='emisionPasesSimultcast']:checked").val()=="1") {
						jQuery("#check_simultcast").iCheck('disable');
					}
				} else {
					jQuery("#check_simultcast").iCheck('uncheck');
					jQuery("#paseForm\\.simultcast").val("");
					if (jQuery("input[name='emisionPasesSimultcast']:checked").val()!="1" && jQuery("input[name='emisionPasesSimultcast']:checked").val()!="2"){
						jQuery("#check_simultcast").iCheck('disable');
					}
				}
				if ((bean.catchUp != null && bean.catchUp != 0 && (jQuery("input[name='emisionPasesCatchUp']:checked").val()=="1" || jQuery("input[name='emisionPasesCatchUp']:checked").val()=="2")) 
					|| (jQuery("input[name='emisionPasesCatchUp']:checked").val()=="1")){
					
					jQuery("#check_catchUp").iCheck('check');
					jQuery("#paseForm\\.catchUp").val("1");
					jQuery("#paseForm\\.numDiasCatchUp").val(bean.catchUp);
					if ( jQuery("input[name='emisionPasesCatchUp']:checked").val()=="1") {
						jQuery("#check_catchUp").iCheck('disable');
					}
				} else {
					jQuery("#check_catchUp").iCheck('uncheck');
					jQuery("#paseForm\\.catchUp").val("");
					jQuery("#paseForm\\.numDiasCatchUp").val("");
					if (jQuery("input[name='emisionPasesCatchUp']:checked").val()!="1" && jQuery("input[name='emisionPasesCatchUp']:checked").val()!="2"){
						jQuery("#check_catchUp").iCheck('disable');
					}
				}
			}
		}
	});
}

function mostrarCamposDeInteractivos(){
	jQuery ("#divPasesInteractivos").attr("style", "display:block");
	//deshabilitamos el formulario
	var allInputs = jQuery("#form_crearPase input,#form_crearPase textarea");
	allInputs.attr('readonly', true);
	allInputs.addClass ('disabled');
	jQuery("#paseForm\\.multidifusion, #paseForm\\.simultaneidad, #paseForm\\.multicanal").iCheck('disable');
	
	//solo habilitamos los datos que se pueden modificar para interactivos
	jQuery("#check_catchUp, #check_simultcast, #paseForm\\.numDiasCatchUp").removeAttr("readonly");
	jQuery("#check_catchUp, #check_simultcast, #paseForm\\.numDiasCatchUp").removeClass("disabled");

	//inicializamos el check de catch up 
	jQuery('#check_catchUp').on('ifUnchecked', function(event){
		jQuery("#divPasesNumDiasCatchUp").attr("style", "display:none");
		jQuery("#paseForm\\.numDiasCatchUp").val("");
		jQuery("#paseForm\\.catchUp").val("");
	});
	
	jQuery('#check_catchUp').on('ifChecked', function(event){
		jQuery("#divPasesNumDiasCatchUp").attr("style", "display:block");
		jQuery("#paseForm\\.catchUp").val("1");
	});
	//inicializamos el check de simultcast 
	jQuery('#check_simultcast').on('ifUnchecked', function(event){
		jQuery("#paseForm\\.simultcast").val("");
	});
	
	jQuery('#check_simultcast').on('ifChecked', function(event){
		jQuery("#paseForm\\.simultcast").val("1");
	});
}

function cargarFormularioPases(accion, estadoPase){
	
	var formulario="";
	if (jQuery("#tipoFormulario_hidden").val()== derecho_int){
		formulario = "derechoINTForm";
		mostrarCamposDeInteractivos();
	}
	else{
		jQuery ("#divPasesInteractivos").attr("style", "display:none");
		formulario = "derechoCPIForm";
	}
		
	var validatorPases = validarFormulario(formulario, "form_crearPase");
	var editable = jQuery('#indEditable').val();
	
	// Si el estado del pase es consumido o no es editable, no se pone botón Guardar
	var altura = 0;
	if (jQuery('#numeroPaseDiv').css('display') == 'none')
		altura = 625; 
	else 
		if (jQuery("#divPasesInteractivos").css("display") == 'none')
			altura = 655;
		else
			altura = 720; 

	if (jQuery("#tipoFormulario_hidden").val()== derecho_cpi && (estadoPase == PASE_CONSUMIDO || editable=="false")){
		var dialogPase = jQuery("#form_crearPase").dialog({
			height : altura,
			width : 980,
			title : "Pases",
			buttons : {
				"Cancelar" : function() {
					validatorPases.resetForm();
					dialogPase.dialog("close");
				}
			},
			close:function (){
				validatorPases.resetForm();
			}
		});
	}else{
		
		var dialogPase = jQuery("#form_crearPase").dialog({
			height : altura,
			width : 980,
			title : "Pases",
			buttons : {
				"Guardar" : function() {
					var guardar = true;
					if (jQuery("#tipoFormulario_hidden").val()== derecho_cpi){
						//Con esta funcion indicamos que se deberá cargar la 
						//tabla de herencia para seleccionar aquellos derechos 
						//sobre los que se desea heredar la creación/modificación del pase
						setCargarTablaHerenciaSoloHeredados();
					}else{ // Comprobaciones para interactivos
						if ( jQuery("#check_catchUp").is(':checked') == true && (jQuery("#paseForm\\.numDiasCatchUp").val()==null || jQuery("#paseForm\\.numDiasCatchUp").val()=="")) {
							showWarning("Si selecciona Catch Up debe indicar el Número de Días");
							guardar = false;
						}
					}
					if (guardar==true){
						jQuery("#action").val (accion);
						jQuery("#"+formulario).submit();
					}
				},
				"Cancelar" : function() {
					validatorPases.resetForm();
					dialogPase.dialog("close");
				}
			},
			close:function (){
				validatorPases.resetForm();
			}
		});
	};

	dialogPase.parent().appendTo(jQuery("form:first"));
	
	jQuery("#form_crearPase", window.parent.document).scrollTop(0);
	
	if (jQuery ("#importeDivisa").css ("display", "none"))
		jQuery ("#form_crearPase").dialog( "option", "width", 910 );
	else
		jQuery ("#form_crearPase").dialog( "option", "width", 980 );
}

/**
 * LLamada AJAX para la carga de la tabla de programas,
 */
function obtenerTablaPasesDelDerecho(cod_derecho) {
	 objectDataTable.url = "findPases.htm";  
	 if (jQuery("#tipoFormulario_hidden").val()== derecho_int){
		 
		 objectDataTable.columns = [{"sWidth" : '5%',"mDataProp" : "numeroPase"}, 
		         	                {"sWidth" : '10%',"mDataProp" : "descEstadoPase"}, 
		        	                {"sWidth" : '10%',"mDataProp" : "descTipoPase"},
		         	                {"sWidth" : '5%',"mDataProp" : "multidifusion"}, 
		         	                {"sWidth" : '5%',"mDataProp" : "multicanal"}, 
		         	                {"sWidth" : '10%',"mDataProp" : "simultaneo"},
		         	                {"sWidth" : '10%',"mDataProp" : "simultcast"},
		         	                {"sWidth" : '10%',"mDataProp" : "catchUp"},
		         	                {"sWidth" : '10%',"mDataProp" : "fechaConsumoPase"},
		         	                {"sWidth" : '24%',"mDataProp" : "emisiones"},
		         	                {"sWidth" : '1%',"mDataProp" : "icono"}
		         	                ];
	 }else{
		 
		 objectDataTable.columns = [ 
		                             {"sWidth" : '5%',"mDataProp" : "numeroPase"}, 
			         	             {"sWidth" : '10%',"mDataProp" : "descEstadoPase"}, 
			        	             {"sWidth" : '10%',"mDataProp" : "descTipoPase"},
			         	             {"sWidth" : '10%',"mDataProp" : "multidifusion"}, 
			         	             {"sWidth" : '10%',"mDataProp" : "multicanal"}, 
			         	             {"sWidth" : '10%',"mDataProp" : "simultaneo"},
		         	                 {"sWidth" : '10%',"mDataProp" : "catchUp"},
			         	             {"sWidth" : '10%',"mDataProp" : "fechaConsumoPase"},
			         	             {"sWidth" : '24%',"mDataProp" : "emisiones"},
			         	             {"sWidth" : '1%',"mDataProp" : "icono"}
			         	            ];
	 }
	 
	 
	//objectDataTable.sScrollY = '290px';
	objectDataTable.fnServerData = 
		function(sSource, aoData, fnCallback) {
		    jQuery.ajax({
				dataType : "json",
				url : sSource,
				data : {
					codigo : cod_derecho
				},
				success : function(json) {
					jQuery('#tablaPasesConsulta').dataTable().fnSort([ [ 0, 'asc' ] ]);
				    fnCallback(json);
				}
		    });
		};
		objectDataTable.fnCreatedRow = 
			function(nRow, aoData,iDataIndex) {
		        var claseActual = '';
		        var editable = jQuery('#indEditable').val();
		        
		        jQuery(nRow).bind({
		            mouseover:
		                function() {
		                    claseActual = jQuery(this).attr('class');
		                    jQuery(this).removeClass();
		                    jQuery(this).addClass("resaltar");
		                },
		            mouseout:
		                function() {
		                    jQuery(this).removeClass();
		                    jQuery(this).addClass(claseActual);
		                }
		        });        
		        
		        if (jQuery("#tipoFormulario_hidden").val()== derecho_cpi){
			        // Si el pase tiene un estado distinto de libre, no presentar el icono (no se puede borrar)
			        if (aoData.descEstadoPase == "Libre" && editable=="true"){
				        jQuery('td:eq(9)', nRow).append(jQuery("<div>").addClass( "icon-delete" ));
				        jQuery('td:eq(9)', nRow).bind({
				        	click:	
				        		function(){
					        		var arrayParams = new Array( aoData.idPase, 
					        				jQuery("#idDerecho").val(),
					        				jQuery("#codigoTipoDerecho").val(),
					        				jQuery("#codigoAmbitoDerecho").val());
					        		if (aoData.catchUp > 0){
					        			showModal("El pase tiene " + aoData.catchUp + " días de catchUp. "+
					        					  "¿ Está seguro que quiere eliminar el pase nº " + aoData.numeroPase + " ?", 
					                			  borrarPase, arrayParams);
					        		}else{
					        			showModal("¿ Está seguro que quiere eliminar el pase nº " + aoData.numeroPase + " ?", 
					                			  borrarPase, arrayParams);	
					        		}
					        		
				        		}
				        	});
			        }
			        jQuery('td:lt(9)', nRow).bind({
			            click:
			            	function() {
			            		cargarFormularioAltaModificacionPase(aoData.idPase);
			            }
			        });
		        }else if (jQuery("#tipoFormulario_hidden").val()== derecho_int){
		        	if(jQuery("input[name='emisionPasesCatchUp']:checked").val()=="1" && aoData.catchUp=='No'){
			        	jQuery('td:eq(7)', nRow).text("");
			        	jQuery('td:eq(7)', nRow).append(jQuery("<div>").addClass( "icon-exclamacion" ).attr('title', "Pendiente de asignar el número de días"));
		        	}
			        jQuery('td:eq(10)', nRow).append(jQuery("<div>").addClass( "icon-edit" ));
			        jQuery('td:eq(10)', nRow).bind({
			            click:
			            	function() {
			            		cargarFormularioAltaModificacionPase(aoData.idPase);
			            }
			        });
		        }
			};

	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var tablaPasesConsulta = jQuery('#tablaPasesConsulta').myDataTable(objectDataTable);
	
}

function limpiarCamposPase(){
	var allInputs = jQuery("#form_crearPase input");
//	allInputs.val("");
	allInputs.removeAttr("readonly");
	allInputs.removeClass("disabled");
	var allTextArea = jQuery("#form_crearPase textarea");
	allTextArea.val("");
}



function borrarPase(arrayParametros){
	var cod_derecho = jQuery("#idDerecho").val();
	jQuery.ajax({
		url: "eliminarPase.htm",
		dataType: "json",
		data:{
			idPase: arrayParametros[0],
			idDerecho: arrayParametros[1],
			idTipoDerecho: arrayParametros[2], 
			idAmbitoDerecho: arrayParametros[3]
		},
		success: function(json){
			obtenerTablaPasesDelDerecho(cod_derecho);
			cargarTablaHerenciaSoloHeredados();
		}
	});
}

function mostrarImporte_y_Divisa(){
	
	if (jQuery("#paseForm\\.idTipoPase").val() == PASE_ADICIONAL){
		jQuery("#importeDivisa").css ("display", "block");
		jQuery ("#form_crearPase").dialog( "option", "width", 980 );
	}else{
		jQuery("#importeDivisa").css ("display", "none");
		jQuery ("#form_crearPase").dialog( "option", "width", 905 );
	}
}


function habilitarDeshabilitarMulticanal(estado){
	jQuery("#paseForm\\.idPrimeraCadenaMulticanalEmision").val('');
	jQuery("#paseForm\\.descripcionPrimeraCadenaMulticanalEmision").val('');
	if (estado == "ON"){
		// Marcamos multidifusion y lo deshabilitamos
		jQuery("#paseForm\\.multidifusion").iCheck('check');
		jQuery("#paseForm\\.multidifusion").iCheck('disable');
		// Habilitamos la primera cadena de emision y lo ponemos como required
		jQuery("#paseForm\\.descripcionPrimeraCadenaMulticanalEmision").removeAttr('readonly');
		jQuery("#paseForm\\.descripcionPrimeraCadenaMulticanalEmision").removeClass('disabled');
		jQuery("#paseForm\\.descripcionPrimeraCadenaMulticanalEmision").addClass('required');
		jQuery("#paseForm\\.descripcionPrimeraCadenaMulticanalEmision").rules( "add", {
			required: true,
			messages: {
				required: ""
			}
		});
	}else{
		// desMarcamos multidifusion y lo deshabilitamos
		jQuery("#paseForm\\.multidifusion").iCheck('uncheck');
		jQuery("#paseForm\\.multidifusion").iCheck('enable');
		// desHabilitamos la primera cadena de emision y lo quitamos de required
		jQuery("#paseForm\\.descripcionPrimeraCadenaMulticanalEmision").attr('readonly', true);
		jQuery("#paseForm\\.descripcionPrimeraCadenaMulticanalEmision").addClass ('disabled');
		jQuery("#paseForm\\.descripcionPrimeraCadenaMulticanalEmision").removeClass('required');
		jQuery("#paseForm\\.descripcionPrimeraCadenaMulticanalEmision").rules( "remove", "required");
	}
}