jQuery(document).ready(function(){
  
  jQuery(".multiselect").multiselect();
  
  if (jQuery('#idSistemaTransmision').val()==null){
	  jQuery("#idSistemaTransmision").removeAttr('readOnly'); 
	  jQuery("#idSistemaTransmision").removeClass('readonly');
  }else{
	  jQuery("#idSistemaTransmision").attr('readOnly','readOnly');  
	  jQuery("#idSistemaTransmision").addClass('readonly');
  }
});

function validarDatosSistemaTransmision(){
//	var codigo = jQuery("#idSistemaTransmision").val();
	var descripcion = jQuery("#descSistemaTransmision").val();
	if (descripcion==null || descripcion==""){
		showWarning("El campo descripci�n no pueden estar vac�o");
		return false;
	}else{
		return true;
	}
}