jQuery(document).ready(
	function(){
		
		//Inicialización del menú 
		jQuery("#jMenu").jMenu({
		      ulWidth : 'auto',
		      effects : {
		        effectSpeedOpen : 300,
		        effectTypeClose : 'slide'
		      },
		      animatedText : false
		    });
		
		//Se establece una acción común a todas las llamadas AJAX		
		jQuery.ajaxSetup({
			headers: { 
		        Accept : "text/plain; charset=utf-8",
		        "Content-Type": "text/plain; charset=utf-8"
		    },
			error : function(jqXHR, error, errorThrown) {
				if(jqXHR.status&&jqXHR.status==200){
					showWarning(jqXHR.responseText);
	            }else{
	            	showError(jqXHR.responseText, jqXHR.status);
	            }
			}
		});
		
		// Muestra/Oculta la imagen de carga
		jQuery(document).ajaxStart(function() {
			jQuery('body').css('overflow','hidden');
			var width = screen.availWidth;
			jQuery( "#div_carga" ).css ('width', width);
			jQuery( "#div_carga" ).show();
    	});
	    jQuery(document).ajaxStop(function() {
	    	jQuery( "#div_carga" ).hide();
			jQuery('body').css('overflow-y','scroll');
			// Si viene de un submit, se posiciona en la última pestaña abierta
			if (jQuery("#popupOpen")!= null && 
				jQuery("#popupOpen").val() == "N" &&
				jQuery('#activeTab') != null && 
				jQuery('#activeTab').val() != undefined && 
				jQuery('#activeTab').val() != ""){
				posicionaMenu(jQuery('#activeTab').val());
			}else{
				jQuery("html, body").scrollTop();
			}
    	});
	    
	    /**
	     * Se inicializan todos los checkbox de manera global
	     */
	    jQuery('[type=checkbox]').iCheck({
		    checkboxClass: 'icheckbox_flat-orange',
		  }).on('ifChanged',function(event){
			  jQuery(this).change();
		  });
	    
	    /**
	     * Se aplica una máscara a los campos numéricos
	     */
		jQuery('input[type=number]').mask('0#');
		jQuery(".porcentaje").mask('99.99');
		jQuery(".cantidad").mask("9999999");
		jQuery(".cantidad_4digitos").mask("9999");
		jQuery(".numero_6digitos").mask("999999");
		
		
		/**
	     * Si se ha devuelto un mensaje de warning o error se muestra un alert
	     */
	    if(jQuery('#messageWarning').size() == 1 && jQuery('#messageWarning').val()!="")
	    	showWarning(jQuery('#messageWarning').val());
	    if(jQuery('#messageError').size() == 1 && jQuery('#messageError').val()!="")
	    	showError(jQuery('#messageError').val());
	    if(jQuery('#messageInfo').size() == 1 && jQuery('#messageInfo').val()!="" && jQuery('#messageTittle').size() == 1 && jQuery('#messageTittle').val()!="")
	    	showInfo(jQuery('#messageInfo').val(), jQuery('#messageTittle').val());
	    	    
	    if(jQuery('#message').size() == 1 && jQuery('#message').val()!=""){
	    	jQuery('#infoOperacion').show();
		    setTimeout(function() {
		    	jQuery('#infoOperacion').fadeOut(500);
	        },5000);
	    }else
	    	jQuery('#infoOperacion').hide();
	    	//showCorrect(jQuery('#message').val());

	    /**
	     * Se obtienen los permisos del usuario y se almacenan en el data del body
	     */
	    loadAuthorities();
	    /**
	     * Cargamos los datos del usuario en la cabecera de la aplicación
	     */
		loadInfoUser();
	    
		// Opciones por defecto para los dialogs. Para los mensajes, es una altura fija
		var altura = jQuery(window).height() - 10;
		jQuery.extend(jQuery.ui.dialog.prototype.options, {
	        autoOpen : true,
	        height : altura,
	        modal : true,
	        resizable : false,
	        draggable : false
		});
		jQuery(document.body).on("dialogopen", function (event, ui) {
		    jQuery("body").css("overflow", "hidden");
		    jQuery ("#popupOpen").val("S");
		});
		jQuery(document.body).on("dialogclose", function (event, ui) {
		    jQuery("body").css("overflow-y", "scroll");
		    jQuery ("#popupOpen").val("N");
		});
		if (objectDataTable!=undefined)
			objectDataTable.initialize();
		
		// MAXLENGTH para los textarea. En IE no funciona, ya que no es estándar
		jQuery("textarea[maxlength]").on("propertychange change keyup input", function() {
	        var limit = parseInt(jQuery(this).attr('maxlength'));  
	        var text = jQuery(this).val();  
	        var chars = text.length;  
	  
	        if(chars > limit){  
	            var new_text = text.substr(0, limit);   
	            jQuery(this).val(new_text);  
	        }  
	    });
		
		if(jQuery('#alert').size() == 1 && jQuery('#alert').val()!=""){
			jQuery('#content-alert').css('display','block');
			var li = jQuery('<li>').append(jQuery('#alert').val());			
			jQuery('#alert-list').append(li);
		}else{
			jQuery('#content-alert').css('display','none');			
		}
		jQuery('.close-alert').click(function(){
			jQuery('.alert-error').css('display','none');
			jQuery('.icon-exclamation').css('display','block');
		});
		jQuery('.icon-exclamation').click(function(){
			jQuery('.alert-error').css('display','block');
			jQuery('.icon-exclamation').css('display','none');
		});
		
});


var objectInicializeContextMenu = {
    shadow:true,
    showSpeed:100, 
    hideSpeed:200, 
    showTransition:'fadeIn', 
    hideTransition:'fadeOut',
    offsetX:2, 
    offsetY: 2,
    theme:'vista'
};

ocultaContextMenu = function(){
	jQuery(".context-menu.context-menu-theme-vista").hide();
	jQuery(".context-menu-shadow").hide();
};

// Funciones de Strings : startsWith y endsWith
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
}

if (typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function (str){
		return this.slice(-str.length) == str;
	};
}