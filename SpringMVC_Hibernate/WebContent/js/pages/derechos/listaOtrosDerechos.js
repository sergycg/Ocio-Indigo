jQuery(document).ready(function(){
	
	objectDataTable.url = "getOtrosDerechos.htm";        	
    objectDataTable.columns = [
                               {"sWidth" : '10%',"mDataProp" : "descTipoDerecho"},
                               {"sWidth" : '15%',"mDataProp": "codigoDerecho"},
                               {"sWidth" : '10%',"mDataProp" : "fechaInicioVigencia"},
                               {"sWidth" : '10%',"mDataProp" : "fechaFinVigencia"},
                               {"sWidth" : '15%',"mDataProp" : "grupoCadenas"},
                               {"sWidth" : '15%',"mDataProp" : "numPasesContratados"},
                               {"sWidth" : '10%',"mDataProp" : "ventanasNoVigencia"},
                               {"sWidth" : '15%',"mDataProp" : "comercializacion"}
                              ];
    
    
	 //objectDataTable.sScrollY = '';
    objectDataTable.fnServerData = 
    	function(sSource, aoData, fnCallback) {
	        jQuery.ajax({	        	
	            dataType : "json",
	            url : sSource,
	            data : {
	                codigoAudio: jQuery("#codigoAudio_hidden").val(),
	                codigoAdquisicion: jQuery("#idAdquisicion").val(),
	                codigoDerecho: jQuery("#idDerecho").val()
	            },
	            success : function(beans) {
	            	if (beans == null || beans.aaData == null || beans.aaData.length == 0){
	            		jQuery('#otrosDerechos').css('display','none');
	            	}
	            	fnCallback(beans);
	            }
	        });
		};	
		
	objectDataTable.bFilter = false;
	objectDataTable.bPaginate = false;
	var oTable = jQuery('#tablaOtrosDerechos').myDataTable(objectDataTable);
	
});