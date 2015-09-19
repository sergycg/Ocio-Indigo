function ajaxAutocomplete(response, codigo, descripcion, urlX, params) {
	
	    jQuery.ajax({
	    	type: "GET",
			url : urlX,
			global : false, // Esta opción es para que no ejecute el ajaxStart
			data : {
			    descripcion : jQuery.trim(descripcion.val()),
			    codigo : codigo.val()==""?null:codigo.val(),
			    params: params==""?null:params.val()
			},
			dataType : "json",
			success : function(listado) {
				if (listado != null && listado.length > 0) {
					response(jQuery.map(listado, function(item) {
					    return {
					    	// label es lo que mostrara en el listado de opciones
					    	label : item.text, 
					    	// value es el valor que se pondra en el text a autocompletar
					    	value : item.text, 
					    	id : item.value
					    };
					}));
			    } else {
			    	codigo.val("");
			    	descripcion.val("");
			    	return {
					    label : "", 
					    value : "", 
					    id : ""
					};
			    }
			}
	    });
	    
	}


/**
 * Obtiene una lista de valores filtrada por el 
 * código o descripción pasado por parámetro.
 * Devuelve el valor elegido en código y descripción.
 * @param codigo value de la lista de valores
 * @param descripcion text de la lista de valores
 * @param urlX url Ajax de obtención del listado (método del action)
 * @param metodo Método a ejecutar después de seleccionar un valor 
 * @param params Parámetros del método a ejecutar
 */
function generaAutocomplete(codigo, descripcion, urlX, method, params) {
	descripcion.autocomplete({
		source : function(request, response){
			ajaxAutocomplete(response, codigo, descripcion, urlX, params);
		},
		minLength : 1,
		// Funcion que se ejecuta para limpiar la descripción
		search : function(event, ui) { 
			codigo.val("");
		},
		//Devuelve el valor seleccionado de la lista
		select : function(event, ui) {		
			
			codigo.val(ui.item.id);
			descripcion.val(ui.item.label);
		    
		    if (method != ''){
		    	jQuery.globalEval(method);
		    }
		},
		change: function (event, ui) {
            if (!ui.item) {
		    	codigo.val("");
            	descripcion.val("");
    		    if (method != ''){
    		    	jQuery.globalEval(method);
    		    }
             }
        }
    });
    
    if (codigo.val() != ""){
    	jQuery.ajax({
	    	type: "GET",
	    	global : false,
			url : urlX,
			data : {
			    codigo : codigo.val()==""?null:codigo.val(),
			    params: params==""?null:params.val()
			},
			dataType : "json",
			success : function(listado) {
				if (listado != null) {
					jQuery.map(listado, function(item) {
						descripcion.val(item.text);
					});
				}
			}
	    });
    }
    
    descripcion.change(function() {
    	if (jQuery(this).val() == "")
    		codigo.val("");
    });
    
}



function showError(message, status) {
	var texto = jQuery('<div id="dialog-message">');
	texto.attr('title','Se ha producido un error');
	texto.addClass('dialogUIMessage');
	if(status == '404'){
		var message = "Ops! Página no encontrada.";		
	}else if (status == '503'){
		var message = "El servidor no está disponible.";
	}
	
	texto.append('<p>' + message + '</p>');
	texto.dialog({
		modal: true,
		dialogClass: 'dialogUIerror',
		height : 'auto',
		width : 'auto',
	    buttons: {
	    	Ok: function() {
	        	jQuery( this ).dialog( "close" );
	        	jQuery('input[type=image][name=method]').click();	        	
	        	return false;
	        }
	      },
	    close: function(){
	    	jQuery( this ).dialog( "close" );
        	jQuery('input[type=image][name=method]').click();	  
	    }
		
	    });	
}

function showWarning (message){
	var reload = false;
	if(message.indexOf('<!DOCTYPE')!=-1){
		var message = "Se ha caducado la sesión, por favor, vuelva a acceder a la aplicación.";
		reload = true;
	}
	
	var texto = jQuery('<div id="dialog-message">');
	texto.attr('title','Alerta');
	texto.addClass('dialogUIMessage');
	texto.append('<p>' + message + '</p>');
	texto.dialog({
		  modal: true,
		  dialogClass: 'dialogUIwarning',
	      height : 'auto',
		  width : 'auto',
	      buttons: {
	        Ok: function() {
	        	if (reload)
	        		location.reload();
	        	jQuery( this ).dialog( "close" );
	        	return false;
	        }
	      }
	    });
}
function showCorrect(message) {
	var texto = jQuery('<div id="dialog-message">');
	texto.attr('title','Operación correcta');
	texto.addClass('dialogUIMessage');
	texto.append('<p>' + message + '</p>');
	texto.dialog({
		  modal: true,
	      height : 'auto',
		  width : 'auto',
	      dialogClass: 'dialogUIcorrect',
	      buttons: {
	        Ok: function() {
	        	jQuery( this ).dialog( "close" );
	        	return false;
	        }
	      }
	    });	
}

function showInfo(message, title) {
	var texto = jQuery('<div id="dialog-message">');
	texto.attr('title',title);
	texto.addClass('dialogUIMessage');
	texto.append('<p>' + message + '</p>');
	texto.dialog({
		  modal: true,
	      dialogClass: 'dialogUIcorrect',
	      height : 'auto',
		  width : 'auto',
	      buttons: {
	        Ok: function() {
	        	jQuery( this ).dialog( "close" );
	        	return false;
	        }
	      }
	    });	
}

function showModal(message, funcionSI, paramSI, funcionNO, paramNO) {
	var texto = jQuery('<div id="dialog-message">');
	texto.attr('title','¿Estás seguro?');
	texto.addClass('dialogUIMessage');
	texto.append('<p>' + message + '</p>');
	texto.dialog({
		  modal: true,
	      dialogClass: 'dialogUImodal',
	      height : 'auto',
		  width : 'auto',
	      buttons: {
	        Si: function() {
	        	jQuery( this ).dialog( "close" );
	        	funcionSI(paramSI);
	        	return true;
	        },
	        No: function() {
	        	jQuery( this ).dialog( "close" );
	        	if (funcionNO != undefined && funcionNO != "undefined" && funcionNO != ""){
	        		if (paramNO != undefined && paramNO != "undefined" && paramNO != "")
	        			funcionNO(paramNO);
        			else
        				funcionNO();
	        	}
	        	return false;
	        }
	      }
	    });		
}


/**
 * Funcion que genera el calendario para fecha inicio y fin
 * @param fieldIni
 * @param fieldFin
 */
function datepicker(fieldIni, fieldFin){
	jQuery(fieldIni).datepicker({
		dateFormat: "dd/mm/yy",
//		onClose: function(selectedDate) {
//			jQuery(fieldFin).datepicker('option', 'minDate', selectedDate);
//		},
		beforeShow:function(input) {
			var currentDate = jQuery(fieldFin).datepicker( "getDate" );
			jQuery(fieldIni).datepicker('option', 'maxDate', currentDate);
			jQuery('#ui-datepicker-div').css({
		            "z-index": 20
		    });
	    }
	});
	jQuery(fieldFin).datepicker({
		dateFormat: "dd/mm/yy",
//		onClose: function( selectedDate ) {
//			jQuery( fieldIni ).datepicker( "option", "maxDate", selectedDate );
//		},
		beforeShow:function(input) {
			var currentDate = jQuery(fieldIni).datepicker( "getDate" );
			jQuery(fieldFin).datepicker('option', 'minDate', currentDate);
			jQuery('#ui-datepicker-div').css({
		            "z-index": 20
		    });
	    }
	});
	jQuery(fieldIni).keydown(function (e){e.preventDefault();});
	jQuery(fieldFin).keydown(function (e){e.preventDefault();});
}

/**
*
* Incorpora a la clase String la funcion trim() que limpia los espacios
* por delante y por detrás del objeto String correspondiente
*/ 
String.prototype.trim = function() {  
   return this.replace(/^\s+|\s+$/g,'');  
};

/**
 * Posiciona la pantalla detalle con un submenú
 * @param div
 */
function posicionaMenu(div){
	var move = 340;
	jQuery('html,body').animate({
    	scrollTop: jQuery("#"+div).offset().top - move},'slow');
}

/**
 * Viaja por el submenú de la pantalla de mantenimiento de derechos
 */
function irMenu(donde, numSeccionObjeto) {
	
    if (donde == 'inicio'){
        jQuery('html, body').animate({scrollTop: '0px'},'slow');
    }else if (donde == 'all'){
	    // show all tabs
	    jQuery('#accordion').multiOpenAccordion({active: 'all' });
	}else if (donde == 'none'){
	    // close all tabs
	    jQuery('#accordion').multiOpenAccordion({active: 'none' });
	}else{
		
		if (numSeccionObjeto > 0){
			var tabsAbiertas = jQuery('#accordion').multiOpenAccordion('getActiveTabs');
		    if (tabsAbiertas[0] == -1)
		    	jQuery('#accordion').multiOpenAccordion({active: numSeccionObjeto});
		    else{
		    	tabsAbiertas[tabsAbiertas.length] = numSeccionObjeto;
		    	jQuery('#accordion').multiOpenAccordion({active: tabsAbiertas});
		    }
		}
	    posicionaMenu(donde);
	}
}



/**
 * Se inicializa los accordions de las pantallas de detalle
 */
function initAccordion(tabs){
	
	// Si tenía pestañas abiertas (antes de un submit), las abre de nuevo
	var activeTabs = [];
	if ( jQuery('#openTabs').val() != ""){
		
		var lista = jQuery('#openTabs').val().split(',');
		
		jQuery.each(lista, function(index, item){
			activeTabs.push(parseInt(item,10));
			});
		
	}
	// Inicializacion del accordion de partes del derecho
	if (activeTabs!=null && activeTabs != ""){
		jQuery('#accordion').show().multiOpenAccordion().multiOpenAccordion('option', 'active', activeTabs);
	}else{		
		jQuery('#accordion').show().multiOpenAccordion().multiOpenAccordion('option', 'active', tabs);
	}
	
	// Almacena las pestañas abiertas, y la última que se ha abierto.
	jQuery('#accordion').multiOpenAccordion({
		click: function(event, ui) {
			jQuery('#clickTab').val(ui.tab.attr('div'));
		},
		tabShown: function(event, ui) {
			jQuery('#activeTab').val(ui.tab.attr('div'));
		 	jQuery('#openTabs').val(jQuery('#accordion').multiOpenAccordion('getActiveTabs'));
		 	if (jQuery('#clickTab').val() !=null && jQuery('#clickTab').val() != ""){
		 		posicionaMenu(jQuery('#clickTab').val());
		 	}
			jQuery('#clickTab').val("");
			 	
		 },
		 tabHidden: function(event, ui) {
			 jQuery('#openTabs').val(jQuery('#accordion').multiOpenAccordion('getActiveTabs'));
			 jQuery('#clickTab').val("");
		 }
	});
}
function clearDatepicker(datepicker){
    jQuery ('#' + datepicker).val ('').change();
}

function validarFormulario(form_padre, form_popup){

	var validator = jQuery( "#"+form_padre ).validate();
	
	if (jQuery('.required').size > 0)
		jQuery('.required').rules( "remove" );
	
	var formulario = form_popup==null?form_padre:form_popup;
	
	jQuery.each(
			jQuery("#"+formulario+" .required"), 
			function(){
				jQuery(this).rules( "add", {
					required: true,
					messages: {
						required: ""
					}
				});
			});
	
	jQuery.each(
			jQuery("#"+formulario+" .specificLength"), 
			function(){
				var maxLength = jQuery(this).attr('maxlength');
				jQuery(this).rules( "add", {
					minlength: maxLength,
					maxlength: maxLength,
					messages: {
						minlength: "Deberá contener " + maxLength + " caracteres"
					}
				});
			});
	
    jQuery(".cancel").click(function() {
		validator.resetForm();
	});
	
	return validator;
	
}


/**
 * Si se realiza un cambio en la pantalla de datos generales, se obliga a guardar los
 * cambios antes de crear/modificar/borrar elementos
 */
function comprobarCambiosGenerales(div, formulario){
	jQuery( "#"+div ).change(function() {
		jQuery("#"+formulario+" button[name!='save'][name!='cancel'][name!='nuevo']")
			.unbind( "click" )
			.click(function(event) {
				event.preventDefault();
				showWarning('Se han realizado cambios en los datos generales, pulse Guardar');			
		});
		
		jQuery('table.table td')
			.unbind( "click" )
			.click(function(event) {
				event.preventDefault();
				showWarning('Se han realizado cambios en los datos generales, pulse Guardar');			
		});
		
	}); 
}


/**
 * Se fija la cabecera y el menú de la aplicación
 */
function fijarCabecera(){
	jQuery('.header').css({ "position": 'fixed'});
	jQuery('.header').css({ "width": '100%'});
	jQuery('.header').css({ "z-index": '90'});
	jQuery('.header').css({ "margin-top": '0px'});
	jQuery('.menu').css({ "position": 'fixed'});
	jQuery('.menu').css({ "width": '100%'});
	jQuery('.menu').css({ "z-index": '90'});
	jQuery('.menu').css({ "margin-top": '55px'});
}

/**
 *	Recibe el id de una tabla y devuelve la fila seleccionada. 
 */
function fnGetSelected( oTableLocal )
{
	var table = jQuery(oTableLocal).dataTable();
	var aReturn = new Array();
	var aTrs = table.fnGetNodes();
	
	for ( var i=0 ; i<aTrs.length ; i++ )
	{
		if ( jQuery(aTrs[i]).hasClass('row_selected') )
		{
			aReturn.push( aTrs[i] );
		}
	}
	return aReturn;
}

function fnGetSelectedValues( oTableLocal )
{
	var table = jQuery(oTableLocal).dataTable();
	var aReturn = new Array();
	
	var aTrs = table.fnGetNodes();
	
	for ( var i=0 ; i<aTrs.length ; i++ )
	{
		if ( jQuery(aTrs[i]).hasClass('row_selected') )
		{
		
			aReturn.push( table.fnGetData(i) );
		}
	}
	return aReturn;
}

function fnSelectAll( oTableLocal )
{
	var table = jQuery(oTableLocal).dataTable();
	var aReturn = new Array();
	var aTrs = table.fnGetNodes();
	
	for ( var i=0 ; i<aTrs.length ; i++ )
	{
		if (!(jQuery(aTrs[i]).hasClass("fila_disabled")))
		{
			jQuery(aTrs[i]).addClass('row_selected');
		}
		
		
	}
	return aReturn;
}

function fnDeSelectAll( oTableLocal )
{
	var table = jQuery(oTableLocal).dataTable();
	var aReturn = new Array();
	var aTrs = table.fnGetNodes();
	
	for ( var i=0 ; i<aTrs.length ; i++ )
	{
		jQuery(aTrs[i]).removeClass('row_selected');
		
	}
	return aReturn;
}
/**
 *	Recibe el id de una tabla y devuelve el numero de filas. 
 */
function fnNumFilas( oTableLocal )
{
	var table = jQuery(oTableLocal).dataTable();
	var aTrs = table.fnGetNodes();
	return aTrs.length;
}

/**
 *	busca y reemplaza todos los textos indicados en nuestro texto original. 
 */
function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}

/**
 * Convierte una fecha de tipo Date a un String de tipo DD/MM/YYYY
 * @param date --> fecha de tipo Date para convertir
 * @returns fecha convertida
 */
function convertDate(date){
	var dia = 0;
	var mes = 0;
	var anio = 0;
	var diaString = "";
	var mesString = "";
	var anioString = "";
	dia = date.getDate();
	mes = date.getMonth() + 1;
	anio = date.getFullYear();
	
	if (dia < 10) diaString = "0" + dia;
	else diaString = dia;
	if (mes < 10) mesString = "0" + mes;
	else mesString = mes;
	anioString = anio;	
	
	return diaString + "/" + mesString + "/" + anioString;
}

/**
 * Incrementa una fecha (año, mes, día, hh, mm, ss, ...) en un número  
 * @param objDate --> String fecha para convertir a Date
 * @param strInterval --> D, M, Y, h, m, s, uM, uD, uY, uh, um, us (dependiendo de lo que se quiera incrementar) 
 * @param intIncrement --> incremento de tipo integer (hacer un parseInt antes de pasar el parámetro)
 * @returns {Date}
 */
function DateAdd(objDate, strInterval, intIncrement){
    if(typeof(objDate) == "string") objDate = new Date(objDate);
    
    switch(strInterval){
        case "M":
        	objDate.setMonth(parseInt(objDate.getMonth()) + parseInt(intIncrement));break;
	    case "D":
	        objDate.setDate(parseInt(objDate.getDate()) + parseInt(intIncrement));break;
	    case "Y":
	        objDate.setYear(parseInt(objDate.getYear()) + parseInt(intIncrement));break;
	    case "h":
	        objDate.setHours(parseInt(objDate.getHours()) + parseInt(intIncrement));break;
	    case "m":
	        objDate.setMinutes(parseInt(objDate.getMinutes()) + parseInt(intIncrement));break;
	    case "s":
	        objDate.setSeconds(parseInt(objDate.getSeconds()) + parseInt(intIncrement));break;
	    case "uM":
	        objDate.setUTCMonth(parseInt(objDate.getUTCMonth()) + parseInt(intIncrement));break;
	    case "uD":
	        objDate.setUTCDate(parseInt(objDate.getUTCDate()) + parseInt(intIncrement));break;
	    case "uY":
	        objDate.setUTCFullYear(parseInt(objDate.getUTCFullYear()) + parseInt(intIncrement));break;
	    case "uh":
	        objDate.setUTCHours(parseInt(objDate.getUTCHours()) + parseInt(intIncrement));break;
	    case "um":
	        objDate.setUTCMinutes(parseInt(objDate.getUTCMinutes()) + parseInt(intIncrement));break;
	    case "us":
	        objDate.setUTCSeconds(parseInt(objDate.getUTCSeconds()) + parseInt(intIncrement));break;
	    default:
	    	objDate.setDate(parseInt(objDate.getDate()) + parseInt(intIncrement));break;
    }
    return objDate;
}

/**
 * Convierte una fecha yyyy-mm-dd en un Date
 * @param dateStringInRange yyyy-mm-dd
 * @returns {Date}
 */
function parseDate(dateStringInRange) {
	return new Date( dateStringInRange.replace( /(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3") );
}