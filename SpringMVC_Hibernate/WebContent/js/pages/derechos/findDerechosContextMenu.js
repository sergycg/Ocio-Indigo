/**
 * Menu contextual del derecho
 */
function getContextMenuDerecho(){
	
	var contextMenu;
	ocultaContextMenu();
	
	if( hasPermisoEditarDerecho("DI")){
		contextMenu =[
          	{
          	    'Resumen Derecho':{ 
          	        onclick:getMenuResumenDerecho,
    	        	icon: 'img/icon_detail.png'   
          	    },
          	    'Editar Derecho':{ 
          	    	onclick:getMenuEditarDerecho,
    	        	icon: 'img/icon_edit.png'   
          	    }
          	},
          	jQuery.contextMenu.separator,
          	{
          	    'Cerrar':{title:'Cerrar'} 
          	}
          	];
	}else{
		contextMenu =[
          	{
          	    'Resumen Derecho':{ 
          	        onclick:getMenuResumenDerecho,
          	        icon: 'img/icon_detail.png'          	        
          	    },
          	    'Consultar Derecho':{ 
          	    	onclick:getMenuEditarDerecho,
    	        	icon: 'img/icon_detail.png'   
          	    }
          	},
          	jQuery.contextMenu.separator,
          	{
          	    'Cerrar':{title:'Cerrar'} 
          	}
          	];
	}
	
	return contextMenu
}


/**
 * Menu contextual de la cabecera del programa
 */
function getContextMenuPrograma(){
	
	var contextMenu;
	ocultaContextMenu();

	if( hasPermisoEditarDerecho("DI")){
	
		// Primero busco el estado de la adquisición
		// Si es baja, no presento la opción de Ventanas de Programas
		if (this.target.attributes["estadoAdquisicion"].value == ESTADO_ADQUISICION_ACTIVA){
			contextMenu =[
  		    {
  		        'Ficha Técnica':{ 
  		            onclick:getMenuFichaTecnica,
  		            icon: 'img/icon_ficha_tecnica.png'
  		        },
//  		        'Cabeceras Comerciales':{
//  		        	onclick:getMenuCabeceraComercial,
//  		        	icon: 'img/icon_sale.png'
//  		        },
  		        'Ventanas de Programas':{
  		        	onclick:getMenuVentanasProgramas,
  		        	icon: 'img/icon_vent_novig.png'
  		        },
  		        'Nuevo Derecho':{
  		        	onclick:getMenuNuevoDerecho,
  		        	icon: 'img/icon_new.png'
  		        },
  		        'Aplicar plantilla':{
  		        	onclick:getMenuAplicarPlantillaDerecho,
  		        	icon: 'img/icon_briefcase.png'
  		        }
  		    },
  		
  		    jQuery.contextMenu.separator,
  		    {
  		        'Cerrar':{title:'Cerrar'} 
  		    }
  		    ];			
		}else{
			contextMenu =[
		    {
		        'Ficha Técnica':{ 
		            onclick:getMenuFichaTecnica,
		            icon: 'img/icon_ficha_tecnica.png'
		        },
//		        'Cabeceras Comerciales':{
//		        	onclick:getMenuCabeceraComercial,
//		        	icon: 'img/icon_sale.png'
//		        },
		        'Nuevo Derecho':{
		        	onclick:getMenuNuevoDerecho,
		        	icon: 'img/icon_new.png'
		        }
		    },
		
		    jQuery.contextMenu.separator,
		    {
		        'Cerrar':{title:'Cerrar'} 
		    }
		    ];
		}
	}else{
		contextMenu =[
  	    {
  	        'Ficha Técnica':{ 
  	            onclick:getMenuFichaTecnica,
	            icon: 'img/icon_ficha_tecnica.png'
  	        }
//  	    	,
//  	        'Cabeceras Comerciales':{
//  	        	onclick:getMenuCabeceraComercial,
//	        	icon: 'img/icon_sale.png'
//  	        }
  	    },
  	
  	    jQuery.contextMenu.separator,
  	    {
  	        'Cerrar':{title:'Cerrar'} 
  	    }
  	    ];
	}
	return contextMenu;
}


/**
 * Menu contextual de la cabecera del capitulo
 */
function getContextMenuCapitulo(){
	
	var contextMenu;
	ocultaContextMenu();

	if( hasPermisoEditarDerecho("DI")){
		contextMenu =[
        {
			'Ficha Técnica':{ 
			onclick:getMenuFichaTecnica,
			icon: 'img/icon_ficha_tecnica.png'
			},
//			'Cabeceras Comerciales':{
//			onclick:getMenuCabeceraComercial,
//			icon: 'img/icon_sale.png'
//			},
			'Nuevo Derecho':{
			onclick:getMenuNuevoDerecho,
			icon: 'img/icon_new.png'
			}
		},

        jQuery.contextMenu.separator,
        {
              'Cerrar':{title:'Cerrar'} 
        }
        ];
	}else{
		contextMenu =[
          {
              'Ficha Técnica':{ 
                  onclick:getMenuFichaTecnica,
    	            icon: 'img/icon_ficha_tecnica.png'
              }
          },

          jQuery.contextMenu.separator,
          {
              'Cerrar':{title:'Cerrar'} 
          }
          ];
	}
	
	return contextMenu;
}


/**
 * Menu contextual del derecho
 */
function getContextMenuDerechoComercial(){
	
	var contextMenu;
	ocultaContextMenu();

	if( hasPermisoEditarDerecho("DC")){
		contextMenu =[
          	{
          	    'Resumen Derecho':{ 
          	        onclick:getMenuResumenDerechoComercial,
    	        	icon: 'img/icon_detail.png'   
          	    },
          	    'Editar Derecho':{ 
          	    	onclick:getMenuEditarDerecho,
    	        	icon: 'img/icon_edit.png'   
          	    }
          	},
          	jQuery.contextMenu.separator,
          	{
          	    'Cerrar':{title:'Cerrar'} 
          	}
          	];
	}else{
		contextMenu =[
          	{
          	    'Resumen Derecho':{ 
          	        onclick:getMenuResumenDerechoComercial,
    	        	icon: 'img/icon_detail.png'          	        
          	    },
          	    'Consultar Derecho':{ 
          	    	onclick:getMenuEditarDerecho,
    	        	icon: 'img/icon_detail.png'   
          	    }
          	},
          	jQuery.contextMenu.separator,
          	{
          	    'Cerrar':{title:'Cerrar'} 
          	}
          	];
	}
	
	return contextMenu
}


/**
 * Menu contextual de la cabecera del programa
 */
function getContextMenuProgramaComercial(){
	
	var contextMenu;
	ocultaContextMenu();

	if( hasPermisoEditarDerecho("DC")){
	
		contextMenu =[
	    {
	        'Ficha Técnica':{ 
	            onclick:getMenuFichaTecnica,
	            icon: 'img/icon_ficha_tecnica.png'
	        },
//	        'Cabeceras Comerciales':{
//	        	onclick:getMenuCabeceraComercial,
//	        	icon: 'img/icon_sale.png'
//	        },
	        'Nuevo Derecho':{
	        	onclick:getMenuNuevoDerecho,
	        	icon: 'img/icon_new.png'
	        }
	    },
	
	    jQuery.contextMenu.separator,
	    {
	        'Cerrar':{title:'Cerrar'} 
	    }
	    ];
	}else{
		contextMenu =[
  	    {
  	        'Ficha Técnica':{ 
  	            onclick:getMenuFichaTecnica,
	            icon: 'img/icon_ficha_tecnica.png'
  	        },
//  	        'Cabeceras Comerciales':{
//  	        	onclick:getMenuCabeceraComercial,
//	        	icon: 'img/icon_sale.png'
//  	        }
  	    },
  	
  	    jQuery.contextMenu.separator,
  	    {
  	        'Cerrar':{title:'Cerrar'} 
  	    }
  	    ];
	}
	return contextMenu;
}


/**
 * Menu contextual de la cabecera del capitulo
 */
function getContextMenuCapituloComercial(){
	
	var contextMenu;
	ocultaContextMenu();

	if( hasPermisoEditarDerecho("DC")){
		contextMenu =[
          {
              'Ficha Técnica':{ 
                  onclick:getMenuFichaTecnica,
  	            icon: 'img/icon_ficha_tecnica.png'
              },
              'Nuevo Derecho':{
              	onclick:getMenuNuevoDerecho,
	        	icon: 'img/icon_new.png'
              }
          },

          jQuery.contextMenu.separator,
          {
              'Cerrar':{title:'Cerrar'} 
          }
          ];
	}else{
		contextMenu =[
          {
              'Ficha Técnica':{ 
                  onclick:getMenuFichaTecnica,
    	            icon: 'img/icon_ficha_tecnica.png'
              }
          },

          jQuery.contextMenu.separator,
          {
              'Cerrar':{title:'Cerrar'} 
          }
          ];
	}
	
	return contextMenu;
}

function getMenuResumenDerecho(){
	iconDetailDrcho(this.attributes["codigoDerecho"].value, this.attributes["tipo"].value);
	ocultaContextMenu();
}

function getMenuResumenDerechoComercial(){
	iconDetailDrchoComercial(this.attributes["codigoDerecho"].value, this.attributes["numeroCapitulo"].value);
	ocultaContextMenu();
}

function getMenuEditarDerecho(){
	jQuery("#action").val("loadDerecho");
    jQuery('#idDerecho_hidden').val(this.attributes["codigoDerecho"].value);
    //TODO Hacer bien
    jQuery('#codigoAmbitoDerecho_hidden').val(this.attributes["ambito"].value);
    jQuery('#codigoTipoDerecho_hidden').val(this.attributes["tipo"].value);
    jQuery('#contratoDogma_hidden').val(this.attributes["contratodogma"].value);
	jQuery("#findDerechos").submit();	
}

function getMenuFichaTecnica(){
	var codAudio = this.attributes["codigoaudio"].value;
	var codAdqui = this.attributes["codigoadquisicion"].value;
	var contratoDogma = this.attributes["contratodogma"].value;
	iconDetailFichaTecnica(codAudio, codAdqui, contratoDogma);
	ocultaContextMenu();
}

function getMenuNuevoDerecho(){
	jQuery("#action").val("createDerecho");
	jQuery('#codigoAudioSeleccionado_hidden').val(this.attributes["codigoAudio"].value);
    jQuery('#contratoDogma_hidden').val(this.attributes["contratodogma"].value);
	jQuery("#findDerechos").submit();
}

function getMenuCabeceraComercial(){
	jQuery("#action").val("initFindCabecerasComerciales");
	
	var codAudio = this.attributes["codigoAudio"].value;
	var codAdqui = this.attributes["codigoAdquisicion"].value;
	var contratoDogma = this.attributes["contratodogma"].value;
	
	jQuery("#codigoAudio_hidden").val(codAudio);
	jQuery("#codigoAdquisicion_hidden").val(codAdqui);
	jQuery("#contratoDogma_hidden").val(contratoDogma);
	
	jQuery("#findDerechos").submit();
}
function getMenuVentanasProgramas(){
	var codAudio = this.attributes["codigoaudio"].value;
	var codAdqui = this.attributes["codigoadquisicion"].value;
	iconVentanasNoVigenciaPrograma(codAudio, codAdqui);
	ocultaContextMenu();
}
function enRevision(){
	showWarning("Funcionalidad en revisión");
}

function getMenuAplicarPlantillaDerecho(){
	jQuery("#action").val("aplicarPlantilla");
	jQuery('#codigoAudio_hidden').val(this.attributes["codigoAudio"].value);
	jQuery('#codigoAdquisicion_hidden').val(this.attributes["codigoadquisicion"].value);
    jQuery('#contratoDogma_hidden').val(this.attributes["contratodogma"].value);
	jQuery("#findDerechos").submit();
}