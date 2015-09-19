jQuery(document).ready(function(){
  
  if (jQuery('#idModoDifusion').val()==null){
	  jQuery("#idModoDifusion").removeAttr('readOnly'); 
	  jQuery("#idModoDifusion").removeClass('readonly');
  }else{
	  jQuery("#idModoDifusion").attr('readOnly','readOnly');  
	  jQuery("#idModoDifusion").addClass('readonly');
  }
});

function validarDatosModoDifusion(){
//	var codigo = jQuery("#idModoDifusion").val();
	var descripcion = jQuery("#descModoDifusion").val();
	if (descripcion==null || descripcion==""){
		showWarning("El campo descripción no pueden estar vacío");
		return false;
	}else{
		return true;
	}
}