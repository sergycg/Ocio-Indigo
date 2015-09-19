jQuery(document).ready(function(){

	//Inicialización del accordion
	initAccordion([0]);

	jQuery("#codigoCuenta").text(jQuery("#idCuenta").val());
	jQuery("#codigoCliente").text(jQuery("#idCliente").val());

	if (!jQuery("#activo").prop('checked')){
		jQuery("#divInfoCuentaCancelada").css('display','block');
	} 
	
	jQuery('#activo').on('ifChecked', function(event){
		jQuery("#divInfoCuentaCancelada").css('display','none');
	});
	jQuery('#activo').on('ifUnchecked', function(event){
		jQuery("#divInfoCuentaCancelada").css('display','block');
	});
	
	 obtenerListaCompras();
	 obtenerListaEntregas();
	 
	jQuery('#botonNuevaCompra').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion
		event.preventDefault();
		cargarFormularioCompra("addCompra");
	});

	jQuery('#botonNuevaEntrega').click(function(event) {
		event.stopPropagation();	//Impide que se abra el accordion
		event.preventDefault();
		cargarFormularioEntrega("addEntrega");
	});
	
	jQuery('#save').click(function(event) {
//		event.stopPropagation();	//Impide que se abra el accordion
		event.preventDefault();
		if (jQuery("#nombre").val()==null || jQuery("#nombre").val()==""){
			showWarning("Debe rellenar el Nombre");
		}else{
			jQuery("#action").val ("save");
			jQuery("#cuentaClienteForm").submit();
		}
	});

});


