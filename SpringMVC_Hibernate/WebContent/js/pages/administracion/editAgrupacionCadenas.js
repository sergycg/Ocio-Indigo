jQuery(document).ready(function(){
  
  jQuery(".multiselect").multiselect();
  var alta = jQuery('#alta').val();
  
  if ((jQuery('#alta').val()=="true")){
	  jQuery("#idAgrupacion").removeAttr('readOnly'); 
	  jQuery("#idAgrupacion").removeClass('readonly');
  }else{
	  jQuery("#idAgrupacion").attr('readOnly','readOnly');  
	  jQuery("#idAgrupacion").addClass('readonly');
  }
  generaAutocomplete(jQuery('#tipoProd'),
		   jQuery('#descripcionTipoProd'),
		   "autocompleteTipoProduccion.htm", 
		   "", 
		   "");
});



function validarDatosAgrupacion(){
//	var codigo = jQuery("#idAgrupacion").val();
	var descripcion = jQuery("#descAgrupacion").val();
	if (descripcion==null || descripcion==""){
		showWarning("El campo descripción no pueden estar vacío");
		return false;
	}else{
		return true;
	}
}