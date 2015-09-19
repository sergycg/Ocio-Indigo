var authorityEditarDerecho = "authorityEditarDerecho";
var authorityEditarDerechoComercial = "authorityEditarDerechoComercial";
var authorityPerfilComercial = "authorityPerfilComercial";

function loadInfoUser() {
    jQuery.ajax({
    	type: "GET",
		url : "getInfoUser.htm",
		dataType : "JSON",
		success : function(bean) {
			jQuery('#nombreUsuario').append(bean.nombre + " " + bean.apellidos);
			jQuery('#loginUsuario').append("("+bean.usuario+")");
		}
    });
    
}

function loadAuthorities() {
    jQuery.ajax({
    	type: "GET",
		url : "hasPermisoEditarDerecho.htm",
		dataType : "text",
		success : function(authorityDerecho) {
			jQuery.data( document.body, authorityEditarDerecho, authorityDerecho );
		}
    });
    jQuery.ajax({
    	type: "GET",
		url : "hasPermisoEditarDerechoComercial.htm",
		dataType : "text",
		success : function(authorityDerecho) {
			jQuery.data( document.body, authorityEditarDerechoComercial, authorityDerecho );
		}
    });
    
    
    // Tantas llamadas ajax como perfiles se precisen validar por jQuery
    //jQuery.ajax...
}

function loadAuthoritiesComercial() {
    jQuery.ajax({
    	type: "GET",
		url : "hasPerfilComercial.htm",
		dataType : "text",
		success : function(authorityComercial) {
			jQuery.data( document.body, authorityPerfilComercial, authorityComercial );
		}
    });
}

function hasPermisoEditarDerecho(tipoDerecho){
	
	var authorities = jQuery.data( document.body, authorityEditarDerecho );
	if (authorities == null || authorities.length <= 0){
		loadAuthorities();
	}
	
	var resultado = false; 
	if (tipoDerecho=="DI")
		resultado = jQuery.data( document.body, authorityEditarDerecho ) == "true";	
	if (tipoDerecho=="DC")
		resultado = jQuery.data( document.body, authorityEditarDerechoComercial ) == "true";	
	
	return resultado;
}

function hasPerfilComercial(){
	var authorities = jQuery.data( document.body, authorityPerfilComercial );
	
	if (authorities == null || authorities.length <= 0) loadAuthoritiesComercial();
	
	var resultado = false;
	resultado = jQuery.data( document.body, authorityPerfilComercial ) == "true";	
	return resultado;
}